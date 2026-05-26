import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, LayoutDashboard, User, LogOut, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

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
  const { isAuthenticated, user, logout, isConsumer, isProfessional } = useAuth()

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
      style={{ height: '80px', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 flex items-center justify-between h-full">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0" aria-label="iPROFIXER home">
          <img src="/logo.png" alt="iPROFIXER" className="h-14 w-auto" />
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
          {isAuthenticated ? (
            <>
              <Link to={isProfessional ? '/pro-dashboard' : '/dashboard'}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal transition-colors">
                <LayoutDashboard size={18} />
                {isProfessional ? 'Pro Dashboard' : 'My Dashboard'}
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User size={16} />
                <span>Hi, {user?.name?.split(' ')[0] || 'User'}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal transition-colors">
                <LogIn size={18} />
                Login
              </Link>
              <Link to="/signup"
                className="bg-orange hover:bg-orange-dark text-white font-bold text-sm px-5 py-2.5 rounded-card transition-all duration-200 shadow-md flex items-center gap-2">
                <UserPlus size={18} />
                Sign Up
              </Link>
            </>
          )}
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
        className={`lg:hidden absolute top-[80px] left-0 right-0 bg-white border-b border-border shadow-lg transition-all duration-300 overflow-hidden ${
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
          <div className="pt-4 space-y-2 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <Link to={isProfessional ? '/pro-dashboard' : '/dashboard'}
                  className={`flex items-center gap-2 py-3 px-3 text-sm font-medium border-b border-gray-100 ${
                    isProfessional ? 'text-orange' : 'text-teal'
                  }`}>
                  <LayoutDashboard size={18} />
                  {isProfessional ? 'Pro Dashboard' : 'My Dashboard'}
                </Link>
                <div className="flex items-center gap-2 py-3 px-3 text-sm text-gray-600">
                  <User size={18} />
                  <span>Hi, {user?.name?.split(' ')[0] || 'User'}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 py-3 px-3 text-sm font-medium text-red-600 w-full">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="flex items-center gap-2 py-3 px-3 text-sm font-medium text-gray-600 border-b border-gray-100">
                  <LogIn size={18} />
                  Login
                </Link>
                <Link to="/signup"
                  className="flex items-center gap-2 py-3 px-3 text-sm font-medium text-orange">
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
