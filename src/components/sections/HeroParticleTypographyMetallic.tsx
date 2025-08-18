"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface Particle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  size: number
  metalness: number // For metallic gradient effect
  baseHue: number // Base hue for metallic color
  opacity: number
  distance: number // Distance from mouse
}

export function HeroParticleTypographyMetallic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 }) // Start off-screen
  const [currentText, setCurrentText] = useState('TYLER SCHMIDT')
  const [isLoading, setIsLoading] = useState(true)
  
  // Optimized particle generation with metallic colors
  const generateTextParticles = useCallback((text: string) => {
    if (!canvasRef.current) return []
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return []
    
    // Clear canvas
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Set up text with optimized font
    const fontSize = Math.min(canvas.width / 10, 100)
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    const textX = canvas.width / 2
    const textY = canvas.height / 2
    
    // Draw text to get pixel data
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(text, textX, textY)
    
    // Get pixel data with reduced resolution for performance
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    
    const particles: Particle[] = []
    const spacing = 4 // Increased spacing for fewer particles (better performance)
    
    // Metallic color palette (silver to gold gradient)
    const metallicHues = [220, 45, 30] // Blue-silver, Gold, Copper
    
    for (let y = 0; y < canvas.height; y += spacing) {
      for (let x = 0; x < canvas.width; x += spacing) {
        const index = (y * canvas.width + x) * 4
        const alpha = pixels[index + 3]
        
        if (alpha > 200) { // Higher threshold for cleaner text
          const hueIndex = Math.floor(Math.random() * metallicHues.length)
          particles.push({
            id: `${x}-${y}`,
            x: textX + (Math.random() - 0.5) * canvas.width, // Start from center
            y: textY + (Math.random() - 0.5) * canvas.height,
            vx: 0,
            vy: 0,
            targetX: x,
            targetY: y,
            size: 2.5,
            metalness: 0.8 + Math.random() * 0.2, // High metalness for shiny effect
            baseHue: metallicHues[hueIndex],
            opacity: 0.9,
            distance: 0
          })
        }
      }
    }
    
    // Clear canvas for animation
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    return particles
  }, [])
  
  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    // Use device pixel ratio for sharp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2 for performance
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
    
    particlesRef.current = generateTextParticles(currentText)
    setIsLoading(false)
    
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
      
      particlesRef.current = generateTextParticles(currentText)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentText, generateTextParticles])
  
  // Optimized mouse tracking with throttling
  useEffect(() => {
    let lastTime = 0
    const throttleMs = 16 // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime >= throttleMs) {
        mouseRef.current = { x: e.clientX, y: e.clientY }
        lastTime = now
      }
    }
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  
  // Optimized animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !ctx) return
    
    // Pre-create gradient for metallic effect
    const createMetallicGradient = (x: number, y: number, hue: number, metalness: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3)
      
      // Metallic color with highlights
      const saturation = 20 + metalness * 30 // Lower saturation for metallic look
      const lightness1 = 70 + metalness * 20
      const lightness2 = 40 + metalness * 10
      
      gradient.addColorStop(0, `hsl(${hue}, ${saturation}%, ${lightness1}%)`)
      gradient.addColorStop(0.5, `hsl(${hue}, ${saturation}%, ${lightness2}%)`)
      gradient.addColorStop(1, `hsl(${hue}, ${saturation - 10}%, ${lightness2 - 10}%)`)
      
      return gradient
    }
    
    const animate = () => {
      // Clear with subtle fade for smooth trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const mouse = mouseRef.current
      const particles = particlesRef.current
      
      // Update and draw particles
      particles.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        particle.distance = Math.sqrt(dx * dx + dy * dy)
        
        // Smooth magnetic effect
        const magneticRadius = 150
        const magneticStrength = 0.3
        
        if (particle.distance < magneticRadius && particle.distance > 0) {
          // Smooth repulsion with easing
          const force = Math.pow(1 - particle.distance / magneticRadius, 2) * magneticStrength
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force
          particle.vy -= Math.sin(angle) * force
        }
        
        // Smooth return to target position
        const returnForce = 0.08 // Increased for snappier response
        const dtx = particle.targetX - particle.x
        const dty = particle.targetY - particle.y
        
        particle.vx += dtx * returnForce
        particle.vy += dty * returnForce
        
        // Apply velocity with improved damping
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Smooth damping for natural motion
        particle.vx *= 0.88
        particle.vy *= 0.88
        
        // Dynamic opacity based on distance
        const targetOpacity = particle.distance < magneticRadius ? 0.6 : 0.9
        particle.opacity += (targetOpacity - particle.opacity) * 0.1
        
        // Draw particle with metallic gradient
        ctx.save()
        ctx.globalAlpha = particle.opacity
        
        // Create metallic gradient
        const gradient = createMetallicGradient(
          particle.x,
          particle.y,
          particle.baseHue,
          particle.metalness
        )
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add subtle glow for metallic shine
        if (particle.distance < magneticRadius) {
          ctx.globalAlpha = particle.opacity * 0.3
          ctx.shadowBlur = 10
          ctx.shadowColor = `hsl(${particle.baseHue}, 50%, 70%)`
          ctx.fill()
        }
        
        ctx.restore()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  const handleTextChange = (newText: string) => {
    setCurrentText(newText)
    particlesRef.current = generateTextParticles(newText)
  }
  
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
      
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}
      />
      
      {/* UI Overlay */}
      <Container className="relative z-10 h-full flex flex-col justify-between py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-gray-400 mb-4">
            Metallic Particle Typography
          </p>
          
          {/* Text options */}
          <div className="flex justify-center gap-2 mb-4">
            {['TYLER SCHMIDT', 'DESIGNER', 'ENGINEER', 'CREATIVE'].map((text) => (
              <button
                key={text}
                onClick={() => handleTextChange(text)}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  currentText === text
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500">
            Move your cursor near the text • {particlesRef.current.length} particles
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
