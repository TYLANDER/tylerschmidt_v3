"use client"

import { useEffect, useRef, useState } from "react"

interface GradientPoint {
  x: number
  y: number
  color: string
  baseX: number
  baseY: number
}

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points, setPoints] = useState<GradientPoint[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  // Felipe Pantone inspired colors
  const colors = [
    "#ff0080", // Hot Pink
    "#0080ff", // Electric Blue
    "#80ff00", // Neon Green
    "#ff8000", // Orange
    "#8000ff", // Purple
    "#00ff80", // Cyan Green
    "#ff0040", // Red Pink
    "#4000ff", // Deep Purple
    "#00ffff", // Cyan
  ]

  useEffect(() => {
    // Initialize gradient points in a grid
    const gridPoints: GradientPoint[] = []
    const gridSize = 4

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const baseX = (j / (gridSize - 1)) * 100
        const baseY = (i / (gridSize - 1)) * 100

        gridPoints.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    setPoints(gridPoints)
  }, [colors])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update point positions based on mouse influence
      const updatedPoints = points.map((point) => {
        const mouseX = mouseRef.current.x
        const mouseY = mouseRef.current.y

        // Calculate distance from mouse to point
        const dx = mouseX - point.baseX
        const dy = mouseY - point.baseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Influence radius
        const maxInfluence = 30
        const influence = Math.max(0, 1 - distance / maxInfluence)

        // Warp point position based on mouse proximity
        const warpStrength = 15
        const newX = point.baseX + dx * influence * warpStrength * 0.01
        const newY = point.baseY + dy * influence * warpStrength * 0.01

        return {
          ...point,
          x: newX,
          y: newY,
        }
      })

      // Create mesh gradient
      if (updatedPoints.length >= 4) {
        // Draw gradient mesh using radial gradients
        updatedPoints.forEach((point) => {
          const gradient = ctx.createRadialGradient(
            (point.x * canvas.offsetWidth) / 100,
            (point.y * canvas.offsetHeight) / 100,
            0,
            (point.x * canvas.offsetWidth) / 100,
            (point.y * canvas.offsetHeight) / 100,
            Math.max(canvas.offsetWidth, canvas.offsetHeight) * 0.6
          )

          gradient.addColorStop(0, point.color + "80") // 50% opacity
          gradient.addColorStop(1, point.color + "00") // 0% opacity

          ctx.globalCompositeOperation = "screen"
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)

    if (points.length > 0) {
      animate()
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [points])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-30"
      style={{
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle at 30% 20%, rgba(255, 0, 128, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0, 128, 255, 0.1) 0%, transparent 50%)",
      }}
    />
  )
}
