import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
 
    // Dynamic params
    const title = searchParams.get('title') || 'Tyler Schmidt'
    const subtitle = searchParams.get('subtitle') || 'Product Designer & Engineer'
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0, 102, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.05) 0%, transparent 50%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '900px',
              padding: '0 60px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#111111',
                lineHeight: 1.1,
                marginBottom: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#666666',
                lineHeight: 1.4,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          </div>
          
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '60px',
              width: '120px',
              height: '120px',
              border: '3px solid #0066FF',
              borderRadius: '8px',
              opacity: 0.2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              right: '60px',
              width: '120px',
              height: '120px',
              backgroundColor: '#00FF7F',
              borderRadius: '60px',
              opacity: 0.1,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error('OG Image generation failed:', e)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
