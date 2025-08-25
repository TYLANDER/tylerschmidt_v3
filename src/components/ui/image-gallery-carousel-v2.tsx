'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryCarouselV2Props {
  images: GalleryImage[]
  className?: string
}

export function ImageGalleryCarouselV2({ images, className }: ImageGalleryCarouselV2Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({})
  const [imageDimensions, setImageDimensions] = useState<Record<number, { width: number; height: number }>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Preload images and get dimensions
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image()
      img.onload = () => {
        setImageLoadingStates(prev => ({ ...prev, [index]: true }))
        setImageDimensions(prev => ({ 
          ...prev, 
          [index]: { width: img.naturalWidth, height: img.naturalHeight }
        }))
      }
      img.src = image.src
    })
  }, [images])

  if (!images || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      {/* Main image container - App Store style */}
      <div className="relative w-full">
        {/* Dynamic container that adapts to image aspect ratio */}
        <div className="relative bg-white dark:bg-gray-950 rounded-2xl shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              {/* Container that maintains aspect ratio */}
              <div className="relative w-full">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-full h-auto"
                  style={{ 
                    display: 'block',
                    maxHeight: '80vh'
                  }}
                  onLoad={() => {
                    setImageLoadingStates(prev => ({ ...prev, [currentIndex]: true }))
                  }}
                />
              </div>
              
              {/* Loading state */}
              {!imageLoadingStates[currentIndex] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-400" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <motion.p
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400"
          >
            {currentImage.caption}
          </motion.p>
        )}

        {/* Navigation controls - App Store style */}
        {images.length > 1 && (
          <div className="mt-6 flex items-center justify-end gap-3">
            {/* Image counter */}
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
              {currentIndex + 1} / {images.length}
            </span>

            {/* Pagination dots */}
            <div className="flex items-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
                    index === currentIndex
                      ? "w-2 bg-gray-900 dark:bg-white"
                      : "w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={goToPrevious}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Previous image"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Next image"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail strip - Optional, App Store style */}
      {images.length > 3 && (
        <div className="mt-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "relative flex-shrink-0 overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  index === currentIndex
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-16 w-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
