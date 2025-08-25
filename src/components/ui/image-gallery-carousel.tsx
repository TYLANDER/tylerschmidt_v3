'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryCarouselProps {
  images: GalleryImage[]
  className?: string
}

export function ImageGalleryCarousel({ images, className }: ImageGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({})
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

  if (!images || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      {/* Main image container */}
      <div className="relative w-full bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
        {/* Dynamic height container to accommodate different aspect ratios */}
        <div className="relative min-h-[400px] max-h-[80vh] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
                quality={90}
                priority={currentIndex === 0}
                onLoad={() => {
                  setImageLoadingStates(prev => ({ ...prev, [currentIndex]: true }))
                }}
              />
              
              {/* Loading state */}
              {!imageLoadingStates[currentIndex] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-400" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation controls - Same style as modal */}
        {images.length > 1 && (
          <>
            {/* Previous button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-md backdrop-blur-sm transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-900"
              aria-label="Previous image"
            >
              <svg
                width="20"
                height="20"
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

            {/* Next button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow-md backdrop-blur-sm transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-900"
              aria-label="Next image"
            >
              <svg
                width="20"
                height="20"
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

            {/* Pagination dots - Modal style at bottom right */}
            <div className="absolute bottom-4 right-4 flex items-center gap-4 rounded-full bg-white/10 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 focus:outline-none",
                      index === currentIndex
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/60"
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <motion.p
          key={`caption-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          {currentImage.caption}
        </motion.p>
      )}

      {/* Thumbnail strip - Apple style */}
      {images.length > 1 && (
        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "relative flex-shrink-0 overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  index === currentIndex
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <div className="relative h-20 w-32">
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
