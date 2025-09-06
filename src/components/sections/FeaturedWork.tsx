"use client"

import { motion, useScroll } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/types/sanity"

interface FeaturedWorkProps {
  projects: Project[]
  imageUrls: Record<string, string>
}

export function FeaturedWork({ projects, imageUrls }: FeaturedWorkProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Ensure SketchSite is featured first if it exists
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.slug === "sketchsite") return -1
    if (b.slug === "sketchsite") return 1
    return 0
  })

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background py-32 md:py-48"
    >
      {/* Dynamic background gradient */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.5) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className="mb-6 font-heading text-5xl font-bold md:text-7xl lg:text-8xl">
            Featured Work
          </h2>
          <p className="max-w-3xl text-xl text-muted-foreground md:text-2xl">
            Crafting digital experiences with precision and personality.
          </p>
        </motion.div>

        {/* Projects grid - asymmetric layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {sortedProjects.map((project, index) => {
            const isFeatured = project.slug === "sketchsite"
            const imageUrl = imageUrls[project._id]

            return (
              <motion.div
                key={project._id}
                className={` ${isFeatured ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "md:col-span-6"} ${index > 1 ? "md:mt-16" : ""} `}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.19, 1, 0.22, 1],
                }}
                onHoverStart={() => setHoveredProject(project._id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  <article className="relative">
                    {/* Featured badge for SketchSite */}
                    {isFeatured && (
                      <motion.div
                        className="absolute left-6 top-6 z-20 rounded-full bg-blue-500/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        Featured Project
                      </motion.div>
                    )}

                    {/* Project image */}
                    <div
                      className={`relative mb-6 overflow-hidden rounded-2xl bg-muted ${isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"} `}
                    >
                      <motion.div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                      {imageUrl ? (
                        <motion.div
                          className="relative h-full w-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.19, 1, 0.22, 1],
                          }}
                        >
                          <Image
                            src={imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes={
                              isFeatured
                                ? "(max-width: 768px) 100vw, 60vw"
                                : "(max-width: 768px) 100vw, 50vw"
                            }
                          />
                        </motion.div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                          <span className="text-8xl font-bold text-gray-300 dark:text-gray-700">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Hover effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-blue-500/10 mix-blend-screen"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredProject === project._id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Project info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="font-medium">{project.client}</span>
                        <span>{project.year}</span>
                      </div>

                      <h3
                        className={`font-heading font-bold transition-colors duration-300 group-hover:text-blue-500 ${isFeatured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"} `}
                      >
                        {project.title}
                      </h3>

                      {project.description && (
                        <p
                          className={`text-muted-foreground ${isFeatured ? "text-lg" : ""} `}
                        >
                          {project.description}
                        </p>
                      )}

                      {/* Technologies */}
                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-2 left-0 h-0.5 bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredProject === project._id ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </article>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View all projects link */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-xl font-medium text-foreground transition-colors duration-300 hover:text-blue-500"
          >
            <span>View All Projects</span>
            <motion.svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
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
