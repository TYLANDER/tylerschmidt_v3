"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LivePhotoProps {
  videoSrc: string
  imageSrc: string
  alt: string
  className?: string
  autoPlay?: boolean
  playOnHover?: boolean
  playOnInView?: boolean
  duration?: number // Duration in milliseconds
  onPlayComplete?: () => void
}

export function LivePhoto({
  videoSrc,
  imageSrc,
  alt,
  className,
  autoPlay = true,
  playOnHover = false,
  playOnInView = true,
  duration = 3000,
  onPlayComplete,
}: LivePhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // Intersection Observer for play on view
  useEffect(() => {
    if (!playOnInView || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [playOnInView])

  // Handle auto-play when in view
  useEffect(() => {
    if (isInView && !hasPlayed && autoPlay && videoRef.current) {
      playLivePhoto()
    }
  }, [isInView, hasPlayed, autoPlay])

  const playLivePhoto = async () => {
    if (!videoRef.current || isPlaying) return

    try {
      setIsPlaying(true)
      setShowVideo(true)

      // Reset video to start
      videoRef.current.currentTime = 0

      // Play video
      await videoRef.current.play()

      // Stop after duration
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause()
          setIsPlaying(false)
          setHasPlayed(true)

          // Fade back to image
          setTimeout(() => {
            setShowVideo(false)
            onPlayComplete?.()
          }, 300)
        }
      }, duration)
    } catch (error) {
      console.error("Error playing video:", error)
      setIsPlaying(false)
      setShowVideo(false)
    }
  }

  const handleMouseEnter = () => {
    if (playOnHover && !isPlaying) {
      playLivePhoto()
    }
  }

  const handleClick = () => {
    if (!isPlaying) {
      playLivePhoto()
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("group relative cursor-pointer overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {/* Video layer */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
          showVideo ? "opacity-100" : "opacity-0"
        )}
        playsInline
        muted
        preload="auto"
        loop={false}
      />

      {/* Image layer */}
      <Image
        src={imageSrc}
        alt={alt}
        width={800}
        height={1000}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          showVideo ? "opacity-0" : "opacity-100"
        )}
        priority
      />

      {/* Live indicator */}
      <div
        className={cn(
          "absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5",
          "bg-black/70 text-sm font-medium text-white backdrop-blur-sm",
          "transition-all duration-300",
          isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            isPlaying ? "animate-pulse bg-red-500" : "bg-white"
          )}
        />
        <span>{isPlaying ? "LIVE" : "LIVE PHOTO"}</span>
      </div>

      {/* Play icon overlay (when not playing) */}
      {!isPlaying && !hasPlayed && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-full bg-white/90 p-4 backdrop-blur-sm dark:bg-black/90">
            <svg
              className="h-8 w-8 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Subtle animation hint */}
      {!hasPlayed && (
        <div className="absolute bottom-4 right-4 rounded bg-black/30 px-2 py-1 text-xs text-white/70 backdrop-blur-sm dark:text-white/50">
          Click to play
        </div>
      )}
    </div>
  )
}
