import { HeroParticleTypography } from "@/components/sections/HeroParticleTypography"
import { FeaturedWork } from "@/components/sections/FeaturedWork"
import { client } from "@/sanity/lib/client"
import { featuredProjectsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Project } from "@/types/sanity"

async function getFeaturedProjects() {
  try {
    const projects = await client.fetch<Project[]>(featuredProjectsQuery)
    return projects
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
}

export default async function HomePage() {
  const projects = await getFeaturedProjects()

  // Generate image URLs for all projects
  const imageUrls: Record<string, string> = {}
  projects.forEach((project) => {
    if (project.featuredImage?.asset) {
      imageUrls[project._id] = urlFor(project.featuredImage)
        .width(1200)
        .height(800)
        .quality(90)
        .url()
    }
  })

  return (
    <>
      <HeroParticleTypography />
      <FeaturedWork projects={projects} imageUrls={imageUrls} />
    </>
  )
}
