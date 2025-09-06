"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CarouselImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface ImageCarouselProps {
  images: CarouselImage[]
  onImageClick?: (index: number) => void
  className?: string
  showThumbnails?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

interface ImageState {
  loaded: boolean
  naturalWidth: number
  naturalHeight: number
}

export function ImageCarousel({
  images,
  onImageClick,
  className,
  showThumbnails = false,
  autoPlay = false,
  autoPlayInterval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageStates, setImageStates] = useState<Record<number, ImageState>>({})

  // Preload images
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

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToPrevious, goToNext])

  if (!images || images.length === 0) return null

  const currentImage = images[currentIndex]
  const currentState = imageStates[currentIndex]

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main carousel container */}
      <div className="space-y-4">
        {/* Image display area */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className={cn(
                  "h-auto w-full",
                  onImageClick && "cursor-zoom-in"
                )}
                onClick={() => onImageClick?.(currentIndex)}
                loading={currentIndex === 0 ? "eager" : "lazy"}
                style={{
                  display: currentState?.loaded ? "block" : "none",
                }}
              />

              {/* Loading state */}
              {!currentState?.loaded && (
                <div className="flex min-h-[400px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-400" />
                </div>
              )}

              {/* Zoom indicator */}
              {onImageClick && currentState?.loaded && (
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
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows - only show if more than one image */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition hover:bg-black/40"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition hover:bg-black/40"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        <div className="min-h-[1.5rem]">
          {currentImage.caption && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {currentImage.caption}
            </p>
          )}
        </div>

        {/* Navigation controls */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-4">
            {/* Page indicators */}
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-8 bg-gray-800 dark:bg-gray-200"
                      : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Image counter */}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Thumbnails strip */}
        {showThumbnails && images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "relative flex-shrink-0 overflow-hidden rounded-md transition-all",
                  index === currentIndex
                    ? "ring-2 ring-blue-500"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-16 w-24 object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
