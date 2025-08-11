"use client"

import { useEffect, useRef, useState } from 'react'
import { getUserCoordinates } from '@/lib/geolocation'
import { calculateSunTimes, getThemeFromSunTimes, getCachedSunTimes, cacheSunTimes, getTransitionProgress } from '@/lib/sun-calc'

/**
 * Automatic Sun-Based Theme Provider
 * 
 * This component automatically switches between light and dark themes based on
 * the user's local sunrise and sunset times. It provides a magical "it just knows"
 * experience without requiring any user interaction.
 * 
 * How it works:
 * 1. Gets user's location via IP geolocation (instant, no permissions)
 * 2. Calculates local sunrise/sunset times using astronomical algorithms
 * 3. Applies light theme during daylight hours, dark theme at night
 * 4. Smoothly transitions during dawn/dusk periods
 * 5. Optionally requests precise location for more accurate times
 * 
 * Features:
 * - Zero user input required - theme "just works"
 * - Respects civil twilight for natural transitions
 * - Caches calculations for 24 hours to minimize API calls
 * - Falls back gracefully through IP → timezone → system preference
 * - Updates theme throughout the day automatically
 * 
 * @param {React.ReactNode} children - Child components to wrap
 */
export function SunThemeProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    let isMounted = true
    
    /**
     * Initialize the sun-based theme system
     * This runs once on mount and sets up the automatic theme switching
     */
    async function initializeTheme() {
      try {
        // Step 1: Apply cached theme immediately to prevent flash of wrong theme
        // This happens before React hydrates, ensuring smooth experience
        const cachedTheme = localStorage.getItem('theme')
        if (cachedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        }
        
        // Step 2: Check for cached sun times (stored for 24 hours)
        // This avoids unnecessary API calls and provides instant theming
        const cached = getCachedSunTimes()
        if (cached) {
          const theme = getThemeFromSunTimes(cached.sunTimes)
          applyTheme(theme)
          scheduleNextUpdate(cached.sunTimes)
          if (isMounted) setIsInitialized(true)
          return
        }
        
        // Step 3: Get user coordinates using hybrid approach
        // Tries: IP geolocation → Browser geolocation → Timezone estimation
        const geoResult = await getUserCoordinates()
        const sunTimes = calculateSunTimes(geoResult.coordinates)
        
        // Cache the results
        cacheSunTimes(sunTimes, geoResult.coordinates)
        
        // Apply theme based on current sun position
        const theme = getThemeFromSunTimes(sunTimes)
        applyTheme(theme)
        
        // Schedule next theme update
        scheduleNextUpdate(sunTimes)
        
        // Step 4: If using imprecise location, request precise coords in background
        // This happens silently 3 seconds after load to avoid interrupting the user
        if (geoResult.source !== 'precise') {
          requestPreciseLocationInBackground()
        }
        
        if (isMounted) setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize sun-based theme:', error)
        // Fall back to system preference
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        applyTheme(systemDark ? 'dark' : 'light')
        if (isMounted) setIsInitialized(true)
      }
    }
    
    /**
     * Apply theme to the document
     * Handles smooth transitions and updates all necessary properties
     * 
     * @param theme - 'light' or 'dark' based on sun position
     */
    function applyTheme(theme: 'light' | 'dark') {
      const root = document.documentElement
      
      // Add transition class for smooth 1-second fade (except on initial load)
      // This creates a beautiful sunrise/sunset effect
      if (isInitialized) {
        root.classList.add('theme-transitioning')
      }
      
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      // Update color scheme and local storage
      root.style.colorScheme = theme
      localStorage.setItem('theme', theme)
      
      // Remove transition class after animation
      if (isInitialized) {
        setTimeout(() => {
          root.classList.remove('theme-transitioning')
        }, 300)
      }
    }
    
    /**
     * Schedule automatic theme updates throughout the day
     * Checks more frequently during twilight transitions
     * 
     * @param sunTimes - Calculated sunrise/sunset times for the day
     */
    function scheduleNextUpdate(sunTimes: ReturnType<typeof calculateSunTimes>) {
      // Clear any existing interval
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current)
      }
      
      // Check theme every minute
      // During dawn/dusk transitions, the theme will gradually change
      const checkTheme = () => {
        const now = new Date()
        const progress = getTransitionProgress(sunTimes, now)
        
        // Only update during active transition periods (10% to 90% progress)
        // This prevents unnecessary updates during full day/night
        if (progress > 0.1 && progress < 0.9) {
          const theme = getThemeFromSunTimes(sunTimes, now)
          applyTheme(theme)
        }
      }
      
      // Set up interval
      updateIntervalRef.current = setInterval(checkTheme, 60000) // Check every minute
      
      // Also check immediately
      checkTheme()
    }
    
    /**
     * Request precise geolocation in the background
     * This improves accuracy from city-level to exact location
     * Happens silently after initial page load
     */
    async function requestPreciseLocationInBackground() {
      // Respect user's previous denial
      const permission = localStorage.getItem('geoPermission')
      if (permission === 'denied') return
      
      // Wait 3 seconds to avoid interrupting initial page experience
      setTimeout(async () => {
        if (!isMounted) return
        
        try {
          // This will trigger permission prompt if needed
          const result = await getUserCoordinates()
          if (result.source === 'precise') {
            // Recalculate with precise coordinates
            const sunTimes = calculateSunTimes(result.coordinates)
            cacheSunTimes(sunTimes, result.coordinates)
            
            const theme = getThemeFromSunTimes(sunTimes)
            applyTheme(theme)
            scheduleNextUpdate(sunTimes)
          }
        } catch {
          // Silent fail
        }
      }, 3000) // Wait 3 seconds after page load
    }
    
    initializeTheme()
    
    return () => {
      isMounted = false
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current)
      }
    }
  }, [isInitialized])
  
  return <>{children}</>
}
