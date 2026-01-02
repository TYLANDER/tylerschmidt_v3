"use client"

import { motion } from "framer-motion"
import { FileText, ExternalLink, GitCommit } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DigestReport } from "@/lib/gitdigest/ai"

interface ReportCardProps {
  report: DigestReport
  index?: number
}

export function ReportCard({ report, index = 0 }: ReportCardProps) {
  const startDate = new Date(report.dateRange.start).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  )
  const endDate = new Date(report.dateRange.end).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50",
        "bg-card/50 backdrop-blur-sm",
        "transition-shadow duration-300 hover:shadow-lg hover:shadow-accent/5"
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">
                {startDate} - {endDate}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(report.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
              <GitCommit className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {report.stats.totalCommits}
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary Preview */}
        <div className="mb-4 space-y-2">
          {report.executiveSummary.slice(0, 3).map((item, i) => (
            <p key={i} className="line-clamp-1 text-sm text-muted-foreground">
              • {item}
            </p>
          ))}
          {report.executiveSummary.length > 3 && (
            <p className="text-sm text-accent">
              +{report.executiveSummary.length - 3} more items
            </p>
          )}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Repos</p>
              <p className="font-semibold">{report.stats.activeRepos}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Peak Day</p>
              <p className="font-semibold">
                {report.stats.mostActiveDayCommits} commits
              </p>
            </div>
          </div>

          <button className="flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent/80">
            View Report
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
