export default function SanityDebugPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Configuration Debug</h1>
      <div className="space-y-2">
        <p>Project ID: {projectId || 'NOT SET'}</p>
        <p>Dataset: {dataset || 'NOT SET'}</p>
        <p>Expected Project ID: w41634kr</p>
        <p>Expected Dataset: production</p>
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
