"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { precisionPunk } from '@/design/precision-punk-tokens'

interface BreathingGridProps {
  children: ReactNode[]
  columns?: number
  breatheIntensity?: number
}

export function BreathingGrid({ 
  children, 
  columns = 3,
  breatheIntensity = 1 
}: BreathingGridProps) {
  // Calculate grid based on golden ratio
  const gridGap = precisionPunk.grid.base * 4
  const rebelGap = gridGap * precisionPunk.grid.rebel
  
  return (
    <div 
      className="grid relative"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gridGap}px`,
      }}
    >
      {children.map((child, index) => {
        // Every nth item rebels
        const isRebel = (index + 1) % 3 === 0
        const rebelAngle = (index * 13) % 360 // Prime number for chaos
        
        return (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: isRebel ? [0, -1, 1, 0] : 0,
            }}
            transition={{
              delay: index * 0.1,
              duration: Number(precisionPunk.motion.flow) / 1000,
              rotate: {
                duration: Number(precisionPunk.motion.breath) / 1000,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            whileHover={{
              scale: 1.05,
              zIndex: 10,
              transition: {
                duration: Number(precisionPunk.motion.quick) / 1000,
                ease: [0.23, 1, 0.32, 1]
              }
            }}
            style={{
              transformOrigin: isRebel ? 
                `${50 + Math.sin(rebelAngle) * 20}% ${50 + Math.cos(rebelAngle) * 20}%` : 
                'center'
            }}
          >
            {/* Grid lines that break on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <svg className="absolute inset-0 w-full h-full">
                <rect 
                  x="0" 
                  y="0" 
                  width="100%" 
                  height="100%" 
                  fill="none" 
                  stroke="var(--voltage)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              </svg>
            </motion.div>
            
            {child}
          </motion.div>
        )
      })}
      
      {/* Rebel lines that connect items */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        {children.map((_, index) => {
          if ((index + 1) % 3 === 0 && index < children.length - 1) {
            const x1 = ((index % columns) * 100) / columns + 50 / columns
            const y1 = (Math.floor(index / columns) * 100) / Math.ceil(children.length / columns) + 50 / Math.ceil(children.length / columns)
            const nextIndex = index + 1
            const x2 = ((nextIndex % columns) * 100) / columns + 50 / columns
            const y2 = (Math.floor(nextIndex / columns) * 100) / Math.ceil(children.length / columns) + 50 / Math.ceil(children.length / columns)
            
            return (
              <motion.line
                key={`rebel-${index}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="var(--voltage)"
                strokeWidth="0.5"
                strokeDasharray="2 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: Number(precisionPunk.motion.breath) / 1000,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            )
          }
          return null
        })}
      </svg>
    </div>
  )
}
