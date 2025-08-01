"use client"

import { useEffect } from "react"
import Lenis from "lenis"

interface SmoothScrollWrapperProps {
  children: React.ReactNode
}

export function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
} 