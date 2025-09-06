"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function HeroFixed() {
  const containerRef = useRef<HTMLElement>(null)
  const [isBreaking, setIsBreaking] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Create spring physics for the rebellion
  const springConfig = { damping: 25, stiffness: 200 }
  useSpring(mouseX, springConfig)
  useSpring(mouseY, springConfig)

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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white dark:bg-black"
      onMouseEnter={() => setIsBreaking(true)}
      onMouseLeave={() => setIsBreaking(false)}
    >
      {/* Simple background for debugging */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50 dark:from-gray-900 dark:to-black" />

      <div className="relative flex h-full items-center justify-center">
        <div className="relative z-10 px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.72,
              ease: [0.37, 0, 0.63, 1],
            }}
          >
            {/* Using standard Tailwind colors for debugging */}
            <h1 className="text-6xl font-bold leading-none tracking-tighter md:text-8xl">
              <motion.span
                className="block text-black dark:text-white"
                animate={
                  isBreaking
                    ? {
                        x: [-2, 2, -2],
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
            </h1>

            <motion.p
              className="mx-auto mt-8 max-w-2xl text-2xl text-gray-700 dark:text-gray-300 md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="font-light">I design </span>
              <motion.span
                className="font-bold text-blue-600 dark:text-blue-400"
                animate={
                  isBreaking
                    ? {
                        color: ["#0066FF", "#FF0044", "#00FF88"],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                systems that feel
              </motion.span>
              <span className="font-light">.</span>
            </motion.p>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Where mathematical precision meets raw emotion. Every pixel
              calculated to move the soul.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#work"
                className="group relative overflow-hidden bg-blue-600 px-8 py-4 font-medium text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BREAK THE GRID
              </motion.a>

              <motion.a
                href="#about"
                className="border border-gray-300 px-8 py-4 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                whileHover={{
                  borderColor: "#0066FF",
                  color: "#0066FF",
                }}
              >
                FIND THE RHYTHM
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Debug info */}
      <div className="absolute bottom-4 left-4 font-mono text-xs text-gray-500 dark:text-gray-400">
        <p>
          Theme:{" "}
          {typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "dark"
            : "light"}
        </p>
        <p>Component: HeroFixed (Debug Version)</p>
      </div>
    </section>
  )
}
