export default function SimplePage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple Test Page</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>If you can see this, the basic rendering is working.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Testing Colors:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '600px' }}>
          <div style={{ padding: '1rem', backgroundColor: '#000000', color: '#ffffff' }}>
            Black bg, white text
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#0066ff', color: '#ffffff' }}>
            Blue bg, white text
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#ff0000', color: '#ffffff' }}>
            Red bg, white text
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Testing Tailwind Classes:</h2>
        <div className="bg-black text-white p-4 mb-2">
          Using className: bg-black text-white
        </div>
        <div className="bg-blue-600 text-white p-4 mb-2">
          Using className: bg-blue-600 text-white
        </div>
      </div>
      
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '0.5rem',
        fontFamily: 'monospace',
        fontSize: '0.875rem'
      }}>
        <p>Debug info:</p>
        <p>URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
        <p>Time: {new Date().toISOString()}</p>
      </div>
    </div>
  )
}
