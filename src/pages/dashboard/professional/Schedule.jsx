import { useState, useEffect } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight, MapPin, Phone, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext.jsx'
import api from '../../../lib/api.js'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function formatDateMY(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Schedule() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date().getDate())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = () => {
    setLoading(true)
    setError('')
    api.get('/bookings')
      .then(data => {
        const allBookings = data.data?.bookings || data.bookings || []
        // Filter for accepted jobs assigned to this professional
        const acceptedJobs = allBookings.filter(b => 
          b.status === 'accepted' && b.professional_id === user?.id
        )
        setJobs(acceptedJobs)
      })
      .catch(e => {
        setError('Failed to load schedule. Please try again.')
        console.error(e)
      })
      .finally(() => setLoading(false))
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const selectedJobs = jobs.filter(job => {
    const jobDate = new Date(job.scheduled_date).getDate()
    const jobMonth = new Date(job.scheduled_date).getMonth()
    return jobDate === selectedDate && jobMonth === month
  })

  // Group jobs by date for timeline view
  const jobsByDate = jobs.reduce((acc, job) => {
    const date = job.scheduled_date
    if (!acc[date]) acc[date] = []
    acc[date].push(job)
    return acc
  }, {})

  const sortedDates = Object.keys(jobsByDate).sort()

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  if (loading) {
    return (
      <div className="max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Schedule</h1>
        <p className="text-gray-500 mb-6">Your accepted jobs timeline</p>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-orange" size={32} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Schedule</h1>
        <p className="text-gray-500 mb-6">Your accepted jobs timeline</p>
        <div className="bg-red-50 rounded-xl p-8 text-center">
          <AlertCircle size={40} className="mx-auto mb-3 text-red-500" />
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadJobs} className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-dark">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Schedule</h1>
      <p className="text-gray-500 mb-6">Your accepted jobs timeline</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {MONTHS[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {DAYS.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(day)}
                disabled={!day}
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative
                  ${!day ? 'invisible' : ''}
                  ${day === selectedDate ? 'bg-orange text-white' : 'hover:bg-gray-100'}
                `}
              >
                {day}
                {jobs.some(job => {
                  const jobDate = new Date(job.scheduled_date)
                  return jobDate.getDate() === day && jobDate.getMonth() === month
                }) && (
                  <span className={`absolute bottom-1 w-1 h-1 rounded-full ${day === selectedDate ? 'bg-white' : 'bg-orange'}`} />
                )}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange" />
              <span className="text-sm text-gray-600">Has Jobs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Accepted</span>
            </div>
          </div>
        </div>

        {/* Side Panel - Timeline View */}
        <div className="space-y-6">
          {/* Upcoming Jobs Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Jobs</h3>
            {jobs.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p>No accepted jobs yet</p>
                <p className="text-sm mt-1">Accepted jobs will appear here</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sortedDates.slice(0, 5).map(date => (
                  <div key={date} className="border-l-4 border-orange pl-4 py-2">
                    <p className="font-medium text-gray-900 text-sm">{formatDateMY(date)}</p>
                    {jobsByDate[date].map(job => (
                      <div key={job.id} className="mt-2">
                        <p className="text-sm text-gray-700">{job.service_name || 'Service'}</p>
                        <p className="text-xs text-gray-500">{job.scheduled_time || '—'}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <MapPin size={12} /> {job.area || '—'}
                        </div>
                        {job.customer_whatsapp && (
                          <a href={`https://wa.me/${job.customer_whatsapp.replace(/\D/g, '')}`} 
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-green-600 mt-1 hover:underline">
                            <Phone size={12} /> {job.customer_whatsapp}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Date Jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {selectedJobs.length > 0 ? formatDateMY(selectedJobs[0].scheduled_date) : 'Selected Date'}
            </h3>
            {selectedJobs.length > 0 ? (
              <div className="space-y-3">
                {selectedJobs.map(job => (
                  <div key={job.id} className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <p className="font-medium text-gray-900">{job.service_name || 'Service'}</p>
                    <p className="text-sm text-gray-500">{job.scheduled_time || '—'}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                      <MapPin size={14} /> {job.area || '—'}
                    </div>
                    {job.customer_whatsapp && (
                      <a href={`https://wa.me/${job.customer_whatsapp.replace(/\D/g, '')}`} 
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-green-600 mt-2 hover:underline">
                        <Phone size={14} /> WhatsApp Customer
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No jobs on this date</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-orange to-orange-dark rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-4">Your Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">{jobs.length}</p>
                <p className="text-sm text-orange-100">Upcoming Jobs</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{sortedDates.length}</p>
                <p className="text-sm text-orange-100">Scheduled Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
