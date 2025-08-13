export function initPiaConsole() {
  // Only run in browser
  if (typeof window === 'undefined') return

  // Main console greeting
  console.log(
    `%c
    ╔═══════════════════════════════════════╗
    ║  PRECISION WITH PERSONALITY™          ║
    ║  Designed by Tyler Schmidt            ║
    ║  Creative direction by Pia            ║
    ╚═══════════════════════════════════════╝
    
         /ᐠ. ܁ .ᐟ\\  ♕
        └────────┘
      Creative Director
    `,
    'color: #0066ff; font-family: monospace; font-size: 14px; line-height: 1.2;'
  )

  // Add secret commands
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).piaStatus = () => {
    console.log('%c🐕 Pia is currently:', 'color: #ff00ff; font-size: 16px; font-weight: bold;')
    const activities = [
      'Reviewing creative concepts',
      'Testing aesthetic harmony',
      'Napping on the mood board',
      'Chasing inspiration',
      'Approving designs',
      'Playing with color palettes',
      'Directing from her bed'
    ]
    const activity = activities[Math.floor(Math.random() * activities.length)]
    console.log(`%c   ${activity}`, 'color: #00ff88; font-size: 14px;')
    return '✓ All systems operational'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).givePiaTreats = () => {
    console.log('%c🦴 Treats delivered!', 'color: #ffaa00; font-size: 18px; font-weight: bold;')
    console.log('%c   Pia is happy! (+100 creativity points)', 'color: #00ff88; font-size: 14px;')
    
    // Trigger a subtle animation on the page
    const paw = document.createElement('div')
    paw.innerHTML = '🐾'
    paw.style.cssText = `
      position: fixed;
      bottom: -50px;
      right: 20px;
      font-size: 30px;
      z-index: 9999;
      transition: all 2s ease-out;
      pointer-events: none;
    `
    document.body.appendChild(paw)
    
    requestAnimationFrame(() => {
      paw.style.bottom = '100px'
      paw.style.opacity = '0'
    })
    
    setTimeout(() => paw.remove(), 2000)
    
    return 'Woof! 🐕'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).piaApproved = () => {
    const approvals = [
      'This code passes the comfort test',
      'Interface is nap-worthy',
      'Would chase again 10/10',
      'Better than a tennis ball',
      'Royal seal of approval granted',
      'Meets princess standards'
    ]
    const approval = approvals[Math.floor(Math.random() * approvals.length)]
    console.log(
      `%c✓ PIA APPROVED: ${approval}`,
      'color: #00ff00; font-size: 16px; font-weight: bold; padding: 10px; border: 2px solid #00ff00; border-radius: 5px;'
    )
    return true
  }

  // Hidden Pia mode activation
  let piaSequence: string[] = []
  window.addEventListener('keydown', (e) => {
    piaSequence.push(e.key.toLowerCase())
    piaSequence = piaSequence.slice(-3)
    
    if (piaSequence.join('') === 'pia') {
      document.body.style.cursor = 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHRleHQgeD0iOCIgeT0iMjQiIGZvbnQtc2l6ZT0iMjQiPvCfkL48L3RleHQ+Cjwvc3ZnPg==), auto'
      console.log('%c🐕 PIA MODE ACTIVATED!', 'color: #ff00ff; font-size: 24px; font-weight: bold;')
      
      setTimeout(() => {
        document.body.style.cursor = ''
      }, 10000)
    }
  })

  // Log hiring message with Pia twist
  console.log(
    '%cInterested in working with us? Pia conducts all interviews.',
    'color: #666; font-style: italic; font-size: 12px; margin-top: 20px;'
  )
}
