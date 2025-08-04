"use client"

import { useEffect, useState } from "react"
import { throttle } from "@/lib/utils"

interface ScrollPosition {
  x: number
  y: number
}

interface ScrollDirection {
  x: "left" | "right" | null
  y: "up" | "down" | null
}

interface ScrollProgress {
  vertical: number
  horizontal: number
}

export function useScroll() {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 })
  const [direction, setDirection] = useState<ScrollDirection>({
    x: null,
    y: null,
  })
  const [progress, setProgress] = useState<ScrollProgress>({
    vertical: 0,
    horizontal: 0,
  })
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let previousPosition = { x: 0, y: 0 }
    let scrollTimeout: NodeJS.Timeout

    const updateScroll = throttle(() => {
      const currentPosition = {
        x: window.scrollX,
        y: window.scrollY,
      }

      // Update direction
      const newDirection: ScrollDirection = {
        x:
          currentPosition.x > previousPosition.x
            ? "right"
            : currentPosition.x < previousPosition.x
              ? "left"
              : null,
        y:
          currentPosition.y > previousPosition.y
            ? "down"
            : currentPosition.y < previousPosition.y
              ? "up"
              : null,
      }

      // Calculate progress
      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight
      const maxScrollX =
        document.documentElement.scrollWidth - window.innerWidth

      const verticalProgress =
        maxScrollY > 0 ? currentPosition.y / maxScrollY : 0
      const horizontalProgress =
        maxScrollX > 0 ? currentPosition.x / maxScrollX : 0

      setPosition(currentPosition)
      setDirection(newDirection)
      setProgress({
        vertical: Math.min(Math.max(verticalProgress, 0), 1),
        horizontal: Math.min(Math.max(horizontalProgress, 0), 1),
      })
      setIsScrolling(true)

      // Clear previous timeout and set new one
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      previousPosition = currentPosition
    }, 16) // ~60fps

    window.addEventListener("scroll", updateScroll, { passive: true })
    window.addEventListener("resize", updateScroll, { passive: true })

    // Initial call
    updateScroll()

    return () => {
      window.removeEventListener("scroll", updateScroll)
      window.removeEventListener("resize", updateScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return {
    position,
    direction,
    progress,
    isScrolling,
  }
}

export function useScrollToTop() {
  const scrollToTop = (smooth = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "instant",
    })
  }

  return scrollToTop
}

export function useScrollIntoView() {
  const scrollIntoView = (
    elementId: string,
    options: ScrollIntoViewOptions = { behavior: "smooth", block: "start" }
  ) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView(options)
    }
  }

  return scrollIntoView
}
