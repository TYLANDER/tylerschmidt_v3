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
  baseColor: { r: number; g: number; b: number }
  currentColor: { r: number; g: number; b: number }
  opacity: number
  distance: number
  warpOffset: { x: number; y: number }
}

export function HeroParticleTypographyRGB() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [currentText, setCurrentText] = useState('TYLER SCHMIDT')
  const [isLoading, setIsLoading] = useState(true)
  
  // Generate particles with RGB base colors
  const generateTextParticles = useCallback((text: string) => {
    if (!canvasRef.current) return []
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return []
    
    // Create offscreen canvas for text rendering
    const offCanvas = document.createElement('canvas')
    offCanvas.width = canvas.width
    offCanvas.height = canvas.height
    const offCtx = offCanvas.getContext('2d')
    if (!offCtx) return []
    
    // Clear and set up text
    offCtx.fillStyle = '#000000'
    offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height)
    
    const fontSize = Math.min(offCanvas.width / 10, 120)
    offCtx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    offCtx.textAlign = 'center'
    offCtx.textBaseline = 'middle'
    
    const textX = offCanvas.width / 2
    const textY = offCanvas.height / 2
    
    // Draw text in white
    offCtx.fillStyle = '#FFFFFF'
    offCtx.fillText(text, textX, textY)
    
    // Get image data
    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height)
    const pixels = imageData.data
    
    const particles: Particle[] = []
    const spacing = 4
    
    // Base metallic color
    const baseMetallic = { r: 200, g: 200, b: 200 }
    
    // Only check pixels where we expect text to be (optimize scanning area)
    const textMetrics = offCtx.measureText(text)
    const scanWidth = Math.min(textMetrics.width * 1.2, offCanvas.width)
    const scanHeight = fontSize * 1.5
    const startX = Math.max(0, textX - scanWidth / 2)
    const endX = Math.min(offCanvas.width, textX + scanWidth / 2)
    const startY = Math.max(0, textY - scanHeight / 2)
    const endY = Math.min(offCanvas.height, textY + scanHeight / 2)
    
    for (let y = startY; y < endY; y += spacing) {
      for (let x = startX; x < endX; x += spacing) {
        const index = (Math.floor(y) * offCanvas.width + Math.floor(x)) * 4
        const red = pixels[index]
        const green = pixels[index + 1]
        const blue = pixels[index + 2]
        const alpha = pixels[index + 3]
        
        // Check if pixel is part of text (white pixels)
        if (red > 200 && green > 200 && blue > 200 && alpha > 200) {
          particles.push({
            id: `${x}-${y}`,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            targetX: x,
            targetY: y,
            size: 2,
            baseColor: { ...baseMetallic },
            currentColor: { ...baseMetallic },
            opacity: 0.9,
            distance: 0,
            warpOffset: { x: 0, y: 0 }
          })
        }
      }
    }
    
    console.log(`Generated ${particles.length} particles for text: ${text}`)
    return particles
  }, [])
  
  // Initialize
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    particlesRef.current = generateTextParticles(currentText)
    setIsLoading(false)
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = generateTextParticles(currentText)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentText, generateTextParticles])
  
  // Mouse tracking
  useEffect(() => {
    let lastTime = 0
    const throttleMs = 16
    
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
  
  // Animation loop with RGB glitch effect
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    
    const animate = () => {
      // Clear canvas completely each frame
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const mouse = mouseRef.current
      const particles = particlesRef.current
      
      particles.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        particle.distance = Math.sqrt(dx * dx + dy * dy)
        
        // Magnetic effect with warping
        const magneticRadius = 150
        const magneticStrength = 0.4
        const warpStrength = 0.3
        
        if (particle.distance < magneticRadius && particle.distance > 0) {
          const force = Math.pow(1 - particle.distance / magneticRadius, 2) * magneticStrength
          const angle = Math.atan2(dy, dx)
          
          // Repulsion
          particle.vx -= Math.cos(angle) * force
          particle.vy -= Math.sin(angle) * force
          
          // Warp effect (perpendicular to mouse direction)
          const warpAngle = angle + Math.PI / 2
          const warpForce = force * warpStrength
          particle.warpOffset.x = Math.cos(warpAngle) * warpForce * 20
          particle.warpOffset.y = Math.sin(warpAngle) * warpForce * 20
          
          // RGB color shift based on distance and angle
          const colorShift = 1 - particle.distance / magneticRadius
          const hueShift = (angle + Math.PI) / (Math.PI * 2)
          
          // Create RGB chromatic aberration effect
          particle.currentColor.r = particle.baseColor.r + colorShift * 255 * Math.sin(hueShift * Math.PI * 2)
          particle.currentColor.g = particle.baseColor.g + colorShift * 255 * Math.sin(hueShift * Math.PI * 2 + Math.PI * 2/3)
          particle.currentColor.b = particle.baseColor.b + colorShift * 255 * Math.sin(hueShift * Math.PI * 2 + Math.PI * 4/3)
          
          // Clamp colors
          particle.currentColor.r = Math.max(0, Math.min(255, particle.currentColor.r))
          particle.currentColor.g = Math.max(0, Math.min(255, particle.currentColor.g))
          particle.currentColor.b = Math.max(0, Math.min(255, particle.currentColor.b))
        } else {
          // Return to base color
          particle.currentColor.r += (particle.baseColor.r - particle.currentColor.r) * 0.1
          particle.currentColor.g += (particle.baseColor.g - particle.currentColor.g) * 0.1
          particle.currentColor.b += (particle.baseColor.b - particle.currentColor.b) * 0.1
          
          // Reset warp
          particle.warpOffset.x *= 0.9
          particle.warpOffset.y *= 0.9
        }
        
        // Return to target position
        const returnForce = 0.08
        const dtx = particle.targetX - particle.x
        const dty = particle.targetY - particle.y
        
        particle.vx += dtx * returnForce
        particle.vy += dty * returnForce
        
        // Apply velocity
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Damping
        particle.vx *= 0.88
        particle.vy *= 0.88
        
        // Dynamic opacity
        const targetOpacity = particle.distance < magneticRadius ? 1 : 0.8
        particle.opacity += (targetOpacity - particle.opacity) * 0.1
        
        // Draw particle with RGB offset for glitch effect
        ctx.save()
        ctx.globalAlpha = particle.opacity
        
        // Draw RGB layers with offset
        const offsetAmount = particle.distance < magneticRadius ? 2 : 0
        
        // Red channel
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = `rgb(${particle.currentColor.r}, 0, 0)`
        ctx.beginPath()
        ctx.arc(
          particle.x + particle.warpOffset.x - offsetAmount, 
          particle.y + particle.warpOffset.y, 
          particle.size, 
          0, 
          Math.PI * 2
        )
        ctx.fill()
        
        // Green channel
        ctx.fillStyle = `rgb(0, ${particle.currentColor.g}, 0)`
        ctx.beginPath()
        ctx.arc(
          particle.x + particle.warpOffset.x, 
          particle.y + particle.warpOffset.y, 
          particle.size, 
          0, 
          Math.PI * 2
        )
        ctx.fill()
        
        // Blue channel
        ctx.fillStyle = `rgb(0, 0, ${particle.currentColor.b})`
        ctx.beginPath()
        ctx.arc(
          particle.x + particle.warpOffset.x + offsetAmount, 
          particle.y + particle.warpOffset.y, 
          particle.size, 
          0, 
          Math.PI * 2
        )
        ctx.fill()
        
        ctx.globalCompositeOperation = 'source-over'
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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}
      />
      
      <Container className="relative z-10 h-full flex flex-col justify-between py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-gray-400 mb-4">
            RGB Glitch Typography
          </p>
          
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500">
            Move cursor near text for RGB chromatic aberration • {particlesRef.current.length} particles
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
