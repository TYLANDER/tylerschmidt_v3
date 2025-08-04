"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface MetallicTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function MetallicText({ text, className, as: Component = "h1" }: MetallicTextProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    // Create metallic shine animation using CSS custom properties
    let animationId: number

    const animate = () => {
      const time = Date.now() * 0.001
      
      // Create shifting metallic gradients
      const hue1 = 200 + Math.sin(time * 0.5) * 20
      const hue2 = 220 + Math.cos(time * 0.3) * 30
      const hue3 = 240 + Math.sin(time * 0.7) * 25
      
      // Create dynamic metallic shine positions
      const shinePos1 = 50 + Math.sin(time * 0.8) * 30
      const shinePos2 = 50 + Math.cos(time * 0.6) * 40
      
      // Apply the metallic gradient with shifting highlights
      const gradient = `
        linear-gradient(
          135deg,
          hsl(${hue1}, 10%, 85%) 0%,
          hsl(${hue2}, 15%, 95%) ${shinePos1}%,
          hsl(${hue3}, 8%, 75%) ${shinePos2}%,
          hsl(${hue1}, 12%, 90%) 100%
        )
      `
      
      element.style.setProperty('--metallic-gradient', gradient)
      
      // Add subtle text shadow that moves
      const shadowX = Math.sin(time * 0.4) * 2
      const shadowY = Math.cos(time * 0.6) * 2
      const shadowBlur = 20 + Math.sin(time * 0.5) * 10
      
      element.style.textShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.3),
        0 0 40px rgba(255, 255, 255, 0.2),
        0 0 80px rgba(255, 255, 255, 0.1)
      `
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <Component
      ref={textRef as any}
      className={cn(
        "relative font-bold tracking-tight",
        "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-transparent",
        // Add metallic CSS variables and animations
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700",
        // Add reflection effect
        "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
        "after:translate-x-[-100%] after:skew-x-[-15deg] after:animate-[shimmer_3s_ease-in-out_infinite]",
        className
      )}
      style={{
        background: 'var(--metallic-gradient, linear-gradient(135deg, #e5e5e5, #f5f5f5, #d4d4d8))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
      }}
    >
      {text}
      
      {/* Add shimmer effect overlay */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          animation: 'shimmer 2s ease-in-out infinite',
        }}
      />
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          50% { transform: translateX(0%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
      `}</style>
    </Component>
  )
}