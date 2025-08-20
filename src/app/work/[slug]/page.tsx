import { client } from '@/sanity/lib/client'
import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

import { Container } from '@/components/ui/Container'
import { PageWrapper } from '@/components/layout/page-transition'
import { AnimatedText } from '@/components/animations/animated-text'
import { notFound } from 'next/navigation'
import type { Project } from '@/types/sanity'

async function getProject(slug: string) {
  return await client.fetch<Project>(projectBySlugQuery, { slug })
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await client.fetch<Project[]>(projectsQuery)
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <PageWrapper>
      <article className="min-h-screen pt-32 pb-20">
        <Container>
          {/* Header */}
          <div className="mb-12">
            <AnimatedText
              text={project.title}
              as="h1"
              variant="slide"
              className="text-4xl md:text-6xl font-bold mb-4"
            />
            
            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
              <span>{project.client}</span>
              <span>•</span>
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.category}</span>
            </div>
          </div>

          {/* Featured Image */}
          {project.featuredImage && project.featuredImage.asset && (
            <div className="relative aspect-video w-full mb-12 rounded-lg overflow-hidden">
              <Image
                src={urlFor(project.featuredImage).width(1600).height(900).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Overview */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="prose prose-lg dark:prose-invert">
              {project.overview && <PortableText value={project.overview} />}
            </div>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-8">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((image, index) => {
                  if (!image.asset) return null
                  return (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(image).width(800).height(450).url()}
                          alt={image.alt || `${project.title} image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {image.caption && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
              >
                View Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                View on GitHub
              </a>
            )}
          </div>
        </Container>
      </article>
    </PageWrapper>
  )
}
