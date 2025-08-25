'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  caption?: string
}

export function ImageModal({ isOpen, onClose, src, alt, caption }: ImageModalProps) {
  const [mounted, setMounted] = useState(false)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previouslyFocusedElement.current = document.activeElement as HTMLElement
      // Focus the close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100)
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
        // Restore focus to previously focused element
        previouslyFocusedElement.current?.focus()
      }
    }
  }, [isOpen, onClose])

  if (!mounted) return null

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div className="relative max-h-full max-w-full">
              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute -top-12 right-0 md:-top-14 md:-right-14 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close image viewer"
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
              
              {/* Image container */}
              <div 
                className="relative overflow-hidden rounded-lg bg-gray-900"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={1920}
                  height={1080}
                  className="max-h-[85vh] w-auto object-contain"
                  quality={95}
                  priority
                />
                
                {/* Caption */}
                {caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                    <p className="text-sm text-white/90 md:text-base">{caption}</p>
                  </div>
                )}
              </div>
              
              {/* Keyboard instructions (screen reader only) */}
              <div className="sr-only" aria-live="polite">
                Press Escape to close the image viewer
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return mounted ? createPortal(modalContent, document.body) : null
}

// Hook to manage image modal state
export function useImageModal() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    src: string
    alt: string
    caption?: string
  }>({
    isOpen: false,
    src: '',
    alt: '',
    caption: undefined,
  })

  const openModal = (src: string, alt: string, caption?: string) => {
    setModalState({ isOpen: true, src, alt, caption })
  }

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }))
  }

  return {
    modalProps: {
      isOpen: modalState.isOpen,
      onClose: closeModal,
      src: modalState.src,
      alt: modalState.alt,
      caption: modalState.caption,
    },
    openModal,
    closeModal,
  }
}
