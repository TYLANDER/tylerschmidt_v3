import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface GitHubCommit {
  sha: string
  message: string
  date: string
  url: string
  author: string
  authorLogin: string | null
}

export interface GitHubRepo {
  name: string
  fullName: string
  url: string
  description: string | null
  language: string | null
  stars: number
  updatedAt: string
}

export interface GitHubActivity {
  commits: GitHubCommit[]
  repos: GitHubRepo[]
  totalCommits: number
  dateRange: {
    start: string
    end: string
  }
}

export interface CommitsByRepo {
  repo: string
  repoUrl: string
  commits: GitHubCommit[]
}

export async function getGitHubUser() {
  const { data } = await octokit.rest.users.getAuthenticated()
  return data
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const { data } = await octokit.rest.repos.listForUser({
    username,
    sort: "updated",
    per_page: 100,
    type: "owner",
  })

  return data.map((repo) => ({
    name: repo.name,
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language ?? null,
    stars: repo.stargazers_count || 0,
    updatedAt: repo.updated_at || "",
  }))
}

export async function getRepoCommits(
  owner: string,
  repo: string,
  since: string,
  until: string
): Promise<GitHubCommit[]> {
  try {
    const { data } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      since,
      until,
      per_page: 100,
    })

    return data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author?.date || "",
      url: commit.html_url,
      author: commit.commit.author?.name || "Unknown",
      // GitHub login from the author object (different from git commit author name)
      authorLogin: commit.author?.login || null,
    }))
  } catch (error) {
    // Repo might be empty or inaccessible
    console.warn(`Could not fetch commits for ${owner}/${repo}:`, error)
    return []
  }
}

export async function getUserActivity(
  username: string,
  daysBack: number = 7
): Promise<GitHubActivity> {
  const now = new Date()
  const since = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)

  const sinceISO = since.toISOString()
  const untilISO = now.toISOString()

  // Get user's repos
  const repos = await getUserRepos(username)

  // Get commits from each repo in parallel (limit to recently updated repos)
  const recentRepos = repos.filter((repo) => {
    const repoUpdated = new Date(repo.updatedAt)
    return repoUpdated >= since
  })

  const commitPromises = recentRepos.map((repo) =>
    getRepoCommits(username, repo.name, sinceISO, untilISO)
  )

  const commitsPerRepo = await Promise.all(commitPromises)

  // Flatten all commits
  const flatCommits = commitsPerRepo.flat()

  // Debug logging
  console.log(
    `[GitDigest] Fetched ${flatCommits.length} total commits from ${recentRepos.length} repos`
  )
  if (flatCommits.length > 0) {
    const sampleCommit = flatCommits[0]
    console.log(
      `[GitDigest] Sample commit author: "${sampleCommit.author}", login: "${sampleCommit.authorLogin}", target: "${username}"`
    )
  }

  // Filter to only include commits by this user
  // Match by GitHub login (authorLogin) OR by author name containing username
  const usernameLower = username.toLowerCase()
  const allCommits = flatCommits
    .filter((commit) => {
      // Primary match: GitHub login matches
      if (commit.authorLogin?.toLowerCase() === usernameLower) {
        return true
      }
      // Fallback: author name contains username (case-insensitive)
      if (commit.author.toLowerCase().includes(usernameLower)) {
        return true
      }
      return false
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  console.log(
    `[GitDigest] Filtered to ${allCommits.length} commits by user "${username}"`
  )

  return {
    commits: allCommits,
    repos: recentRepos,
    totalCommits: allCommits.length,
    dateRange: {
      start: sinceISO,
      end: untilISO,
    },
  }
}

export function groupCommitsByRepo(
  commits: GitHubCommit[],
  repos: GitHubRepo[]
): CommitsByRepo[] {
  const repoMap = new Map<string, CommitsByRepo>()

  for (const commit of commits) {
    // Extract repo name from commit URL
    const urlParts = commit.url.split("/")
    const repoIndex = urlParts.indexOf("commit") - 1
    const repoName = urlParts[repoIndex]
    const ownerName = urlParts[repoIndex - 1]
    const fullName = `${ownerName}/${repoName}`

    if (!repoMap.has(repoName)) {
      const repoInfo = repos.find((r) => r.name === repoName)
      repoMap.set(repoName, {
        repo: repoName,
        repoUrl: repoInfo?.url || `https://github.com/${fullName}`,
        commits: [],
      })
    }

    repoMap.get(repoName)!.commits.push(commit)
  }

  // Sort by number of commits (descending)
  return Array.from(repoMap.values()).sort(
    (a, b) => b.commits.length - a.commits.length
  )
}

export function getActivityStats(activity: GitHubActivity) {
  const { commits } = activity

  // Commits per day
  const commitsByDay = new Map<string, number>()
  for (const commit of commits) {
    const day = commit.date.split("T")[0]
    commitsByDay.set(day, (commitsByDay.get(day) || 0) + 1)
  }

  // Most active day
  let mostActiveDay = ""
  let maxCommits = 0
  for (const [day, count] of commitsByDay) {
    if (count > maxCommits) {
      maxCommits = count
      mostActiveDay = day
    }
  }

  // Unique repos with commits
  const activeRepos = new Set(
    commits.map((c) => {
      const parts = c.url.split("/")
      return parts[parts.indexOf("commit") - 1]
    })
  )

  return {
    totalCommits: commits.length,
    activeRepos: activeRepos.size,
    mostActiveDay,
    mostActiveDayCommits: maxCommits,
    commitsByDay: Array.from(commitsByDay.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  }
}
