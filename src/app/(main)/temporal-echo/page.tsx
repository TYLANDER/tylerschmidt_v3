"use client"

import { HeroTemporalEcho } from "@/components/sections/HeroTemporalEcho"
import { motion } from "framer-motion"
import Link from "next/link"

export default function TemporalEchoPage() {
  return (
    <div className="relative min-h-screen">
      <HeroTemporalEcho />

      {/* Back to Lab button */}
      <motion.div
        className="fixed left-6 top-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/lab"
          className="group inline-flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black dark:bg-white/80 dark:text-black dark:hover:bg-white"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
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
        <div className="rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm dark:bg-white/80 dark:text-black">
          <h3 className="mb-1 font-semibold">Temporal Echo System</h3>
          <p className="text-sm opacity-80">
            Visualize the echoes of past visitors in real-time
          </p>
        </div>
      </motion.div>
    </div>
  )
}
