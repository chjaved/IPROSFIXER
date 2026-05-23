/* Official App Store + Google Play badges as inline SVG images */

export function AppStoreBadge({ href = '#', className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-block hover:opacity-85 transition-opacity duration-200 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="135" height="40" viewBox="0 0 135 40" role="img" aria-label="Download on the App Store">
        <rect width="135" height="40" rx="7" fill="#000"/>
        <path d="M19.23 20.02c-.03-3.25 2.66-4.83 2.78-4.9-1.52-2.22-3.88-2.52-4.72-2.55-2-.2-3.9 1.18-4.92 1.18-1.02 0-2.58-1.16-4.24-1.12-2.16.03-4.16 1.26-5.27 3.18-2.26 3.92-.58 9.7 1.62 12.87 1.08 1.55 2.36 3.29 4.04 3.23 1.63-.07 2.24-1.05 4.2-1.05 1.97 0 2.53 1.05 4.25 1.01 1.75-.03 2.86-1.57 3.92-3.13 1.25-1.79 1.76-3.54 1.78-3.63-.04-.02-3.4-1.3-3.44-5.09z" fill="#fff"/>
        <path d="M16.12 11.05c.88-1.08 1.48-2.57 1.32-4.05-1.27.05-2.84.85-3.75 1.9-.81.94-1.54 2.47-1.35 3.92 1.42.11 2.87-.72 3.78-1.77z" fill="#fff"/>
        <text x="42" y="13.5" fill="#fff" fontFamily="-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif" fontSize="8" letterSpacing="0.1">Download on the</text>
        <text x="42" y="28" fill="#fff" fontFamily="-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif" fontSize="17" fontWeight="600" letterSpacing="-0.3">App Store</text>
      </svg>
    </a>
  )
}

export function GooglePlayBadge({ href = '#', className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`inline-block hover:opacity-85 transition-opacity duration-200 ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="135" height="40" viewBox="0 0 135 40" role="img" aria-label="Get it on Google Play">
        <rect width="135" height="40" rx="7" fill="#000"/>
        {/* Play triangle — Google colors */}
        <path d="M10.44 7.54L23.5 20 10.44 32.46A2 2 0 019 30.7V9.3a2 2 0 011.44-1.76z" fill="#EA4335"/>
        <path d="M27.5 16.04l-4 2.32L10.44 7.54A2 2 0 0112.3 7l15.2 8.76-.0.28z" fill="#FBBC04"/>
        <path d="M27.5 23.96L12.3 32.72a2 2 0 01-1.86-.26L23.5 20l4 2.32-.0.28-.0.28z" fill="#34A853"/>
        <path d="M31.5 20c0 1.1-.6 2.1-1.54 2.64L27.5 24l-4-4 4-4 2.46 1.36A3 3 0 0131.5 20z" fill="#4285F4"/>
        <text x="38" y="13.5" fill="#fff" fontFamily="'Roboto','Helvetica Neue',sans-serif" fontSize="8" letterSpacing="0.2">GET IT ON</text>
        <text x="38" y="28" fill="#fff" fontFamily="'Roboto','Helvetica Neue',sans-serif" fontSize="16" fontWeight="500" letterSpacing="-0.2">Google Play</text>
      </svg>
    </a>
  )
}

export default function AppBadges({ href = '#', className = '', gap = 'gap-3' }) {
  return (
    <div className={`flex flex-wrap items-center ${gap} ${className}`}>
      <AppStoreBadge href={href} />
      <GooglePlayBadge href={href} />
    </div>
  )
}
