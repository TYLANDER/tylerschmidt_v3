"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { motion } from 'framer-motion'
import projects from '@/data/projects'

export function SelectedWork() {
  const items = projects.slice(0, 6)
  
  return (
    <section className="bg-background py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Selected Work
          </h2>
          <p className="text-foreground/60 text-lg mb-12 max-w-2xl">
            A curated collection of projects that showcase design thinking and technical execution.
          </p>
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <article className="relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image 
                      src={project.coverSrc} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <motion.svg 
                        className="w-5 h-5 text-ink/30 group-hover:text-accent transition-colors"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        initial={{ x: 0, y: 0 }}
                        whileHover={{ x: 3, y: -3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </motion.svg>
                    </div>
                    <p className="text-foreground/60 text-sm mb-3 line-clamp-2">
                      {project.oneLiner}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-foreground/50">
                      <span>{project.role}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}