import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

import { Container } from '@/components/ui/Container'
import { PageWrapper } from '@/components/layout/page-transition'
import { AnimatedText } from '@/components/animations/animated-text'
import { ProjectCard } from '@/components/work/ProjectCard'
import type { Project } from '@/types/sanity'

async function getProjects() {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery)
    console.log('Fetched projects:', projects)
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <PageWrapper>
      <section className="min-h-screen pt-32 pb-20">
        <Container>
          <div className="mb-16">
            <AnimatedText
              text="Selected Work"
              as="h1"
              variant="slide"
              className="text-5xl md:text-7xl font-bold mb-6"
            />
            <AnimatedText
              text="A collection of projects that showcase my expertise in design and development."
              as="p"
              variant="fade"
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
              delay={0.5}
            />
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No projects found.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Projects added in Sanity will appear here once published.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  imageUrl={project.featuredImage?.asset ? urlFor(project.featuredImage).width(800).height(600).url() : ''}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </PageWrapper>
  )
}