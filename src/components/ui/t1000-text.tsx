"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface T1000TextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function T1000Text({ text, className, as: Component = "h1" }: T1000TextProps) {
  const textRef = useRef<HTMLElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    const ripple = rippleRef.current
    if (!element || !ripple) return

    let animationId: number
    let mouseX = 0
    let mouseY = 0
    let isHovered = false

    const animate = () => {
      const time = Date.now() * 0.001
      
      // Primary liquid chrome gradient that shifts
      const hue1 = 200 + Math.sin(time * 0.3) * 15
      const hue2 = 220 + Math.cos(time * 0.2) * 20
      const hue3 = 240 + Math.sin(time * 0.4) * 10
      
      // Chrome reflection sweep
      const sweepPos1 = 30 + Math.sin(time * 0.8) * 40
      const sweepPos2 = 70 + Math.cos(time * 0.6) * 30
      
      // T1000 liquid metal gradient with chrome reflections
      const gradient = `
        linear-gradient(
          135deg,
          hsl(${hue1}, 5%, 75%) 0%,
          hsl(0, 0%, 95%) ${sweepPos1}%,
          hsl(${hue2}, 8%, 85%) ${sweepPos2}%,
          hsl(${hue3}, 3%, 70%) 100%
        )
      `
      
      element.style.setProperty('--t1000-gradient', gradient)
      
      // Liquid metal ripple effect
      const rippleIntensity = isHovered ? 0.8 : 0.3
      const rippleX = isHovered ? mouseX : 50 + Math.sin(time * 0.5) * 20
      const rippleY = isHovered ? mouseY : 50 + Math.cos(time * 0.7) * 15
      
      ripple.style.background = `
        radial-gradient(
          circle at ${rippleX}% ${rippleY}%,
          rgba(255, 255, 255, ${rippleIntensity}) 0%,
          rgba(255, 255, 255, ${rippleIntensity * 0.5}) 30%,
          transparent 60%
        )
      `
      
      // Chrome-like text shadow that follows mouse
      const shadowX = isHovered ? (mouseX - 50) * 0.1 : Math.sin(time * 0.3) * 2
      const shadowY = isHovered ? (mouseY - 50) * 0.1 : Math.cos(time * 0.4) * 2
      const shadowBlur = 30 + Math.sin(time * 0.6) * 10
      
      element.style.textShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.4),
        0 0 60px rgba(200, 200, 255, 0.3),
        0 0 120px rgba(180, 180, 255, 0.2)
      `
      
      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) * 100
      mouseY = ((e.clientY - rect.top) / rect.height) * 100
    }

    const handleMouseEnter = () => {
      isHovered = true
    }

    const handleMouseLeave = () => {
      isHovered = false
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Component
      ref={(el) => {
        textRef.current = (el as unknown as HTMLElement) || null
      }}
      className={cn(
        "relative font-bold tracking-tight select-none cursor-pointer",
        "transform-gpu will-change-transform",
        className
      )}
      style={{
        background: 'var(--t1000-gradient, linear-gradient(135deg, #c0c0c0, #e8e8e8, #b8b8b8))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))',
        fontWeight: 900,
        letterSpacing: '-0.02em',
      }}
    >
      {text}
      
      {/* Liquid metal ripple overlay */}
      <div
        ref={rippleRef}
        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
          maskImage: 'linear-gradient(to right, black, black)',
          WebkitMaskImage: 'linear-gradient(to right, black, black)',
          animation: 'ripple 3s ease-in-out infinite',
        }}
      />
      
      {/* Chrome highlight sweep */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
          transform: 'skewX(-15deg)',
          animation: 'chrome-sweep 4s ease-in-out infinite',
          maskImage: 'linear-gradient(to right, black, black)',
          WebkitMaskImage: 'linear-gradient(to right, black, black)',
        }}
      />
      
      <style jsx>{`
        @keyframes ripple {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.05) rotate(1deg);
            opacity: 0.8;
          }
        }
        
        @keyframes chrome-sweep {
          0% { 
            transform: translateX(-200%) skewX(-15deg);
          }
          50% { 
            transform: translateX(0%) skewX(-15deg);
          }
          100% { 
            transform: translateX(200%) skewX(-15deg);
          }
        }
      `}</style>
    </Component>
  )
}