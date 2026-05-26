import { useState } from 'react'
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter } from 'lucide-react'

const MOCK_BOOKINGS = [
  { id: 1, service: 'Deep Cleaning', date: '2024-01-20', time: '10:00 AM', status: 'completed', price: 'RM 180', location: 'Petaling Jaya', professional: 'Ahmad Hafizi' },
  { id: 2, service: 'AC Service', date: '2024-01-22', time: '2:00 PM', status: 'upcoming', price: 'RM 120', location: 'Subang Jaya', professional: 'Sarah Lim' },
  { id: 3, service: 'Sofa Cleaning', date: '2024-01-15', time: '9:00 AM', status: 'completed', price: 'RM 150', location: 'Cheras', professional: 'Raj Kumar' },
  { id: 4, service: 'Laundry Service', date: '2024-01-25', time: '11:00 AM', status: 'pending', price: 'RM 80', location: 'KL City Centre', professional: 'Nurul Ain' },
  { id: 5, service: 'Post-Reno Clean', date: '2024-01-10', time: '8:00 AM', status: 'cancelled', price: 'RM 350', location: 'Shah Alam', professional: 'Tan Wei' },
]

const statusColors = {
  completed: 'bg-green-100 text-green-700',
  upcoming: 'bg-blue-100 text-blue-700',
  pending: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
}

const statusIcons = {
  completed: CheckCircle,
  upcoming: Calendar,
  pending: AlertCircle,
  cancelled: XCircle,
}

export default function Bookings() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredBookings = MOCK_BOOKINGS.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter
    const matchesSearch = booking.service.toLowerCase().includes(search.toLowerCase()) ||
                         booking.professional.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
      <p className="text-gray-500 mb-6">View and manage all your service bookings</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: '65', color: 'bg-gray-100 text-gray-700' },
          { label: 'Upcoming', value: '12', color: 'bg-blue-100 text-blue-700' },
          { label: 'Completed', value: '48', color: 'bg-green-100 text-green-700' },
          { label: 'Pending', value: '5', color: 'bg-amber-100 text-amber-700' },
        ].map(stat => (
          <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y">
          {filteredBookings.map((booking) => {
            const StatusIcon = statusIcons[booking.status]
            return (
              <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusColors[booking.status]}`}>
                      <StatusIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                      <p className="text-sm text-gray-500">by {booking.professional}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {booking.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {booking.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">{booking.price}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                    {booking.status === 'upcoming' && (
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        Cancel
                      </button>
                    )}
                    {booking.status === 'completed' && (
                      <button className="text-teal hover:text-teal-dark text-sm">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No bookings found</p>
          </div>
        )}
      </div>
    </div>
  )
}
