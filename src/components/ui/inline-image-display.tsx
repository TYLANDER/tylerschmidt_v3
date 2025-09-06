"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface InlineImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface InlineImageDisplayProps {
  images: InlineImage[]
  columns?: 1 | 2 | 3
  onImageClick?: (index: number) => void
  className?: string
  showCaptions?: boolean
}

interface ImageState {
  loaded: boolean
  naturalWidth: number
  naturalHeight: number
}

export function InlineImageDisplay({
  images,
  columns = 1,
  onImageClick,
  className,
  showCaptions = true,
}: InlineImageDisplayProps) {
  const [imageStates, setImageStates] = useState<Record<number, ImageState>>({})

  // Preload images and get natural dimensions
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image()
      img.onload = () => {
        setImageStates((prev) => ({
          ...prev,
          [index]: {
            loaded: true,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          },
        }))
      }
      img.src = image.src
    })
  }, [images])

  if (!images || images.length === 0) return null

  // Single image display
  if (images.length === 1) {
    const image = images[0]
    const state = imageStates[0]

    return (
      <div className={cn("relative w-full", className)}>
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900">
          <img
            src={image.src}
            alt={image.alt}
            className={cn(
              "h-auto w-full",
              onImageClick &&
                "cursor-zoom-in transition-transform hover:scale-[1.02]"
            )}
            onClick={() => onImageClick?.(0)}
            loading="eager"
            style={{
              display: state?.loaded ? "block" : "none",
            }}
          />

          {/* Loading state */}
          {!state?.loaded && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-400" />
            </div>
          )}

          {/* Zoom indicator overlay */}
          {onImageClick && state?.loaded && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity hover:opacity-100">
              <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        {showCaptions && image.caption && (
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
            {image.caption}
          </p>
        )}
      </div>
    )
  }

  // Grid layout for multiple images
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {images.map((image, index) => {
        const state = imageStates[index]

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "h-auto w-full",
                  onImageClick &&
                    "cursor-zoom-in transition-transform group-hover:scale-[1.02]"
                )}
                onClick={() => onImageClick?.(index)}
                loading="lazy"
                style={{
                  display: state?.loaded ? "block" : "none",
                }}
              />

              {/* Loading state */}
              {!state?.loaded && (
                <div className="flex min-h-[200px] items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-400" />
                </div>
              )}

              {/* Zoom indicator overlay */}
              {onImageClick && state?.loaded && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Caption */}
            {showCaptions && image.caption && (
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {image.caption}
              </p>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
