import { client } from '@/sanity/lib/client'
import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import Link from 'next/link'


import { Container } from '@/components/ui/Container'
import { PageWrapper } from '@/components/layout/page-transition'
import { AnimatedText } from '@/components/animations/animated-text'
import { ProjectContent } from '@/components/work/project-content'
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
      <article className="min-h-screen">
        {/* Back to Work */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <Container>
            <div className="py-6">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <span className="text-lg">←</span>
                <span>Back to Work</span>
              </Link>
            </div>
          </Container>
        </div>

        <Container>
          {/* Header */}
          <header className="py-16 md:py-20">
            <div className="max-w-4xl">
              <AnimatedText
                text={project.title}
                as="h1"
                variant="slide"
                className="text-5xl md:text-7xl font-bold mb-6"
              />
              
              <div className="flex flex-wrap items-center gap-2 text-lg text-gray-600 dark:text-gray-400">
                {project.client && (
                  <>
                    <span className="font-medium">{project.client}</span>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                  </>
                )}
                {project.category && (
                  <>
                    <span>{project.category}</span>
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                  </>
                )}
                {project.year && <span>{project.year}</span>}
              </div>

              {/* Project Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-4 mt-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      View Live Site
                      <span className="text-sm">↗</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      View on GitHub
                      <span className="text-sm">↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* Project Content */}
          <ProjectContent project={project} />

          {/* Next Project */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-16 pb-20">
            <div className="text-center">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                View All Projects
                <span>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </PageWrapper>
  )
}
