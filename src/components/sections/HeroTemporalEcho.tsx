"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface GhostTrail {
  id: string
  points: Array<{ x: number; y: number; timestamp: number }>
  interactions: Array<{ type: 'click' | 'hover'; x: number; y: number; timestamp: number }>
  color: string
  opacity: number
  timeOfDay: string
}

// Simulated past visitor data (in production, this would come from a database)
const generateGhostTrails = (): GhostTrail[] => {
  const colors = ['#4a9eff', '#ff6b6b', '#4ade80', '#f59e0b', '#a855f7']
  const timesOfDay = ['morning', 'afternoon', 'evening', 'night']
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `ghost-${i}`,
    points: Array.from({ length: 50 }, (_, j) => ({
      x: Math.sin(j * 0.1 + i) * 200 + Math.random() * 100,
      y: Math.cos(j * 0.15 + i) * 150 + Math.random() * 50,
      timestamp: Date.now() - (i * 60000) - (j * 100)
    })),
    interactions: Array.from({ length: 3 }, (_, k) => ({
      type: Math.random() > 0.5 ? 'click' : 'hover' as const,
      x: Math.random() * 600 - 300,
      y: Math.random() * 400 - 200,
      timestamp: Date.now() - (i * 60000) - (k * 20000)
    })),
    color: colors[i % colors.length],
    opacity: 0.1 + (0.3 * (1 - i / 20)),
    timeOfDay: timesOfDay[Math.floor(i / 5)]
  }))
}

function GhostVisualization({ trail, isActive }: { trail: GhostTrail; isActive: boolean }) {
  return (
    <g className="ghost-trail">
      {/* Path visualization */}
      <motion.path
        d={`M ${trail.points.map(p => `${p.x},${p.y}`).join(' L ')}`}
        fill="none"
        stroke={trail.color}
        strokeWidth="1"
        opacity={isActive ? trail.opacity * 2 : trail.opacity}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "linear" }}
      />
      
      {/* Interaction points */}
      {trail.interactions.map((interaction, i) => (
        <motion.g key={i}>
          {interaction.type === 'click' ? (
            <motion.circle
              cx={interaction.x}
              cy={interaction.y}
              r="8"
              fill={trail.color}
              opacity={isActive ? 0.6 : 0.3}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ) : (
            <motion.rect
              x={interaction.x - 6}
              y={interaction.y - 6}
              width="12"
              height="12"
              fill={trail.color}
              opacity={isActive ? 0.4 : 0.2}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 45 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          )}
        </motion.g>
      ))}
    </g>
  )
}

export function HeroTemporalEcho() {
  const [ghostTrails] = useState(generateGhostTrails())
  const [currentTime, setCurrentTime] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all')
  const [isRecording, setIsRecording] = useState(true)
  const [userTrail, setUserTrail] = useState<Array<{ x: number; y: number; timestamp: number }>>([])
  const [activeGhostIndex, setActiveGhostIndex] = useState(-1)
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Record current user's trail
  useEffect(() => {
    if (!isRecording) return
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      
      const rect = svgRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      setUserTrail(prev => [...prev.slice(-49), { x, y, timestamp: Date.now() }])
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isRecording])
  
  // Cycle through ghost trails for highlighting
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGhostIndex(prev => (prev + 1) % ghostTrails.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [ghostTrails.length])
  
  const filteredTrails = currentTime === 'all' 
    ? ghostTrails 
    : ghostTrails.filter(trail => trail.timeOfDay === currentTime)
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Ghost trail visualization */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="-400 -300 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid for reference */}
        <pattern id="temporal-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted/20" />
        </pattern>
        <rect x="-400" y="-300" width="800" height="600" fill="url(#temporal-grid)" />
        
        {/* Ghost trails */}
        <AnimatePresence>
          {filteredTrails.map((trail, i) => (
            <motion.g
              key={trail.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GhostVisualization 
                trail={trail} 
                isActive={i === activeGhostIndex % filteredTrails.length}
              />
            </motion.g>
          ))}
        </AnimatePresence>
        
        {/* Current user trail */}
        {userTrail.length > 1 && (
          <motion.path
            d={`M ${userTrail.map(p => `${p.x},${p.y}`).join(' L ')}`}
            fill="none"
            stroke="url(#user-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        
        {/* Gradient for user trail */}
        <defs>
          <linearGradient id="user-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Content overlay */}
      <Container className="relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Tyler Schmidt
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              You&apos;re not alone here. {filteredTrails.length} visitors before you.
            </p>
          </motion.div>
          
          {/* Time filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-sm text-muted-foreground mb-4">Filter by time of day:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['all', 'morning', 'afternoon', 'evening', 'night'].map((time) => (
                <button
                  key={time}
                  onClick={() => setCurrentTime(time as typeof currentTime)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentTime === time
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Recording toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {isRecording ? 'Recording Your Path' : 'Start Recording'}
            </button>
            
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your movements create the glowing trail. Every visitor leaves their mark.
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { label: 'Total Ghosts', value: filteredTrails.length },
              { label: 'Your Trail Length', value: userTrail.length },
              { label: 'Active Patterns', value: filteredTrails.filter((_, i) => i < 5).length },
              { label: 'Time Layers', value: 4 }
            ].map((stat, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
      
      {/* Hover info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-sm text-muted-foreground/60">
          Move your cursor to join the collective experience
        </p>
      </motion.div>
    </section>
  )
}
