/**
 * Blur Placeholder Generator
 * Creates base64 blur placeholders for images
 */

import { getPlaiceholder } from 'plaiceholder'

export interface BlurDataURL {
  base64: string
  img: {
    src: string
    width: number
    height: number
  }
}

/**
 * Generate blur placeholder for a single image
 */
export async function getBlurDataURL(src: string): Promise<BlurDataURL> {
  try {
    const buffer = await fetch(src).then(async (res) => 
      Buffer.from(await res.arrayBuffer())
    )
    
    const { base64, metadata } = await getPlaiceholder(buffer, { size: 10 })
    
    return {
      base64,
      img: {
        src,
        width: metadata.width,
        height: metadata.height
      }
    }
  } catch (error) {
    console.error('Error generating blur placeholder:', error)
    // Return a default gray placeholder
    return {
      base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      img: { src, width: 1, height: 1 }
    }
  }
}

/**
 * Generate blur placeholders for multiple images
 */
export async function getBlurDataURLs(
  srcs: string[]
): Promise<Record<string, BlurDataURL>> {
  const results = await Promise.all(
    srcs.map(async (src) => ({
      src,
      data: await getBlurDataURL(src)
    }))
  )
  
  return results.reduce((acc, { src, data }) => ({
    ...acc,
    [src]: data
  }), {})
}
