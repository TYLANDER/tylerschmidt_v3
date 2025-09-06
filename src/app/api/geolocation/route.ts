import { NextResponse } from "next/server"
import { headers } from "next/headers"

export const runtime = "edge" // Use edge runtime for speed

/**
 * Edge API Route for IP-based Geolocation
 *
 * This endpoint provides fast, server-side geolocation for the automatic
 * sun-based theme system. It runs on the edge (close to users) for minimal
 * latency (~50ms) and uses multiple methods to determine location.
 *
 * Location Detection Order:
 * 1. Vercel's automatic geolocation headers (production only)
 * 2. IP-based lookup via ipapi.co (free tier: 1000 req/month)
 * 3. Default fallback (New York) if all else fails
 *
 * Privacy & Performance:
 * - Runs on edge for speed (not in Node.js runtime)
 * - No data storage - purely ephemeral
 * - Rate limited by ipapi.co free tier
 * - Cached by browser for 24 hours
 *
 * To upgrade accuracy:
 * - Get ipapi.co API key for more requests
 * - Add to environment: IPAPI_KEY=your_key
 * - Update fetch URL to include key
 */
export async function GET() {
  try {
    const headersList = await headers()

    // Method 1: Try Vercel's geolocation headers
    // These are automatically populated in production deployments
    // Provides city-level accuracy with zero latency
    const latitude = headersList.get("x-vercel-ip-latitude")
    const longitude = headersList.get("x-vercel-ip-longitude")

    // Debug logging for Vercel deployment
    console.log("Geolocation API called:", {
      hasLatitude: !!latitude,
      hasLongitude: !!longitude,
      headers: {
        "x-vercel-ip-latitude": latitude,
        "x-vercel-ip-longitude": longitude,
        "x-forwarded-for": headersList.get("x-forwarded-for"),
        "x-real-ip": headersList.get("x-real-ip"),
      },
    })

    if (latitude && longitude) {
      const result = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        source: "vercel",
      }
      console.log("Returning Vercel geolocation:", result)
      return NextResponse.json(result)
    }

    // Method 2: Fallback to IP-based service
    // Extract user's IP from various possible headers
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      "8.8.8.8" // Fallback IP (Google DNS)

    // Use ipapi.co free tier for geolocation
    // Free tier: 1000 requests/month, no API key needed
    // Returns: country, city, latitude, longitude, timezone
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(1500), // Fast timeout to prevent delays
    })

    if (!response.ok) {
      console.error("ipapi.co request failed:", response.status)
      throw new Error("Geolocation failed")
    }

    const data = await response.json()
    console.log("ipapi.co response:", data)

    const result = {
      latitude: data.latitude,
      longitude: data.longitude,
      source: "ipapi",
    }
    console.log("Returning IP geolocation:", result)
    return NextResponse.json(result)
  } catch (error) {
    // Method 3: Return sensible default (New York City)
    // This ensures the theme system always works, even if
    // geolocation fails. NYC is chosen as it's in a common timezone.
    console.error("Geolocation error:", error)
    const fallback = {
      latitude: 40.7128,
      longitude: -74.006,
      source: "default",
    }
    console.log("Returning fallback location:", fallback)
    return NextResponse.json(fallback)
  }
}
