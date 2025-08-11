import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const runtime = 'edge' // Use edge runtime for speed

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
    const latitude = headersList.get('x-vercel-ip-latitude')
    const longitude = headersList.get('x-vercel-ip-longitude')
    
    if (latitude && longitude) {
      return NextResponse.json({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        source: 'vercel'
      })
    }
    
    // Method 2: Fallback to IP-based service
    // Extract user's IP from various possible headers
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 
               headersList.get('x-real-ip') ||
               '8.8.8.8' // Fallback IP (Google DNS)
    
    // Use ipapi.co free tier for geolocation
    // Free tier: 1000 requests/month, no API key needed
    // Returns: country, city, latitude, longitude, timezone
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(1500) // Fast timeout to prevent delays
    })
    
    if (!response.ok) {
      throw new Error('Geolocation failed')
    }
    
    const data = await response.json()
    
    return NextResponse.json({
      latitude: data.latitude,
      longitude: data.longitude,
      source: 'ipapi'
    })
  } catch {
    // Method 3: Return sensible default (New York City)
    // This ensures the theme system always works, even if
    // geolocation fails. NYC is chosen as it's in a common timezone.
    return NextResponse.json({
      latitude: 40.7128,
      longitude: -74.0060,
      source: 'default'
    })
  }
}
