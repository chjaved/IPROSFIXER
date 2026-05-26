import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  Star, 
  Wallet, 
  ChevronRight, 
  Bell,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone
} from 'lucide-react'

// Mock data for consumer dashboard
const MOCK_DATA = {
  stats: {
    totalBookings: 12,
    completedJobs: 8,
    upcomingAppointments: 2,
    totalSpent: 2450,
    loyaltyPoints: 450,
  },
  recentBookings: [
    { id: 'BK001', service: 'Home Deep Cleaning', date: '2026-05-28', time: '10:00 AM', status: 'confirmed', price: 350, professional: 'Ahmad bin Ismail', rating: 4.8 },
    { id: 'BK002', service: 'AC Service & Repair', date: '2026-05-25', time: '2:00 PM', status: 'completed', price: 180, professional: 'Kamarul Azri', rating: 5.0 },
    { id: 'BK003', service: 'Sofa Cleaning', date: '2026-05-20', time: '11:00 AM', status: 'completed', price: 220, professional: 'Hairul Bahari', rating: 4.9 },
  ],
  serviceCategories: [
    { name: 'Cleaning', count: 5, color: 'bg-teal' },
    { name: 'AC Repair', count: 3, color: 'bg-blue-500' },
    { name: 'Electrical', count: 2, color: 'bg-orange' },
    { name: 'Plumbing', count: 2, color: 'bg-purple-500' },
  ],
  notifications: [
    { type: 'booking', message: 'Your booking BK001 is confirmed', time: '2 hours ago', read: false },
    { type: 'reminder', message: 'Upcoming appointment tomorrow at 10:00 AM', time: '5 hours ago', read: false },
    { type: 'promo', message: 'Get 15% off your next deep cleaning!', time: '1 day ago', read: true },
  ]
}

// Simple bar chart component
function SimpleBarChart({ data }) {
  const max = Math.max(...data.map(d => d.count))
  return (
    <div className="flex items-end gap-4 h-32 mt-4">
      {data.map((item, i) => (
        <div key={item.name} className="flex-1 flex flex-col items-center gap-2">
          <div 
            className={`w-full ${item.color} rounded-t-lg transition-all duration-500`}
            style={{ height: `${(item.count / max) * 100}%`, minHeight: '20%' }}
          />
          <span className="text-xs text-gray-600 font-medium">{item.name}</span>
          <span className="text-xs text-gray-400">{item.count}</span>
        </div>
      ))}
    </div>
  )
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, subtext, trend, color }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3 text-xs">
          <TrendingUp size={14} className={trend > 0 ? 'text-green-500' : 'text-red-500'} />
          <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {trend > 0 ? '+' : ''}{trend}% from last month
          </span>
        </div>
      )}
    </div>
  )
}

export default function DashboardOverview() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your bookings.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
          </button>
          <Link 
            to="/dashboard/bookings"
            className="bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            Book a Service
          </Link>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {notificationsOpen && (
        <div className="absolute right-8 top-20 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {MOCK_DATA.notifications.map((notif, i) => (
              <div key={i} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? 'bg-teal-light/30' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-teal' : 'bg-gray-300'}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={Calendar} 
          label="Total Bookings" 
          value={MOCK_DATA.stats.totalBookings}
          subtext="All time bookings"
          trend={15}
          color="bg-teal"
        />
        <StatCard 
          icon={CheckCircle} 
          label="Completed Jobs" 
          value={MOCK_DATA.stats.completedJobs}
          subtext="Successfully finished"
          trend={8}
          color="bg-green-500"
        />
        <StatCard 
          icon={Clock} 
          label="Upcoming" 
          value={MOCK_DATA.stats.upcomingAppointments}
          subtext="Scheduled appointments"
          color="bg-orange"
        />
        <StatCard 
          icon={Wallet} 
          label="Total Spent" 
          value={`RM ${MOCK_DATA.stats.totalSpent.toLocaleString()}`}
          subtext="This year"
          color="bg-blue-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Bookings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
              <Link to="/dashboard/bookings" className="text-teal text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {MOCK_DATA.recentBookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-teal/10 text-teal' :
                          booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {booking.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={14} className="text-gold" /> {booking.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {booking.professional.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{booking.professional}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">RM {booking.price}</p>
                      {booking.status === 'completed' && (
                        <button className="text-teal text-sm hover:underline mt-1">Book Again</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Usage Chart */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Service Usage</h2>
            <p className="text-sm text-gray-500 mb-4">Breakdown of services you've booked</p>
            <SimpleBarChart data={MOCK_DATA.serviceCategories} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                to="/dashboard/bookings"
                className="flex items-center gap-3 p-3 rounded-lg bg-teal/10 text-teal hover:bg-teal/20 transition-colors"
              >
                <Calendar size={18} />
                <span className="font-medium">Book New Service</span>
              </Link>
              <Link 
                to="/dashboard/appointments"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Clock size={18} />
                <span className="font-medium">View Schedule</span>
              </Link>
              <Link 
                to="/dashboard/profile"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <MapPin size={18} />
                <span className="font-medium">Update Address</span>
              </Link>
              <a 
                href="https://wa.me/60162104127"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-wa/10 text-wa hover:bg-wa/20 transition-colors"
              >
                <Phone size={18} />
                <span className="font-medium">Contact Support</span>
              </a>
            </div>
          </div>

          {/* Loyalty Card */}
          <div className="bg-gradient-to-br from-teal to-teal-dark rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Star size={24} className="text-gold" />
              <h2 className="text-lg font-bold">iPROFIXER Rewards</h2>
            </div>
            <p className="text-white/80 text-sm mb-4">Earn points with every booking and unlock exclusive discounts!</p>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/80">Current Points</span>
                <span className="text-2xl font-bold text-gold">{MOCK_DATA.stats.loyaltyPoints}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gold rounded-full h-2" style={{ width: '45%' }} />
              </div>
              <p className="text-xs text-white/60 mt-2">450 / 1000 points to next reward</p>
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle size={20} className="text-orange" />
              <h2 className="text-lg font-bold text-gray-900">Need Help?</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Have questions about your booking or service?</p>
            <a 
              href="https://wa.me/60162104127"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-wa hover:bg-wa-dark text-white py-3 rounded-lg font-medium transition-colors"
            >
              <Phone size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
