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
  return builder.image(source)
}
