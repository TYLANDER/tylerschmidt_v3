'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/types/sanity'

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
    >
      <Link
        href={`/work/${project.slug.current}`}
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
          {project.featuredImage && (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <span className="text-sm text-gray-500">{project.year}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {project.client} • {project.category}
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.description}
          </p>
          
          {project.technologies && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-500">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
