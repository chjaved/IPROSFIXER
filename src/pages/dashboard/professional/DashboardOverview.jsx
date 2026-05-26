import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Briefcase, 
  Wallet, 
  Star, 
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  Bell,
  Calendar,
  Users,
  Award
} from 'lucide-react'

// Mock data for professional dashboard
const MOCK_DATA = {
  stats: {
    totalJobs: 156,
    completedThisMonth: 24,
    pendingRequests: 3,
    totalEarnings: 12500,
    thisMonthEarnings: 4850,
    rating: 4.8,
    responseRate: 98,
  },
  weeklyEarnings: [850, 1200, 950, 1400, 1100, 650, 0], // Mon-Sun
  recentJobs: [
    { id: 'JOB001', service: 'Home Deep Cleaning', date: '2026-05-28', time: '10:00 AM', status: 'confirmed', price: 350, customer: 'Sarah Tan', location: 'Petaling Jaya' },
    { id: 'JOB002', service: 'AC Repair', date: '2026-05-27', time: '2:00 PM', status: 'completed', price: 280, customer: 'Rajan Kumar', location: 'Subang Jaya' },
    { id: 'JOB003', service: 'Electrical Wiring', date: '2026-05-26', time: '11:00 AM', status: 'completed', price: 450, customer: 'Ahmad Ismail', location: 'Shah Alam' },
    { id: 'JOB004', service: 'Plumbing Repair', date: '2026-05-25', time: '9:00 AM', status: 'completed', price: 200, customer: 'Lim Wei Ming', location: 'Kuala Lumpur' },
  ],
  pendingRequests: [
    { id: 'REQ001', service: 'Sofa Cleaning', date: '2026-05-29', time: '3:00 PM', price: 220, customer: 'Maria Lee', location: 'Bangsar' },
    { id: 'REQ002', service: 'Kitchen Deep Clean', date: '2026-05-30', time: '10:00 AM', price: 380, customer: 'Kumar Raj', location: 'Damansara' },
  ],
  reviews: [
    { customer: 'Sarah Tan', rating: 5, comment: 'Excellent work! Very thorough and professional.', date: '2 days ago' },
    { customer: 'Ahmad Ismail', rating: 5, comment: 'On time and fixed the issue quickly. Highly recommend!', date: '3 days ago' },
    { customer: 'Lim Wei Ming', rating: 4, comment: 'Good service overall. Would book again.', date: '5 days ago' },
  ],
  notifications: [
    { type: 'job', message: 'New job request from Maria Lee', time: '10 minutes ago', read: false },
    { type: 'payment', message: 'RM 280 deposited to your account', time: '2 hours ago', read: false },
    { type: 'review', message: 'New 5-star review from Ahmad Ismail', time: '5 hours ago', read: true },
  ]
}

// Weekly earnings chart
function WeeklyEarningsChart({ data }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const max = Math.max(...data)
  
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2 h-32">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="relative w-full">
              <div 
                className={`rounded-t-md transition-all duration-500 ${value > 0 ? 'bg-orange' : 'bg-gray-200'}`}
                style={{ height: value > 0 ? `${(value / max) * 100}px` : '4px' }}
              />
              {value > 0 && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600">
                  RM{value}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, subtext, trend, color, trendLabel }) {
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
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-3 text-xs">
          {trend > 0 ? (
            <TrendingUp size={14} className="text-green-500" />
          ) : (
            <TrendingDown size={14} className="text-red-500" />
          )}
          <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {trend > 0 ? '+' : ''}{trend}% {trendLabel}
          </span>
        </div>
      )}
    </div>
  )
}

// Star rating display
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          size={14} 
          className={star <= rating ? 'text-gold fill-gold' : 'text-gray-300'} 
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
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
          <h1 className="text-2xl font-bold text-gray-900">Professional Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's your work summary.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
          </button>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Award size={20} className="text-orange" />
            <span className="font-medium text-gray-900">Level 3 Pro</span>
          </div>
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
              <div key={i} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? 'bg-orange/5' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-orange' : 'bg-gray-300'}`} />
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
          icon={Wallet} 
          label="This Month Earnings" 
          value={`RM ${MOCK_DATA.stats.thisMonthEarnings.toLocaleString()}`}
          subtext="Updated today"
          trend={12}
          trendLabel="vs last month"
          color="bg-orange"
        />
        <StatCard 
          icon={Briefcase} 
          label="Jobs Completed" 
          value={MOCK_DATA.stats.completedThisMonth}
          subtext="This month"
          trend={8}
          trendLabel="vs last month"
          color="bg-green-500"
        />
        <StatCard 
          icon={Star} 
          label="Your Rating" 
          value={MOCK_DATA.stats.rating}
          subtext="Based on 127 reviews"
          color="bg-gold"
        />
        <StatCard 
          icon={Clock} 
          label="Response Rate" 
          value={`${MOCK_DATA.stats.responseRate}%`}
          subtext="Reply within 1 hour"
          color="bg-blue-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Earnings Chart */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Weekly Earnings</h2>
                <p className="text-sm text-gray-500">This week's income breakdown</p>
              </div>
              <Link to="/pro-dashboard/earnings" className="text-orange text-sm font-medium hover:underline flex items-center gap-1">
                View Details <ChevronRight size={16} />
              </Link>
            </div>
            <WeeklyEarningsChart data={MOCK_DATA.weeklyEarnings} />
          </div>

          {/* Recent Jobs */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Jobs</h2>
              <Link to="/pro-dashboard/jobs" className="text-orange text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {MOCK_DATA.recentJobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{job.service}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          job.status === 'confirmed' ? 'bg-orange/10 text-orange' :
                          job.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {job.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {job.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {job.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{job.customer}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">RM {job.price}</p>
                      {job.status === 'completed' && (
                        <span className="text-green-600 text-xs flex items-center gap-1 mt-1">
                          <CheckCircle size={12} /> Paid
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
              <Link to="/pro-dashboard/reviews" className="text-orange text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {MOCK_DATA.reviews.map((review, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600">
                        {review.customer.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{review.customer}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="text-sm text-gray-600 mt-2">"{review.comment}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Requests */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">New Requests</h2>
                <span className="bg-orange text-white text-xs font-bold px-2 py-1 rounded-full">
                  {MOCK_DATA.pendingRequests.length}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Pending job requests near you</p>
            </div>
            <div className="divide-y divide-gray-100">
              {MOCK_DATA.pendingRequests.map((req) => (
                <div key={req.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-2">{req.service}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p className="flex items-center gap-1">
                      <Calendar size={12} /> {req.date}, {req.time}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin size={12} /> {req.location}
                    </p>
                    <p className="font-medium text-orange mt-2">RM {req.price}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-orange hover:bg-orange-dark text-white text-sm font-medium py-2 rounded-lg transition-colors">
                      Accept
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-orange to-orange-dark rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Users size={24} className="text-white" />
              <h2 className="text-lg font-bold">Your Progress</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/80">Total Jobs</span>
                  <span className="font-bold">{MOCK_DATA.stats.totalJobs}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '78%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/80">Total Earnings</span>
                  <span className="font-bold">RM {MOCK_DATA.stats.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
            <Link 
              to="/pro-dashboard/earnings"
              className="flex items-center justify-center gap-2 w-full mt-6 bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-medium transition-colors"
            >
              View Earnings <ChevronRight size={16} />
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                to="/pro-dashboard/schedule"
                className="flex items-center gap-3 p-3 rounded-lg bg-orange/10 text-orange hover:bg-orange/20 transition-colors"
              >
                <Calendar size={18} />
                <span className="font-medium">Update Schedule</span>
              </Link>
              <Link 
                to="/pro-dashboard/profile"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <MapPin size={18} />
                <span className="font-medium">Update Work Area</span>
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
        </div>
      </div>
    </div>
  )
}
