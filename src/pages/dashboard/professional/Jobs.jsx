import { useState } from 'react'
import { Briefcase, MapPin, Clock, DollarSign, CheckCircle, XCircle, Filter, Search, Calendar } from 'lucide-react'

const ALL_JOBS = [
  { id: 1, service: 'Deep Cleaning', location: 'Petaling Jaya', date: 'Today, 2:00 PM', price: 'RM 180', status: 'pending', customer: 'Ahmad Hafizi', notes: '2-bedroom apartment, move-out cleaning' },
  { id: 2, service: 'AC Service', location: 'Subang Jaya', date: 'Tomorrow, 10:00 AM', price: 'RM 120', status: 'accepted', customer: 'Sarah Lim', notes: '2 units, regular maintenance' },
  { id: 3, service: 'Sofa Cleaning', location: 'Cheras', date: 'Wed, 3:30 PM', price: 'RM 150', status: 'completed', customer: 'Raj Kumar', notes: 'L-shaped sofa, stain removal' },
  { id: 4, service: 'Post-Reno Clean', location: 'Shah Alam', date: 'Thu, 9:00 AM', price: 'RM 350', status: 'accepted', customer: 'Nurul Ain', notes: '3-bedroom house, post-renovation' },
  { id: 5, service: 'Mattress Cleaning', location: 'KL City Centre', date: 'Fri, 11:00 AM', price: 'RM 100', status: 'pending', customer: 'Tan Wei', notes: '2 king-size mattresses' },
  { id: 6, service: 'Regular Maid', location: 'Bangsar', date: 'Sat, 8:00 AM', price: 'RM 80', status: 'pending', customer: 'Lisa Wong', notes: 'Weekly cleaning, 4 hours' },
]

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  accepted: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default function Jobs() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredJobs = ALL_JOBS.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter
    const matchesSearch = job.service.toLowerCase().includes(search.toLowerCase()) ||
                         job.customer.toLowerCase().includes(search.toLowerCase()) ||
                         job.location.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    pending: ALL_JOBS.filter(j => j.status === 'pending').length,
    accepted: ALL_JOBS.filter(j => j.status === 'accepted').length,
    completed: ALL_JOBS.filter(j => j.status === 'completed').length,
    total: ALL_JOBS.length,
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Requests</h1>
      <p className="text-gray-500 mb-6">Manage incoming service requests</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
          <p className="text-sm text-amber-600">Pending</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-2xl font-bold text-blue-700">{stats.accepted}</p>
          <p className="text-sm text-blue-600">Accepted</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          <p className="text-sm text-green-600">Completed</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-2xl font-bold text-gray-700">{stats.total}</p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
            >
              <option value="all">All Jobs</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusColors[job.status]}`}>
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{job.service}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Customer: {job.customer}</p>
                    <p className="text-sm text-gray-600 mt-1">{job.notes}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {job.date}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-900 text-lg">{job.price}</span>
                  {job.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        <CheckCircle size={16} />
                        Accept
                      </button>
                      <button className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        <XCircle size={16} />
                        Decline
                      </button>
                    </div>
                  )}
                  {job.status === 'accepted' && (
                    <button className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-dark transition-colors">
                      Start Job
                    </button>
                  )}
                  {job.status === 'completed' && (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle size={16} />
                      Done
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No jobs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
