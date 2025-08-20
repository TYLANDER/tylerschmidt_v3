export interface Project {
  _id: string
  _type: 'project'
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
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  gallery?: Array<{
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
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
