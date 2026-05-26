import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  RefreshCcw, 
  Briefcase, 
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react'

const SIDEBAR_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
  { to: '/dashboard/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/dashboard/refunds', icon: RefreshCcw, label: 'Refunds' },
  { to: '/dashboard/services', icon: Briefcase, label: 'Services' },
  { to: '/dashboard/appointments', icon: Clock, label: 'Appointments' },
]

const SERVICE_POPULARITY = [
  { name: 'Cleaning', slices: 3, percent: 20, color: '#0B6B52' },
  { name: 'AC Repair', slices: 2, percent: 13.3, color: '#1D9E75' },
  { name: 'Electricians', slices: 1, percent: 20, color: '#F97316' },
  { name: 'Caregiver', slices: 5, percent: 33.3, color: '#E11D48' },
  { name: 'Bridal Make-Up', slices: 1, percent: 6.7, color: '#8B5CF6' },
  { name: 'Appliances', slices: 3, percent: 20, color: '#3B82F6' },
]

function StatCard({ icon: Icon, label, value, subtext, color }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtext && (
            <p className={`text-xs mt-1 ${color || 'text-gray-400'}`}>{subtext}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color ? color.replace('text-', 'bg-').replace('600', '100') : 'bg-gray-100'}`}>
          <Icon size={20} className={color || 'text-gray-600'} />
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ percent, color }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
      <div 
        className="h-2.5 rounded-full transition-all duration-500" 
        style={{ width: `${percent}%`, backgroundColor: color || '#0B6B52' }}
      />
    </div>
  )
}

function PopularityChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">Live Service Popularity</h3>
      <p className="text-sm text-gray-500 mb-6">
        See which services are trending right now. Updated every moment.
      </p>
      
      {/* Visual bar chart */}
      <div className="space-y-4 mb-6">
        {SERVICE_POPULARITY.map((service) => (
          <div key={service.name} className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-24">{service.name}</span>
            <div className="flex-1">
              <ProgressBar percent={service.percent} color={service.color} />
            </div>
            <span className="text-sm font-medium text-gray-900 w-12 text-right">{service.percent}%</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Topping</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Slices</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {SERVICE_POPULARITY.map((service) => (
              <tr key={service.name} className="hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: service.color }}
                  />
                  {service.name}
                </td>
                <td className="py-3 px-4 text-right font-medium">{service.slices}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

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
  const [profileComplete] = useState(100)
  const [completedBookings] = useState(9)
  const [activeBookings] = useState(65)
  const [totalSpent] = useState(1202)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back to iPROFIXER</p>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              <span className="font-medium text-gray-900">Profile Complete</span>
            </div>
            <span className="text-green-600 font-semibold">{profileComplete}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${profileComplete}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">100% Complete (success)</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={CheckCircle} 
            label="Total Completed Bookings" 
            value={`0${completedBookings}`}
            color="text-green-600"
          />
          <StatCard 
            icon={Calendar} 
            label="My Active Bookings" 
            value={`0${activeBookings}`}
            color="text-blue-600"
          />
          <StatCard 
            icon={AlertCircle} 
            label="Current Booking Status" 
            value="Pending"
            subtext="* pending"
            color="text-amber-600"
          />
          <StatCard 
            icon={Briefcase} 
            label="Total Spend Money" 
            value={`RM.${totalSpent}`}
            color="text-purple-600"
          />
        </div>

        {/* Live Popularity Section */}
        <PopularityChart />

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/services"
            className="bg-teal text-white rounded-xl p-6 flex items-center justify-between hover:bg-teal-dark transition-colors"
          >
            <div>
              <h3 className="font-semibold text-lg">Book a Service</h3>
              <p className="text-teal-100 text-sm">Find and book home services</p>
            </div>
            <ChevronRight size={24} />
          </Link>
          <Link 
            to="/dashboard/appointments"
            className="bg-orange text-white rounded-xl p-6 flex items-center justify-between hover:bg-orange-dark transition-colors"
          >
            <div>
              <h3 className="font-semibold text-lg">View Appointments</h3>
              <p className="text-orange-100 text-sm">Check your upcoming schedule</p>
            </div>
            <ChevronRight size={24} />
          </Link>
        </div>
      </main>
    </div>
  )
}
