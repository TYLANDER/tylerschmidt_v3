import { NextResponse } from "next/server"
import { client } from "@/sanity/lib/client"
import { projectsQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

export async function GET() {
  try {
    const projects = await client.fetch(projectsQuery)
    const firstProject = projects[0]

    // Try different ways to build the URL
    let urlResult = null
    let error = null

    try {
      if (firstProject?.featuredImage) {
        // Try the standard way
        const url1 = urlFor(firstProject.featuredImage).url()

        // Try with explicit sizing
        const url2 = urlFor(firstProject.featuredImage)
          .width(800)
          .height(600)
          .url()

        // Try manual construction
        const assetRef = firstProject.featuredImage.asset?._ref
        const manualUrl = assetRef
          ? `https://cdn.sanity.io/images/w41634kr/production/${assetRef.replace("image-", "").replace(/-([a-z]+)$/, ".$1")}`
          : null

        urlResult = {
          standard: url1,
          withSize: url2,
          manual: manualUrl,
          assetRef: assetRef,
        }
      }
    } catch (e) {
      error = e instanceof Error ? e.message : "Unknown error"
    }

    return NextResponse.json({
      projectTitle: firstProject?.title,
      featuredImage: firstProject?.featuredImage,
      urls: urlResult,
      error: error,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
