"use client"

import { useEffect, useRef, useState } from 'react'
import { getUserCoordinates } from '@/lib/geolocation'
import { calculateSunTimes, getThemeFromSunTimes, getCachedSunTimes, cacheSunTimes, getTransitionProgress } from '@/lib/sun-calc'

export function SunThemeProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    let isMounted = true
    
    async function initializeTheme() {
      try {
        // First, apply any cached theme immediately to prevent flash
        const cachedTheme = localStorage.getItem('theme')
        if (cachedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        }
        
        // Check for cached sun times
        const cached = getCachedSunTimes()
        if (cached) {
          const theme = getThemeFromSunTimes(cached.sunTimes)
          applyTheme(theme)
          scheduleNextUpdate(cached.sunTimes)
          if (isMounted) setIsInitialized(true)
          return
        }
        
        // Get user coordinates (hybrid approach)
        const geoResult = await getUserCoordinates()
        const sunTimes = calculateSunTimes(geoResult.coordinates)
        
        // Cache the results
        cacheSunTimes(sunTimes, geoResult.coordinates)
        
        // Apply theme based on current sun position
        const theme = getThemeFromSunTimes(sunTimes)
        applyTheme(theme)
        
        // Schedule next theme update
        scheduleNextUpdate(sunTimes)
        
        // If we only have IP/timezone coords, try to get precise location in background
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
    
    function applyTheme(theme: 'light' | 'dark') {
      const root = document.documentElement
      
      // Add transition class for smooth changes (except on initial load)
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
    
    function scheduleNextUpdate(sunTimes: ReturnType<typeof calculateSunTimes>) {
      // Clear any existing interval
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current)
      }
      
      // Check theme every minute during transition periods
      const checkTheme = () => {
        const now = new Date()
        const progress = getTransitionProgress(sunTimes, now)
        
        // During transitions (dawn/dusk), check more frequently
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
    
    async function requestPreciseLocationInBackground() {
      // Only try if we haven't been denied
      const permission = localStorage.getItem('geoPermission')
      if (permission === 'denied') return
      
      // Wait a bit before asking for precise location
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
