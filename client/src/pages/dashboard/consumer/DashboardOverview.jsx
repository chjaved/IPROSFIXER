import { useState, useEffect } from 'react'
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
  Phone,
  Loader2
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext.jsx'
import api from '../../../lib/api.js'

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

const STATUS_COLORS = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-teal/10 text-teal',
  accepted:  'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
}

export default function DashboardOverview() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/bookings').then(data => {
      setBookings(data.data?.bookings || data.bookings || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const total     = bookings.length
  const completed = bookings.filter(b => b.status === 'completed').length
  const upcoming  = bookings.filter(b => ['pending','confirmed','accepted'].includes(b.status)).length
  const totalSpent = bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (parseFloat(b.price) || 0), 0)
  const recent    = [...bookings].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-teal" size={32} />
    </div>
  )

  return (
    <div className="max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.name}!</p>
        </div>
        <Link to="/dashboard/bookings" className="bg-teal hover:bg-teal-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
          Book a Service
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Calendar}     label="Total Bookings"  value={total}                          subtext="All time" color="bg-teal" />
        <StatCard icon={CheckCircle}  label="Completed Jobs"  value={completed}                      subtext="Successfully finished" color="bg-green-500" />
        <StatCard icon={Clock}        label="Upcoming"        value={upcoming}                       subtext="Scheduled" color="bg-orange" />
        <StatCard icon={Wallet}       label="Total Spent"     value={`RM ${totalSpent.toFixed(0)}`}  subtext="All time" color="bg-blue-500" />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
              <Link to="/dashboard/bookings" className="text-teal text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            {recent.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p>No bookings yet. Book your first service!</p>
                <Link to="/dashboard/bookings" className="mt-4 inline-block text-teal font-medium hover:underline">Book Now →</Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recent.map((b) => (
                  <div key={b.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{b.service_name || 'Service'}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[b.status] || 'bg-gray-100 text-gray-600'}`}>
                            {b.status?.charAt(0).toUpperCase() + b.status?.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Calendar size={13} /> {b.scheduled_date || '—'}</span>
                          <span className="flex items-center gap-1"><Clock size={13} /> {b.scheduled_time || '—'}</span>
                          <span className="flex items-center gap-1"><MapPin size={13} /> {b.area || '—'}</span>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">RM {parseFloat(b.price || 0).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/dashboard/bookings" className="flex items-center gap-3 p-3 rounded-lg bg-teal/10 text-teal hover:bg-teal/20 transition-colors">
                <Calendar size={18} /><span className="font-medium">Book New Service</span>
              </Link>
              <Link to="/dashboard/appointments" className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <Clock size={18} /><span className="font-medium">View Schedule</span>
              </Link>
              <Link to="/dashboard/profile" className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <MapPin size={18} /><span className="font-medium">Update Profile</span>
              </Link>
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-wa/10 text-wa hover:bg-wa/20 transition-colors">
                <Phone size={18} /><span className="font-medium">Contact Support</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle size={20} className="text-orange" />
              <h2 className="text-lg font-bold text-gray-900">Need Help?</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Questions about your booking or service?</p>
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-wa hover:bg-wa-dark text-white py-3 rounded-lg font-medium transition-colors">
              <Phone size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
