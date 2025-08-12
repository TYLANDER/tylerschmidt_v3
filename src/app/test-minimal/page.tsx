export default function TestMinimalPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>
        MINIMAL TEST
      </h1>
      <p style={{ fontSize: '24px', margin: '0 0 40px 0' }}>
        Black background, white text. No CSS frameworks.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#ffffff',
          color: '#000000'
        }}>
          White box
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: '#0066ff',
          color: '#ffffff'
        }}>
          Blue box
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }}>
          Red box
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: '#00ff00',
          color: '#000000'
        }}>
          Green box
        </div>
      </div>
    </div>
  )
}
