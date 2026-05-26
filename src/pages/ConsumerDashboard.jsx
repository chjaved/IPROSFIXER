import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  RefreshCcw, 
  Briefcase, 
  Clock
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const SIDEBAR_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
  { to: '/dashboard/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/dashboard/refunds', icon: RefreshCcw, label: 'Refunds' },
  { to: '/dashboard/services', icon: Briefcase, label: 'Services' },
  { to: '/dashboard/appointments', icon: Clock, label: 'Appointments' },
]

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="iPROFIXER" className="h-10 w-auto" />
        </Link>
        
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-teal text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default function ConsumerDashboard() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 pt-[68px]">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  )
}
