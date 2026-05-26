import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, LayoutDashboard, User } from 'lucide-react'

const NAV = [
  { to: '/',                label: 'Home' },
  { to: '/services',        label: 'Services' },
  { to: '/how-it-works',    label: 'How It Works' },
  { to: '/for-professionals', label: 'For Pros' },
  { to: '/faq',             label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-border transition-all duration-300 ${
        scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.10)]' : ''
      }`}
      style={{ height: '68px', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 flex items-center justify-between h-full">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0" aria-label="iPROFIXER home">
          <img src="/logo.png" alt="iPROFIXER" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(item => (
            <NavLink
              key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive ? 'text-teal font-semibold' : 'text-muted hover:text-teal'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal transition-colors">
            <LayoutDashboard size={18} />
            My Dashboard
          </Link>
          <Link to="/pro-dashboard"
            className="flex items-center gap-2 text-sm font-medium text-orange hover:text-orange-dark transition-colors">
            <User size={18} />
            Pro Dashboard
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="lg:hidden text-teal p-2 rounded-lg hover:bg-teal-light transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`lg:hidden absolute top-[68px] left-0 right-0 bg-white border-b border-border shadow-lg transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-5 pt-3 flex flex-col gap-1">
          {NAV.map(item => (
            <NavLink
              key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) =>
                `py-3 px-3 text-sm font-medium border-b border-border last:border-0 ${
                  isActive ? 'text-teal font-semibold' : 'text-muted'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 space-y-2">
            <Link to="/dashboard"
              className="flex items-center gap-2 py-3 px-3 text-sm font-medium text-teal border-b border-gray-100">
              <LayoutDashboard size={18} />
              My Dashboard
            </Link>
            <Link to="/pro-dashboard"
              className="flex items-center gap-2 py-3 px-3 text-sm font-medium text-orange">
              <User size={18} />
              Pro Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
