"use client"

import Image, { ImageProps } from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  blurDataURL?: string
  animate?: boolean
}

export function OptimizedImage({
  className,
  blurDataURL,
  animate = true,
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.02,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative h-full w-full"
      >
        <Image
          {...props}
          alt={alt}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "object-cover",
            animate && "transition-transform duration-300 group-hover:scale-105"
          )}
        />
      </motion.div>

      {/* Loading skeleton */}
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
    </div>
  )
}
