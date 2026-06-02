import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, User, Phone, ChevronLeft, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import api from '../../../lib/api.js'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function formatDateMY(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date().getDate())

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = () => {
    setLoading(true)
    setError('')
    api.get('/bookings')
      .then(data => {
        const allBookings = data.data?.bookings || data.bookings || []
        // Filter for accepted bookings only
        const accepted = allBookings.filter(b => b.status === 'accepted')
        setAppointments(accepted)
      })
      .catch(e => {
        setError('Failed to load appointments. Please try again.')
        console.error(e)
      })
      .finally(() => setLoading(false))
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const selectedAppointments = appointments.filter(app => {
    const appDate = new Date(app.scheduled_date).getDate()
    const appMonth = new Date(app.scheduled_date).getMonth()
    return appDate === selectedDate && appMonth === month
  })

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  if (loading) {
    return (
      <div className="max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-500 mb-6">Manage your upcoming service appointments</p>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-teal" size={32} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-500 mb-6">Manage your upcoming service appointments</p>
        <div className="bg-red-50 rounded-xl p-8 text-center">
          <AlertCircle size={40} className="mx-auto mb-3 text-red-500" />
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadAppointments} className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-dark">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
      <p className="text-gray-500 mb-6">Your confirmed and accepted service appointments</p>

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
                  aspect-square rounded-lg flex items-center justify-center text-sm relative
                  ${!day ? 'invisible' : ''}
                  ${day === selectedDate ? 'bg-teal text-white' : 'hover:bg-gray-100'}
                  ${appointments.some(app => new Date(app.scheduled_date).getDate() === day) ? 'font-semibold' : ''}
                `}
              >
                {day}
                {appointments.some(app => {
                  const appDate = new Date(app.scheduled_date)
                  return appDate.getDate() === day && appDate.getMonth() === month
                }) && (
                  <span className={`absolute bottom-1 w-1 h-1 rounded-full ${day === selectedDate ? 'bg-white' : 'bg-teal'}`} />
                )}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal" />
              <span className="text-sm text-gray-600">Has Appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Accepted</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Accepted Appointments</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {appointments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p>No accepted appointments yet</p>
                <p className="text-sm mt-1">Your bookings will appear here once a professional accepts them</p>
              </div>
            ) : (
              appointments.slice(0, 5).map(app => (
                <div key={app.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">{app.service_name || 'Service'}</p>
                  <p className="text-sm text-gray-500">{formatDateMY(app.scheduled_date)}</p>
                  <p className="text-sm text-gray-500">{app.scheduled_time || '—'}</p>
                  {app.professional_name && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <User size={14} />
                      {app.professional_name}
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <MapPin size={14} />
                    {app.area || '—'}
                  </div>
                  <button className="mt-2 text-sm text-teal hover:underline">
                    Reschedule
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Selected Date Appointments */}
      {selectedAppointments.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Appointments on {formatDateMY(selectedAppointments[0].scheduled_date)}
          </h3>
          <div className="space-y-4">
            {selectedAppointments.map(app => (
              <div key={app.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{app.service_name || 'Service'}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {app.scheduled_time || '—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {app.area || '—'}
                      </span>
                    </div>
                    {app.professional_name && (
                      <p className="text-sm text-gray-600 mt-1">Professional: {app.professional_name}</p>
                    )}
                    {app.whatsapp && (
                      <a href={`https://wa.me/${app.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-green-600 mt-2 hover:underline">
                        <Phone size={14} /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-700">
                    Accepted
                  </span>
                  <button className="block mt-2 text-sm text-teal hover:underline">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
