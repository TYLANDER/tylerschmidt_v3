"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import React from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  variant?: "fade" | "slide" | "typewriter" | "reveal" | "decrypt"
  delay?: number
  duration?: number
  stagger?: number
  repeat?: boolean
  onComplete?: () => void
}

const textVariants = {
  fade: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slide: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  typewriter: {
    hidden: { width: 0 },
    visible: { width: "auto" },
  },
  reveal: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  decrypt: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  },
}

export function AnimatedText({
  text,
  className,
  as: Component = "span",
  variant = "fade",
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  repeat = false,
  onComplete,
}: AnimatedTextProps) {
  const words = text.split(" ")

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = textVariants[variant]

  if (variant === "typewriter") {
    return (
      <Component className={cn("overflow-hidden", className)}>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{
            duration: duration * 2,
            delay,
            ease: "easeInOut",
            repeat: repeat ? Infinity : 0,
            repeatType: "loop",
            repeatDelay: 2,
          }}
          onAnimationComplete={onComplete}
          className="inline-block"
        >
          {text}
        </motion.span>
      </Component>
    )
  }

  if (variant === "decrypt") {
    return <DecryptText text={text} className={className} Component={Component} delay={delay} onComplete={onComplete} />
  }

  return (
    <Component className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onAnimationComplete={onComplete}
        className="inline-block"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: "easeOut",
              repeat: repeat ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 2,
            }}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}

interface GradientTextProps {
  text: string
  className?: string
  gradient?: "primary" | "accent" | "rainbow" | "sunset" | "ocean"
  animated?: boolean
}

const gradients = {
  primary: "from-primary to-accent",
  accent: "from-accent to-warning", 
  rainbow: "from-purple-400 via-pink-500 to-red-500",
  sunset: "from-orange-400 via-pink-500 to-purple-600",
  ocean: "from-blue-400 via-cyan-500 to-teal-600",
}

export function GradientText({
  text,
  className,
  gradient = "primary",
  animated = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[gradient],
        animated && "animate-pulse",
        className
      )}
    >
      {text}
    </span>
  )
}

// Classified text component - randomly encrypts words like a redacted document
export function ClassifiedText({ 
  text, 
  className, 
  redactionRate = 0.15,
  delay = 0 
}: {
  text: string
  className?: string
  redactionRate?: number
  delay?: number
}) {
  const [mounted, setMounted] = useState(false)
  const [redactedIndices, setRedactedIndices] = useState<number[]>([])
  
  // Prevent hydration mismatch by only showing encrypted version client-side
  useEffect(() => {
    setMounted(true)
    const words = text.split(' ')
    
    // Use deterministic selection based on text content to avoid hydration issues
    const seed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const rng = () => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    const indices = words
      .map((_, index) => index)
      .filter((_, index) => rng() * (index + 1) < redactionRate * words.length)
      .slice(0, Math.floor(words.length * redactionRate * 1.5))
    
    setRedactedIndices(indices)
  }, [text, redactionRate])

  // Show plain text on server, encrypted on client after mount
  if (!mounted) {
    return <p className={className}>{text}</p>
  }

  const words = text.split(' ')
  
  return (
    <p className={className}>
      {words.map((word, index) => {
        const isRedacted = redactedIndices.includes(index)
        const wordDelay = delay + (redactedIndices.indexOf(index) * 0.1)
        
        if (isRedacted) {
          return (
            <span key={`${word}-${index}`} className="inline">
              <DecryptText 
                text={word} 
                Component="span" 
                delay={wordDelay}
                className="inline"
              />
              {index < words.length - 1 ? ' ' : ''}
            </span>
          )
        }
        
        return (
          <span key={`${word}-${index}`} className="inline">
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}

// Decrypt animation component inspired by Reform Collective
function DecryptText({ 
  text, 
  className, 
  Component, 
  delay = 0, 

  onComplete 
}: {
  text: string
  className?: string
  Component: React.ElementType
  delay?: number
  onComplete?: () => void
}) {
  const [displayText, setDisplayText] = useState("")
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
  
  useEffect(() => {
    // Initialize with random characters
    setDisplayText(text.split('').map(char => 
      char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)]
    ).join(''))
  }, [text, characters])

  useEffect(() => {
    const timer = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(() => 
          text.split('').map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return text[index]
            return characters[Math.floor(Math.random() * characters.length)]
          }).join('')
        )
        
        if (iteration >= text.length) {
          clearInterval(interval)
          onComplete?.()
        }
        
        iteration += 1.5
      }, 15)
      
      return () => clearInterval(interval)
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [text, delay, onComplete, characters])

  return React.createElement(Component, { className }, displayText)
} 