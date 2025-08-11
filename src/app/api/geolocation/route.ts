import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const runtime = 'edge' // Use edge runtime for speed

/**
 * Edge function for IP-based geolocation
 * Uses Cloudflare or Vercel's built-in geolocation
 */
export async function GET() {
  try {
    const headersList = await headers()
    
    // Try Vercel's geolocation headers first (auto-populated in production)
    const latitude = headersList.get('x-vercel-ip-latitude')
    const longitude = headersList.get('x-vercel-ip-longitude')
    
    if (latitude && longitude) {
      return NextResponse.json({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        source: 'vercel'
      })
    }
    
    // Fallback to IP-based service if needed
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 
               headersList.get('x-real-ip') ||
               '8.8.8.8' // Fallback IP
    
    // Use ipapi.co free tier (no API key needed for basic usage)
    // Limited to 1000 requests/month
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(1500) // 1.5s timeout
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
    // Return a sensible default (NYC)
    return NextResponse.json({
      latitude: 40.7128,
      longitude: -74.0060,
      source: 'default'
    })
  }
}
