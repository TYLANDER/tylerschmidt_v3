"use client"

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlitchButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'voltage' | 'danger' | 'ghost' | 'brutal'
  size?: 'sm' | 'md' | 'lg'
  rebellion?: boolean // Enable chaotic behavior
}

export const GlitchButton = forwardRef<HTMLButtonElement, GlitchButtonProps>(
  ({ className, variant = 'voltage', size = 'md', rebellion = true, children, ...props }, ref) => {
    const [isRebelling, setIsRebelling] = useState(false)
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }
    
    const variants = {
      voltage: 'bg-voltage text-pure border-voltage',
      danger: 'bg-danger text-pure border-danger',
      ghost: 'bg-transparent text-foreground border-border',
      brutal: 'bg-void dark:bg-pure text-pure dark:text-void border-void dark:border-pure',
    }
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative overflow-hidden border-2 font-medium transition-colors',
          sizes[size],
          variants[variant],
          className
        )}
        whileHover={{ scale: rebellion ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsRebelling(true)}
        onHoverEnd={() => setIsRebelling(false)}
        {...props}
      >
        {/* The content */}
        <span className="relative z-10">{children as React.ReactNode}</span>
        
        {/* Glitch effect on hover */}
        {rebellion && isRebelling && (
          <>
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-danger opacity-80"
              initial={{ x: 0 }}
              animate={{ x: [-2, 2, -2, 2, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              {children as React.ReactNode}
            </motion.span>
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-acid opacity-60"
              initial={{ x: 0 }}
              animate={{ x: [2, -2, 2, -2, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, delay: 0.05 }}
            >
              {children as React.ReactNode}
            </motion.span>
          </>
        )}
        
        {/* Scan line */}
        <motion.div
          className="absolute inset-x-0 h-px bg-current opacity-0"
          animate={isRebelling ? {
            opacity: [0, 1, 0],
            y: ['-100%', '100%'],
          } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        
        {/* Corner rebels */}
        {rebellion && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current"
              animate={isRebelling ? {
                scale: [1, 1.5, 1],
                rotate: [0, 90, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current"
              animate={isRebelling ? {
                scale: [1, 1.5, 1],
                rotate: [0, -90, 0],
              } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </>
        )}
      </motion.button>
    )
  }
)

GlitchButton.displayName = 'GlitchButton'
