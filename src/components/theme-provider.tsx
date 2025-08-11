"use client"

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark')
    }
    
    // Prevent flash of unstyled content
    document.documentElement.style.colorScheme = savedTheme || (systemDark ? 'dark' : 'light')
  }, [])

  return <>{children}</>
}
