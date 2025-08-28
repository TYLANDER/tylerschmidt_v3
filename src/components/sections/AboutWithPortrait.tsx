"use client"

import { PortraitImage } from "@/components/ui/portrait-image"
import { AnimatedText } from "@/components/animations/animated-text"

interface AboutWithPortraitProps {
  portraitSrc: string
  variant?: "grid" | "floating"
}

export function AboutWithPortrait({ 
  portraitSrc, 
  variant = "grid" 
}: AboutWithPortraitProps) {
  if (variant === "grid") {
    return (
      <div className="about-grid-layout">
        <div className="portrait-column">
          <PortraitImage
            src={portraitSrc}
            alt="Tyler Schmidt - Product Designer"
            variant="standard"
            className="sticky top-32"
          />
        </div>
        
        <div className="content-column space-y-4">
          <AnimatedText
            text="I don&apos;t just design interfaces—I architect the future of how humans interact with technology."
            as="p"
            variant="fade"
            delay={0.7}
            className="text-foreground text-lg font-medium"
          />

          <AnimatedText
            text="My journey began at Johns Hopkins University, where I learned to think systemically about complex problems. But the real education happened in the trenches of Silicon Valley—from Google&apos;s agency team as a summer intern to leading buy flow optimization at Adobe, each role taught me that great design isn&apos;t about making things pretty. It&apos;s about making the impossible feel inevitable."
            as="p"
            variant="fade"
            delay={1.0}
            className="text-muted-foreground"
          />

          <AnimatedText
            text="I&apos;ve had the privilege of working across the entire spectrum of digital transformation. At Adobe, I&apos;m currently focused on Commerce Growth, specifically buy flow optimization—the critical moment where browsing becomes buying. It&apos;s here that I&apos;ve learned that every pixel, every interaction, every micro-moment can be the difference between a lost opportunity and a converted customer."
            as="p"
            variant="fade"
            delay={1.3}
            className="text-muted-foreground"
          />
        </div>

        <style jsx>{`
          .about-grid-layout {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 3rem;
            align-items: start;
            margin-bottom: 4rem;
          }

          .portrait-column {
            position: relative;
          }

          .content-column {
            min-height: 600px;
          }

          @media (max-width: 1024px) {
            .about-grid-layout {
              grid-template-columns: 1fr;
              gap: 2rem;
            }

            .portrait-column :global(.portrait-container) {
              position: static !important;
              top: auto !important;
            }
          }

          @media (max-width: 768px) {
            .about-grid-layout {
              gap: 1.5rem;
            }
          }
        `}</style>
      </div>
    )
  }

  // Floating variant (default behavior with text wrap)
  return (
    <div className="text-muted-foreground space-y-4 leading-relaxed">
      <PortraitImage
        src={portraitSrc}
        alt="Tyler Schmidt - Product Designer"
        variant="creative"
        className="md:w-1/3"
      />
      
      <AnimatedText
        text="I don&apos;t just design interfaces—I architect the future of how humans interact with technology."
        as="p"
        variant="fade"
        delay={0.7}
        className="text-foreground text-lg font-medium"
      />

      <AnimatedText
        text="My journey began at Johns Hopkins University, where I learned to think systemically about complex problems. But the real education happened in the trenches of Silicon Valley—from Google&apos;s agency team as a summer intern to leading buy flow optimization at Adobe, each role taught me that great design isn&apos;t about making things pretty. It&apos;s about making the impossible feel inevitable."
        as="p"
        variant="fade"
        delay={1.0}
        className="text-muted-foreground"
      />

      <AnimatedText
        text="I&apos;ve had the privilege of working across the entire spectrum of digital transformation. At Adobe, I&apos;m currently focused on Commerce Growth, specifically buy flow optimization—the critical moment where browsing becomes buying. It&apos;s here that I&apos;ve learned that every pixel, every interaction, every micro-moment can be the difference between a lost opportunity and a converted customer."
        as="p"
        variant="fade"
        delay={1.3}
        className="text-muted-foreground"
      />
    </div>
  )
}
