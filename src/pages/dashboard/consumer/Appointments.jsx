import { useState } from 'react'
import { Calendar, Clock, MapPin, User, Phone, Video, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const APPOINTMENTS = [
  { id: 1, service: 'AC Service', date: '2024-01-22', time: '2:00 PM', professional: 'Sarah Lim', status: 'confirmed', location: 'Subang Jaya' },
  { id: 2, service: 'Laundry Service', date: '2024-01-25', time: '11:00 AM', professional: 'Nurul Ain', status: 'pending', location: 'KL City Centre' },
  { id: 3, service: 'Deep Cleaning', date: '2024-01-20', time: '10:00 AM', professional: 'Ahmad Hafizi', status: 'completed', location: 'Petaling Jaya' },
]

export default function Appointments() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1))
  const [selectedDate, setSelectedDate] = useState(22)

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const selectedAppointments = APPOINTMENTS.filter(app => {
    const appDate = new Date(app.date).getDate()
    return appDate === selectedDate
  })

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Appointments</h1>
      <p className="text-gray-500 mb-6">Manage your upcoming service appointments</p>

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
                  ${APPOINTMENTS.some(app => new Date(app.date).getDate() === day) ? 'font-semibold' : ''}
                `}
              >
                {day}
                {APPOINTMENTS.some(app => {
                  const appDate = new Date(app.date)
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
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-600">Pending</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming</h3>
          <div className="space-y-4">
            {APPOINTMENTS.filter(app => app.status !== 'completed').map(appointment => (
              <div key={appointment.id} className="border-l-4 border-teal pl-4 py-2">
                <p className="font-medium text-gray-900">{appointment.service}</p>
                <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <User size={14} />
                  {appointment.professional}
                </div>
              </div>
            ))}
            {APPOINTMENTS.filter(app => app.status !== 'completed').length === 0 && (
              <p className="text-gray-400 text-sm">No upcoming appointments</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button className="w-full bg-teal text-white py-2 rounded-lg hover:bg-teal-dark transition-colors mb-3">
              Book New Service
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Sync with Google Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Selected Date Appointments */}
      {selectedAppointments.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Appointments on January {selectedDate}, 2024
          </h3>
          <div className="space-y-4">
            {selectedAppointments.map(appointment => (
              <div key={appointment.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {appointment.status === 'completed' ? <CheckCircle size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.service}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {appointment.location}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Professional: {appointment.professional}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {appointment.status}
                  </span>
                  {appointment.status === 'confirmed' && (
                    <button className="block mt-2 text-sm text-red-600 hover:text-red-700">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
