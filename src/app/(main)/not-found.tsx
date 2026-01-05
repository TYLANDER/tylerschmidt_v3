"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* Terminal-style error */}
        <div className="mb-8 rounded-lg border border-border bg-primary/5 p-6 text-left font-mono">
          <p className="mb-2 text-accent">&gt; ERROR 404: PAGE NOT FOUND</p>
          <p className="mb-2 text-muted-foreground">
            &gt; Running diagnostic...
          </p>
          <p className="mb-2 text-muted-foreground">&gt; ...</p>
          <p className="mb-2 text-accent">
            &gt; Pia.exe has intercepted this request
          </p>
          <p className="mb-2 text-muted-foreground">
            &gt; Reason: &ldquo;This page didn&apos;t meet royal
            standards&rdquo;
          </p>
          <p className="text-success">
            &gt; Suggestion: Return to /home for approved content
          </p>
        </div>

        {/* ASCII Pia */}
        <pre className="mb-8 font-mono text-xs text-muted-foreground">
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
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          404: Page Not Found
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Pia searched everywhere.
          <br />
          Even under the couch.
          <br />
          Nothing.
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Safety
          </Link>
          <button
            onClick={() => {
              console.log("🐕 Woof! You found me!")
              // Small easter egg animation
              const paw = document.createElement("div")
              paw.innerHTML = "🐾"
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
                paw.style.transform =
                  "translate(-50%, -50%) scale(1) rotate(360deg)"
                paw.style.opacity = "0"
              })
              setTimeout(() => paw.remove(), 500)
            }}
            className="rounded-lg border-2 border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent"
          >
            Pet Pia
          </button>
        </div>

        {/* Hidden message */}
        <p className="mt-12 font-mono text-xs text-muted-foreground/30">
          Creative Standards Not Met · Error Code: P14-N0T-F0UND
        </p>
      </div>
    </div>
  )
}
