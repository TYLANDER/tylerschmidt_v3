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
            className="fixed inset-0 z-50 flex flex-col pt-20"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            {/* Close button - positioned to avoid navbar */}
            <div className="absolute top-24 right-4 md:right-6 z-10">
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-sm transition-all hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white/50"
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
            </div>
            
            {/* Image container - adjusted to fit within viewport */}
            <div className="flex flex-1 items-center justify-center p-4 md:p-8">
              <div 
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full max-h-[calc(100vh-12rem)] w-auto h-auto rounded-lg object-contain"
                />
              </div>
              
              {/* Caption below image */}
              {caption && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-white/70 md:text-base">{caption}</p>
                </div>
              )}
              
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
