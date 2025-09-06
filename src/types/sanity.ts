export interface AboutPage {
  _id: string
  title: string
  headline: string
  portraitImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  bioFirstParagraph: string
  bioSecondParagraph: string
  expertiseSection: {
    title: string
    skills: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  philosophyQuote: {
    quote: string
    showAttribution: boolean
  }
  careerHighlights: {
    title: string
    highlights: Array<{
      company: string
      description: string
    }>
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Project {
  _id: string
  _type: "project"
  title: string
  slug: string
  client?: string
  year?: string
  category?: string
  description?: string
  overview?: Array<{
    _type: string
    [key: string]: unknown
  }> // Portable Text array
  featuredImage?: {
    _type: "image"
    asset: {
      _ref: string
      _type: "reference"
    }
  }
  gallery?: Array<{
    _type: "image"
    asset: {
      _ref: string
      _type: "reference"
    }
    alt?: string
    caption?: string
  }>
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  order?: number
}
