"use client"


import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { motion, useScroll, useTransform } from 'framer-motion'
import projects from '@/data/projects'
import { useRef } from 'react'

export function FeaturedCaseStudy() {
  const featured = projects.find(p => p.featured) || projects[0]
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])
  
  if (!featured) return null
  
  return (
    <section ref={containerRef} className="relative bg-ink text-white overflow-hidden">
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent2/20 rounded-full blur-3xl" />
      </motion.div>
      
      <Container className="relative py-24 md:py-32">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
              <span className="w-12 h-px bg-accent" />
              Featured Project
            </div>
            <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              {featured.title}
            </h3>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              {featured.oneLiner}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {featured.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/work/${featured.slug}`}>
              <motion.button
                className="relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-medium rounded-lg overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View Case Study</span>
                <motion.svg 
                  className="relative z-10 w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/10 rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}