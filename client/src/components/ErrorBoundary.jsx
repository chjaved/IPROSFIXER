import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', 
          minHeight: '100vh', padding: '2rem', textAlign: 'center' 
        }}>
          <h1 style={{ color: '#0B6B52', fontSize: '2rem', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
            We are looking into it. Please refresh the page or try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              background: '#0B6B52', color: 'white', 
              padding: '0.75rem 2rem', borderRadius: '8px',
              border: 'none', cursor: 'pointer', fontSize: '1rem'
            }}
          >
            Refresh Page
          </button>
          <a 
            href="https://wa.me/60162104127" 
            style={{ marginTop: '1rem', color: '#F47B20' }}
          >
            Contact Support on WhatsApp
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
