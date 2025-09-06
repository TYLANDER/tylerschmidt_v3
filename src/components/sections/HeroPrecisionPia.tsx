"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion"

export function HeroPrecisionPia() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentWord, setCurrentWord] = useState(0)
  const [gridBreaks, setGridBreaks] = useState(0)
  const [showPia, setShowPia] = useState(false)

  // Dynamic words that describe what I do
  const words = ["systems", "experiences", "interfaces", "products", "futures"]

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const moveX = useTransform(x, [-300, 300], [-20, 20])
  const moveY = useTransform(y, [-300, 300], [-20, 20])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Cycle through words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  // Handle grid breaking
  const handleBreakGrid = () => {
    setGridBreaks((prev) => prev + 1)

    // Show Pia after 10 breaks (easter egg!)
    if (gridBreaks === 9) {
      setShowPia(true)
      setTimeout(() => setShowPia(false), 3000)

      // Log to console
      console.log(
        "%c🐕 PIA APPROVES THIS REBELLION!",
        "color: #ff00ff; font-size: 20px; font-weight: bold;"
      )
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated grid pattern - Precision */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              animate={{
                strokeDasharray: gridBreaks > 5 ? ["0 64", "64 0"] : "0 0",
              }}
              transition={{ duration: 0.5 }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Pia Easter Egg */}
      <AnimatePresence>
        {showPia && (
          <motion.div
            className="absolute bottom-10 right-10 z-50"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -600, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            <div className="rounded-lg border border-accent/20 bg-primary/10 p-4 backdrop-blur-sm">
              <p className="font-mono text-sm text-accent">
                Creative Review: APPROVED ✓
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                - Pia, Creative Director
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
        style={{ x: moveX, y: moveY }}
      >
        {/* Name - Precision Typography */}
        <motion.h1
          className="mb-8 font-heading text-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="block text-6xl font-bold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl xl:text-9xl">
            Tyler Schmidt
          </span>
        </motion.h1>

        {/* Dynamic tagline with personality */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="text-2xl font-light text-foreground/80 md:text-3xl lg:text-4xl">
            I design{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  className="font-medium text-accent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            that feel.
          </p>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Product designer and engineer crafting digital experiences where
            precision meets intuition.
            <span className="hidden">Quality assured by Pia.</span>
          </motion.p>
        </motion.div>

        {/* CTA Buttons - Punk Aesthetic */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="#work"
            className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 font-medium text-primary-foreground"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.button
            onClick={handleBreakGrid}
            className="group relative overflow-hidden rounded-lg border-2 border-border px-8 py-4 font-medium text-foreground transition-colors duration-300 hover:border-accent"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Break the Grid</span>
            <motion.div
              className="absolute inset-0 bg-accent/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            {gridBreaks > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                {gridBreaks}
              </span>
            )}
          </motion.button>
        </motion.div>

        {/* Subtle quality indicator */}
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Precision with Personality™
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/30"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="mt-2 h-2 w-1 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating elements - now with subtle paw print chance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 rounded-full bg-accent/5"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Hidden paw print that might appear */}
            {Math.random() > 0.95 && (
              <div className="absolute inset-0 flex items-center justify-center text-6xl text-accent/10">
                🐾
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
