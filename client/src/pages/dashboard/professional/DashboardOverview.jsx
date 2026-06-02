import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Briefcase, 
  Wallet, 
  Star, 
  TrendingUp,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  Calendar,
  Users,
  Award,
  Loader2
} from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext.jsx'
import api from '../../../lib/api.js'

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

const STATUS_COLORS = {
  pending:   'bg-amber-100 text-amber-700',
  accepted:  'bg-blue-100 text-blue-700',
  confirmed: 'bg-orange/10 text-orange',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  declined:  'bg-red-100 text-red-600',
}

export default function DashboardOverview() {
  const { user } = useAuth()
  const [jobs, setJobs]           = useState([])
  const [reviews, setReviews]     = useState([])
  const [txns, setTxns]           = useState([])
  const [loading, setLoading]     = useState(true)
  const [acting, setActing]       = useState(null)

  useEffect(() => {
    Promise.all([
      api.get('/bookings').catch(() => ({ bookings: [] })),
      api.get('/reviews').catch(() => ({ reviews: [] })),
      api.get('/transactions').catch(() => ({ transactions: [] })),
    ]).then(([jData, rData, tData]) => {
      setJobs(jData.data?.bookings || jData.bookings || [])
      setReviews(rData.data?.reviews || rData.reviews || [])
      setTxns(tData.data?.transactions || tData.transactions || [])
    }).finally(() => setLoading(false))
  }, [])

  const updateJob = async (id, status) => {
    setActing(id + status)
    try {
      await api.put(`/bookings/${id}`, { status })
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j))
    } catch (e) { alert(e.message) }
    finally { setActing(null) }
  }

  const now = new Date()
  const thisMonthTxns = txns.filter(t => {
    const d = new Date(t.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const thisMonthEarnings = thisMonthTxns.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0)
  const completedThisMonth = jobs.filter(j => {
    if (j.status !== 'completed') return false
    const d = new Date(j.updated_at || j.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
  const pendingJobs   = jobs.filter(j => j.status === 'pending')
  const recentJobs    = [...jobs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4)
  const recentReviews = [...reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3)
  const avgRating     = reviews.length > 0 ? (reviews.reduce((s,r) => s + (r.rating||0), 0) / reviews.length).toFixed(1) : '—'

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-orange" size={32} />
    </div>
  )

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Professional Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.name}!</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Award size={20} className="text-orange" />
          <span className="font-medium text-gray-900">Pro Member</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Wallet}   label="This Month Earnings" value={`RM ${thisMonthEarnings.toFixed(0)}`} subtext="Updated live"   color="bg-orange" />
        <StatCard icon={Briefcase} label="Jobs Completed"     value={completedThisMonth}                   subtext="This month"    color="bg-green-500" />
        <StatCard icon={Star}     label="Your Rating"         value={avgRating}                            subtext={`${reviews.length} reviews`} color="bg-yellow-500" />
        <StatCard icon={Clock}    label="Pending Jobs"        value={pendingJobs.length}                   subtext="Awaiting action" color="bg-blue-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Jobs */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Jobs</h2>
              <Link to="/pro-dashboard/jobs" className="text-orange text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            {recentJobs.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <Briefcase size={36} className="mx-auto mb-3 opacity-30" />
                <p>No jobs yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentJobs.map(job => (
                  <div key={job.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{job.service_name || 'Service'}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[job.status] || 'bg-gray-100 text-gray-600'}`}>
                            {job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Calendar size={13} /> {job.scheduled_date || '—'}</span>
                          <span className="flex items-center gap-1"><Clock size={13} /> {job.scheduled_time || '—'}</span>
                          <span className="flex items-center gap-1"><MapPin size={13} /> {job.area || '—'}</span>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">RM {parseFloat(job.price||0).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Reviews</h2>
              <Link to="/pro-dashboard/reviews" className="text-orange text-sm font-medium hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            {recentReviews.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <Star size={36} className="mx-auto mb-3 opacity-30" />
                <p>No reviews yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentReviews.map(r => (
                  <div key={r.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xs font-medium text-gray-600">{(r.reviewer_name||'C')[0]}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 text-sm">{r.reviewer_name || 'Customer'}</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
                          </div>
                        </div>
                        {r.comment && <p className="text-sm text-gray-600 mt-1">"{r.comment}"</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Pending Requests */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">New Requests</h2>
              <span className="bg-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingJobs.length}</span>
            </div>
            {pendingJobs.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No pending requests</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {pendingJobs.slice(0, 3).map(req => (
                  <div key={req.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-1">{req.service_name || 'Service'}</h3>
                    <div className="text-xs text-gray-500 space-y-0.5">
                      <p className="flex items-center gap-1"><Calendar size={11} /> {req.scheduled_date || '—'}</p>
                      <p className="flex items-center gap-1"><MapPin size={11} /> {req.area || '—'}</p>
                      <p className="font-medium text-orange mt-1">RM {parseFloat(req.price||0).toFixed(0)}</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => updateJob(req.id, 'accepted')} disabled={!!acting}
                        className="flex-1 bg-orange hover:bg-orange-dark text-white text-xs font-medium py-1.5 rounded-lg transition-colors disabled:opacity-50">
                        {acting === req.id+'accepted' ? '…' : 'Accept'}
                      </button>
                      <button onClick={() => updateJob(req.id, 'declined')} disabled={!!acting}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-1.5 rounded-lg transition-colors disabled:opacity-50">
                        {acting === req.id+'declined' ? '…' : 'Decline'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-orange to-orange-dark rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Users size={22} className="text-white" />
              <h2 className="text-base font-bold">Your Progress</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/80">Total Jobs</span>
                  <span className="font-bold">{jobs.length}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/80">Completed</span>
                  <span className="font-bold">{jobs.filter(j => j.status === 'completed').length}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/80">Rating</span>
                  <span className="font-bold">{avgRating} ⭐</span>
                </div>
              </div>
            </div>
            <Link to="/pro-dashboard/earnings" className="flex items-center justify-center gap-2 w-full mt-5 bg-white/20 hover:bg-white/30 text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
              View Earnings <ChevronRight size={15} />
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link to="/pro-dashboard/schedule" className="flex items-center gap-3 p-2.5 rounded-lg bg-orange/10 text-orange hover:bg-orange/20 transition-colors text-sm">
                <Calendar size={16} /><span className="font-medium">Update Schedule</span>
              </Link>
              <Link to="/pro-dashboard/profile" className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm">
                <MapPin size={16} /><span className="font-medium">Update Work Area</span>
              </Link>
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 rounded-lg bg-wa/10 text-wa hover:bg-wa/20 transition-colors text-sm">
                <Phone size={16} /><span className="font-medium">Contact Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
