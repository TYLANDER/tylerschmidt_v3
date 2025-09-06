"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Project } from "@/types/sanity"

interface ProjectCardProps {
  project: Project
  index: number
  imageUrl: string
}

export function ProjectCard({ project, index, imageUrl }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/work/${project.slug}`} className="group block h-full">
        <motion.div
          className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:border-gray-400 dark:border-gray-800 dark:bg-black dark:hover:border-gray-600"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {/* Preview Window */}
          <div className="relative aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-50 dark:bg-gray-900">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-300 dark:text-gray-700">
                  {project.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-grow flex-col p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {project.title}
              </h3>
              <time className="text-sm font-medium text-gray-500 dark:text-gray-500">
                {project.year}
              </time>
            </div>

            <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
              <span className="text-gray-700 dark:text-gray-300">
                {project.client}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span>{project.category}</span>
            </p>

            <p className="mb-4 line-clamp-3 flex-grow text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {project.description}
            </p>

            {project.technologies && (
              <div className="flex flex-wrap gap-2" role="list">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    role="listitem"
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
