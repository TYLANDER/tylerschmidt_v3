import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const GITDIGEST_COOKIE_NAME = "gitdigest_auth"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function generateToken(password: string): string {
  let hash = 0
  const str = password + "gitdigest_salt_2026"
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      )
    }

    const correctPassword = process.env.GITDIGEST_PASSWORD

    if (!correctPassword) {
      console.error("GITDIGEST_PASSWORD environment variable not set")
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      )
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      )
    }

    // Generate token and set HTTP-only cookie
    const token = generateToken(password)

    const response = NextResponse.json({ success: true })

    response.cookies.set(GITDIGEST_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(GITDIGEST_COOKIE_NAME)
  return response
}
