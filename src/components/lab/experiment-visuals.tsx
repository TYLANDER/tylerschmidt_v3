"use client"

import { motion } from 'framer-motion'

export const ParticleTypographyVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    <defs>
      <filter id="rgbShift">
        <feOffset in="SourceGraphic" dx="-2" dy="0" result="r" />
        <feOffset in="SourceGraphic" dx="2" dy="0" result="b" />
        <feBlend mode="screen" in="r" in2="SourceGraphic" result="rb" />
        <feBlend mode="screen" in="rb" in2="b" />
      </filter>
    </defs>
    <g filter="url(#rgbShift)">
      {[...Array(50)].map((_, i) => (
        <motion.circle
          key={i}
          cx={80 + Math.cos(i * 0.5) * (20 + i * 0.5)}
          cy={80 + Math.sin(i * 0.5) * (20 + i * 0.5)}
          r="2"
          fill="currentColor"
          className="text-blue-500"
          animate={{
            cx: 80 + Math.cos(i * 0.5 + Date.now() * 0.001) * (20 + i * 0.5),
            cy: 80 + Math.sin(i * 0.5 + Date.now() * 0.001) * (20 + i * 0.5),
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </g>
  </svg>
)

export const NeuralNetworkVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    {/* Nodes */}
    {[
      { x: 30, y: 40 }, { x: 30, y: 80 }, { x: 30, y: 120 },
      { x: 80, y: 30 }, { x: 80, y: 60 }, { x: 80, y: 90 }, { x: 80, y: 120 },
      { x: 130, y: 60 }, { x: 130, y: 100 }
    ].map((node, i) => (
      <motion.circle
        key={`node-${i}`}
        cx={node.x}
        cy={node.y}
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-purple-500"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
      />
    ))}
    {/* Connections */}
    <path
      d="M38 40 L72 30 M38 40 L72 60 M38 80 L72 60 M38 80 L72 90 M38 120 L72 90 M38 120 L72 120 M88 30 L122 60 M88 60 L122 60 M88 90 L122 100 M88 120 L122 100"
      stroke="currentColor"
      strokeWidth="1"
      className="text-purple-300 dark:text-purple-700"
      opacity="0.5"
    />
  </svg>
)

export const QuantumStateVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-500" opacity="0.3" />
      <circle cx="80" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-500" opacity="0.5" />
      <circle cx="80" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-500" opacity="0.7" />
    </motion.g>
    <motion.g
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <ellipse cx="80" cy="80" rx="50" ry="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500" />
      <ellipse cx="80" cy="80" rx="20" ry="50" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500" />
    </motion.g>
  </svg>
)

export const RealityLayersVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    {[0, 1, 2, 3].map((i) => (
      <motion.rect
        key={i}
        x={40 + i * 10}
        y={40 + i * 10}
        width="80"
        height="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`text-${['red', 'green', 'blue', 'purple'][i]}-500`}
        animate={{ x: 40 + i * 10 + Math.sin(Date.now() * 0.001 + i) * 5 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </svg>
)

export const ConsciousnessStreamVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    {[...Array(5)].map((_, i) => (
      <motion.path
        key={i}
        d={`M 20 ${40 + i * 20} Q 80 ${30 + i * 20} 140 ${40 + i * 20}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-indigo-500"
        opacity={1 - i * 0.2}
        animate={{
          d: [
            `M 20 ${40 + i * 20} Q 80 ${30 + i * 20} 140 ${40 + i * 20}`,
            `M 20 ${40 + i * 20} Q 80 ${50 + i * 20} 140 ${40 + i * 20}`,
            `M 20 ${40 + i * 20} Q 80 ${30 + i * 20} 140 ${40 + i * 20}`,
          ]
        }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
      />
    ))}
  </svg>
)

export const LivingPortfolioVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
      <rect x="40" y="40" width="30" height="40" fill="currentColor" className="text-green-500" opacity="0.6" />
      <rect x="75" y="50" width="30" height="30" fill="currentColor" className="text-green-600" opacity="0.6" />
      <rect x="55" y="85" width="30" height="35" fill="currentColor" className="text-green-400" opacity="0.6" />
      <rect x="90" y="70" width="30" height="50" fill="currentColor" className="text-green-500" opacity="0.6" />
    </motion.g>
  </svg>
)

export const CodeVisualVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    <text x="20" y="40" fontFamily="monospace" fontSize="14" fill="currentColor" className="text-orange-500">
      {'</>'}
    </text>
    <motion.circle
      cx="80"
      cy="80"
      r="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-orange-400"
      strokeDasharray="10 5"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <text x="110" y="120" fontFamily="monospace" fontSize="14" fill="currentColor" className="text-orange-500">
      {'{;}'}
    </text>
  </svg>
)

export const ConversationCanvasVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    <motion.path
      d="M 30 80 Q 50 40, 80 50 T 130 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className="text-pink-500"
      animate={{
        d: [
          "M 30 80 Q 50 40, 80 50 T 130 80",
          "M 30 80 Q 50 120, 80 110 T 130 80",
          "M 30 80 Q 50 40, 80 50 T 130 80",
        ]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <circle cx="30" cy="80" r="5" fill="currentColor" className="text-pink-600" />
    <circle cx="130" cy="80" r="5" fill="currentColor" className="text-pink-600" />
  </svg>
)

export const DimensionalTypographyVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    <text x="60" y="80" fontSize="48" fontWeight="bold" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
      T
    </text>
    <text x="70" y="90" fontSize="48" fontWeight="bold" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
      T
    </text>
    <text x="80" y="100" fontSize="48" fontWeight="bold" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
      T
    </text>
  </svg>
)

export const TemporalEchoVisual = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" className="opacity-80">
    {[0, 1, 2, 3].map((i) => (
      <motion.circle
        key={i}
        cx="80"
        cy="80"
        r={20 + i * 15}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-teal-500"
        opacity={1 - i * 0.25}
        animate={{
          r: [20 + i * 15, 25 + i * 15, 20 + i * 15],
          opacity: [1 - i * 0.25, 0.1, 1 - i * 0.25]
        }}
        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
      />
    ))}
  </svg>
)
