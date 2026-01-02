import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUserActivity, getGitHubUser } from "@/lib/gitdigest/github"
import { generateDigestReport } from "@/lib/gitdigest/ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { daysBack = 7 } = body

    // Get the authenticated user
    const user = await getGitHubUser()
    const username = user.login

    // Fetch GitHub activity
    const activity = await getUserActivity(username, daysBack)

    if (activity.commits.length === 0) {
      return NextResponse.json({
        success: true,
        report: null,
        message: `No commits found in the last ${daysBack} days`,
      })
    }

    // Generate AI summary
    const report = await generateDigestReport(activity, username)

    return NextResponse.json({
      success: true,
      report,
      username,
    })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate report",
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
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
    console.error("Error fetching activity:", error)
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
