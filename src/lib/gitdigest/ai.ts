import Anthropic from "@anthropic-ai/sdk"
import type { CommitsByRepo, GitHubActivity } from "./github"
import { groupCommitsByRepo, getActivityStats } from "./github"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface DigestReport {
  id: string
  createdAt: string
  dateRange: {
    start: string
    end: string
  }
  executiveSummary: string[]
  detailedBreakdown: RepoBreakdown[]
  stats: {
    totalCommits: number
    activeRepos: number
    mostActiveDay: string
    mostActiveDayCommits: number
    commitsByDay: Array<{ date: string; count: number }>
  }
  rawData: {
    commitsByRepo: CommitsByRepo[]
  }
}

export interface RepoBreakdown {
  repo: string
  repoUrl: string
  commitCount: number
  summary: string
  highlights: string[]
}

function formatCommitsForPrompt(commitsByRepo: CommitsByRepo[]): string {
  let output = ""

  for (const { repo, commits } of commitsByRepo) {
    output += `\n## ${repo} (${commits.length} commits)\n`
    for (const commit of commits.slice(0, 20)) {
      // Limit to 20 commits per repo
      const date = new Date(commit.date).toLocaleDateString()
      const message = commit.message.split("\n")[0] // First line only
      output += `- [${date}] ${message}\n`
    }
    if (commits.length > 20) {
      output += `- ... and ${commits.length - 20} more commits\n`
    }
  }

  return output
}

export async function generateDigestReport(
  activity: GitHubActivity,
  username: string
): Promise<DigestReport> {
  const commitsByRepo = groupCommitsByRepo(activity.commits, activity.repos)
  const stats = getActivityStats(activity)

  const startDate = new Date(activity.dateRange.start).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  )
  const endDate = new Date(activity.dateRange.end).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const commitsText = formatCommitsForPrompt(commitsByRepo)

  const prompt = `You are an expert at translating developer activity into clear, PM-friendly reports.

Analyze the following GitHub commits from ${username} during ${startDate} - ${endDate} and create a report.

${commitsText}

Create a JSON response with:
1. "executiveSummary": Array of 3-5 bullet points summarizing the most important work done. Focus on business value and outcomes, not technical details. Use action verbs (Completed, Fixed, Started, Improved, etc.).
2. "repoBreakdowns": For each repository with commits, provide:
   - "repo": repository name
   - "summary": 1-2 sentence summary of work done in this repo
   - "highlights": Array of 2-4 key accomplishments or changes

Guidelines:
- Write for a non-technical audience (project managers, executives)
- Translate technical commits into business outcomes
- Group related commits into meaningful work items
- Mention any blockers or work-in-progress if apparent from commit messages
- Be concise but informative

Respond with ONLY valid JSON, no markdown or explanation.`

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  // Extract text from response
  const responseText =
    message.content[0].type === "text" ? message.content[0].text : ""

  // Parse the JSON response
  let parsed: {
    executiveSummary: string[]
    repoBreakdowns: Array<{
      repo: string
      summary: string
      highlights: string[]
    }>
  }

  try {
    parsed = JSON.parse(responseText)
  } catch {
    // Fallback if JSON parsing fails
    parsed = {
      executiveSummary: [
        `${stats.totalCommits} commits across ${stats.activeRepos} repositories`,
        "Unable to generate detailed summary - please try again",
      ],
      repoBreakdowns: [],
    }
  }

  // Build the full report
  const detailedBreakdown: RepoBreakdown[] = commitsByRepo.map((cbr) => {
    const aiBreakdown = parsed.repoBreakdowns?.find(
      (rb) => rb.repo === cbr.repo
    )
    return {
      repo: cbr.repo,
      repoUrl: cbr.repoUrl,
      commitCount: cbr.commits.length,
      summary: aiBreakdown?.summary || `${cbr.commits.length} commits made`,
      highlights: aiBreakdown?.highlights || [],
    }
  })

  return {
    id: `report_${Date.now()}`,
    createdAt: new Date().toISOString(),
    dateRange: activity.dateRange,
    executiveSummary: parsed.executiveSummary || [],
    detailedBreakdown,
    stats,
    rawData: {
      commitsByRepo,
    },
  }
}

export function formatReportAsMarkdown(
  report: DigestReport,
  username: string
): string {
  const startDate = new Date(report.dateRange.start).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  )
  const endDate = new Date(report.dateRange.end).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  let md = `# Dev Report: ${username}\n`
  md += `## ${startDate} - ${endDate}\n\n`

  md += `### Executive Summary\n`
  for (const bullet of report.executiveSummary) {
    md += `- ${bullet}\n`
  }
  md += `\n`

  md += `### Detailed Breakdown\n\n`
  for (const breakdown of report.detailedBreakdown) {
    md += `**${breakdown.repo}** (${breakdown.commitCount} commits)\n`
    md += `${breakdown.summary}\n`
    if (breakdown.highlights.length > 0) {
      for (const highlight of breakdown.highlights) {
        md += `- ${highlight}\n`
      }
    }
    md += `\n`
  }

  md += `---\n`
  md += `*Generated by GitDigest*\n`

  return md
}
