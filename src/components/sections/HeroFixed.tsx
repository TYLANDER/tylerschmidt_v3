"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'


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

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white dark:bg-black"
      onMouseEnter={() => setIsBreaking(true)}
      onMouseLeave={() => setIsBreaking(false)}
    >
      {/* Simple background for debugging */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black opacity-50" />

      <div className="relative h-full flex items-center justify-center">
        <div className="relative z-10 text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.72,
              ease: [0.37, 0, 0.63, 1] 
            }}
          >
            {/* Using standard Tailwind colors for debugging */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              <motion.span
                className="block text-black dark:text-white"
                animate={isBreaking ? {
                  x: [-2, 2, -2],
                } : {}}
                transition={{
                  duration: 0.3,
                  repeat: isBreaking ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                TYLER
              </motion.span>
              <motion.span
                className="block text-black dark:text-white mt-[-0.1em]"
                animate={isBreaking ? {
                  x: [2, -2, 2],
                } : {}}
                transition={{
                  duration: 0.3,
                  repeat: isBreaking ? Infinity : 0,
                  repeatType: "reverse",
                  delay: 0.1
                }}
              >
                SCHMIDT
              </motion.span>
            </h1>

            <motion.p 
              className="mt-8 text-gray-700 dark:text-gray-300 text-2xl md:text-3xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span className="font-light">I design </span>
              <motion.span 
                className="font-bold text-blue-600 dark:text-blue-400"
                animate={isBreaking ? { 
                  color: ['#0066FF', '#FF0044', '#00FF88'],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                systems that feel
              </motion.span>
              <span className="font-light">.</span>
            </motion.p>

            <motion.p
              className="mt-6 text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Where mathematical precision meets raw emotion.
              Every pixel calculated to move the soul.
            </motion.p>

            <motion.div
              className="mt-12 flex gap-6 justify-center flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#work"
                className="group relative px-8 py-4 bg-blue-600 text-white font-medium overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BREAK THE GRID
              </motion.a>

              <motion.a
                href="#about"
                className="px-8 py-4 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                whileHover={{ 
                  borderColor: '#0066FF',
                  color: '#0066FF',
                }}
              >
                FIND THE RHYTHM
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Debug info */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
        <p>Theme: {typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'}</p>
        <p>Component: HeroFixed (Debug Version)</p>
      </div>
    </section>
  )
}
