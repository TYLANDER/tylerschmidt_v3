"use client"

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Terminal-style error */}
        <div className="font-mono text-left bg-primary/5 rounded-lg p-6 mb-8 border border-border">
          <p className="text-accent mb-2">&gt; ERROR 404: PAGE NOT FOUND</p>
          <p className="text-muted-foreground mb-2">&gt; Running diagnostic...</p>
          <p className="text-muted-foreground mb-2">&gt; ...</p>
          <p className="text-accent mb-2">&gt; Pia.exe has intercepted this request</p>
          <p className="text-muted-foreground mb-2">&gt; Reason: &ldquo;This page didn&apos;t meet royal standards&rdquo;</p>
          <p className="text-success">&gt; Suggestion: Return to /home for approved content</p>
        </div>

        {/* ASCII Pia */}
        <pre className="text-muted-foreground text-xs mb-8 font-mono">
{`
     /ᐠ –ꞈ –ᐟ\\
    /          \\
   │  ●    ●   │
   │      ω     │
    \\  ━━━━━  /
     ‾‾‾‾‾‾‾‾
    Pia is lost too
`}
        </pre>

        {/* Message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404: Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Pia searched everywhere.<br />
          Even under the couch.<br />
          Nothing.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Safety
          </Link>
          <button
            onClick={() => {
              console.log('🐕 Woof! You found me!')
              // Small easter egg animation
              const paw = document.createElement('div')
              paw.innerHTML = '🐾'
              paw.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                font-size: 100px;
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                transition: all 0.5s ease-out;
                pointer-events: none;
                z-index: 9999;
              `
              document.body.appendChild(paw)
              requestAnimationFrame(() => {
                paw.style.transform = 'translate(-50%, -50%) scale(1) rotate(360deg)'
                paw.style.opacity = '0'
              })
              setTimeout(() => paw.remove(), 500)
            }}
            className="px-6 py-3 border-2 border-border hover:border-accent text-foreground rounded-lg font-medium transition-colors"
          >
            Pet Pia
          </button>
        </div>

        {/* Hidden message */}
        <p className="text-xs text-muted-foreground/30 mt-12 font-mono">
          Quality Standards Not Met · Error Code: P14-N0T-F0UND
        </p>
      </div>
    </div>
  )
}
