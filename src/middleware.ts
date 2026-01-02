import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const GITDIGEST_COOKIE_NAME = "gitdigest_auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /gitdigest routes (except login page and auth API)
  if (
    pathname.startsWith("/gitdigest") &&
    !pathname.startsWith("/gitdigest/login") &&
    !pathname.startsWith("/api/gitdigest/auth")
  ) {
    const authCookie = request.cookies.get(GITDIGEST_COOKIE_NAME)

    // Check if the cookie exists and has a valid token
    if (!authCookie?.value) {
      const loginUrl = new URL("/gitdigest/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verify the token matches (simple hash check)
    const expectedToken = generateToken(process.env.GITDIGEST_PASSWORD || "")
    if (authCookie.value !== expectedToken) {
      const loginUrl = new URL("/gitdigest/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      const response = NextResponse.redirect(loginUrl)
      // Clear invalid cookie
      response.cookies.delete(GITDIGEST_COOKIE_NAME)
      return response
    }
  }

  return NextResponse.next()
}

// Simple token generation - matches what we'll use in the auth API
function generateToken(password: string): string {
  // Simple hash for demo - in production use proper crypto
  let hash = 0
  const str = password + "gitdigest_salt_2026"
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export const config = {
  matcher: ["/gitdigest/:path*"],
}
