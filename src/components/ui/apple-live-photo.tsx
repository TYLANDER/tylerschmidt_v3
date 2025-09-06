"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AppleLivePhotoProps {
  heicSrc?: string // Original HEIC file path (optional)
  jpgSrc: string // Converted JPG for web compatibility
  movSrc: string // Original MOV file from iPhone
  mp4Src?: string // Converted MP4 for better browser support (optional)
  alt: string
  className?: string
  autoPlay?: boolean
  playOnHover?: boolean
  playOnInView?: boolean
  onPlayComplete?: () => void
}

export function AppleLivePhoto({
  heicSrc,
  jpgSrc,
  movSrc,
  mp4Src,
  alt,
  className,
  autoPlay = true,
  playOnHover = false,
  playOnInView = true,
  onPlayComplete,
}: AppleLivePhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // Use MP4 if available, fallback to MOV
  const videoSource = mp4Src || movSrc

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
    if (isInView && !hasPlayed && autoPlay && videoRef.current && !videoError) {
      playLivePhoto()
    }
  }, [isInView, hasPlayed, autoPlay, videoError])

  const playLivePhoto = async () => {
    if (!videoRef.current || isPlaying || videoError) return

    try {
      setIsPlaying(true)
      setShowVideo(true)

      // Reset video to start
      videoRef.current.currentTime = 0

      // Play video
      await videoRef.current.play()

      // iPhone Live Photos are typically 3 seconds
      // Stop at the "key frame" (usually around 1.5 seconds)
      setTimeout(() => {
        if (videoRef.current) {
          // Pause at the key frame
          videoRef.current.pause()
          videoRef.current.currentTime = 1.5

          setTimeout(() => {
            setIsPlaying(false)
            setHasPlayed(true)

            // Fade back to still image
            setTimeout(() => {
              setShowVideo(false)
              onPlayComplete?.()
            }, 300)
          }, 500)
        }
      }, 3000)
    } catch (error) {
      console.error("Error playing Live Photo:", error)
      setIsPlaying(false)
      setShowVideo(false)
      setVideoError(true)
    }
  }

  const handleMouseEnter = () => {
    if (playOnHover && !isPlaying && !videoError) {
      playLivePhoto()
    }
  }

  const handleClick = () => {
    if (!isPlaying && !videoError) {
      playLivePhoto()
    }
  }

  const handleVideoError = () => {
    console.error("Video failed to load, falling back to still image")
    setVideoError(true)
    setShowVideo(false)
    setIsPlaying(false)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative cursor-pointer overflow-hidden",
        "live-photo-container",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {/* Video layer */}
      {!videoError && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            showVideo ? "opacity-100" : "opacity-0"
          )}
          playsInline
          muted
          preload="auto"
          loop={false}
          onError={handleVideoError}
        >
          {/* Try MP4 first for better compatibility */}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
          {/* Fallback to MOV */}
          <source src={movSrc} type="video/quicktime" />
        </video>
      )}

      {/* Image layer */}
      <Image
        src={jpgSrc}
        alt={alt}
        width={800}
        height={1000}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          showVideo && !videoError ? "opacity-0" : "opacity-100"
        )}
        priority
      />

      {/* Live Photo badge (Apple-style) */}
      <div
        className={cn(
          "absolute left-4 top-4 flex items-center gap-1.5",
          "transition-all duration-300",
          isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        {/* Concentric circles animation */}
        <div className="relative h-8 w-8">
          <div
            className={cn(
              "absolute inset-0 rounded-full border-2 border-white",
              isPlaying && "animate-ping"
            )}
          />
          <div
            className={cn(
              "absolute inset-2 rounded-full border-2 border-white",
              isPlaying && "animation-delay-200 animate-ping"
            )}
          />
          <div className="absolute inset-3 rounded-full bg-white" />
        </div>
        <span className="text-sm font-medium text-white drop-shadow-lg">
          LIVE
        </span>
      </div>

      {/* Play hint (only if not played yet and no video error) */}
      {!hasPlayed && !videoError && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
          <span>Live Photo</span>
        </div>
      )}

      <style jsx>{`
        @keyframes animation-delay-200 {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  )
}
