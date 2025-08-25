'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

export interface CarouselImage {
  src: string
  alt: string
  caption?: string
}

interface ImageCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  images: CarouselImage[]
  initialIndex?: number
  showPagination?: boolean
}

export function ImageCarouselModal({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0,
  showPagination = true
}: ImageCarouselModalProps) {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement
      setTimeout(() => closeButtonRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
      
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            onClose()
            break
          case 'ArrowLeft':
            goToPrevious()
            break
          case 'ArrowRight':
            goToNext()
            break
        }
      }
      
      document.addEventListener('keydown', handleKeyDown)
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        previouslyFocusedElement.current?.focus()
      }
    }
  }, [isOpen, onClose, goToPrevious, goToNext])

  if (!mounted || images.length === 0) return null

  const currentImage = images[currentIndex]

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col pt-20"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery viewer"
          >
            {/* Header with close button - positioned to avoid navbar */}
            <div className="absolute top-24 right-4 md:right-6 z-10">
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-sm transition-all hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close gallery"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image container - adjusted to fit within viewport */}
            <div className="flex flex-1 items-center justify-center p-4 md:p-8 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="relative flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-auto h-auto rounded-lg"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '80vh',
                      objectFit: 'contain'
                    }}
                  />
                  
                  {/* Caption below image */}
                  {currentImage.caption && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-white/70 md:text-base">{currentImage.caption}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Apple-style controls - right aligned with dots first, then buttons together */}
            {showPagination && images.length > 1 && (
              <div className="fixed bottom-6 right-6 z-10 flex items-center gap-4 rounded-full bg-white/10 px-4 py-3 backdrop-blur-md">
                {/* Pagination dots */}
                <div className="flex items-center gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`h-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                        index === currentIndex
                          ? 'w-6 bg-white'
                          : 'w-1.5 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation buttons grouped together */}
                <div className="flex items-center gap-1">
                  {/* Previous button */}
                  <button
                    onClick={goToPrevious}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Previous image"
                  >
                    <svg
                      width="16"
                      height="16"
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
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Next image"
                  >
                    <svg
                      width="16"
                      height="16"
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

            {/* Keyboard instructions (screen reader only) */}
            <div className="sr-only" aria-live="polite">
              Image {currentIndex + 1} of {images.length}. 
              Use arrow keys to navigate, Escape to close.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return mounted ? createPortal(modalContent, document.body) : null
}

// Hook to manage carousel modal state
export function useImageCarouselModal() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    images: CarouselImage[]
    initialIndex: number
    showPagination: boolean
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
    showPagination: true,
  })

  const openModal = (images: CarouselImage[], initialIndex: number = 0, showPagination: boolean = true) => {
    setModalState({ isOpen: true, images, initialIndex, showPagination })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  return {
    modalProps: {
      isOpen: modalState.isOpen,
      onClose: closeModal,
      images: modalState.images,
      initialIndex: modalState.initialIndex,
      showPagination: modalState.showPagination,
    },
    openModal,
    closeModal,
  }
}
