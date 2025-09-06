"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Alternative hero layout with side-by-side image and text
export function PiaHeroAlternative() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-6 text-6xl font-bold md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet Pia
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="mb-8 text-2xl text-muted-foreground md:text-3xl">
                Creative Director
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-sm text-muted-foreground">
                <span>Olympia Schmidt</span>
                <span>•</span>
                <span>5 Years Experience</span>
                <span>•</span>
                <span>100% Creative Vision</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative h-[500px] overflow-hidden rounded-2xl lg:h-[700px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src="/pia-hero.jpg" // Replace with your actual image filename
              alt="Pia - Creative Director"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Optional decorative element */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-20 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>
    </section>
  )
}
