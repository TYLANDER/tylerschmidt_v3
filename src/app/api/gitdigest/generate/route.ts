import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUserActivity, getGitHubUser } from "@/lib/gitdigest/github"
import { generateDigestReport } from "@/lib/gitdigest/ai"

// Check required environment variables
function checkConfiguration(): string | null {
  if (!process.env.GITHUB_TOKEN) {
    return "GITHUB_TOKEN environment variable is not set. Please add your GitHub personal access token."
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return "ANTHROPIC_API_KEY environment variable is not set. Please add your Anthropic API key."
  }
  return null
}

export async function POST(request: NextRequest) {
  // Validate configuration first
  const configError = checkConfiguration()
  if (configError) {
    console.error("[GitDigest] Configuration error:", configError)
    return NextResponse.json(
      { success: false, error: configError },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { daysBack = 7 } = body

    console.log(`[GitDigest] Generating report for last ${daysBack} days`)

    // Get the authenticated user
    const user = await getGitHubUser()
    const username = user.login
    console.log(`[GitDigest] Authenticated as: ${username}`)

    // Fetch GitHub activity
    const activity = await getUserActivity(username, daysBack)

    if (activity.commits.length === 0) {
      console.log(
        `[GitDigest] No commits found for ${username} in the last ${daysBack} days`
      )
      return NextResponse.json({
        success: true,
        report: null,
        message: `No commits found in the last ${daysBack} days. Try a longer time range.`,
      })
    }

    console.log(
      `[GitDigest] Found ${activity.commits.length} commits, generating AI summary...`
    )

    // Generate AI summary
    const report = await generateDigestReport(activity, username)

    console.log(`[GitDigest] Report generated successfully`)

    return NextResponse.json({
      success: true,
      report,
      username,
    })
  } catch (error) {
    console.error("[GitDigest] Error generating report:", error)

    // Provide more helpful error messages
    let errorMessage = "Failed to generate report"
    if (error instanceof Error) {
      if (error.message.includes("Bad credentials")) {
        errorMessage =
          "GitHub token is invalid or expired. Please update your GITHUB_TOKEN."
      } else if (error.message.includes("rate limit")) {
        errorMessage = "GitHub API rate limit exceeded. Please try again later."
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Validate configuration first
  const configError = checkConfiguration()
  if (configError) {
    return NextResponse.json(
      { success: false, error: configError },
      { status: 500 }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const daysBack = parseInt(searchParams.get("days") || "7", 10)

  try {
    const user = await getGitHubUser()
    const username = user.login
    const activity = await getUserActivity(username, daysBack)

    return NextResponse.json({
      success: true,
      username,
      activity: {
        totalCommits: activity.totalCommits,
        repoCount: activity.repos.length,
        dateRange: activity.dateRange,
      },
    })
  } catch (error) {
    console.error("[GitDigest] Error fetching activity:", error)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch activity",
      },
      { status: 500 }
    )
  }
}
