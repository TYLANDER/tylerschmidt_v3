"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  variant?: "fade" | "slide" | "wave" | "typewriter" | "reveal" | "glitch" | "corruption"
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
  wave: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  typewriter: {
    hidden: { width: 0 },
    visible: { width: "auto" },
  },
  reveal: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  glitch: {
    hidden: { 
      opacity: 0, 
      x: [0, -5, 5, -5, 5, 0],
      y: [0, -2, 2, -2, 2, 0],
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1
    },
  },
  corruption: {
    hidden: { 
      opacity: 0,
      rotateX: 90,
      scaleY: 0.1,
      filter: "brightness(0) contrast(200%)"
    },
    visible: { 
      opacity: 1,
      rotateX: 0,
      scaleY: 1,
      filter: "brightness(1) contrast(100%)"
    },
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
  const letters = text.split("")

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: variant === "wave" ? stagger : 0,
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

  if (variant === "wave") {
    return (
      <Component className={className}>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          onAnimationComplete={onComplete}
          className="inline-block"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              transition={{
                duration,
                ease: "easeOut",
                repeat: repeat ? Infinity : 0,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    )
  }

  if (variant === "glitch" || variant === "corruption") {
    return (
      <Component 
        className={cn(
          className,
          variant === "glitch" && "glitch-text",
          variant === "corruption" && "data-viz"
        )}
        data-text={text}
      >
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
                duration: variant === "glitch" ? duration * 0.3 : duration,
                delay: delay + index * stagger,
                ease: variant === "glitch" ? "easeInOut" : "easeOut",
                repeat: repeat ? Infinity : 0,
                repeatType: variant === "glitch" ? "loop" : "reverse",
                repeatDelay: variant === "glitch" ? 3 : 2,
              }}
              className={cn(
                "inline-block mr-2",
                variant === "glitch" && "glitch-hover",
                variant === "corruption" && "corruption-grid"
              )}
              data-text={word}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    )
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