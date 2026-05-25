import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV = [
  { to: '/',           label: 'Home' },
  { to: '/services',   label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about',      label: 'About' },
  { to: '/faq',        label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isHome = pathname === '/'
  // On homepage: transparent when at top, solid when scrolled
  // On other pages: always solid
  const solid = !isHome || scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-brand border-b border-white/10 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center h-16 py-2.5">
            <img src="/logo.png" alt="iPROFIXER" className="h-full w-auto max-w-[180px]" style={{ mixBlendMode: 'screen' }} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(item => (
              <NavLink
                key={item.to} to={item.to} end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-gold hover:bg-white/5'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/for-professionals"
              className="text-xs font-bold text-white/70 hover:text-gold border border-white/20 hover:border-gold/60 px-4 py-2 rounded-lg transition-all duration-200">
              For Professionals
            </Link>
            <Link to="/contact"
              className="bg-gold hover:bg-gold-dark text-brand font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-gold/20">
              Book Now
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-brand-light border-t border-white/10 px-4 pb-6 pt-2 flex flex-col">
          {NAV.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) =>
                `py-3 text-sm font-medium border-b border-white/10 ${isActive ? 'text-gold' : 'text-white/75 hover:text-gold'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/for-professionals"
            className={({ isActive }) => `py-3 text-sm font-medium border-b border-white/10 ${isActive ? 'text-gold' : 'text-white/75 hover:text-gold'}`}>
            For Professionals
          </NavLink>
          <div className="flex gap-3 pt-4">
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-wa text-white font-bold py-3 rounded-xl text-sm text-center">
              WhatsApp
            </a>
            <Link to="/contact" className="flex-1 bg-gold text-brand font-bold py-3 rounded-xl text-sm text-center">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
