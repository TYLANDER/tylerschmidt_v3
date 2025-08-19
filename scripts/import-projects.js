// Example import script for migrating existing project data to Sanity
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Need write access
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Example project data - replace with your actual data
const projects = [
  {
    _type: 'project',
    title: 'Example Project',
    slug: { current: 'example-project' },
    client: 'Example Client',
    year: '2024',
    category: 'product-design',
    description: 'A brief description of the project',
    featured: true,
    order: 1,
    technologies: ['React', 'Next.js', 'TypeScript'],
    // Add more fields as needed
  },
  // Add more projects...
]

async function importProjects() {
  for (const project of projects) {
    try {
      const result = await client.create(project)
      console.log(`Created project: ${result.title}`)
    } catch (error) {
      console.error(`Error creating project ${project.title}:`, error)
    }
  }
}

importProjects()
