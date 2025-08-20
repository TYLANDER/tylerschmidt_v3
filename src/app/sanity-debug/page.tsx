import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'

export default async function SanityDebugPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  
  let projects = []
  let error = null
  
  try {
    projects = await client.fetch(projectsQuery)
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error'
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Configuration Debug</h1>
      <div className="space-y-2">
        <p>Project ID: {projectId || 'NOT SET'}</p>
        <p>Dataset: {dataset || 'NOT SET'}</p>
        <p>Expected Project ID: w41634kr</p>
        <p>Expected Dataset: production</p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Data Fetch Test</h2>
        {error ? (
          <div className="p-4 bg-red-100 text-red-800 rounded">
            <p className="font-bold">Error fetching data:</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="p-4 bg-green-100 text-green-800 rounded">
            <p className="font-bold">Successfully fetched {projects.length} projects!</p>
            {projects.length > 0 && (
              <div className="mt-2">
                <p>Project titles:</p>
                <ul className="list-disc ml-6">
                  {(projects as any[]).map((p) => (
                    <li key={p._id}>{p.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      {(!projectId || !dataset) && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          <p className="font-bold">Environment variables are missing!</p>
          <p>You need to add these to Vercel:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>NEXT_PUBLIC_SANITY_PROJECT_ID = w41634kr</li>
            <li>NEXT_PUBLIC_SANITY_DATASET = production</li>
          </ul>
        </div>
      )}
    </div>
  )
}
