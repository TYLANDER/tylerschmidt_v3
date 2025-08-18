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

export function HeroParticleTypographyFixed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const [currentText, setCurrentText] = useState('TYLER SCHMIDT')
  const [isExploded, setIsExploded] = useState(false)
  const animationRef = useRef<number>()
  
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
      tempCtx.fillStyle = 'white'
      
      // Draw text
      const centerX = tempCanvas.width / 2
      const centerY = tempCanvas.height / 2
      tempCtx.fillText(currentText, centerX, centerY)
      
      // Get pixel data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
      const pixels = imageData.data
      
      // Create particles
      const newParticles: Particle[] = []
      const gap = 6
      
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
              size: 2,
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
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
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
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const mouse = mouseRef.current
      const particles = particlesRef.current
      
      // Update and draw particles
      particles.forEach((particle, i) => {
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
          
          // Color change based on angle
          particle.hue = (angle + Math.PI) * (180 / Math.PI)
        } else {
          particle.hue *= 0.95
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
        if (distance < interactionRadius && particle.hue > 1) {
          // RGB effect when near mouse
          ctx.globalCompositeOperation = 'screen'
          
          const offset = (interactionRadius - distance) / interactionRadius * 3
          
          // Red
          ctx.fillStyle = `hsl(0, 100%, 50%)`
          ctx.fillRect(particle.x - offset, particle.y, particle.size, particle.size)
          
          // Green
          ctx.fillStyle = `hsl(120, 100%, 50%)`
          ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
          
          // Blue
          ctx.fillStyle = `hsl(240, 100%, 50%)`
          ctx.fillRect(particle.x + offset, particle.y, particle.size, particle.size)
          
          ctx.globalCompositeOperation = 'source-over'
        } else {
          // Normal metallic color
          ctx.fillStyle = '#cccccc'
          ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
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
  }, [isExploded])
  
  const handleExplode = () => {
    setIsExploded(true)
    // Reset after 2 seconds
    setTimeout(() => {
      setIsExploded(false)
    }, 2000)
  }
  
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      <Container className="relative z-10 h-full flex flex-col justify-between py-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-gray-400 mb-4">
            RGB Particle Typography
          </p>
          
          <div className="flex justify-center gap-2 mb-4 pointer-events-auto">
            {['TYLER SCHMIDT', 'DESIGNER', 'ENGINEER', 'CREATIVE'].map((text) => (
              <button
                key={text}
                onClick={() => setCurrentText(text)}
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
          className="text-center space-y-4"
        >
          <button
            onClick={handleExplode}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors pointer-events-auto"
            disabled={isExploded}
          >
            {isExploded ? 'Exploding...' : 'Explode Text'}
          </button>
          
          <p className="text-xs text-gray-500">
            Move cursor near text for RGB effect • {particlesRef.current.length} particles
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
