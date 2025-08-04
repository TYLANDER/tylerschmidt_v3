"use client"

import { useEffect, useState, useRef } from "react"
import { throttle } from "@/lib/utils"

interface MousePosition {
  x: number
  y: number
}

interface MouseVelocity {
  x: number
  y: number
  magnitude: number
}

export function useMouse() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState<MouseVelocity>({
    x: 0,
    y: 0,
    magnitude: 0,
  })
  const [isMoving, setIsMoving] = useState(false)

  const previousPosition = useRef<MousePosition>({ x: 0, y: 0 })
  const previousTime = useRef<number>(Date.now())

  useEffect(() => {
    let movingTimeout: NodeJS.Timeout

    const updateMouse = throttle((event: unknown) => {
      const mouseEvent = event as MouseEvent
      const currentTime = Date.now()
      const deltaTime = currentTime - previousTime.current

      const currentPosition = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
      }

      // Calculate velocity
      const deltaX = currentPosition.x - previousPosition.current.x
      const deltaY = currentPosition.y - previousPosition.current.y

      const velocityX = deltaTime > 0 ? deltaX / deltaTime : 0
      const velocityY = deltaTime > 0 ? deltaY / deltaTime : 0
      const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY)

      setPosition(currentPosition)
      setVelocity({ x: velocityX, y: velocityY, magnitude })
      setIsMoving(true)

      // Clear previous timeout and set new one
      clearTimeout(movingTimeout)
      movingTimeout = setTimeout(() => {
        setIsMoving(false)
        setVelocity({ x: 0, y: 0, magnitude: 0 })
      }, 100)

      previousPosition.current = currentPosition
      previousTime.current = currentTime
    }, 16) // ~60fps

    window.addEventListener("mousemove", updateMouse, { passive: true })

    return () => {
      window.removeEventListener("mousemove", updateMouse)
      clearTimeout(movingTimeout)
    }
  }, [])

  return {
    position,
    velocity,
    isMoving,
  }
}

export function useHover<T extends HTMLElement = HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    element.addEventListener("mouseenter", handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return [ref, isHovered] as const
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [callback])

  return ref
}
