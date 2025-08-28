import { groq } from 'next-sanity'

// Get all projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    category,
    description,
    featuredImage,
    technologies,
    featured,
    order
  }
`

// Get featured projects for homepage
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, _createdAt desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    client,
    year,
    category,
    description,
    featuredImage,
    technologies,
    order
  }
`

// Get single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    year,
    category,
    description,
    overview,
    featuredImage,
    gallery,
    technologies,
    liveUrl,
    githubUrl
  }
`
