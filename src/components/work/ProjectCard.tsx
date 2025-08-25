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
      className="h-full"
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block h-full"
      >
        <motion.div 
          className="h-full flex flex-col bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {/* Preview Window */}
          <div className="relative h-64 md:h-72 bg-gray-50 dark:bg-gray-900 overflow-hidden flex-shrink-0">
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
                  {project.title.split(' ').map(word => word[0]).join('')}
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <span className="text-sm text-gray-500">{project.year}</span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              {project.client} • {project.category}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
              {project.description}
            </p>
            
            {project.technologies && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-xs px-2 py-1 text-gray-500">
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
