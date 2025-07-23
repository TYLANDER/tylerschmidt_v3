"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: React.ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    scale: 1.02,
    y: -20,
  },
}

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.4,
}

const overlayVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
  },
  exit: {
    scaleY: 0,
  },
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="relative"
      >
        {children}
        
        {/* Transition Overlay */}
        <motion.div
          className="fixed inset-0 z-[60] bg-accent origin-bottom pointer-events-none"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </motion.div>
    </AnimatePresence>
  )
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-20"
    >
      {children}
    </motion.main>
  )
} 