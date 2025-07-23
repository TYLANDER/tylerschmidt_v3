"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedText } from "@/components/animations/animated-text"

interface LoadingScreenProps {
  show: boolean
  progress?: number
  message?: string
  variant?: "minimal" | "detailed" | "artistic"
  className?: string
}

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, scale: 0.95 }
}

function MinimalLoader({ progress, message }: { progress?: number; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Logo or brand mark */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl"
      />
      
      {/* Progress bar */}
      {typeof progress === "number" && (
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      )}
      
      {/* Loading text */}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

function DetailedLoader({ progress, message }: { progress?: number; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      {/* Animated logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary via-accent to-warning rounded-3xl" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-warning rounded-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Progress section */}
      <div className="w-80 space-y-4">
        {/* Progress bar */}
        <div className="relative">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress || 0}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          {typeof progress === "number" && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-6 right-0 text-xs text-muted-foreground"
            >
              {Math.round(progress)}%
            </motion.span>
          )}
        </div>

        {/* Loading message */}
        {message && (
          <AnimatedText
            text={message}
            variant="fade"
            className="text-center text-muted-foreground"
          />
        )}
      </div>

      {/* Loading dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-accent rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ArtisticLoader({ progress, message }: { progress?: number; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      {/* Artistic geometric animation */}
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 border-2 border-accent/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner circle */}
        <motion.div
          className="absolute inset-6 bg-gradient-to-br from-primary to-accent rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Progress indicator */}
        {typeof progress === "number" && (
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
            style={{ transform: `rotate(${(progress / 100) * 360}deg)` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Floating elements */}
      <div className="relative w-full h-8">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${20 + index * 15}%`,
              top: "50%",
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <AnimatedText
            text={message}
            variant="wave"
            className="text-lg font-medium"
          />
        </motion.div>
      )}
    </div>
  )
}

export function LoadingScreen({
  show,
  progress,
  message = "Loading...",
  variant = "detailed",
  className,
}: LoadingScreenProps) {
  const LoaderComponent = {
    minimal: MinimalLoader,
    detailed: DetailedLoader,
    artistic: ArtisticLoader,
  }[variant]

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center",
            "bg-background/80 backdrop-blur-sm",
            className
          )}
        >
          <LoaderComponent progress={progress} message={message} />
        </motion.div>
      )}
    </AnimatePresence>
  )
} 