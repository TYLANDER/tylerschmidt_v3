"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

import projects from "@/data/projects"

export function SelectedWorkRefined() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  useTransform(scrollYProgress, [0, 1], [100, -100])

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6)

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 font-heading text-4xl md:text-5xl lg:text-6xl">
            Selected Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            A curated collection of projects that showcase my approach to design
            and development.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <article className="relative">
                  {/* Project image */}
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative h-full w-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                      {/* Placeholder for image */}
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
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

                    <h3 className="font-heading text-xl font-semibold transition-colors duration-300 group-hover:text-accent md:text-2xl">
                      {project.title}
                    </h3>

                    <p className="line-clamp-2 text-muted-foreground">
                      {project.oneLiner}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
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
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all projects link */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-lg font-medium text-foreground transition-colors duration-300 hover:text-accent"
          >
            View All Projects
            <motion.svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
