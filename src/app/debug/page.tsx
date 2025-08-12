"use client"

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<string | null>(null)
  const [cssVars, setCssVars] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
    
    // Check current theme
    const html = document.documentElement
    setTheme(html.classList.contains('dark') ? 'dark' : 'light')
    
    // Get all CSS variables
    const styles = getComputedStyle(document.documentElement)
    const vars: Record<string, string> = {}
    
    // Get color variables
    const colorVars = [
      '--background', '--foreground', '--pure', '--void', '--voltage',
      '--danger', '--acid', '--plasma', '--steel', '--smoke', '--ghost'
    ]
    
    colorVars.forEach(varName => {
      vars[varName] = styles.getPropertyValue(varName).trim()
    })
    
    setCssVars(vars)
  }, [])

  if (!mounted) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Debug Page</h1>
      
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-2xl font-semibold mb-4">System Info</h2>
        <p>Current Theme: <strong>{theme}</strong></p>
        <p>Document Classes: <code>{typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</code></p>
      </div>

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-2xl font-semibold mb-4">CSS Variables</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(cssVars, null, 2)}
        </pre>
      </div>

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-2xl font-semibold mb-4">Color Tests</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-background border">
            <p>bg-background</p>
            <p className="text-xs opacity-50">Should be visible</p>
          </div>
          <div className="p-4 bg-foreground text-background">
            <p>bg-foreground</p>
            <p className="text-xs opacity-50">Inverted colors</p>
          </div>
          <div className="p-4 bg-pure text-void">
            <p>bg-pure (white)</p>
            <p className="text-xs opacity-50">Custom color</p>
          </div>
          <div className="p-4 bg-void text-pure">
            <p>bg-void (black)</p>
            <p className="text-xs opacity-50">Custom color</p>
          </div>
          <div className="p-4 bg-voltage text-white">
            <p>bg-voltage</p>
            <p className="text-xs opacity-50">Should be blue</p>
          </div>
          <div className="p-4 bg-danger text-white">
            <p>bg-danger</p>
            <p className="text-xs opacity-50">Should be red</p>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-2xl font-semibold mb-4">Content Visibility Test</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white text-black border">
            <p>Hardcoded: bg-white text-black</p>
          </div>
          <div className="p-4 bg-black text-white">
            <p>Hardcoded: bg-black text-white</p>
          </div>
          <div className="p-4" style={{ backgroundColor: 'white', color: 'black' }}>
            <p>Inline style: white bg, black text</p>
          </div>
          <div className="p-4" style={{ backgroundColor: 'var(--pure)', color: 'var(--void)' }}>
            <p>CSS var style: var(--pure) bg, var(--void) text</p>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-2xl font-semibold mb-4">Hero Component Test</h2>
        <div className="relative h-64 bg-pure dark:bg-void border">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-void dark:text-pure">
                TYLER SCHMIDT
              </h3>
              <p className="text-steel dark:text-smoke">
                If you can see this, the colors are working
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
