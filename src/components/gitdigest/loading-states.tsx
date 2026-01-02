"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted/50", className)} />
  )
}

export function ChartSkeleton() {
  return (
    <div className="h-[200px] w-full rounded-xl border border-border/50 bg-card/30 p-4">
      <div className="flex h-full items-end gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${Math.random() * 60 + 20}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex-1 rounded-t bg-muted/50"
          />
        ))}
      </div>
    </div>
  )
}

export function ReportSkeleton() {
  return (
    <div className="space-y-6 rounded-xl border border-border/50 bg-card/30 p-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export function GeneratingLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent/20"
          style={{ width: 64, height: 64 }}
        />
        {/* Spinning ring */}
        <motion.div
          className="rounded-full border-2 border-transparent border-t-accent"
          style={{ width: 64, height: 64 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner pulse */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <p className="font-medium">Generating your report...</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Analyzing commits and crafting summary
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="mt-4 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  )
}
