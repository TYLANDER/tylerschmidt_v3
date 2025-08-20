import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Project } from '@/types/sanity'

export async function GET() {
  try {
    const projects = await client.fetch<Project[]>(projectsQuery)
    const firstProject = projects[0]
    
    if (!firstProject?.featuredImage) {
      return NextResponse.json({ error: 'No featured image found' })
    }
    
    const imageUrl = urlFor(firstProject.featuredImage).width(800).height(600).url()
    
    return NextResponse.json({
      projectTitle: firstProject.title,
      featuredImage: firstProject.featuredImage,
      generatedUrl: imageUrl,
      hasAsset: !!firstProject.featuredImage?.asset,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
