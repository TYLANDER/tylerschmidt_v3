"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export interface DisplayImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface ImageDisplayEnhancedProps {
  images: DisplayImage[]
  className?: string
  onImageClick?: (index: number) => void
  variant?: "inline" | "grid" | "carousel"
  columns?: 1 | 2 | 3
}

// Enhanced inline image display component
export function ImageDisplayEnhanced({
  images,
  className,
  onImageClick,
  variant = "carousel",
  columns = 1,
}: ImageDisplayEnhancedProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageStates, setImageStates] = useState<
    Record<
      number,
      {
        loaded: boolean
        naturalWidth: number
        naturalHeight: number
      }
    >
  >({})

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

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  // Calculate optimal image display size
  const getImageDisplayStyle = (index: number) => {
    const state = imageStates[index]
    if (!state) return {}

    // Since we now have a fixed container, we just need object-fit
    return {
      objectFit: "contain" as const,
      width: "100%",
      height: "100%",
    }
  }

  if (!images || images.length === 0) return null

  // Grid layout for multiple images
  if (variant === "grid" && images.length > 1) {
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
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <div className="relative overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
              <img
                src={image.src}
                alt={image.alt}
                className="h-auto w-full cursor-zoom-in transition-transform group-hover:scale-[1.02]"
                onClick={() => onImageClick?.(index)}
                loading="lazy"
              />
              {onImageClick && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
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
            {image.caption && (
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Carousel layout (default)
  const currentImage = images[currentIndex]
  const currentState = imageStates[currentIndex]

  return (
    <div className={cn("relative w-full space-y-4", className)}>
      {/* Image container with dynamic height based on image aspect ratio */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full"
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="h-auto w-full cursor-zoom-in"
              style={{
                display: currentState?.loaded ? "block" : "none",
              }}
              onClick={() => onImageClick?.(currentIndex)}
              loading={currentIndex === 0 ? "eager" : "lazy"}
            />

            {/* Loading spinner */}
            {!currentState?.loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
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
      </div>

      {/* Caption - in its own grid row */}
      {currentImage.caption && (
        <motion.p
          key={`caption-${currentIndex}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[1.5rem] text-center text-sm text-gray-600 dark:text-gray-400"
        >
          {currentImage.caption}
        </motion.p>
      )}
      {!currentImage.caption && <div className="min-h-[1.5rem]" />}

      {/* Navigation for carousel - in its own grid row */}
      {images.length > 1 && variant === "carousel" && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {images.length}
          </span>

          <div className="flex items-center gap-4">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === currentIndex
                      ? "w-6 bg-gray-900 dark:bg-white"
                      : "w-1.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700"
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={goToPrevious}
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Previous"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Next"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Enhanced Modal Component
interface EnhancedModalProps {
  isOpen: boolean
  onClose: () => void
  images: DisplayImage[]
  initialIndex?: number
}

export function EnhancedImageModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: EnhancedModalProps) {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Escape":
            onClose()
            break
          case "ArrowLeft":
            setCurrentIndex(
              (prev) => (prev - 1 + images.length) % images.length
            )
            break
          case "ArrowRight":
            setCurrentIndex((prev) => (prev + 1) % images.length)
            break
          case "+":
          case "=":
            setScale((s) => Math.min(s + 0.25, 3))
            break
          case "-":
            setScale((s) => Math.max(s - 0.25, 0.5))
            break
          case "0":
            setScale(1)
            setPosition({ x: 0, y: 0 })
            break
        }
      }

      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = ""
      }
    }
  }, [isOpen, onClose, images.length])

  // Reset zoom when changing images
  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  if (!mounted || !isOpen) return null

  const currentImage = images[currentIndex]

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-black"
        >
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between bg-black/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80">
                {currentIndex + 1} / {images.length}
              </span>
              {scale !== 1 && (
                <span className="text-sm text-white/60">
                  {Math.round(scale * 100)}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom controls */}
              <button
                onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))}
                className="rounded bg-white/10 p-2 text-white/80 hover:bg-white/20"
                aria-label="Zoom out"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35M8 11h6" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setScale(1)
                  setPosition({ x: 0, y: 0 })
                }}
                className="rounded bg-white/10 p-2 text-sm font-medium text-white/80 hover:bg-white/20"
                aria-label="Reset zoom"
              >
                100%
              </button>
              <button
                onClick={() => setScale((s) => Math.min(s + 0.25, 3))}
                className="rounded bg-white/10 p-2 text-white/80 hover:bg-white/20"
                aria-label="Zoom in"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
                </svg>
              </button>

              <div className="mx-2 h-6 w-px bg-white/20" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="rounded bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image container */}
          <div
            ref={containerRef}
            className="flex flex-1 items-center justify-center overflow-auto p-4"
            onClick={onClose}
          >
            <motion.div
              className="relative"
              style={{
                scale,
                x: position.x,
                y: position.y,
              }}
              drag={scale > 1}
              dragConstraints={containerRef}
              dragElastic={0.2}
              onDrag={(_, info) => {
                setPosition({ x: info.offset.x, y: info.offset.y })
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-none"
                style={{
                  maxHeight: "90vh",
                  width: "auto",
                  cursor: scale > 1 ? "move" : "default",
                }}
              />
            </motion.div>
          </div>

          {/* Bottom navigation */}
          <div className="relative z-10 bg-black/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + images.length) % images.length
                  )
                }
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Previous"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Thumbnails */}
              <div className="flex max-w-xl items-center gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded transition-all",
                      index === currentIndex
                        ? "ring-2 ring-white"
                        : "opacity-50 hover:opacity-80"
                    )}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % images.length)
                }
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="Next"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {currentImage.caption && (
              <p className="mt-4 text-center text-sm text-white/70">
                {currentImage.caption}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return mounted ? createPortal(modalContent, document.body) : null
}

// Hook for managing enhanced modal
export function useEnhancedImageModal() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    images: DisplayImage[]
    initialIndex: number
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
  })

  const openModal = (images: DisplayImage[], initialIndex: number = 0) => {
    setModalState({ isOpen: true, images, initialIndex })
  }

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }))
  }

  return {
    modalProps: {
      isOpen: modalState.isOpen,
      onClose: closeModal,
      images: modalState.images,
      initialIndex: modalState.initialIndex,
    },
    openModal,
    closeModal,
  }
}
