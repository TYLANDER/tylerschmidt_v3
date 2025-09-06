/**
 * Geolocation Utilities - Privacy-First Approach
 *
 * This module handles location detection for the automatic sun-based theme system.
 * It uses a hybrid approach that prioritizes user privacy while providing accurate
 * location data for sunrise/sunset calculations.
 *
 * Location Detection Hierarchy:
 * 1. Cached precise coordinates (if previously granted)
 * 2. Browser geolocation API (requires one-time permission)
 * 3. IP-based geolocation (no permission needed, ~city accuracy)
 * 4. Timezone estimation (ultimate fallback)
 *
 * Privacy Features:
 * - No location data is sent to external servers (except IP for geolocation)
 * - Coordinates are only stored locally in browser
 * - Permission denials are remembered and respected
 * - Graceful degradation if location is unavailable
 */

import { Coordinates } from "./sun-calc"

const GEOLOCATION_CACHE_KEY = "userCoordinates"
const GEOLOCATION_PERMISSION_KEY = "geoPermission"

export interface GeolocationResult {
  coordinates: Coordinates
  source: "precise" | "ip" | "timezone"
  accuracy?: number
}

/**
 * Get user's coordinates using hybrid approach
 *
 * This is the main entry point for location detection. It tries multiple
 * methods in order of accuracy, always falling back gracefully.
 *
 * The goal is to get location without interrupting the user experience:
 * - Instant results via caching or IP
 * - Background precision upgrade if available
 * - Always returns something usable
 *
 * @returns Coordinates with source indicator (precise/ip/timezone)
 */
export async function getUserCoordinates(): Promise<GeolocationResult> {
  // Try cached precise coordinates first
  const cached = getCachedCoordinates()
  if (cached) {
    return { coordinates: cached, source: "precise" }
  }

  // Step 2: Try browser geolocation if not previously denied
  // This provides the most accurate results but requires permission
  const permission = localStorage.getItem(GEOLOCATION_PERMISSION_KEY)
  if (permission !== "denied") {
    try {
      const precise = await getPreciseCoordinates()
      if (precise) {
        cacheCoordinates(precise)
        return { coordinates: precise, source: "precise" }
      }
    } catch {
      // Silent fail, try next method
    }
  }

  // Step 3: Try IP geolocation (no permission needed)
  // Accurate to city level, good enough for sun calculations
  try {
    const ipCoords = await getIPCoordinates()
    if (ipCoords) {
      return { coordinates: ipCoords, source: "ip" }
    }
  } catch {
    // Silent fail, try next method
  }

  // Step 4: Final fallback - estimate from timezone
  // Least accurate but ensures theme always works
  const tzCoords = estimateFromTimezone()
  return { coordinates: tzCoords, source: "timezone" }
}

/**
 * Get precise coordinates from browser API
 *
 * Uses the HTML5 Geolocation API for exact coordinates.
 * Configured for speed over accuracy to avoid delays.
 *
 * Settings:
 * - Low accuracy mode (faster, uses WiFi/cell towers)
 * - 5 second timeout (prevents blocking)
 * - 24 hour cache (reduces permission prompts)
 *
 * @returns Exact coordinates or null if unavailable/denied
 */
async function getPreciseCoordinates(): Promise<Coordinates | null> {
  if (!("geolocation" in navigator)) {
    return null
  }

  return new Promise((resolve) => {
    // Set a timeout to prevent blocking
    const timeout = setTimeout(() => resolve(null), 5000)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeout)
        localStorage.setItem(GEOLOCATION_PERMISSION_KEY, "granted")
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      () => {
        clearTimeout(timeout)
        localStorage.setItem(GEOLOCATION_PERMISSION_KEY, "denied")
        resolve(null)
      },
      {
        enableHighAccuracy: false, // Faster response
        timeout: 5000,
        maximumAge: 86400000, // 24 hours
      }
    )
  })
}

/**
 * Get coordinates from IP using edge function
 *
 * Makes a request to our edge API which uses IP geolocation.
 * This is fast (~50ms) and requires no user permission.
 *
 * Accuracy: City-level (~50km radius)
 * Privacy: Only IP is used, no tracking
 *
 * @returns Approximate coordinates based on IP address
 */
export async function getIPCoordinates(): Promise<Coordinates | null> {
  try {
    const response = await fetch("/api/geolocation", {
      method: "GET",
      signal: AbortSignal.timeout(2000), // 2s timeout
    })

    if (!response.ok) return null

    const data = await response.json()
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    }
  } catch {
    return null
  }
}

/**
 * Estimate coordinates from timezone
 *
 * Ultimate fallback using the browser's timezone to guess location.
 * Very approximate but ensures the theme system always works.
 *
 * This covers major cities/timezones worldwide. If an exact match
 * isn't found, it defaults to UTC (0,0) which gives reasonable
 * sunrise/sunset times for most populated areas.
 *
 * @returns Rough coordinates based on timezone
 */
function estimateFromTimezone(): Coordinates {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Map of major timezones to approximate coordinates
  const timezoneCoords: Record<string, Coordinates> = {
    "America/New_York": { latitude: 40.7128, longitude: -74.006 },
    "America/Chicago": { latitude: 41.8781, longitude: -87.6298 },
    "America/Denver": { latitude: 39.7392, longitude: -104.9903 },
    "America/Los_Angeles": { latitude: 34.0522, longitude: -118.2437 },
    "America/Phoenix": { latitude: 33.4484, longitude: -112.074 },
    "Europe/London": { latitude: 51.5074, longitude: -0.1278 },
    "Europe/Paris": { latitude: 48.8566, longitude: 2.3522 },
    "Europe/Berlin": { latitude: 52.52, longitude: 13.405 },
    "Asia/Tokyo": { latitude: 35.6762, longitude: 139.6503 },
    "Asia/Shanghai": { latitude: 31.2304, longitude: 121.4737 },
    "Australia/Sydney": { latitude: -33.8688, longitude: 151.2093 },
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
    localStorage.setItem(
      GEOLOCATION_CACHE_KEY,
      JSON.stringify({
        ...coords,
        timestamp: Date.now(),
      })
    )
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
      longitude: data.longitude,
    }
  } catch {
    return null
  }
}
