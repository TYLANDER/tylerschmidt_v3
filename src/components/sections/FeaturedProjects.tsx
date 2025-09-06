import { client } from "@/sanity/lib/client"
import { featuredProjectsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

import { Container } from "@/components/ui/Container"
import { ProjectCard } from "@/components/work/ProjectCard"
import type { Project } from "@/types/sanity"

async function getFeaturedProjects() {
  return await client.fetch<Project[]>(featuredProjectsQuery)
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects()

  if (projects.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900">
      <Container>
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Work</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Recent projects that showcase my expertise
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              imageUrl={
                project.featuredImage
                  ? urlFor(project.featuredImage).width(800).height(600).url()
                  : ""
              }
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
          >
            View all projects
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  )
}
