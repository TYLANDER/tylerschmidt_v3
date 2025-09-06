/**
 * Sun Calculation Utilities
 *
 * Provides accurate sunrise/sunset calculations based on NOAA astronomical algorithms.
 * These calculations power the automatic theme switching, ensuring the site's
 * appearance naturally follows the sun throughout the day.
 *
 * Key features:
 * - Calculates sunrise, sunset, and civil twilight times
 * - Accounts for user's exact latitude/longitude
 * - Uses simplified but accurate solar position algorithms
 * - Provides smooth transition progress for dawn/dusk effects
 *
 * Civil twilight is used instead of actual sunrise/sunset for more natural
 * theme transitions - this is when the sun is 6° below the horizon and
 * there's still ambient light in the sky.
 */

export interface SunTimes {
  sunrise: Date
  sunset: Date
  civilDawn: Date
  civilDusk: Date
}

export interface Coordinates {
  latitude: number
  longitude: number
}

/**
 * Calculate sun times for given coordinates and date
 *
 * This is the core function that determines when to switch themes.
 * It calculates not just sunrise/sunset, but also civil twilight times
 * for smoother, more natural transitions.
 *
 * @param coords - User's latitude/longitude
 * @param date - Date to calculate for (defaults to today)
 * @returns Object with sunrise, sunset, and twilight times
 *
 * Example timeline for New York on June 21:
 * - Civil Dawn: 5:00 AM (theme starts transitioning to light)
 * - Sunrise: 5:30 AM (full daylight theme)
 * - Sunset: 8:30 PM (theme starts transitioning to dark)
 * - Civil Dusk: 9:00 PM (full dark theme)
 */
export function calculateSunTimes(
  coords: Coordinates,
  date = new Date()
): SunTimes {
  const { latitude, longitude } = coords
  const julianDay = getJulianDay(date)

  // Solar calculations
  const sunriseHour = getSunriseHour(latitude, longitude, julianDay)
  const sunsetHour = getSunsetHour(latitude, longitude, julianDay)

  // Civil twilight (sun 6° below horizon)
  const civilDawnHour = getCivilDawn(latitude, longitude, julianDay)
  const civilDuskHour = getCivilDusk(latitude, longitude, julianDay)

  return {
    sunrise: hoursToDate(sunriseHour, date),
    sunset: hoursToDate(sunsetHour, date),
    civilDawn: hoursToDate(civilDawnHour, date),
    civilDusk: hoursToDate(civilDuskHour, date),
  }
}

/**
 * Determine theme based on current time and sun position
 *
 * Uses civil twilight as the transition point for a more natural feel.
 * This means the theme changes when there's still some ambient light,
 * rather than waiting for complete darkness.
 *
 * @param sunTimes - Calculated sun times for the day
 * @param now - Current time to check
 * @returns 'light' during day, 'dark' at night
 */
export function getThemeFromSunTimes(
  sunTimes: SunTimes,
  now = new Date()
): "light" | "dark" {
  const time = now.getTime()

  // Use civil twilight for smoother transitions
  if (
    time >= sunTimes.civilDawn.getTime() &&
    time < sunTimes.civilDusk.getTime()
  ) {
    return "light"
  }

  return "dark"
}

/**
 * Get transition progress for smooth theme changes
 *
 * This enables gradual theme transitions during dawn and dusk,
 * creating a beautiful sunrise/sunset effect rather than an abrupt switch.
 *
 * @param sunTimes - Calculated sun times for the day
 * @param now - Current time
 * @returns Progress from 0 (full dark) to 1 (full light)
 *
 * Transition periods:
 * - Dawn: Civil dawn to sunrise (typically ~30 minutes)
 * - Dusk: Sunset to civil dusk (typically ~30 minutes)
 */
export function getTransitionProgress(
  sunTimes: SunTimes,
  now = new Date()
): number {
  const time = now.getTime()
  const { civilDawn, sunrise, sunset, civilDusk } = sunTimes

  // Before dawn
  if (time < civilDawn.getTime()) return 0

  // Dawn transition
  if (time < sunrise.getTime()) {
    const dawnDuration = sunrise.getTime() - civilDawn.getTime()
    const elapsed = time - civilDawn.getTime()
    return elapsed / dawnDuration
  }

  // Full daylight
  if (time < sunset.getTime()) return 1

  // Dusk transition
  if (time < civilDusk.getTime()) {
    const duskDuration = civilDusk.getTime() - sunset.getTime()
    const elapsed = time - sunset.getTime()
    return 1 - elapsed / duskDuration
  }

  // After dusk
  return 0
}

// Helper functions for solar calculations
function getJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5
}

function getSunriseHour(lat: number, lon: number, jd: number): number {
  const decl = getSolarDeclination(jd)
  const ha = getHourAngle(lat, decl, -0.833) // -0.833° for sunrise/sunset
  return 12 - ha - lon / 15
}

function getSunsetHour(lat: number, lon: number, jd: number): number {
  const decl = getSolarDeclination(jd)
  const ha = getHourAngle(lat, decl, -0.833)
  return 12 + ha - lon / 15
}

function getCivilDawn(lat: number, lon: number, jd: number): number {
  const decl = getSolarDeclination(jd)
  const ha = getHourAngle(lat, decl, -6) // -6° for civil twilight
  return 12 - ha - lon / 15
}

function getCivilDusk(lat: number, lon: number, jd: number): number {
  const decl = getSolarDeclination(jd)
  const ha = getHourAngle(lat, decl, -6)
  return 12 + ha - lon / 15
}

function getSolarDeclination(jd: number): number {
  const n = jd - 2451545
  const L = (280.46 + 0.9856474 * n) % 360
  const g = (((357.528 + 0.9856003 * n) % 360) * Math.PI) / 180
  const lambda =
    ((L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * Math.PI) / 180
  return (
    (Math.asin(Math.sin((23.439 * Math.PI) / 180) * Math.sin(lambda)) * 180) /
    Math.PI
  )
}

function getHourAngle(lat: number, decl: number, angle: number): number {
  const latRad = (lat * Math.PI) / 180
  const declRad = (decl * Math.PI) / 180
  const angleRad = (angle * Math.PI) / 180
  const ha = Math.acos(
    (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(declRad)) /
      (Math.cos(latRad) * Math.cos(declRad))
  )
  return (ha * 180) / Math.PI / 15
}

function hoursToDate(hours: number, date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  result.setTime(result.getTime() + hours * 3600000)
  return result
}

/**
 * Cached sun times structure
 *
 * Sun positions only need to be calculated once per day per location.
 * Caching prevents unnecessary recalculations and API calls.
 */
export interface CachedSunTimes {
  sunTimes: SunTimes
  coordinates: Coordinates
  date: string
  expires: number
}

/**
 * Cache calculated sun times for 24 hours
 *
 * This significantly improves performance by avoiding recalculation
 * on every page load. Sun times change very slowly day-to-day,
 * so 24-hour caching is perfectly acceptable.
 *
 * @param sunTimes - Calculated times to cache
 * @param coordinates - Location used for calculation
 */
export function cacheSunTimes(
  sunTimes: SunTimes,
  coordinates: Coordinates
): void {
  const cached: CachedSunTimes = {
    sunTimes,
    coordinates,
    date: new Date().toDateString(),
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }

  try {
    localStorage.setItem("sunTimes", JSON.stringify(cached))
  } catch {
    // Silent fail if localStorage is full
  }
}

export function getCachedSunTimes(): CachedSunTimes | null {
  try {
    const cached = localStorage.getItem("sunTimes")
    if (!cached) return null

    const data = JSON.parse(cached) as CachedSunTimes

    // Check if expired or different day
    if (Date.now() > data.expires || data.date !== new Date().toDateString()) {
      localStorage.removeItem("sunTimes")
      return null
    }

    // Rehydrate dates
    return {
      ...data,
      sunTimes: {
        sunrise: new Date(data.sunTimes.sunrise),
        sunset: new Date(data.sunTimes.sunset),
        civilDawn: new Date(data.sunTimes.civilDawn),
        civilDusk: new Date(data.sunTimes.civilDusk),
      },
    }
  } catch {
    return null
  }
}
