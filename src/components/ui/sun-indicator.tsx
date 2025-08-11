"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCachedSunTimes } from '@/lib/sun-calc'

export function SunIndicator() {
  const [isVisible, setIsVisible] = useState(false)
  const [sunInfo, setSunInfo] = useState<{ sunrise: string; sunset: string } | null>(null)
  
  useEffect(() => {
    // Show indicator briefly on load to inform users
    const cached = getCachedSunTimes()
    if (cached) {
      const sunrise = cached.sunTimes.sunrise.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      const sunset = cached.sunTimes.sunset.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      setSunInfo({ sunrise, sunset })
      
      // Show for 3 seconds on first visit
      const hasSeenIndicator = localStorage.getItem('hasSeenSunIndicator')
      if (!hasSeenIndicator) {
        setIsVisible(true)
        localStorage.setItem('hasSeenSunIndicator', 'true')
        setTimeout(() => setIsVisible(false), 3000)
      }
    }
  }, [])
  
  return (
    <AnimatePresence>
      {isVisible && sunInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              {/* Sun/Moon icon that follows actual position */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={new Date().getHours() >= 6 && new Date().getHours() < 18
                      ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    }
                  />
                </svg>
              </motion.div>
            </div>
            <div className="text-sm">
              <p className="font-medium text-foreground">Theme follows the sun</p>
              <p className="text-foreground/60 text-xs">
                {sunInfo.sunrise} - {sunInfo.sunset}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
