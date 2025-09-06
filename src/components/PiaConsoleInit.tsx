"use client"

import { useEffect } from "react"
import { initPiaConsole } from "@/lib/pia-console"

export function PiaConsoleInit() {
  useEffect(() => {
    // Initialize Pia console features
    initPiaConsole()

    // Also add the commands to window immediately for testing
    if (typeof window !== "undefined") {
      console.log(
        "%c🐕 Pia console commands loaded! Try: piaStatus(), givePiaTreats(), piaApproved()",
        "color: #ff00ff; font-size: 14px;"
      )
    }
  }, [])

  return null
}
