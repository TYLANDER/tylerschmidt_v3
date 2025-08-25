"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface QuantumState {
  id: string
  label: string
  color: string
  content: {
    title: string
    subtitle: string
    skills: string[]
    focus: string
  }
  probability: number
  position: { x: number; y: number }
}

const quantumStates: QuantumState[] = [
  {
    id: 'designer',
    label: 'Designer State',
    color: '#4a9eff',
    content: {
      title: 'Tyler Schmidt',
      subtitle: 'Product Designer',
      skills: ['UI/UX', 'Visual Design', 'Prototyping', 'Design Systems'],
      focus: 'Creating beautiful, intuitive experiences'
    },
    probability: 0.25,
    position: { x: -100, y: -50 }
  },
  {
    id: 'engineer',
    label: 'Engineer State',
    color: '#ff6b6b',
    content: {
      title: 'Tyler Schmidt',
      subtitle: 'Full-Stack Engineer',
      skills: ['React', 'TypeScript', 'Node.js', 'WebGL'],
      focus: 'Building performant, scalable applications'
    },
    probability: 0.25,
    position: { x: 100, y: -50 }
  },
  {
    id: 'creative',
    label: 'Creative State',
    color: '#4ade80',
    content: {
      title: 'Tyler Schmidt',
      subtitle: 'Creative Technologist',
      skills: ['Generative Art', '3D Graphics', 'Interactive Media', 'AI/ML'],
      focus: 'Pushing boundaries of digital creativity'
    },
    probability: 0.25,
    position: { x: -100, y: 50 }
  },
  {
    id: 'leader',
    label: 'Leader State',
    color: '#f59e0b',
    content: {
      title: 'Tyler Schmidt',
      subtitle: 'Design Leader',
      skills: ['Strategy', 'Team Building', 'Innovation', 'Mentorship'],
      focus: 'Guiding teams to create exceptional products'
    },
    probability: 0.25,
    position: { x: 100, y: 50 }
  }
]

function QuantumParticle({ x, y }: { x: number; y: number }) {
  const randomDelay = Math.random() * 2
  const randomDuration = 3 + Math.random() * 2
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/20 rounded-full"
      style={{ left: x, top: y }}
      animate={{
        x: [0, Math.random() * 100 - 50, 0],
        y: [0, Math.random() * 100 - 50, 0],
        opacity: [0, 0.5, 0]
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export function HeroQuantum() {
  const [collapsedState, setCollapsedState] = useState<string | null>(null)
  const [probabilities, setProbabilities] = useState<Record<string, number>>(
    quantumStates.reduce((acc, state) => ({ ...acc, [state.id]: 0.25 }), {} as Record<string, number>)
  )
  const [entangledPairs, setEntangledPairs] = useState<Array<[string, string]>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Track mouse for observation effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
      
      // Calculate distance to each state and adjust probabilities
      if (!collapsedState) {
        const newProbs: Record<string, number> = {}
        let total = 0
        
        quantumStates.forEach(state => {
          const centerX = rect.width / 2 + state.position.x
          const centerY = rect.height / 2 + state.position.y
          const distance = Math.sqrt(
            Math.pow(e.clientX - rect.left - centerX, 2) + 
            Math.pow(e.clientY - rect.top - centerY, 2)
          )
          const prob = Math.max(0.1, 1 - distance / 300)
          newProbs[state.id] = prob
          total += prob
        })
        
        // Normalize probabilities
        Object.keys(newProbs).forEach(key => {
          newProbs[key] = newProbs[key] / total
        })
        
        setProbabilities(newProbs)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [collapsedState, mouseX, mouseY])
  
  // Create entanglements
  useEffect(() => {
    const interval = setInterval(() => {
      if (!collapsedState) {
        const states = quantumStates.map(s => s.id)
        const pair: [string, string] = [
          states[Math.floor(Math.random() * states.length)],
          states[Math.floor(Math.random() * states.length)]
        ]
        if (pair[0] !== pair[1]) {
          setEntangledPairs(prev => [...prev.slice(-3), pair])
        }
      }
    }, 2000)
    
    return () => clearInterval(interval)
  }, [collapsedState])
  
  const handleCollapse = (stateId: string) => {
    setCollapsedState(stateId)
    setProbabilities(
      quantumStates.reduce((acc, state) => ({
        ...acc,
        [state.id]: state.id === stateId ? 1 : 0
      }), {} as Record<string, number>)
    )
  }
  
  const handleReset = () => {
    setCollapsedState(null)
    setProbabilities(
      quantumStates.reduce((acc, state) => ({ ...acc, [state.id]: 0.25 }), {} as Record<string, number>)
    )
  }
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Quantum field visualization */}
      <div className="absolute inset-0">
        {/* Probability wave visualization */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="quantum-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            </filter>
          </defs>
          
          {/* Entanglement lines */}
          <AnimatePresence>
            {entangledPairs.map((pair, i) => {
              const state1 = quantumStates.find(s => s.id === pair[0])
              const state2 = quantumStates.find(s => s.id === pair[1])
              if (!state1 || !state2) return null
              
              return (
                <motion.line
                  key={`${pair[0]}-${pair[1]}-${i}`}
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke="url(#entanglement-gradient)"
                  strokeWidth="1"
                  opacity={0.3}
                  initial={{
                    x1: `${50 + state1.position.x / 10}%`,
                    y1: `${50 + state1.position.y / 10}%`,
                    x2: `${50 + state1.position.x / 10}%`,
                    y2: `${50 + state1.position.y / 10}%`,
                    opacity: 0
                  }}
                  animate={{
                    x1: `${50 + state1.position.x / 10}%`,
                    y1: `${50 + state1.position.y / 10}%`,
                    x2: `${50 + state2.position.x / 10}%`,
                    y2: `${50 + state2.position.y / 10}%`,
                    opacity: [0, 0.3, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                />
              )
            })}
          </AnimatePresence>
          
          <defs>
            <linearGradient id="entanglement-gradient">
              <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Quantum particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <QuantumParticle
            key={i}
            x={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)}
            y={Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)}
          />
        ))}
      </div>
      
      <Container className="relative z-10">
        <div className="text-center">
          {/* Superposition states */}
          <AnimatePresence mode="wait">
            {!collapsedState ? (
              <motion.div
                key="superposition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-[600px] flex items-center justify-center"
              >
                {quantumStates.map((state) => (
                  <motion.div
                    key={state.id}
                    className="absolute cursor-pointer"
                    style={{
                      x: state.position.x,
                      y: state.position.y,
                    }}
                    animate={{
                      opacity: probabilities[state.id] || 0.25,
                      scale: 0.8 + (probabilities[state.id] || 0.25) * 0.8
                    }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleCollapse(state.id)}
                  >
                    <div 
                      className="relative p-8 rounded-2xl backdrop-blur-md border-2 transition-all duration-300"
                      style={{
                        borderColor: state.color,
                        backgroundColor: `${state.color}20`,
                        boxShadow: `0 0 ${probabilities[state.id] * 100}px ${state.color}40`
                      }}
                    >
                      <h2 className="text-2xl font-bold mb-2" style={{ color: state.color }}>
                        {state.content.title}
                      </h2>
                      <p className="text-lg mb-4 text-muted-foreground">
                        {state.content.subtitle}
                      </p>
                      <p className="text-sm font-mono opacity-60">
                        P = {(probabilities[state.id] * 100).toFixed(1)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Center observation indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Quantum Superposition</p>
                    <p className="text-xs text-muted-foreground/60">Click to collapse wavefunction</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="py-20"
              >
                {(() => {
                  const state = quantumStates.find(s => s.id === collapsedState)
                  if (!state) return null
                  
                  return (
                    <div className="max-w-2xl mx-auto">
                      <motion.h1 
                        className="text-6xl md:text-7xl font-bold mb-4"
                        style={{ color: state.color }}
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                      >
                        {state.content.title}
                      </motion.h1>
                      
                      <motion.p 
                        className="text-2xl md:text-3xl mb-8 text-muted-foreground"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {state.content.subtitle}
                      </motion.p>
                      
                      <motion.p
                        className="text-lg mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {state.content.focus}
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-3 justify-center mb-12"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {state.content.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: `${state.color}20`,
                              color: state.color,
                              border: `1px solid ${state.color}40`
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </motion.div>
                      
                      <motion.button
                        onClick={handleReset}
                        className="px-6 py-3 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Return to Superposition
                      </motion.button>
                    </div>
                  )
                })()}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Quantum state indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
              <p className="text-xs font-mono text-muted-foreground">
                {collapsedState ? 'State: Collapsed' : 'State: Superposition'} | 
                Observer Effect: Active
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
