export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', textAlign: 'center', padding: '2rem'
    }}>
      <h1 style={{ fontSize: '6rem', color: '#0B6B52', margin: 0 }}>404</h1>
      <h2 style={{ color: '#111827' }}>Page Not Found</h2>
      <p style={{ color: '#6B7280' }}>The page you are looking for does not exist.</p>
      <a href="/" style={{ 
        background: '#0B6B52', color: 'white',
        padding: '0.75rem 2rem', borderRadius: '8px',
        textDecoration: 'none', marginTop: '1rem'
      }}>
        Go Home
      </a>
    </div>
  );
}
