import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/types/sanity'

export async function GET() {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery)
    
    // Get detailed info about images
    const projectsWithImageInfo = projects.map((project) => ({
      title: project.title,
      slug: project.slug,
      featuredImage: project.featuredImage,
      hasAsset: !!project.featuredImage?.asset,
      assetRef: project.featuredImage?.asset?._ref
    }))
    
    return NextResponse.json({
      success: true,
      projects: projectsWithImageInfo,
      sampleImageData: projects[0]?.featuredImage
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
