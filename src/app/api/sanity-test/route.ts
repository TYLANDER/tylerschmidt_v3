import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    
    // First, check if env vars are set
    if (!projectId || !dataset) {
      return NextResponse.json({
        error: 'Environment variables not set',
        projectId: projectId || 'NOT SET',
        dataset: dataset || 'NOT SET'
      }, { status: 500 })
    }
    
    // Try to fetch projects
    const projects = await client.fetch(projectsQuery)
    
    return NextResponse.json({
      success: true,
      projectId,
      dataset,
      projectCount: projects.length,
      projects: projects.map((p: any) => ({
        id: p._id,
        title: p.title,
        slug: p.slug?.current,
        client: p.client
      }))
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
