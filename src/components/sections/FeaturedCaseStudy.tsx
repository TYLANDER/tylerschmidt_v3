"use client"

import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { motion, useScroll, useTransform } from "framer-motion"
import projects from "@/data/projects"
import { useRef } from "react"

export function FeaturedCaseStudy() {
  const featured = projects.find((p) => p.featured) || projects[0]
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  if (!featured) return null

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      <motion.div className="absolute inset-0 opacity-10" style={{ y }}>
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="bg-accent2/20 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl" />
      </motion.div>

      <Container className="relative py-24 md:py-32">
        <motion.div
          className="grid items-center gap-12 md:grid-cols-2 lg:gap-16"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
              <span className="h-px w-12 bg-accent" />
              Featured Project
            </div>
            <h3 className="mb-6 font-heading text-4xl md:text-5xl lg:text-6xl">
              {featured.title}
            </h3>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              {featured.oneLiner}
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-foreground/10 px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/work/${featured.slug}`}>
              <motion.button
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg bg-accent px-8 py-4 font-medium text-accent-foreground"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View Case Study</span>
                <motion.svg
                  className="relative z-10 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
                <motion.div
                  className="absolute inset-0 bg-primary-foreground"
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-primary-foreground/5">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 animate-pulse rounded-lg bg-primary-foreground/10" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
