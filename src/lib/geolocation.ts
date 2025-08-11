/**
 * Geolocation utilities with privacy-first approach
 */

import { Coordinates } from './sun-calc'

const GEOLOCATION_CACHE_KEY = 'userCoordinates'
const GEOLOCATION_PERMISSION_KEY = 'geoPermission'

export interface GeolocationResult {
  coordinates: Coordinates
  source: 'precise' | 'ip' | 'timezone'
  accuracy?: number
}

/**
 * Get user's coordinates using hybrid approach
 * 1. Try cached precise location
 * 2. Request browser geolocation (if not denied)
 * 3. Fall back to IP geolocation
 * 4. Fall back to timezone estimation
 */
export async function getUserCoordinates(): Promise<GeolocationResult> {
  // Try cached precise coordinates first
  const cached = getCachedCoordinates()
  if (cached) {
    return { coordinates: cached, source: 'precise' }
  }
  
  // Check if we've been denied before
  const permission = localStorage.getItem(GEOLOCATION_PERMISSION_KEY)
  if (permission !== 'denied') {
    try {
      const precise = await getPreciseCoordinates()
      if (precise) {
        cacheCoordinates(precise)
        return { coordinates: precise, source: 'precise' }
      }
    } catch {
      // Silent fail, try next method
    }
  }
  
  // Try IP geolocation
  try {
    const ipCoords = await getIPCoordinates()
    if (ipCoords) {
      return { coordinates: ipCoords, source: 'ip' }
    }
  } catch {
    // Silent fail, try next method
  }
  
  // Final fallback: estimate from timezone
  const tzCoords = estimateFromTimezone()
  return { coordinates: tzCoords, source: 'timezone' }
}

/**
 * Get precise coordinates from browser API
 * This runs in the background without blocking
 */
async function getPreciseCoordinates(): Promise<Coordinates | null> {
  if (!('geolocation' in navigator)) {
    return null
  }
  
  return new Promise((resolve) => {
    // Set a timeout to prevent blocking
    const timeout = setTimeout(() => resolve(null), 5000)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeout)
        localStorage.setItem(GEOLOCATION_PERMISSION_KEY, 'granted')
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      () => {
        clearTimeout(timeout)
        localStorage.setItem(GEOLOCATION_PERMISSION_KEY, 'denied')
        resolve(null)
      },
      {
        enableHighAccuracy: false, // Faster response
        timeout: 5000,
        maximumAge: 86400000 // 24 hours
      }
    )
  })
}

/**
 * Get coordinates from IP using edge function
 * This is called server-side for speed
 */
export async function getIPCoordinates(): Promise<Coordinates | null> {
  try {
    const response = await fetch('/api/geolocation', {
      method: 'GET',
      signal: AbortSignal.timeout(2000) // 2s timeout
    })
    
    if (!response.ok) return null
    
    const data = await response.json()
    return {
      latitude: data.latitude,
      longitude: data.longitude
    }
  } catch {
    return null
  }
}

/**
 * Estimate coordinates from timezone
 * This is the ultimate fallback
 */
function estimateFromTimezone(): Coordinates {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  
  // Map of major timezones to approximate coordinates
  const timezoneCoords: Record<string, Coordinates> = {
    'America/New_York': { latitude: 40.7128, longitude: -74.0060 },
    'America/Chicago': { latitude: 41.8781, longitude: -87.6298 },
    'America/Denver': { latitude: 39.7392, longitude: -104.9903 },
    'America/Los_Angeles': { latitude: 34.0522, longitude: -118.2437 },
    'America/Phoenix': { latitude: 33.4484, longitude: -112.0740 },
    'Europe/London': { latitude: 51.5074, longitude: -0.1278 },
    'Europe/Paris': { latitude: 48.8566, longitude: 2.3522 },
    'Europe/Berlin': { latitude: 52.5200, longitude: 13.4050 },
    'Asia/Tokyo': { latitude: 35.6762, longitude: 139.6503 },
    'Asia/Shanghai': { latitude: 31.2304, longitude: 121.4737 },
    'Australia/Sydney': { latitude: -33.8688, longitude: 151.2093 },
    // Add more as needed
  }
  
  // Return timezone coords or default to UTC
  return timezoneCoords[timezone] || { latitude: 0, longitude: 0 }
}

/**
 * Cache and retrieve coordinates
 */
function cacheCoordinates(coords: Coordinates): void {
  try {
    localStorage.setItem(GEOLOCATION_CACHE_KEY, JSON.stringify({
      ...coords,
      timestamp: Date.now()
    }))
  } catch {
    // Silent fail
  }
}

function getCachedCoordinates(): Coordinates | null {
  try {
    const cached = localStorage.getItem(GEOLOCATION_CACHE_KEY)
    if (!cached) return null
    
    const data = JSON.parse(cached)
    
    // Cache for 7 days
    if (Date.now() - data.timestamp > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(GEOLOCATION_CACHE_KEY)
      return null
    }
    
    return {
      latitude: data.latitude,
      longitude: data.longitude
    }
  } catch {
    return null
  }
}
