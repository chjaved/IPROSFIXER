import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Wallet, 
  Star, 
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
  ChevronRight,
  DollarSign
} from 'lucide-react'

const SIDEBAR_ITEMS = [
  { to: '/pro-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/pro-dashboard/profile', icon: User, label: 'Profile' },
  { to: '/pro-dashboard/jobs', icon: Briefcase, label: 'Job Requests' },
  { to: '/pro-dashboard/earnings', icon: Wallet, label: 'Earnings' },
  { to: '/pro-dashboard/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/pro-dashboard/reviews', icon: Star, label: 'Reviews' },
]

const RECENT_JOBS = [
  { id: 1, service: 'Deep Cleaning', location: 'Petaling Jaya', date: 'Today, 2:00 PM', price: 'RM 180', status: 'pending', customer: 'Ahmad Hafizi' },
  { id: 2, service: 'AC Service', location: 'Subang Jaya', date: 'Tomorrow, 10:00 AM', price: 'RM 120', status: 'accepted', customer: 'Sarah Lim' },
  { id: 3, service: 'Sofa Cleaning', location: 'Cheras', date: 'Wed, 3:30 PM', price: 'RM 150', status: 'completed', customer: 'Raj Kumar' },
  { id: 4, service: 'Post-Reno Clean', location: 'Shah Alam', date: 'Thu, 9:00 AM', price: 'RM 350', status: 'accepted', customer: 'Nurul Ain' },
]

const WEEKLY_EARNINGS = [
  { day: 'Mon', amount: 240 },
  { day: 'Tue', amount: 180 },
  { day: 'Wed', amount: 320 },
  { day: 'Thu', amount: 150 },
  { day: 'Fri', amount: 280 },
  { day: 'Sat', amount: 420 },
  { day: 'Sun', amount: 200 },
]

function StatCard({ icon: Icon, label, value, subtext, color, trend }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtext && (
            <p className={`text-xs mt-1 ${color || 'text-gray-400'}`}>{subtext}</p>
          )}
          {trend && (
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp size={12} />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color ? color.replace('text-', 'bg-').replace('600', '100') : 'bg-gray-100'}`}>
          <Icon size={20} className={color || 'text-gray-600'} />
        </div>
      </div>
    </div>
  )
}

function JobCard({ job }) {
  const statusColors = {
    pending: 'bg-amber-100 text-amber-700',
    accepted: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 flex items-center justify-between hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusColors[job.status]}`}>
          <Briefcase size={20} />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{job.service}</h4>
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {job.date}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Customer: {job.customer}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">{job.price}</p>
        <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${statusColors[job.status]}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
        {job.status === 'pending' && (
          <div className="flex gap-2 mt-2">
            <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
              <CheckCircle size={16} />
            </button>
            <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
              <XCircle size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function EarningsChart() {
  const maxEarning = Math.max(...WEEKLY_EARNINGS.map(e => e.amount))
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Weekly Earnings</h3>
          <p className="text-sm text-gray-500">Last 7 days performance</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">RM 1,790</p>
          <p className="text-xs text-green-600">+12% from last week</p>
        </div>
      </div>
      
      <div className="flex items-end gap-2 h-32">
        {WEEKLY_EARNINGS.map((day) => (
          <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-teal rounded-t-lg transition-all duration-300 hover:bg-teal-dark"
              style={{ height: `${(day.amount / maxEarning) * 100}%` }}
            />
            <span className="text-xs text-gray-500">{day.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RatingCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Your Rating</h3>
        <Link to="/pro-dashboard/reviews" className="text-sm text-teal hover:underline">View all</Link>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-900">4.8</p>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5].map((star) => (
              <Star 
                key={star} 
                size={14} 
                className={star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400 opacity-50'} 
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">128 reviews</p>
        </div>
        
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-3">{rating}</span>
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-yellow-400 h-1.5 rounded-full" 
                  style={{ width: rating === 5 ? '75%' : rating === 4 ? '20%' : '5%' }}
                />
              </div>
            </div>
          ))}
        </div>
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Professional Dashboard</h1>
          <p className="text-gray-500">Manage your jobs and earnings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={Briefcase} 
            label="Total Jobs Completed" 
            value="156"
            subtext="This month: 23"
            color="text-teal-600"
            trend="+8%"
          />
          <StatCard 
            icon={DollarSign} 
            label="Total Earnings" 
            value="RM 5,240"
            subtext="This month: RM 1,790"
            color="text-green-600"
            trend="+12%"
          />
          <StatCard 
            icon={Clock} 
            label="Pending Requests" 
            value="4"
            subtext="2 expiring soon"
            color="text-amber-600"
          />
          <StatCard 
            icon={Star} 
            label="Rating" 
            value="4.8/5"
            subtext="128 reviews"
            color="text-yellow-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EarningsChart />
          <RatingCard />
        </div>

        {/* Recent Job Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Recent Job Requests</h3>
              <p className="text-sm text-gray-500">Accept or decline new bookings</p>
            </div>
            <Link 
              to="/pro-dashboard/jobs"
              className="text-sm text-teal hover:underline flex items-center gap-1"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="divide-y">
            {RECENT_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/pro-dashboard/schedule"
            className="bg-teal text-white rounded-xl p-6 flex items-center justify-between hover:bg-teal-dark transition-colors"
          >
            <div>
              <h3 className="font-semibold text-lg">Manage Schedule</h3>
              <p className="text-teal-100 text-sm">Set your availability</p>
            </div>
            <ChevronRight size={24} />
          </Link>
          <Link 
            to="/pro-dashboard/earnings"
            className="bg-orange text-white rounded-xl p-6 flex items-center justify-between hover:bg-orange-dark transition-colors"
          >
            <div>
              <h3 className="font-semibold text-lg">Withdraw Earnings</h3>
              <p className="text-orange-100 text-sm">Transfer to your bank</p>
            </div>
            <ChevronRight size={24} />
          </Link>
        </div>
      </main>
    </div>
  )
}
