import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Hardcode values to ensure they're available
const projectId = 'w41634kr'
const dataset = 'production'

const builder = createImageUrlBuilder({
  projectId,
  dataset,
})

export function urlFor(source: SanityImageSource) {
  if (!source) {
    console.error('urlFor called with no source')
    return builder.image('')
  }
  
  console.log('Building URL for source:', source)
  const imageBuilder = builder.image(source)
  const url = imageBuilder.url()
  console.log('Generated URL:', url)
  
  return imageBuilder
}
