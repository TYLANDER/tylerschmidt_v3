"use client"

import { HeroLivingAI } from '@/components/sections/HeroLivingAI'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LivingPortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroLivingAI />
      
      {/* Navigation overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4"
      >
        <Link
          href="/hero-testing"
          className="px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-background transition-colors text-sm"
        >
          ← Back to Testing Lab
        </Link>
        <Link
          href="/code-visual"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
        >
          Next: Code-to-Visual →
        </Link>
      </motion.div>
      
      {/* Info panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-20 right-6 z-50 max-w-sm bg-card/95 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold mb-3">Living Portfolio Generator</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This hero uses AI to build a personalized experience in real-time based on visitor context. 
          It demonstrates the potential of LangDiff for progressive UI generation.
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
