import { Link, NavLink, Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Wallet, 
  Star, 
  Calendar
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const SIDEBAR_ITEMS = [
  { to: '/pro-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pro-dashboard/profile', icon: User, label: 'Profile' },
  { to: '/pro-dashboard/jobs', icon: Briefcase, label: 'Job Requests' },
  { to: '/pro-dashboard/earnings', icon: Wallet, label: 'Earnings' },
  { to: '/pro-dashboard/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/pro-dashboard/reviews', icon: Star, label: 'Reviews' },
]

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="iPROFIXER" className="h-10 w-auto" />
          <span className="text-xs font-medium text-gray-500">Pro</span>
        </Link>
        
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/pro-dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-orange text-white' 
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

export default function ProfessionalDashboard() {
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
