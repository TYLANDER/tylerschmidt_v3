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
  onPlayComplete
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
      className={cn(
        "relative overflow-hidden cursor-pointer group",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {/* Video layer */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
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
          "w-full h-full object-cover transition-opacity duration-300",
          showVideo ? "opacity-0" : "opacity-100"
        )}
        priority
      />

      {/* Live indicator */}
      <div className={cn(
        "absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-black/70 text-white text-sm font-medium backdrop-blur-sm",
        "transition-all duration-300",
        isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}>
        <div className={cn(
          "w-2 h-2 rounded-full",
          isPlaying ? "bg-red-500 animate-pulse" : "bg-white"
        )} />
        <span>{isPlaying ? "LIVE" : "LIVE PHOTO"}</span>
      </div>

      {/* Play icon overlay (when not playing) */}
      {!isPlaying && !hasPlayed && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-black/90 rounded-full p-4 backdrop-blur-sm">
            <svg
              className="w-8 h-8 text-gray-800 dark:text-gray-200"
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
        <div className="absolute bottom-4 right-4 text-xs text-white/70 dark:text-white/50 backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
          Click to play
        </div>
      )}
    </div>
  )
}
