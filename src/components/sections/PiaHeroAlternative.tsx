'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Alternative hero layout with side-by-side image and text
export function PiaHeroAlternative() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
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
              <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
                Creative Director
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-mono text-muted-foreground">
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
            className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden"
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
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
