'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { portableTextComponents } from './portable-text-components'
import { ImageGalleryCarouselV2 } from '@/components/ui/image-gallery-carousel-v2'
import { ImageCarouselModal, useImageCarouselModal } from '@/components/ui/image-carousel-modal'
import type { Project } from '@/types/sanity'
import type { CarouselImage } from '@/components/ui/image-carousel-modal'

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
          className="relative aspect-video w-full mb-20 -mx-6 md:mx-0 md:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={urlFor(project.featuredImage).width(2400).height(1350).quality(90).url()}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1320px"
          />
        </motion.div>
      )}

      {/* Overview */}
      <article className="max-w-4xl mx-auto mb-20">
        {project.overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="sr-only">Project Overview</h2>
            <PortableText 
              value={project.overview} 
              components={portableTextComponents}
            />
          </motion.div>
        )}
      </article>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <motion.section 
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          aria-labelledby="technologies-heading"
        >
          <h2 id="technologies-heading" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 md:text-3xl">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3" role="list">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                role="listitem"
                className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-base font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          aria-labelledby="gallery-heading"
        >
          <div className="max-w-5xl mx-auto">
            <h2 id="gallery-heading" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-12 text-center md:text-3xl">
              Project Gallery
            </h2>
            <ImageGalleryCarouselV2 
              images={galleryImages}
              className="w-full"
              onImageClick={handleGalleryImageClick}
            />
          </div>
        </motion.section>
      )}

      {/* Image Carousel Modal */}
      <ImageCarouselModal {...modalProps} />
    </>
  )
}
