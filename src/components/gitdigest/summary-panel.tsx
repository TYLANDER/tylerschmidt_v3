"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DigestReport, RepoBreakdown } from "@/lib/gitdigest/ai"

interface SummaryPanelProps {
  report: DigestReport
}

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 20) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayText("")
    setIsComplete(false)
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return { displayText, isComplete }
}

function TypewriterBullet({ text, delay }: { text: string; delay: number }) {
  const [show, setShow] = useState(false)
  const { displayText, isComplete } = useTypewriter(show ? text : "", 15)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!show) return null

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-2"
    >
      <span className="text-accent">•</span>
      <span>
        {displayText}
        {!isComplete && (
          <span className="inline-block h-4 w-0.5 animate-pulse bg-accent" />
        )}
      </span>
    </motion.li>
  )
}

function RepoSection({
  breakdown,
  index,
}: {
  breakdown: RepoBreakdown
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="rounded-lg border border-border/50 bg-card/30"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold">
            {breakdown.repo}
          </span>
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            {breakdown.commitCount} commits
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-border/50 px-4 pb-4 pt-3"
        >
          <p className="mb-3 text-sm text-muted-foreground">
            {breakdown.summary}
          </p>
          {breakdown.highlights.length > 0 && (
            <ul className="space-y-1">
              {breakdown.highlights.map((highlight, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="text-success">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
          <a
            href={breakdown.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline"
          >
            View on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}

export function SummaryPanel({ report }: SummaryPanelProps) {
  const startDate = new Date(report.dateRange.start).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric" }
  )
  const endDate = new Date(report.dateRange.end).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/60">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Dev Report</h2>
          <p className="text-sm text-muted-foreground">
            {startDate} - {endDate}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
          <p className="text-3xl font-bold text-accent">
            {report.stats.totalCommits}
          </p>
          <p className="text-xs text-muted-foreground">Total Commits</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
          <p className="text-3xl font-bold">{report.stats.activeRepos}</p>
          <p className="text-xs text-muted-foreground">Active Repos</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 p-4 text-center">
          <p className="text-3xl font-bold text-success">
            {report.stats.mostActiveDayCommits}
          </p>
          <p className="text-xs text-muted-foreground">Peak Day</p>
        </div>
      </motion.div>

      {/* Executive Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={cn(
          "rounded-xl border border-border/50 p-6",
          "bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm"
        )}
      >
        <h3 className="mb-4 text-lg font-semibold">Executive Summary</h3>
        <ul className="space-y-3 text-sm leading-relaxed">
          {report.executiveSummary.map((item, i) => (
            <TypewriterBullet key={i} text={item} delay={i * 800} />
          ))}
        </ul>
      </motion.div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-semibold">Detailed Breakdown</h3>
        <div className="space-y-3">
          {report.detailedBreakdown.map((breakdown, i) => (
            <RepoSection key={breakdown.repo} breakdown={breakdown} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
