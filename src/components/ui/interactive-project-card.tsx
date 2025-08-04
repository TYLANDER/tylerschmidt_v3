"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

interface InteractiveProjectCardProps {
  title: string
  description: string
  role: string
  company: string
  year: string
  gradient: string
  index: number
}

export function InteractiveProjectCard({
  title,
  description,
  role,
  company,
  year,
  gradient,
  index,
}: InteractiveProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const card = cardRef.current
    if (!canvas || !card) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      const rect = card.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      ctx.scale(2, 2)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    const animate = () => {
      const rect = card.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      if (isHovered) {
        // Create dynamic particle effect
        const time = Date.now() * 0.002
        const particleCount = 20

        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + time
          const radius = 30 + Math.sin(time + i) * 20
          const x = mouseRef.current.x * rect.width + Math.cos(angle) * radius
          const y = mouseRef.current.y * rect.height + Math.sin(angle) * radius

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15)
          gradient.addColorStop(0, `rgba(255, 0, 128, ${0.8 - i * 0.04})`)
          gradient.addColorStop(1, "rgba(255, 0, 128, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, 15, 0, Math.PI * 2)
          ctx.fill()
        }

        // Add grid distortion effect
        ctx.strokeStyle = "rgba(0, 255, 255, 0.3)"
        ctx.lineWidth = 1
        const gridSize = 20

        for (let x = 0; x < rect.width; x += gridSize) {
          ctx.beginPath()
          for (let y = 0; y < rect.height; y += 2) {
            const distortion = Math.sin((x + y + time * 50) * 0.02) * 3
            const mouseDistance = Math.sqrt(
              Math.pow(x - mouseRef.current.x * rect.width, 2) +
                Math.pow(y - mouseRef.current.y * rect.height, 2)
            )
            const influence = Math.max(0, 1 - mouseDistance / 100)
            const finalX = x + distortion * influence

            if (y === 0) ctx.moveTo(finalX, y)
            else ctx.lineTo(finalX, y)
          }
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    card.addEventListener("mousemove", handleMouseMove)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      card.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  return (
    <div
      style={{ animationDelay: `${index * 0.1}s` }}
      className="group relative"
    >
      <Link href="/work" className="block">
        <div
          ref={cardRef}
          className="kinetic-hover disruptive-overlay relative cursor-pointer transition-all duration-500 hover:scale-[1.02]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Interactive Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-10 rounded-lg"
            style={{ mixBlendMode: "screen" }}
          />

          {/* Media Area */}
          <div
            className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${gradient} border-border/50 dazzle-pattern relative overflow-hidden border transition-all duration-300`}
          >
            {/* RGB gradient overlay on hover */}
            <div className="rgb-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />

            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  background: `
                    linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%),
                    linear-gradient(-45deg, transparent 30%, rgba(0,255,255,0.1) 50%, transparent 70%)
                  `,
                  backgroundSize: "60px 60px",
                  animation: isHovered ? "dazzle-shift 2s ease-in-out infinite" : "none",
                }}
              />
            </div>

            {/* Project initial placeholder */}
            <div
              className="glitch-text data-viz flex h-full w-full items-center justify-center relative z-10"
              data-text={title[0]}
            >
              <span className="text-foreground/80 text-6xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
                {title[0]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 pt-4">
            <div className="space-y-1">
              <h3
                className="glitch-hover rgb-text group-hover:rgb-text text-xl font-bold transition-all duration-300 group-hover:scale-105"
                data-text={title}
              >
                {title}
              </h3>
              <div className="text-accent bg-accent/20 border-accent/30 inline-block rounded-full border px-2 py-1 text-xs font-medium transition-all duration-300 group-hover:bg-accent/30 group-hover:border-accent/50">
                {role} at {company}
              </div>
            </div>

            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
              {description}
            </p>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                {year}
              </span>
              <span
                className="hover:text-accent kinetic-hover glitch-hover text-accent transition-all duration-300 group-hover:translate-x-1"
                data-text="View →"
              >
                View →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}