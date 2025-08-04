"use client"

import { useEffect, useRef, useState } from "react"

interface StatProps {
  value: string
  label: string
  index: number
}

function InteractiveStat({ value, label, index }: StatProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const statRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Extract numeric value for counting animation
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0
  const suffix = value.replace(/\d/g, "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (statRef.current) {
      observer.observe(statRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Counting animation
    const duration = 2000 + index * 200 // Stagger the animations
    const increment = numericValue / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, numericValue, index])

  useEffect(() => {
    const canvas = canvasRef.current
    const stat = statRef.current
    if (!canvas || !stat || !isVisible) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      const rect = stat.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      ctx.scale(2, 2)
    }

    const animate = () => {
      const rect = stat.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Create floating particles
      const time = Date.now() * 0.001
      const particleCount = 8

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time * 0.5
        const radius = 40 + Math.sin(time + i) * 15
        const x = rect.width / 2 + Math.cos(angle) * radius
        const y = rect.height / 2 + Math.sin(angle) * radius

        const size = 2 + Math.sin(time * 2 + i) * 1
        const alpha = 0.6 + Math.sin(time * 3 + i) * 0.3

        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Add connecting lines
        if (i > 0) {
          const prevAngle = ((i - 1) / particleCount) * Math.PI * 2 + time * 0.5
          const prevX = rect.width / 2 + Math.cos(prevAngle) * radius
          const prevY = rect.height / 2 + Math.sin(prevAngle) * radius

          ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.3})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible])

  return (
    <div
      ref={statRef}
      className="kinetic-hover data-viz text-center relative group"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ mixBlendMode: "screen" }}
      />

      <div
        className={`text-accent mb-2 text-3xl font-bold md:text-4xl transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {count}
        {suffix}
      </div>
      <div
        className={`text-muted-foreground text-sm transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 0.1 + 0.3}s` }}
      >
        {label}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-accent/20 to-primary/20" />
    </div>
  )
}

export function InteractiveStats() {
  const stats = [
    { value: "50M+", label: "Users Impacted" },
    { value: "15%", label: "Avg Conversion Lift" },
    { value: "6+", label: "Years Experience" },
    { value: "200+", label: "Projects Delivered" },
  ]

  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((stat, index) => (
        <InteractiveStat
          key={stat.label}
          value={stat.value}
          label={stat.label}
          index={index}
        />
      ))}
    </div>
  )
}