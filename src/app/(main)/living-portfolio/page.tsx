"use client"

import { HeroLivingAI } from "@/components/sections/HeroLivingAI"
import Link from "next/link"
import { motion } from "framer-motion"

export default function LivingPortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroLivingAI />

      {/* Navigation overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-4"
      >
        <Link
          href="/hero-testing"
          className="rounded-lg border border-border bg-background/80 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-background"
        >
          ← Back to Testing Lab
        </Link>
        <Link
          href="/code-visual"
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Next: Code-to-Visual →
        </Link>
      </motion.div>

      {/* Info panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed right-6 top-20 z-50 max-w-sm rounded-lg border border-border bg-card/95 p-6 backdrop-blur-sm"
      >
        <h2 className="mb-3 text-lg font-semibold">
          Living Portfolio Generator
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          This hero uses AI to build a personalized experience in real-time
          based on visitor context. It demonstrates the potential of LangDiff
          for progressive UI generation.
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Analyzes visitor context (time, device, location)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Streams personalized content progressively</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Suggests relevant projects based on behavior</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
