"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import { portableTextComponents } from "./portable-text-components"
import {
  ImageDisplayEnhanced,
  EnhancedImageModal,
  useEnhancedImageModal,
} from "@/components/ui/image-display-enhanced"
import type { Project } from "@/types/sanity"
import type { DisplayImage } from "@/components/ui/image-display-enhanced"

interface ProjectContentProps {
  project: Project
}

export function ProjectContent({ project }: ProjectContentProps) {
  const { modalProps, openModal } = useEnhancedImageModal()

  // Prepare gallery images with enhanced display support
  const galleryImages: DisplayImage[] =
    project.gallery
      ?.filter((image) => image.asset)
      ?.map((image) => ({
        src: urlFor(image).quality(95).url(),
        alt: image.alt || `${project.title} gallery image`,
        caption: image.caption,
      })) || []

  const handleGalleryImageClick = (index: number) => {
    openModal(galleryImages, index)
  }

  return (
    <>
      {/* Featured Image */}
      {project.featuredImage && project.featuredImage.asset && (
        <motion.div
          className="relative -mx-6 mb-20 aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900 md:mx-0 md:rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={urlFor(project.featuredImage)
              .width(2400)
              .height(1350)
              .quality(90)
              .url()}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1320px"
          />
        </motion.div>
      )}

      {/* Overview */}
      <article className="mx-auto mb-20 max-w-4xl">
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
          className="mx-auto mb-20 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          aria-labelledby="technologies-heading"
        >
          <h2
            id="technologies-heading"
            className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl"
          >
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3" role="list">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                role="listitem"
                className="rounded-full bg-gray-100 px-5 py-2.5 text-base font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
          <div className="mx-auto max-w-5xl">
            <h2
              id="gallery-heading"
              className="mb-12 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl"
            >
              Project Gallery
            </h2>
            <ImageDisplayEnhanced
              images={galleryImages}
              className="w-full"
              onImageClick={handleGalleryImageClick}
              variant="carousel"
            />
          </div>
        </motion.section>
      )}

      {/* Enhanced Image Modal */}
      <EnhancedImageModal {...modalProps} />
    </>
  )
}
