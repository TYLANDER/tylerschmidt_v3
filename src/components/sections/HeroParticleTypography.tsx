"use client"

import { useEffect, useRef, useState } from 'react'
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
  color: string
  behavior: 'seeking' | 'fleeing' | 'orbiting' | 'idle'
  letter?: string
  opacity: number
}

export function HeroParticleTypography() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [currentText, setCurrentText] = useState('TYLER SCHMIDT')
  const [isExploded, setIsExploded] = useState(false)
  const [selectedBehavior, setSelectedBehavior] = useState<'flocking' | 'magnetic' | 'explosive'>('magnetic')
  
  // Generate particles for text
  const generateTextParticles = (text: string) => {
    if (!canvasRef.current) return []
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return []
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Set up text
    const fontSize = Math.min(canvas.width / 8, 120)
    ctx.font = `bold ${fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Measure text
    const textMetrics = ctx.measureText(text)
    const textX = canvas.width / 2
    const textY = canvas.height / 2
    
    // Draw text to get pixel data
    ctx.fillStyle = 'white'
    ctx.fillText(text, textX, textY)
    
    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    
    const particles: Particle[] = []
    const spacing = 3
    
    for (let y = 0; y < canvas.height; y += spacing) {
      for (let x = 0; x < canvas.width; x += spacing) {
        const index = (y * canvas.width + x) * 4
        const alpha = pixels[index + 3]
        
        if (alpha > 128) {
          particles.push({
            id: `${x}-${y}`,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: 0,
            vy: 0,
            targetX: x,
            targetY: y,
            size: 2,
            color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
            behavior: 'seeking',
            opacity: 1
          })
        }
      }
    }
    
    // Clear canvas for animation
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    return particles
  }
  
  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    particlesRef.current = generateTextParticles(currentText)
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = generateTextParticles(currentText)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentText])
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Animation loop
  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update behavior based on mode
        if (selectedBehavior === 'magnetic') {
          // Magnetic attraction/repulsion from mouse
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            // Flee from mouse
            particle.behavior = 'fleeing'
            const force = (100 - distance) / 100
            particle.vx -= (dx / distance) * force * 2
            particle.vy -= (dy / distance) * force * 2
          } else {
            // Seek target position
            particle.behavior = 'seeking'
          }
        } else if (selectedBehavior === 'flocking') {
          // Flocking behavior
          let avgX = 0, avgY = 0, avgVx = 0, avgVy = 0
          let count = 0
          
          particlesRef.current.forEach((other) => {
            if (other.id === particle.id) return
            
            const dx = other.x - particle.x
            const dy = other.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 50) {
              avgX += other.x
              avgY += other.y
              avgVx += other.vx
              avgVy += other.vy
              count++
              
              // Separation
              if (distance < 20) {
                particle.vx -= dx / distance
                particle.vy -= dy / distance
              }
            }
          })
          
          if (count > 0) {
            // Alignment and cohesion
            avgX /= count
            avgY /= count
            avgVx /= count
            avgVy /= count
            
            particle.vx += (avgX - particle.x) * 0.001
            particle.vy += (avgY - particle.y) * 0.001
            particle.vx += (avgVx - particle.vx) * 0.05
            particle.vy += (avgVy - particle.vy) * 0.05
          }
        }
        
        // Apply behaviors
        if (particle.behavior === 'seeking' && !isExploded) {
          const dx = particle.targetX - particle.x
          const dy = particle.targetY - particle.y
          particle.vx += dx * 0.02
          particle.vy += dy * 0.02
        } else if (isExploded) {
          particle.vx += (Math.random() - 0.5) * 0.5
          particle.vy += (Math.random() - 0.5) * 0.5
        }
        
        // Apply velocity
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Damping
        particle.vx *= 0.95
        particle.vy *= 0.95
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw connections in flocking mode
        if (selectedBehavior === 'flocking') {
          particlesRef.current.forEach((other) => {
            if (other.id === particle.id) return
            
            const dx = other.x - particle.x
            const dy = other.y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 30) {
              ctx.strokeStyle = particle.color
              ctx.globalAlpha = (30 - distance) / 30 * 0.2
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.stroke()
            }
          })
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
  }, [selectedBehavior, isExploded])
  
  const handleTextChange = (newText: string) => {
    setCurrentText(newText)
    particlesRef.current = generateTextParticles(newText)
  }
  
  const handleExplode = () => {
    setIsExploded(true)
    particlesRef.current.forEach((particle) => {
      particle.vx = (Math.random() - 0.5) * 20
      particle.vy = (Math.random() - 0.5) * 20
    })
    
    setTimeout(() => {
      setIsExploded(false)
    }, 2000)
  }
  
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      {/* UI Overlay */}
      <Container className="relative z-10 h-full flex flex-col justify-between py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Particle Typography Engine
          </p>
          
          {/* Text options */}
          <div className="flex justify-center gap-2 mb-4">
            {['TYLER SCHMIDT', 'DESIGNER', 'ENGINEER', 'CREATIVE'].map((text) => (
              <button
                key={text}
                onClick={() => handleTextChange(text)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  currentText === text
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
          
          {/* Behavior controls */}
          <div className="flex justify-center gap-2">
            {[
              { id: 'magnetic', label: 'Magnetic' },
              { id: 'flocking', label: 'Flocking' },
              { id: 'explosive', label: 'Explosive' }
            ].map((behavior) => (
              <button
                key={behavior.id}
                onClick={() => setSelectedBehavior(behavior.id as 'flocking' | 'magnetic' | 'explosive')}
                className={`px-4 py-2 rounded transition-colors ${
                  selectedBehavior === behavior.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {behavior.label}
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
          <button
            onClick={handleExplode}
            className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors mb-4"
          >
            Explode Text
          </button>
          
          <p className="text-xs text-muted-foreground">
            Move your cursor to interact • {particlesRef.current.length} particles
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
