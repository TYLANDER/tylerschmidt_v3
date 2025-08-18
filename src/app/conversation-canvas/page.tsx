"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Link from 'next/link'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  sentiment: 'positive' | 'neutral' | 'negative' | 'creative'
  timestamp: Date
}

interface CanvasStroke {
  points: Array<{ x: number; y: number }>
  color: string
  width: number
  sentiment: string
}

export default function ConversationCanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [strokes, setStrokes] = useState<CanvasStroke[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  
  // Sentiment to color mapping
  const sentimentColors = {
    positive: '#4ade80',
    negative: '#ef4444',
    creative: '#a855f7',
    neutral: '#6b7280'
  }
  
  // Analyze sentiment (simplified)
  const analyzeSentiment = (text: string): Message['sentiment'] => {
    const positive = ['good', 'great', 'love', 'awesome', 'beautiful', 'amazing', 'wonderful']
    const negative = ['bad', 'hate', 'ugly', 'terrible', 'awful', 'horrible']
    const creative = ['create', 'design', 'build', 'imagine', 'art', 'creative', 'idea']
    
    const lowerText = text.toLowerCase()
    
    if (creative.some(word => lowerText.includes(word))) return 'creative'
    if (positive.some(word => lowerText.includes(word))) return 'positive'
    if (negative.some(word => lowerText.includes(word))) return 'negative'
    return 'neutral'
  }
  
  // Generate art based on message
  const generateArtFromMessage = (message: Message) => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const sentiment = message.sentiment
    const color = sentimentColors[sentiment]
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    
    // Create different patterns based on sentiment
    const newStroke: CanvasStroke = {
      points: [],
      color,
      width: 2 + Math.random() * 4,
      sentiment
    }
    
    // Generate points based on sentiment
    const numPoints = 50 + Math.random() * 100
    const baseRadius = 100 + messages.length * 10
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      let radius = baseRadius
      
      switch (sentiment) {
        case 'positive':
          // Expanding circles
          radius += Math.sin(angle * 6) * 30 + Math.random() * 20
          break
        case 'negative':
          // Jagged lines
          radius += (Math.random() - 0.5) * 60
          break
        case 'creative':
          // Spiral pattern
          radius = (i / numPoints) * baseRadius * 1.5
          break
        case 'neutral':
          // Smooth waves
          radius += Math.sin(angle * 3) * 20
          break
      }
      
      const x = centerX + Math.cos(angle + messages.length * 0.1) * radius
      const y = centerY + Math.sin(angle + messages.length * 0.1) * radius
      
      newStroke.points.push({ x, y })
    }
    
    setStrokes(prev => [...prev, newStroke])
  }
  
  // Draw strokes on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    
    const animate = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw all strokes
      strokes.forEach((stroke, strokeIndex) => {
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.width
        ctx.globalAlpha = 0.6
        
        ctx.beginPath()
        stroke.points.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            // Add some animation
            const offset = Math.sin(Date.now() * 0.001 + strokeIndex) * 2
            ctx.lineTo(point.x + offset, point.y + offset)
          }
        })
        
        if (stroke.sentiment === 'creative') {
          ctx.closePath()
        }
        
        ctx.stroke()
      })
      
      ctx.globalAlpha = 1
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [strokes])
  
  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      sentiment: analyzeSentiment(input),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    generateArtFromMessage(userMessage)
    
    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      const aiResponses = [
        "That's an interesting perspective! Let me add to our visual story...",
        "I can feel the emotion in your words. Watch how it transforms the canvas...",
        "Beautiful thought! The art is evolving with our conversation...",
        "Your words are painting something unique. Let's see where this goes..."
      ]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        sentiment: userMessage.sentiment,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      generateArtFromMessage(aiMessage)
      setIsTyping(false)
    }, 1500)
  }
  
  // Clear canvas
  const clearCanvas = () => {
    setStrokes([])
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && canvasRef.current) {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }
  
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      {/* Chat interface */}
      <div className="relative z-10 h-full flex">
        {/* Chat sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-96 h-full bg-background/90 backdrop-blur-sm border-r border-border flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold mb-2">Conversation Canvas</h1>
            <p className="text-sm text-muted-foreground">
              Chat creates art. Each message adds to the visual story.
            </p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: sentimentColors[message.sentiment] }}
                      />
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-1"
              >
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
              </motion.div>
            )}
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="p-6 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share a thought, feeling, or idea..."
                className="flex-1 px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
        
        {/* Canvas controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-6 right-6 flex gap-4"
        >
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-background transition-colors text-sm"
          >
            Clear Canvas
          </button>
          
          {/* Sentiment legend */}
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2 flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Sentiments:</span>
            {Object.entries(sentimentColors).map(([sentiment, color]) => (
              <div key={sentiment} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs capitalize">{sentiment}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 right-6 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2"
        >
          <p className="text-xs text-muted-foreground">
            Try different emotions: &quot;I love this!&quot;, &quot;Create something beautiful&quot;, &quot;This is frustrating&quot;
          </p>
        </motion.div>
      </div>
      
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4"
      >
        <Link
          href="/code-visual"
          className="px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-background transition-colors text-sm"
        >
          ← Previous: Code-to-Visual
        </Link>
        <Link
          href="/hero-testing"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
        >
          Back to Testing Lab →
        </Link>
      </motion.div>
    </div>
  )
}
