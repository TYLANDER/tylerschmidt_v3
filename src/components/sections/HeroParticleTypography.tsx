"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface Particle {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  size: number
  hue: number
}

export function HeroParticleTypography() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [currentText] = useState('Tyler Schmidt')
  const [isExploded, setIsExploded] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isMobile, setIsMobile] = useState(false)
  
  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    }
    
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])
  
  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateParticles()
    }
    
    const generateParticles = () => {
      // Create temporary canvas to render text
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return
      
      // Configure text
      const fontSize = Math.min(canvas.width / 8, 150)
      tempCtx.font = `900 ${fontSize}px Arial, sans-serif`
      tempCtx.textAlign = 'center'
      tempCtx.textBaseline = 'middle'
      // Always use white text for detection
      tempCtx.fillStyle = 'white'
      
      // Draw text
      const centerX = tempCanvas.width / 2
      const centerY = tempCanvas.height / 2
      tempCtx.fillText(currentText, centerX, centerY)
      
      // Get pixel data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
      const pixels = imageData.data
      
      // Create particles with higher density
      const newParticles: Particle[] = []
      const gap = 3 // Reduced gap for more particles
      
      for (let y = 0; y < tempCanvas.height; y += gap) {
        for (let x = 0; x < tempCanvas.width; x += gap) {
          const index = (y * tempCanvas.width + x) * 4
          
          // Check if pixel is white (text)
          if (pixels[index] > 200) {
            newParticles.push({
              x: x,
              y: y,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              size: 1.5, // Smaller particles for smoother appearance
              hue: 0
            })
          }
        }
      }
      
      particlesRef.current = newParticles
      console.log(`Created ${newParticles.length} particles`)
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentText])
  
  // Mouse and touch tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    
    // Touch handlers for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        mouseRef.current = { x: touch.clientX, y: touch.clientY }
      }
    }
    
    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const animate = () => {
      // Clear canvas with theme-appropriate background
      const bgColor = theme === 'light' ? '#ffffff' : '#000000'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const mouse = mouseRef.current
      const particles = particlesRef.current
      
      // Update and draw particles
      particles.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Mouse interaction with larger radius and stronger force
        const interactionRadius = 150
        if (distance < interactionRadius) {
          const force = Math.pow((interactionRadius - distance) / interactionRadius, 2)
          const angle = Math.atan2(dy, dx)
          
          // Push particles away with stronger force
          particle.vx -= Math.cos(angle) * force * 8
          particle.vy -= Math.sin(angle) * force * 8
          
          // Add some perpendicular force for swirl effect
          const perpAngle = angle + Math.PI / 2
          particle.vx += Math.cos(perpAngle) * force * 2
          particle.vy += Math.sin(perpAngle) * force * 2
          
          // Set hue to maximum for strong RGB effect
          particle.hue = 360 * force // More intense color based on proximity
        } else {
          particle.hue *= 0.92 // Slower fade for lingering effect
        }
        
        // Explode effect
        if (isExploded) {
          particle.vx += (Math.random() - 0.5) * 20
          particle.vy += (Math.random() - 0.5) * 20
        }
        
        // Return to original position with adjusted force
        const returnForce = isExploded ? 0.02 : 0.08
        const returnX = (particle.targetX - particle.x) * returnForce
        const returnY = (particle.targetY - particle.y) * returnForce
        
        particle.vx += returnX
        particle.vy += returnY
        
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Damping - less damping for more fluid motion
        particle.vx *= 0.88
        particle.vy *= 0.88
        
        // Draw particle with enhanced RGB effect
        if (particle.hue > 1) {
          // RGB chromatic aberration effect - always active when hue is set
          ctx.globalCompositeOperation = 'lighter' // Changed to 'lighter' for more vibrant colors
          
          // Calculate offset based on distance, particle velocity, and hue intensity
          const velocityFactor = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy) * 0.3
          const hueFactor = particle.hue / 360
          const offset = (velocityFactor + hueFactor * 6)
          
          // Calculate angle for directional RGB split
          const velocityAngle = Math.atan2(particle.vy, particle.vx)
          
          // Draw RGB channels with directional offset
          ctx.save()
          
          // Red channel - offset in velocity direction
          ctx.fillStyle = `rgba(255, 0, 0, ${0.6 + hueFactor * 0.4})`
          ctx.beginPath()
          ctx.arc(
            particle.x - Math.cos(velocityAngle) * offset,
            particle.y - Math.sin(velocityAngle) * offset,
            particle.size * (1 + hueFactor * 0.3),
            0, Math.PI * 2
          )
          ctx.fill()
          
          // Green channel - perpendicular offset
          ctx.fillStyle = `rgba(0, 255, 0, ${0.6 + hueFactor * 0.4})`
          ctx.beginPath()
          ctx.arc(
            particle.x + Math.cos(velocityAngle + Math.PI/2) * offset * 0.7,
            particle.y + Math.sin(velocityAngle + Math.PI/2) * offset * 0.7,
            particle.size * (1 + hueFactor * 0.3),
            0, Math.PI * 2
          )
          ctx.fill()
          
          // Blue channel - opposite offset
          ctx.fillStyle = `rgba(0, 0, 255, ${0.6 + hueFactor * 0.4})`
          ctx.beginPath()
          ctx.arc(
            particle.x + Math.cos(velocityAngle) * offset,
            particle.y + Math.sin(velocityAngle) * offset,
            particle.size * (1 + hueFactor * 0.3),
            0, Math.PI * 2
          )
          ctx.fill()
          
          // Add core for brightness - theme appropriate
          if (hueFactor > 0.5) {
            ctx.globalCompositeOperation = 'lighter'
            // Use dark core in light mode, light core in dark mode
            const coreColor = theme === 'light' ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, '
            ctx.fillStyle = `${coreColor}${hueFactor * 0.3})`
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
            ctx.fill()
          }
          
          ctx.restore()
          ctx.globalCompositeOperation = 'source-over'
        } else {
          // Theme-appropriate solid color (no gradient for cleaner look)
          if (theme === 'light') {
            ctx.fillStyle = '#000000'
          } else {
            ctx.fillStyle = '#cccccc'
          }
          
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isExploded, theme])
  
  // Mobile detection and motion handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Device motion handling for mobile
    const handleMotion = (event: DeviceMotionEvent) => {
      if (!isMobile || !event.acceleration) return
      
      const { x, y } = event.acceleration
      if (x !== null && y !== null) {
        // Trigger particle movement based on device motion
        const particles = particlesRef.current
        particles.forEach(particle => {
          particle.vx += x * 0.5
          particle.vy += y * 0.5
        })
        
        // Trigger haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(10)
        }
      }
    }
    
    if (isMobile && 'DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleMotion)
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [isMobile])
  
  // Remove text rotation - keep static "Tyler Schmidt"
  
  const handleExplode = () => {
    setIsExploded(true)
    // Reset after 2 seconds
    setTimeout(() => {
      setIsExploded(false)
    }, 2000)
  }
  
  return (
    <section className="relative h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-white dark:bg-black"
      />
      
      <Container className="relative z-10 h-full flex items-end pb-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={handleExplode}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-80 transition-opacity pointer-events-auto"
            disabled={isExploded}
          >
            {isExploded ? 'Exploding...' : 'Explode'}
          </button>
        </motion.div>
      </Container>
    </section>
  )
}
