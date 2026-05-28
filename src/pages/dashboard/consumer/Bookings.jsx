import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter, Loader2 } from 'lucide-react'
import api from '../../../lib/api.js'

const STATUS_COLORS = {
  completed: 'bg-green-100 text-green-700',
  confirmed: 'bg-blue-100 text-blue-700',
  accepted:  'bg-blue-100 text-blue-700',
  pending:   'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
}
const STATUS_ICONS = {
  completed: CheckCircle,
  confirmed: Calendar,
  accepted:  Calendar,
  pending:   AlertCircle,
  cancelled: XCircle,
}

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [cancelling, setCancelling] = useState(null)

  const load = () => {
    setLoading(true)
    api.get('/bookings').then(data => {
      setBookings(data.data?.bookings || data.bookings || [])
    }).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const cancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return
    setCancelling(id)
    try {
      await api.put(`/bookings/${id}`, { status: 'cancelled' })
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
    } catch (e) { alert(e.message) }
    finally { setCancelling(null) }
  }

  const filtered = bookings.filter(b => {
    const matchFilter = filter === 'all' || b.status === filter
    const matchSearch = (b.service_name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (b.area || '').toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const counts = {
    total:     bookings.length,
    upcoming:  bookings.filter(b => ['pending','confirmed','accepted'].includes(b.status)).length,
    completed: bookings.filter(b => b.status === 'completed').length,
    pending:   bookings.filter(b => b.status === 'pending').length,
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
      <p className="text-gray-500 mb-6">View and manage all your service bookings</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total',     value: counts.total,     color: 'bg-gray-100 text-gray-700' },
          { label: 'Upcoming',  value: counts.upcoming,  color: 'bg-blue-100 text-blue-700' },
          { label: 'Completed', value: counts.completed, color: 'bg-green-100 text-green-700' },
          { label: 'Pending',   value: counts.pending,   color: 'bg-amber-100 text-amber-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search bookings..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="animate-spin text-teal" size={28} />
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map(b => {
              const StatusIcon = STATUS_ICONS[b.status] || AlertCircle
              return (
                <div key={b.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${STATUS_COLORS[b.status] || 'bg-gray-100 text-gray-600'}`}>
                        <StatusIcon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{b.service_name || 'Service'}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Calendar size={13} /> {b.scheduled_date || '—'}</span>
                          <span className="flex items-center gap-1"><Clock size={13} /> {b.scheduled_time || '—'}</span>
                          <span className="flex items-center gap-1"><MapPin size={13} /> {b.area || '—'}</span>
                        </div>
                        {b.notes && <p className="text-xs text-gray-400 mt-1">{b.notes}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900">RM {parseFloat(b.price||0).toFixed(0)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[b.status] || 'bg-gray-100 text-gray-600'}`}>
                        {b.status}
                      </span>
                      {['pending','confirmed','accepted'].includes(b.status) && (
                        <button onClick={() => cancel(b.id)} disabled={cancelling === b.id}
                          className="text-red-600 hover:text-red-700 text-sm disabled:opacity-50">
                          {cancelling === b.id ? 'Cancelling…' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div className="p-10 text-center text-gray-400">
                <Calendar size={36} className="mx-auto mb-3 opacity-30" />
                <p>No bookings found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
