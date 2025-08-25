"use client"

import { HeroConsciousnessStream } from '@/components/sections/HeroConsciousnessStream'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ConsciousnessStreamPage() {
  return (
    <div className="relative min-h-screen">
      <HeroConsciousnessStream />
      
      {/* Back to Lab button */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/80 dark:bg-white/80 backdrop-blur-sm text-white dark:text-black rounded-lg hover:bg-black dark:hover:bg-white transition-all duration-300 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Lab
        </Link>
      </motion.div>
      
      {/* Info card */}
      <motion.div
        className="fixed bottom-6 left-6 z-50 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="bg-black/80 dark:bg-white/80 backdrop-blur-sm text-white dark:text-black rounded-lg p-4">
          <h3 className="font-semibold mb-1">Consciousness Stream</h3>
          <p className="text-sm opacity-80">
            AI-generated thoughts flowing through digital consciousness
          </p>
        </div>
      </motion.div>
    </div>
  )
}
