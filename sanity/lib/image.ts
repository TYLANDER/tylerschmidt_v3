import { createImageUrlBuilder } from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"

// Hardcode values to ensure they're available
const projectId = "w41634kr"
const dataset = "production"

const builder = createImageUrlBuilder({
  projectId,
  dataset,
})

export function urlFor(source: SanityImageSource) {
  if (!source) {
    console.error("urlFor called with no source")
    return builder.image("")
  }

  return builder.image(source)
}
