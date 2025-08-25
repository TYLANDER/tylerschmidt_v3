"use client"

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface Layer {
  id: string
  name: string
  content: React.ReactNode
  style: React.CSSProperties
}

// Matrix rain effect component
function MatrixRain() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?~'
  const columns = 50
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="absolute text-green-500 font-mono text-xs"
          style={{
            left: `${(i / columns) * 100}%`,
            animation: `matrix-fall ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {Array.from({ length: 40 }).map((_, j) => (
            <div key={j} className="opacity-80">
              {characters[Math.floor(Math.random() * characters.length)]}
            </div>
          ))}
        </div>
      ))}
      <style jsx>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  )
}

// Wireframe world component
function WireframeWorld() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        <defs>
          <pattern id="wireframe-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ff00" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wireframe-grid)" />
        
        {/* 3D wireframe text effect */}
        <g transform="translate(400, 300)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            className="fill-none stroke-green-400"
            strokeWidth="1"
            fontSize="60"
            fontFamily="monospace"
          >
            TYLER SCHMIDT
          </text>
          <text
            x="5"
            y="5"
            textAnchor="middle"
            className="fill-none stroke-green-600"
            strokeWidth="0.5"
            fontSize="60"
            fontFamily="monospace"
            opacity="0.5"
          >
            TYLER SCHMIDT
          </text>
        </g>
        
        {/* Rotating wireframe cube */}
        <g transform="translate(400, 450)">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="10s"
            repeatCount="indefinite"
          />
          <path
            d="M -30 -30 L 30 -30 L 30 30 L -30 30 Z M -20 -20 L 40 -20 L 40 40 L -20 40 Z M -30 -30 L -20 -20 M 30 -30 L 40 -20 M 30 30 L 40 40 M -30 30 L -20 40"
            fill="none"
            stroke="#00ff00"
            strokeWidth="1"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  )
}

// Particle physics view
function ParticlePhysics() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Orbiting particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: `radial-gradient(circle, ${['#ff0080', '#00ff88', '#0080ff', '#ffff00', '#ff00ff', '#00ffff'][i]}, transparent)`,
              boxShadow: `0 0 20px ${['#ff0080', '#00ff88', '#0080ff', '#ffff00', '#ff00ff', '#00ffff'][i]}`
            }}
            animate={{
              x: Math.cos((i / 6) * Math.PI * 2) * 150,
              y: Math.sin((i / 6) * Math.PI * 2) * 150,
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        ))}
        
        {/* Center text */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white glow-text">Tyler Schmidt</h1>
          <p className="text-lg text-cyan-400 mt-2">Quantum Designer</p>
        </div>
      </div>
      
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0080ff;
        }
      `}</style>
    </div>
  )
}

// Abstract art dimension
function AbstractArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 800 600">
        {/* Animated gradients */}
        <defs>
          <linearGradient id="abstract-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff006e">
              <animate attributeName="stop-color" values="#ff006e;#3a86ff;#ff006e" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#3a86ff">
              <animate attributeName="stop-color" values="#3a86ff;#ff006e;#3a86ff" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        
        {/* Morphing shapes */}
        <path
          d="M 200 300 Q 400 100 600 300 Q 400 500 200 300"
          fill="url(#abstract-gradient-1)"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            values="M 200 300 Q 400 100 600 300 Q 400 500 200 300;M 300 200 Q 400 400 500 200 Q 400 100 300 200;M 200 300 Q 400 100 600 300 Q 400 500 200 300"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Floating circles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <circle
            key={i}
            cx={200 + i * 100}
            cy={300}
            r="50"
            fill={['#ff006e', '#3a86ff', '#ffbe0b', '#fb5607', '#8338ec'][i]}
            opacity="0.3"
          >
            <animate
              attributeName="cy"
              values={`${300};${250 + i * 20};${300}`}
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="50;70;50"
              dur={`${2 + i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        
        {/* Text overlay */}
        <text
          x="400"
          y="300"
          textAnchor="middle"
          className="fill-white mix-blend-difference"
          fontSize="48"
          fontWeight="bold"
        >
          TYLER SCHMIDT
        </text>
      </svg>
    </div>
  )
}

const layers: Layer[] = [
  {
    id: 'normal',
    name: 'Reality',
    content: (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">Tyler Schmidt</h1>
          <p className="text-2xl text-muted-foreground">Product Designer</p>
        </div>
      </div>
    ),
    style: { background: 'var(--background)' }
  },
  {
    id: 'code',
    name: 'Code Dimension',
    content: <MatrixRain />,
    style: { background: '#000' }
  },
  {
    id: 'wireframe',
    name: 'Wireframe World',
    content: <WireframeWorld />,
    style: { background: '#0a0a0a' }
  },
  {
    id: 'particles',
    name: 'Particle Physics',
    content: <ParticlePhysics />,
    style: { background: 'radial-gradient(ellipse at center, #0a0a2e 0%, #000 100%)' }
  },
  {
    id: 'abstract',
    name: 'Abstract Art',
    content: <AbstractArt />,
    style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
  }
]

export function HeroRealityLayers() {
  const [currentLayer, setCurrentLayer] = useState(0)
  const [isPeeling, setIsPeeling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const peelX = useMotionValue(0)
  const peelY = useMotionValue(0)
  
  const peelSpringX = useSpring(peelX, { stiffness: 300, damping: 30 })
  useSpring(peelY, { stiffness: 300, damping: 30 })
  
  const peelProgress = useTransform(peelSpringX, [-300, 300], [0, 1])
  
  const handleMouseDown = () => {
    if (currentLayer < layers.length - 1) {
      setIsPeeling(true)
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPeeling || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    peelX.set(e.clientX - rect.left - rect.width / 2)
    peelY.set(e.clientY - rect.top - rect.height / 2)
  }
  
  const handleMouseUp = () => {
    if (!isPeeling) return
    
    const progress = peelProgress.get()
    if (progress > 0.5 && currentLayer < layers.length - 1) {
      setCurrentLayer(prev => prev + 1)
    }
    
    peelX.set(0)
    peelY.set(0)
    setIsPeeling(false)
  }
  
  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Layer stack */}
      {layers.map((layer, index) => {
        if (index > currentLayer + 1) return null
        
        return (
          <motion.div
            key={layer.id}
            className="absolute inset-0"
            style={{
              ...layer.style,
              zIndex: layers.length - index,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
            animate={{
              rotateY: index === currentLayer && isPeeling ? peelProgress.get() * 180 : 0,
              x: index === currentLayer && isPeeling ? peelSpringX.get() : 0,
              opacity: index <= currentLayer ? 1 : 0
            }}
          >
            <div className="relative w-full h-full">
              {layer.content}
              
              {/* Peel effect overlay */}
              {index === currentLayer && isPeeling && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"
                  style={{
                    clipPath: `polygon(0 0, ${peelProgress.get() * 100}% 0, ${peelProgress.get() * 100}% 100%, 0 100%)`
                  }}
                />
              )}
            </div>
          </motion.div>
        )
      })}
      
      {/* UI Overlay */}
      <Container className="relative z-50 h-full pointer-events-none">
        <div className="h-full flex flex-col justify-between py-20">
          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground">
              {currentLayer < layers.length - 1 
                ? "Click and drag to peel back reality" 
                : "You've reached the deepest layer"}
            </p>
          </motion.div>
          
          {/* Layer indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2"
          >
            {layers.map((layer, index) => (
              <button
                key={layer.id}
                onClick={() => setCurrentLayer(index)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all pointer-events-auto ${
                  index === currentLayer
                    ? 'bg-primary text-primary-foreground'
                    : index < currentLayer
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-muted/50 text-muted-foreground/50'
                }`}
              >
                {layer.name}
              </button>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
