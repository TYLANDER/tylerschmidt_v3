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
    console.log('Fetched projects:', JSON.stringify(projects, null, 2))
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
              {projects.map((project, index) => {
                let imageUrl = ''
                try {
                  if (project.featuredImage?.asset) {
                    const builder = urlFor(project.featuredImage).width(800).height(600)
                    imageUrl = builder.url()
                  }
                } catch (error) {
                  console.error(`Error generating URL for ${project.title}:`, error)
                }
                
                console.log(`Project ${project.title}:`, {
                  featuredImage: project.featuredImage,
                  hasAsset: !!project.featuredImage?.asset,
                  generatedUrl: imageUrl,
                  urlType: typeof imageUrl
                })
                
                return (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                    imageUrl={imageUrl}
                  />
                )
              })}
            </div>
          )}
          
          {/* Debug info - remove after fixing */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded text-xs font-mono">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            {projects.map((p, i) => (
              <div key={i} className="mb-2">
                <div>Project: {p.title}</div>
                <div>Has featuredImage: {p.featuredImage ? 'Yes' : 'No'}</div>
                <div>Has asset: {p.featuredImage?.asset ? 'Yes' : 'No'}</div>
                <div>Asset ref: {p.featuredImage?.asset?._ref || 'None'}</div>
                <div>URL: {p.featuredImage?.asset ? urlFor(p.featuredImage).width(100).url() : 'No URL'}</div>
                <div>URL Type: {p.featuredImage?.asset ? typeof urlFor(p.featuredImage).width(100).url() : 'N/A'}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </PageWrapper>
  )
}