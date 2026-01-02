"use client"

import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ActivityChartProps {
  data: Array<{ date: string; count: number }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  // Format dates for display
  const formattedData = data.map((d) => ({
    ...d,
    displayDate: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-[200px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgb(var(--accent))"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="rgb(var(--accent))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
                    <p className="text-xs text-muted-foreground">
                      {payload[0].payload.displayDate}
                    </p>
                    <p className="text-sm font-semibold">
                      {payload[0].value} commit
                      {payload[0].value !== 1 ? "s" : ""}
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="rgb(var(--accent))"
            strokeWidth={2}
            fill="url(#colorCommits)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
