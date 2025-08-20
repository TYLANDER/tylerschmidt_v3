'use client'

import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { PageWrapper } from '@/components/layout/page-transition'

interface DebugProject {
  id: string
  title: string
  slug: string
  client: string
}

interface DebugData {
  success: boolean
  projectId: string
  dataset: string
  projectCount: number
  projects: DebugProject[]
}

export default function WorkDebugPage() {
  const [data, setData] = useState<DebugData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/sanity-test')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <PageWrapper>
      <section className="min-h-screen pt-32 pb-20">
        <Container>
          <h1 className="text-3xl font-bold mb-8">Work Page Debug</h1>
          
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {data && (
            <div className="space-y-8">
              <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded">
                <h2 className="text-xl font-bold mb-2">API Response</h2>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Projects Preview</h2>
                {data.projects && data.projects.length > 0 ? (
                  <div className="grid gap-4">
                    {data.projects.map((project) => (
                      <div key={project.id} className="border p-4 rounded">
                        <h3 className="font-bold">{project.title}</h3>
                        <p className="text-sm text-gray-600">Client: {project.client}</p>
                        <p className="text-sm text-gray-600">Slug: {project.slug}</p>
                        <a 
                          href={`/work/${project.slug}`} 
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View Project →
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No projects found in API response</p>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-2">Next Steps</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Check if projects appear above</li>
                  <li>Try hard refresh (Cmd+Shift+R)</li>
                  <li>Check Vercel Function logs for errors</li>
                  <li>Verify Next.js cache settings</li>
                </ol>
              </div>
            </div>
          )}
        </Container>
      </section>
    </PageWrapper>
  )
}
