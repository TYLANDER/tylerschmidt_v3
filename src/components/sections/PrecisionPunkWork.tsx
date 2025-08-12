"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { BreathingGrid } from '@/components/ui/BreathingGrid'
import projects from '@/data/projects'

export function PrecisionPunkWork() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Mathematical transforms based on scroll
  const gridRotate = useTransform(scrollYProgress, [0, 1], [0, 3])
  const lineSkew = useTransform(scrollYProgress, [0, 1], [0, -5])
  
  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-background overflow-hidden"
      id="work"
    >
      {/* Background grid that responds to scroll */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ rotate: gridRotate }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--steel) 1px, transparent 1px),
              linear-gradient(90deg, var(--steel) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </motion.div>

      <Container>
        {/* Section header with glitch effect */}
        <div className="mb-16 relative">
          <motion.h2 
            className="font-heading text-6xl md:text-7xl lg:text-8xl font-black relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="relative">
              SELECTED
              <motion.span
                className="absolute inset-0 text-voltage"
                initial={{ x: 0 }}
                whileInView={{ 
                  x: [-2, 2, -2, 2, 0],
                  opacity: [0, 1, 0, 1, 0]
                }}
                transition={{ 
                  duration: 0.5,
                  times: [0, 0.25, 0.5, 0.75, 1]
                }}
              >
                SELECTED
              </motion.span>
            </span>
            <br />
            <span className="text-steel dark:text-smoke/50">WORK</span>
          </motion.h2>
          
          {/* Rebel line */}
          <motion.div
            className="absolute -bottom-4 left-0 h-px bg-voltage"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{ 
              width: '120%',
              skewY: lineSkew,
              transformOrigin: 'left center'
            }}
          />
        </div>

        {/* Projects in breathing grid */}
        <BreathingGrid columns={3}>
          {projects.slice(0, 6).map((project, index) => (
            <Link href={`/work/${project.slug}`} key={project.slug}>
              <motion.article
                className="group relative bg-card border border-border overflow-hidden cursor-pointer"
                whileHover={{ 
                  borderColor: 'var(--voltage)',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Project image with glitch overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-voltage/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Scan line effect */}
                  <motion.div
                    className="absolute inset-x-0 h-px bg-voltage"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                  
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full bg-steel/10 dark:bg-ghost/5" />
                </div>

                {/* Project info with mathematical precision */}
                <div className="p-6 relative">
                  <h3 className="font-heading text-2xl font-bold mb-2 group-hover:text-voltage transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {project.oneLiner}
                  </p>
                  
                  {/* Tags with rebel positioning */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 border border-border group-hover:border-voltage transition-all duration-300"
                        style={{
                          transitionDelay: `${tagIndex * 50}ms`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Index number - mathematical beauty */}
                  <div className="absolute top-6 right-6 font-mono text-4xl font-bold text-steel/20 dark:text-smoke/10">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Hover state rebel line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-voltage origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
                />
              </motion.article>
            </Link>
          ))}
        </BreathingGrid>

        {/* View all with punk energy */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/work">
            <motion.span
              className="inline-flex items-center gap-4 text-lg font-medium"
              whileHover={{ gap: '2rem' }}
            >
              <span>VIEW ALL PROJECTS</span>
              <motion.span
                whileHover={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                →
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
