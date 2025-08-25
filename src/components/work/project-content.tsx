'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { portableTextComponents } from './portable-text-components'
import { ExpandableImage } from '@/components/ui/expandable-image'
import { ImageCarouselModal, useImageCarouselModal, type CarouselImage } from '@/components/ui/image-carousel-modal'
import type { Project } from '@/types/sanity'

interface ProjectContentProps {
  project: Project
}

export function ProjectContent({ project }: ProjectContentProps) {
  const { modalProps, openModal } = useImageCarouselModal()

  // Prepare gallery images for carousel
  const galleryImages: CarouselImage[] = project.gallery
    ?.filter(image => image.asset)
    ?.map((image) => ({
      src: urlFor(image).width(1920).height(1080).quality(95).url(),
      alt: image.alt || `${project.title} gallery image`,
      caption: image.caption
    })) || []

  const handleGalleryImageClick = (index: number) => {
    openModal(galleryImages, index)
  }

  return (
    <>
      {/* Featured Image */}
      {project.featuredImage && project.featuredImage.asset && (
        <motion.div 
          className="mb-20 -mx-6 md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ExpandableImage
            src={urlFor(project.featuredImage).width(2400).height(1350).quality(90).url()}
            alt={project.title}
            className="aspect-video w-full md:rounded-2xl bg-gray-100 dark:bg-gray-900"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1320px"
          />
        </motion.div>
      )}

      {/* Overview */}
      <div className="max-w-4xl mx-auto mb-20">
        {project.overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <PortableText 
              value={project.overview} 
              components={portableTextComponents}
            />
          </motion.div>
        )}
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <motion.div 
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-8">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.gallery.map((image, index) => {
                if (!image.asset) return null
                return (
                  <motion.figure 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <button
                      onClick={() => handleGalleryImageClick(index)}
                      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`View larger image: ${image.alt || `${project.title} image ${index + 1}`}`}
                    >
                      <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-900">
                        <Image
                          src={urlFor(image).width(1200).height(675).quality(90).url()}
                          alt={image.alt || `${project.title} image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-900"
                            >
                              <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                    {image.caption && (
                      <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                        {image.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                )
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* Image Carousel Modal */}
      <ImageCarouselModal {...modalProps} />
    </>
  )
}
