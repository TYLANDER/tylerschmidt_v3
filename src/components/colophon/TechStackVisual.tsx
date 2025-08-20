'use client'

import { motion } from 'framer-motion'

export function TechStackVisual() {
  return (
    <div className="relative w-full h-64 mb-12">
      <svg
        viewBox="0 0 800 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid Background */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-200 dark:text-gray-800"
            />
          </pattern>
        </defs>
        <rect width="800" height="300" fill="url(#grid)" />

        {/* Animated Connections */}
        <motion.path
          d="M 100 150 Q 400 50 700 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-400 dark:text-gray-600"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Tech Stack Nodes */}
        <g>
          {/* Next.js Node */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <circle cx="100" cy="150" r="40" fill="currentColor" className="text-gray-900 dark:text-gray-100" />
            <text x="100" y="155" textAnchor="middle" className="fill-gray-100 dark:fill-gray-900 text-sm font-bold">
              Next.js
            </text>
          </motion.g>

          {/* TypeScript Node */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <rect x="360" y="110" width="80" height="80" fill="currentColor" className="text-blue-600 dark:text-blue-400" />
            <text x="400" y="155" textAnchor="middle" className="fill-white text-sm font-bold">
              TS
            </text>
          </motion.g>

          {/* Vercel Node */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <polygon
              points="700,110 740,150 700,190 660,150"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            />
            <text x="700" y="155" textAnchor="middle" className="fill-gray-100 dark:fill-gray-900 text-sm font-bold">
              ▲
            </text>
          </motion.g>
        </g>

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={150 + i * 120}
            cy={200 + Math.sin(i) * 20}
            r="3"
            fill="currentColor"
            className="text-gray-400 dark:text-gray-600"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function PerformanceMetrics() {
  const metrics = [
    { label: 'Performance', value: 100, color: 'text-green-500' },
    { label: 'Accessibility', value: 100, color: 'text-blue-500' },
    { label: 'Best Practices', value: 100, color: 'text-purple-500' },
    { label: 'SEO', value: 100, color: 'text-orange-500' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="text-center"
        >
          <div className="relative w-24 h-24 mx-auto mb-3">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-800"
              />
              <motion.circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - metric.value / 100)}`}
                className={metric.color}
                initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - metric.value / 100) }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{metric.value}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
