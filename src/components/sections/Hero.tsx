"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { designTokens } from "@/design/design-tokens"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [isBreaking, setIsBreaking] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Create spring physics for the rebellion
  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set((e.clientX - centerX) / 10)
        mouseY.set((e.clientY - centerY) / 10)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Grid lines that breathe
  const GridLines = () => (
    <svg
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: designTokens.layers.ground }}
    >
      <defs>
        <pattern
          id="grid"
          width={designTokens.grid.base * 8}
          height={designTokens.grid.base * 8}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${designTokens.grid.base * 8} 0 L 0 0 0 ${designTokens.grid.base * 8}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-gray-400 dark:text-gray-700"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white dark:bg-black"
      onMouseEnter={() => setIsBreaking(true)}
      onMouseLeave={() => setIsBreaking(false)}
    >
      {/* The Perfect Grid */}
      <div className="absolute inset-0 opacity-20">
        <GridLines />
      </div>

      {/* The Breaking Point */}
      <motion.div className="absolute inset-0" style={{ x, y }}>
        <div className="relative flex h-full items-center justify-center">
          {/* Mathematical Beauty */}
          <div className="relative z-10 px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: Number(designTokens.motion.breath) / 1000,
                ease: [0.37, 0, 0.63, 1],
              }}
            >
              {/* The Name - Where precision begins */}
              <motion.h1
                className="relative font-heading leading-none tracking-tighter"
                style={{ fontSize: designTokens.type.display }}
              >
                <motion.span
                  className="block text-black dark:text-white"
                  animate={
                    isBreaking
                      ? {
                          x: [-2, 2, -2],
                          textShadow: [
                            "0 0 0 rgba(0,102,255,0)",
                            "4px 4px 0 rgba(0,102,255,0.5)",
                            "-4px -4px 0 rgba(255,0,68,0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.3,
                    repeat: isBreaking ? Infinity : 0,
                    repeatType: "reverse",
                  }}
                >
                  TYLER
                </motion.span>
                <motion.span
                  className="mt-[-0.1em] block text-black dark:text-white"
                  animate={
                    isBreaking
                      ? {
                          x: [2, -2, 2],
                          textShadow: [
                            "0 0 0 rgba(255,0,68,0)",
                            "-4px -4px 0 rgba(255,0,68,0.5)",
                            "4px 4px 0 rgba(0,255,136,0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.3,
                    repeat: isBreaking ? Infinity : 0,
                    repeatType: "reverse",
                    delay: 0.1,
                  }}
                >
                  SCHMIDT
                </motion.span>
              </motion.h1>

              {/* The Statement - Where punk emerges */}
              <motion.p
                className="mx-auto mt-8 max-w-2xl text-gray-700 dark:text-gray-300"
                style={{ fontSize: designTokens.type.title }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <span className="font-light">I design </span>
                <motion.span
                  className="text-voltage font-bold"
                  animate={
                    isBreaking
                      ? {
                          color: [
                            designTokens.color.voltage,
                            designTokens.color.danger,
                            designTokens.color.acid,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  systems that feel
                </motion.span>
                <span className="font-light">.</span>
              </motion.p>

              {/* The Manifesto - Precision Punk philosophy */}
              <motion.p
                className="mx-auto mt-6 max-w-xl text-gray-600 dark:text-gray-400"
                style={{ fontSize: designTokens.type.body }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                Where mathematical precision meets raw emotion. Every pixel
                calculated to move the soul.
              </motion.p>
            </motion.div>

            {/* The Action - Breaking the grid */}
            <motion.div
              className="mt-12 flex justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#work"
                className="group relative overflow-hidden px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 font-medium text-white">
                  BREAK THE GRID
                </span>
                <motion.div
                  className="bg-voltage absolute inset-0"
                  initial={{ skewX: -45, x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
                <div className="border-voltage absolute inset-0 border-2" />
              </motion.a>

              <motion.a
                href="#about"
                className="border border-gray-300 px-8 py-4 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                whileHover={{
                  borderColor: designTokens.color.voltage,
                  color: designTokens.color.voltage,
                  x: [0, -2, 2, -2, 2, 0],
                }}
                transition={{ x: { duration: 0.4 } }}
              >
                FIND THE RHYTHM
              </motion.a>
            </motion.div>
          </div>

          {/* The Chaos - Mathematical rebellion */}
          <div className="pointer-events-none absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-voltage/20 absolute w-px"
                style={{
                  height: `${100 + i * 50}px`,
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={
                  isBreaking
                    ? {
                        rotate: [0, 180, 360],
                        opacity: [0.2, 0.8, 0.2],
                        scaleY: [1, 1.5, 1],
                      }
                    : {
                        rotate: 0,
                        opacity: 0,
                      }
                }
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* The Pulse - Heartbeat of the system */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: Number(designTokens.motion.pulse) / 1000,
          repeat: Infinity,
          ease: [0.37, 0, 0.63, 1],
        }}
      >
        <div className="bg-voltage/50 h-16 w-1" />
      </motion.div>
    </section>
  )
}
