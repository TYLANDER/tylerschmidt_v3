"use client"

import { motion, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import projects from '@/data/projects'

export function SelectedWorkPia() {
  const containerRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6)
  
  // Pia's quality ratings for each project
  const piaRatings: Record<string, string> = {
    'ubisoft-redesign': 'Comfortable UI, would nap here',
    'abacus-wallet': 'Secure as my treat jar',
    'alfred-ai': 'Smart like me',
    'adobe-commerce': 'Smooth checkout, tail approved',
    'mothership-design': 'Organized like my toy box',
    'destiny-ux': 'Engaging as a tennis ball'
  }
  
  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
            Selected Work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Projects that pass the Pia Standard™ for quality and comfort.
          </p>
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1]
              }}
              onHoverStart={() => setHoveredProject(project.slug)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Link 
                href={`/work/${project.slug}`}
                className="group block"
              >
                <article className="relative">
                  {/* Pia Approved Badge */}
                  <motion.div
                    className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-mono border border-success/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredProject === project.slug ? 1 : 0,
                      scale: hoveredProject === project.slug ? 1 : 0.8
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-success">✓ Pia Approved</span>
                  </motion.div>
                  
                  {/* Project image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted mb-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                      {/* Placeholder for image */}
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                        <span className="text-6xl font-bold text-muted-foreground/20">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.role}</span>
                      <span>{project.year}</span>
                    </div>
                    
                    <h3 className="font-heading text-xl md:text-2xl font-semibold group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {project.oneLiner}
                    </p>
                    
                    {/* Pia's review */}
                    <motion.p 
                      className="text-xs text-muted-foreground/60 italic pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.slug ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      &ldquo;{piaRatings[project.slug] || 'Paw-sitively amazing'}&rdquo;
                      <span className="not-italic ml-1">- Pia</span>
                    </motion.p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover indicator */}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* View all projects link */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link 
            href="/work"
            className="inline-flex items-center gap-2 text-lg font-medium text-foreground hover:text-accent transition-colors duration-300 group"
          >
            View All Projects
            <motion.svg 
              className="w-5 h-5"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
          <p className="text-xs text-muted-foreground/40 mt-2 font-mono">
            All projects must pass Pia&apos;s quality inspection
          </p>
        </motion.div>
      </div>
    </section>
  )
}
