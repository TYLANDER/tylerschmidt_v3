import { client } from "@/sanity/lib/client"
import { projectsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

import { Container } from "@/components/ui/Container"
import { PageWrapper } from "@/components/layout/page-transition"
import { AnimatedText } from "@/components/animations/animated-text"
import { ProjectCard } from "@/components/work/ProjectCard"
import type { Project } from "@/types/sanity"

async function getProjects() {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery)

    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <PageWrapper>
      <section className="min-h-screen pb-20 pt-32">
        <Container>
          <header className="mb-16">
            <AnimatedText
              text="Selected Work"
              as="h1"
              variant="slide"
              className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-7xl"
            />
            <AnimatedText
              text="From enterprise transformations to emerging tech innovations. Each project tells a story of strategic design thinking."
              as="p"
              variant="fade"
              className="max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-400"
              delay={0.5}
            />
          </header>

          {projects.length === 0 ? (
            <div className="py-20 text-center">
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                No projects found.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Projects added in Sanity will appear here once published.
              </p>
            </div>
          ) : (
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
              {projects.map((project, index) => {
                let imageUrl = ""
                try {
                  if (project.featuredImage?.asset) {
                    const builder = urlFor(project.featuredImage)
                      .width(800)
                      .height(600)
                    imageUrl = builder.url()
                  }
                } catch (error) {
                  console.error(
                    `Error generating URL for ${project.title}:`,
                    error
                  )
                }

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
        </Container>
      </section>
    </PageWrapper>
  )
}
