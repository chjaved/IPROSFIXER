import { useState, useEffect } from 'react'
import { Briefcase, MapPin, Clock, CheckCircle, XCircle, Filter, Search, Calendar, Loader2 } from 'lucide-react'
import api from '../../../lib/api.js'

const STATUS_COLORS = {
  pending:   'bg-amber-100 text-amber-700',
  accepted:  'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  declined:  'bg-red-100 text-red-700',
  cancelled: 'bg-red-100 text-red-600',
}

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [acting, setActing] = useState(null)

  useEffect(() => {
    api.get('/bookings').then(data => {
      setJobs(data.data?.bookings || data.bookings || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id, status) => {
    setActing(id + status)
    try {
      await api.put(`/bookings/${id}`, { status })
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j))
    } catch (e) { alert(e.message) }
    finally { setActing(null) }
  }

  const filtered = jobs.filter(j => {
    const matchFilter = filter === 'all' || j.status === filter
    const matchSearch = (j.service_name||'').toLowerCase().includes(search.toLowerCase()) ||
                        (j.area||'').toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const counts = {
    pending:   jobs.filter(j => j.status === 'pending').length,
    accepted:  jobs.filter(j => j.status === 'accepted').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    total:     jobs.length,
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Requests</h1>
      <p className="text-gray-500 mb-6">Manage incoming service requests</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100"><p className="text-2xl font-bold text-amber-700">{counts.pending}</p><p className="text-sm text-amber-600">Pending</p></div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100"><p className="text-2xl font-bold text-blue-700">{counts.accepted}</p><p className="text-sm text-blue-600">Accepted</p></div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100"><p className="text-2xl font-bold text-green-700">{counts.completed}</p><p className="text-sm text-green-600">Completed</p></div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200"><p className="text-2xl font-bold text-gray-700">{counts.total}</p><p className="text-sm text-gray-600">Total</p></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange">
              <option value="all">All Jobs</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-orange" size={28} /></div>
        ) : (
          <div className="divide-y">
            {filtered.map(job => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${STATUS_COLORS[job.status] || 'bg-gray-100 text-gray-600'}`}>
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{job.service_name || 'Service'}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[job.status] || 'bg-gray-100 text-gray-600'}`}>{job.status}</span>
                      </div>
                      {job.notes && <p className="text-sm text-gray-600 mt-1">{job.notes}</p>}
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={13} /> {job.area || '—'}</span>
                        <span className="flex items-center gap-1"><Calendar size={13} /> {job.scheduled_date || '—'}</span>
                        <span className="flex items-center gap-1"><Clock size={13} /> {job.scheduled_time || '—'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 text-lg">RM {parseFloat(job.price||0).toFixed(0)}</span>
                    {job.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => updateStatus(job.id, 'accepted')} disabled={!!acting}
                          className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 text-sm">
                          {acting === job.id+'accepted' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />} Accept
                        </button>
                        <button onClick={() => updateStatus(job.id, 'declined')} disabled={!!acting}
                          className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 text-sm">
                          {acting === job.id+'declined' ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />} Decline
                        </button>
                      </div>
                    )}
                    {job.status === 'accepted' && (
                      <button onClick={() => updateStatus(job.id, 'completed')} disabled={!!acting}
                        className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-dark transition-colors disabled:opacity-50 text-sm">
                        {acting === job.id+'completed' ? 'Completing…' : 'Mark Complete'}
                      </button>
                    )}
                    {job.status === 'completed' && (
                      <span className="text-green-600 flex items-center gap-1 text-sm"><CheckCircle size={16} /> Done</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-10 text-center text-gray-400">
                <Briefcase size={40} className="mx-auto mb-3 opacity-30" />
                <p>No jobs found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
