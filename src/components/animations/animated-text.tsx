"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  variant?: "fade" | "slide" | "wave" | "typewriter" | "reveal"
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