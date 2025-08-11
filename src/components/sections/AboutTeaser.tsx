"use client"

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function AboutTeaser() {
  return (
    <section className="bg-muted/30 py-20 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-48 h-48 bg-accent/10 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div 
                  className="absolute w-32 h-32 bg-accent/20 rounded-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                  }}
                  transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Design Without Distraction.
            </h3>
            <p className="text-foreground/70 text-lg leading-relaxed mb-6">
              I believe in the power of reduction—stripping away the unnecessary to reveal what truly matters. 
              Every pixel, every interaction, every decision is intentional.
            </p>
            <p className="text-foreground/70 text-lg leading-relaxed mb-8">
              With over a decade of experience, I&apos;ve helped Fortune 500 companies and startups alike 
              create digital experiences that are both beautiful and functional.
            </p>
            <Link href="/about">
              <Button variant="outline" size="lg" className="group">
                Learn More
                <motion.svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}