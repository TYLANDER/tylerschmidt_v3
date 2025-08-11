"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/Container'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setCanvasSize()

    // Minimalist geometric animation

    const shapes: Array<{x: number, y: number, size: number, speed: number}> = []
    
    // Create subtle floating shapes
    for (let i = 0; i < 3; i++) {
      shapes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: 60 + Math.random() * 40,
        speed: 0.2 + Math.random() * 0.3
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      shapes.forEach((shape, i) => {
        // Update position
        shape.y -= shape.speed
        if (shape.y + shape.size < 0) {
          shape.y = canvas.offsetHeight + shape.size
          shape.x = Math.random() * canvas.offsetWidth
        }
        
        // Draw shape
        ctx.beginPath()
        ctx.strokeStyle = i === 0 ? '#0066FF' : i === 1 ? '#FF522B' : '#00FF7F'
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.1
        
        if (i % 2 === 0) {
          // Rectangle
          ctx.rect(shape.x - shape.size/2, shape.y - shape.size/2, shape.size, shape.size)
        } else {
          // Circle
          ctx.arc(shape.x, shape.y, shape.size/2, 0, Math.PI * 2)
        }
        ctx.stroke()
      })
      

      requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize', setCanvasSize)
    return () => window.removeEventListener('resize', setCanvasSize)
  }, [])

  return (
    <section className="relative bg-white overflow-hidden">
      <Container className="relative py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1 
              className="font-heading text-ink text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Precision<br />
              Meets Purpose.
            </motion.h1>
            <motion.p 
              className="text-ink/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              UI/UX & Product Designer crafting bold, minimalist interfaces with a human edge.
            </motion.p>
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Link href="/work">
                <Button 
                  variant="default" 
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10">View Work</span>
                  <motion.div 
                    className="absolute inset-0 bg-accent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Button>
              </Link>
              <Link 
                href="/about" 
                className="text-accent font-medium hover:text-accent/80 transition-colors relative group"
              >
                About Me
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="relative hidden lg:block">
            <canvas 
              ref={canvasRef}
              className="w-full h-[500px]"
              style={{ width: '100%', height: '500px' }}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}