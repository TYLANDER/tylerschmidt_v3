"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ImageModal } from "./image-modal"

interface ExpandableImageProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function ExpandableImage({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
  className = "",
  priority = false,
  sizes,
}: ExpandableImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`View larger image: ${alt}`}
      >
        <div className={`relative ${className}`}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes={sizes}
          />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
            initial={false}
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
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
                className="text-gray-900"
              >
                <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Inline caption */}
        {caption && <span className="sr-only">{caption}</span>}
      </button>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={src}
        alt={alt}
        caption={caption}
      />
    </>
  )
}
