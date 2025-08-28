"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { LivePhoto } from "./live-photo"
import { AppleLivePhoto } from "./apple-live-photo"

interface PortraitImageProps {
  src: string
  alt: string
  variant?: "standard" | "floating" | "shaped" | "creative"
  className?: string
  isLivePhoto?: boolean
  videoSrc?: string // Required if isLivePhoto is true
  isAppleLivePhoto?: boolean
  movSrc?: string // iPhone MOV file
  mp4Src?: string // Optional converted MP4
}

export function PortraitImage({ 
  src, 
  alt, 
  variant = "floating",
  className,
  isLivePhoto = false,
  videoSrc,
  isAppleLivePhoto = false,
  movSrc,
  mp4Src
}: PortraitImageProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        if (isInView) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.08

  const variants = {
    standard: "relative overflow-hidden rounded-lg",
    floating: "relative overflow-hidden rounded-2xl shadow-2xl float-left mr-8 mb-8 shape-outside-circle",
    shaped: "relative overflow-hidden portrait-shape float-left mr-8 mb-8",
    creative: "relative overflow-hidden portrait-creative float-left mr-10 mb-8"
  }

  return (
    <div 
      ref={imageRef}
      className={cn(
        variants[variant],
        "portrait-container",
        className
      )}
      style={{
        transform: variant !== "standard" ? `translateY(${-parallaxOffset}px)` : undefined,
      }}
    >
      <div className="portrait-inner relative w-full h-full">
        {isAppleLivePhoto && movSrc ? (
          <AppleLivePhoto
            jpgSrc={src}
            movSrc={movSrc}
            mp4Src={mp4Src}
            alt={alt}
            className="w-full h-full"
            autoPlay={true}
            playOnHover={true}
            playOnInView={true}
          />
        ) : isLivePhoto && videoSrc ? (
          <LivePhoto
            videoSrc={videoSrc}
            imageSrc={src}
            alt={alt}
            className="w-full h-full"
            autoPlay={true}
            playOnHover={true}
            playOnInView={true}
            duration={2500}
          />
        ) : (
          <>
            <Image
              src={src}
              alt={alt}
              width={400}
              height={500}
              className="object-cover w-full h-full"
              priority
              quality={90}
            />
            
            {/* Overlay gradient for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </>
        )}
      </div>

      <style jsx>{`
        .portrait-container {
          width: 100%;
          max-width: 350px;
          aspect-ratio: 4/5;
        }

        @media (max-width: 768px) {
          .portrait-container {
            max-width: 280px;
            margin: 0 auto 2rem;
            float: none !important;
          }
        }

        @media (max-width: 640px) {
          .portrait-container {
            max-width: 100%;
            aspect-ratio: 1/1;
          }
        }

        /* Floating variant with circular shape */
        .shape-outside-circle {
          shape-outside: circle(50% at center);
          shape-margin: 20px;
        }

        /* Shaped variant with organic shape */
        .portrait-shape {
          clip-path: polygon(
            30% 0%,
            70% 0%,
            100% 30%,
            100% 70%,
            70% 100%,
            30% 100%,
            0% 70%,
            0% 30%
          );
          shape-outside: polygon(
            30% 0%,
            70% 0%,
            100% 30%,
            100% 70%,
            70% 100%,
            30% 100%,
            0% 70%,
            0% 30%
          );
          shape-margin: 25px;
        }

        /* Creative variant with asymmetric shape */
        .portrait-creative {
          clip-path: polygon(
            20% 0%,
            100% 0%,
            100% 85%,
            85% 100%,
            0% 100%,
            0% 15%
          );
          shape-outside: polygon(
            20% 0%,
            100% 0%,
            100% 85%,
            85% 100%,
            0% 100%,
            0% 15%
          );
          shape-margin: 30px;
          box-shadow: 
            20px 20px 60px rgba(0, 0, 0, 0.15),
            -20px -20px 60px rgba(255, 255, 255, 0.1);
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          .portrait-creative {
            box-shadow: 
              20px 20px 60px rgba(0, 0, 0, 0.5),
              -20px -20px 60px rgba(255, 255, 255, 0.05);
          }
        }

        /* Smooth edge rendering */
        .portrait-shape .portrait-inner img,
        .portrait-creative .portrait-inner img {
          filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.1));
        }
      `}</style>
    </div>
  )
}
