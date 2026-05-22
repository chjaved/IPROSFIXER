import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV = [
  { to: '/',                label: 'Home' },
  {
    label: 'Services',
    children: [
      { to: '/services#electrician', label: '⚡ Electricians' },
      { to: '/services#ac',          label: '❄️ AC Repair' },
      { to: '/services#appliances',  label: '🔌 Appliances' },
      { to: '/services#caregiver',   label: '❤️ Caregiver' },
      { to: '/services#cleaning',    label: '✨ Cleaning' },
      { to: '/services#laundry',     label: '👕 Laundry' },
      { to: '/services#maid',        label: '🧹 House Maid' },
    ],
  },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about',        label: 'About' },
  { to: '/faq',          label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); setDropOpen(false) }, [pathname])

  const isHome = pathname === '/'
  // On homepage: transparent when at top, solid when scrolled
  // On other pages: always solid
  const solid = !isHome || scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-brand shadow-[0_4px_30px_rgba(0,0,0,0.25)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="font-head font-black text-xl italic select-none flex-shrink-0">
            <span className="text-white">iPRO</span>
            <span className="text-gold">FIXER</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map(item =>
              item.children ? (
                <div key={item.label} className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-gold transition-colors rounded-lg hover:bg-white/5">
                    {item.label} <ChevronDown size={14} className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[200px] z-50">
                      {item.children.map(child => (
                        <Link key={child.to} to={child.to}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gold/10 hover:text-brand font-medium transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to} to={item.to} end={item.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'text-gold font-semibold' : 'text-white/80 hover:text-gold hover:bg-white/5'}`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
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
          {NAV.map(item =>
            item.children ? (
              <div key={item.label}>
                <div className="py-3 text-sm font-bold text-gold/80 uppercase tracking-wider text-xs">{item.label}</div>
                {item.children.map(child => (
                  <Link key={child.to} to={child.to}
                    className="py-2.5 pl-3 text-sm text-white/70 hover:text-gold flex items-center gap-2 border-b border-white/5">
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium border-b border-white/10 ${isActive ? 'text-gold' : 'text-white/75 hover:text-gold'}`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
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
