import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { sendReportEmail } from "@/lib/gitdigest/email"
import { getGitHubUser } from "@/lib/gitdigest/github"
import type { DigestReport } from "@/lib/gitdigest/ai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { report, to } = body as { report: DigestReport; to: string }

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Report is required" },
        { status: 400 }
      )
    }

    if (!to) {
      return NextResponse.json(
        { success: false, error: "Email recipient is required" },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!to.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      )
    }

    const user = await getGitHubUser()
    const result = await sendReportEmail(report, user.login, { to })

    return NextResponse.json({
      success: true,
      messageId: result?.id,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    )
  }
}
