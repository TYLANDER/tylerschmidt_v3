"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface CommitEvent {
  id: string
  timestamp: Date
  type: 'commit' | 'design' | 'thought' | 'debug'
  message: string
  files?: string[]
  diff?: { additions: number; deletions: number }
  branch?: string
}

// Simulated development stream
const generateDevelopmentStream = (): CommitEvent[] => {
  const events: CommitEvent[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 3600000),
      type: 'thought',
      message: 'Exploring quantum state visualization concepts...'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3500000),
      type: 'design',
      message: 'Sketching superposition UI states',
      files: ['quantum-hero-wireframe.fig']
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 3400000),
      type: 'commit',
      message: 'feat: initial quantum hero component setup',
      files: ['src/components/HeroQuantum.tsx'],
      diff: { additions: 145, deletions: 0 },
      branch: 'feature/quantum-hero'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 3300000),
      type: 'debug',
      message: 'Fixed: State probability calculations not normalizing correctly'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 3200000),
      type: 'commit',
      message: 'refactor: optimize quantum state transitions',
      files: ['src/components/HeroQuantum.tsx', 'src/utils/quantum.ts'],
      diff: { additions: 67, deletions: 23 },
      branch: 'feature/quantum-hero'
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 3100000),
      type: 'thought',
      message: 'What if cursor distance affects quantum probability?'
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 3000000),
      type: 'commit',
      message: 'feat: add observer effect based on mouse position',
      files: ['src/components/HeroQuantum.tsx'],
      diff: { additions: 34, deletions: 12 },
      branch: 'feature/quantum-hero'
    }
  ]
  
  return events
}

function StreamEvent({ event, index }: { event: CommitEvent; index: number }) {
  const getEventIcon = () => {
    switch (event.type) {
      case 'commit': return '💾'
      case 'design': return '🎨'
      case 'thought': return '💭'
      case 'debug': return '🐛'
      default: return '📝'
    }
  }
  
  const getEventColor = () => {
    switch (event.type) {
      case 'commit': return 'text-green-500'
      case 'design': return 'text-purple-500'
      case 'thought': return 'text-blue-500'
      case 'debug': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-4 group"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${getEventColor()} bg-current/10 flex items-center justify-center text-lg`}>
          {getEventIcon()}
        </div>
        <div className="w-0.5 h-full bg-border" />
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-card border border-border rounded-lg p-4 group-hover:border-primary/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <span className={`text-xs font-mono ${getEventColor()}`}>
              {event.type.toUpperCase()}
            </span>
            <span className="text-xs text-muted-foreground">
              {event.timestamp.toLocaleTimeString()}
            </span>
          </div>
          
          <p className="text-sm mb-2">{event.message}</p>
          
          {event.files && (
            <div className="flex flex-wrap gap-2 mb-2">
              {event.files.map((file) => (
                <span key={file} className="text-xs bg-muted px-2 py-1 rounded font-mono">
                  {file}
                </span>
              ))}
            </div>
          )}
          
          {event.diff && (
            <div className="flex gap-4 text-xs font-mono">
              <span className="text-green-500">+{event.diff.additions}</span>
              <span className="text-red-500">-{event.diff.deletions}</span>
            </div>
          )}
          
          {event.branch && (
            <span className="text-xs text-muted-foreground font-mono">
              on {event.branch}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function HeroConsciousnessStream() {
  const [events, setEvents] = useState<CommitEvent[]>([])
  const [isLive, setIsLive] = useState(true)
  const [currentThought, setCurrentThought] = useState('')
  const [showTimeMachine, setShowTimeMachine] = useState(false)
  
  // Initialize with historical events
  useEffect(() => {
    setEvents(generateDevelopmentStream())
  }, [])
  
  // Simulate live events
  useEffect(() => {
    if (!isLive) return
    
    const thoughts = [
      'Optimizing render performance...',
      'Considering accessibility improvements',
      'Exploring new animation possibilities',
      'Refactoring component structure',
      'Testing cross-browser compatibility',
      'Implementing responsive design patterns'
    ]
    
    const interval = setInterval(() => {
      const newEvent: CommitEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: Math.random() > 0.7 ? 'thought' : 'commit',
        message: thoughts[Math.floor(Math.random() * thoughts.length)],
        ...(Math.random() > 0.5 && {
          files: [`src/components/Hero${Math.random().toString(36).substring(7)}.tsx`],
          diff: { 
            additions: Math.floor(Math.random() * 100), 
            deletions: Math.floor(Math.random() * 50) 
          }
        })
      }
      
      setEvents(prev => [newEvent, ...prev].slice(0, 20))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isLive])
  
  // Typing animation for current thought
  useEffect(() => {
    const thoughtTexts = [
      'How can I make this more intuitive?',
      'What if we tried a different approach?',
      'This needs better performance optimization',
      'The user experience could be smoother here'
    ]
    
    let currentText = ''
    let textIndex = 0
    let charIndex = 0
    
    const typeInterval = setInterval(() => {
      if (charIndex < thoughtTexts[textIndex].length) {
        currentText += thoughtTexts[textIndex][charIndex]
        setCurrentThought(currentText)
        charIndex++
      } else {
        setTimeout(() => {
          currentText = ''
          setCurrentThought('')
          textIndex = (textIndex + 1) % thoughtTexts.length
          charIndex = 0
        }, 2000)
      }
    }, 50)
    
    return () => clearInterval(typeInterval)
  }, [])
  
  return (
    <section className="min-h-screen bg-background overflow-hidden">
      <Container className="py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Tyler Schmidt
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Consciousness Stream • Live Development Process
            </p>
            
            {/* Current thought */}
            <motion.div
              className="inline-block bg-card border border-border rounded-lg px-6 py-3 mb-8"
              animate={{ opacity: currentThought ? 1 : 0.5 }}
            >
              <span className="text-sm font-mono text-muted-foreground">
                Current thought: {currentThought}
                <motion.span
                  className="inline-block w-0.5 h-4 bg-primary ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </span>
            </motion.div>
            
            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLive 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}
              >
                {isLive ? '● LIVE' : '○ PAUSED'}
              </button>
              
              <button
                onClick={() => setShowTimeMachine(!showTimeMachine)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Time Machine
              </button>
            </div>
          </motion.div>
          
          {/* Time machine */}
          <AnimatePresence>
            {showTimeMachine && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 bg-card border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold mb-4">Development Timeline</h3>
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="24"
                  defaultValue="0"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>24 hours ago</span>
                  <span>12 hours ago</span>
                  <span>Now</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Event stream */}
          <div className="relative">
            {/* Live indicator */}
            {isLive && (
              <motion.div
                className="absolute -left-16 top-0"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              </motion.div>
            )}
            
            {/* Events */}
            <AnimatePresence mode="popLayout">
              {events.map((event, index) => (
                <StreamEvent key={event.id} event={event} index={index} />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Commits Today', value: events.filter(e => e.type === 'commit').length },
              { label: 'Thoughts', value: events.filter(e => e.type === 'thought').length },
              { label: 'Files Changed', value: new Set(events.flatMap(e => e.files || [])).size },
              { label: 'Active Time', value: '4.5 hrs' }
            ].map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
