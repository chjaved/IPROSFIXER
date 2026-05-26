import { useState } from 'react'
import { Calendar, Clock, CheckCircle, X, Plus, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const AVAILABILITY = {
  monday: { available: true, start: '09:00', end: '18:00' },
  tuesday: { available: true, start: '09:00', end: '18:00' },
  wednesday: { available: true, start: '09:00', end: '18:00' },
  thursday: { available: true, start: '09:00', end: '18:00' },
  friday: { available: true, start: '09:00', end: '18:00' },
  saturday: { available: false, start: '09:00', end: '18:00' },
  sunday: { available: false, start: '09:00', end: '18:00' },
}

const SCHEDULED_JOBS = [
  { id: 1, service: 'Deep Cleaning', date: '2024-01-22', time: '10:00 AM - 12:00 PM', customer: 'Ahmad Hafizi', location: 'Petaling Jaya' },
  { id: 2, service: 'AC Service', date: '2024-01-23', time: '2:00 PM - 3:00 PM', customer: 'Sarah Lim', location: 'Subang Jaya' },
  { id: 3, service: 'Post-Reno Clean', date: '2024-01-25', time: '9:00 AM - 1:00 PM', customer: 'Nurul Ain', location: 'Shah Alam' },
]

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1))
  const [selectedDate, setSelectedDate] = useState(22)
  const [availability, setAvailability] = useState(AVAILABILITY)
  const [showBlockModal, setShowBlockModal] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const toggleDay = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], available: !prev[day].available }
    }))
  }

  const selectedJobs = SCHEDULED_JOBS.filter(job => {
    const jobDate = new Date(job.date).getDate()
    return jobDate === selectedDate
  })

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Schedule</h1>
      <p className="text-gray-500 mb-6">Manage your availability and view upcoming jobs</p>

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
                {SCHEDULED_JOBS.some(job => new Date(job.date).getDate() === day) && (
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
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="text-sm text-gray-600">Blocked</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Availability Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Weekly Availability</h3>
              <button 
                onClick={() => setShowBlockModal(true)}
                className="text-sm text-orange hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2">
              {Object.entries(availability).map(([day, config]) => (
                <div key={day} className="flex items-center justify-between py-2">
                  <span className="capitalize text-sm">{day}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    config.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {config.available ? `${config.start} - ${config.end}` : 'Blocked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date Jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              January {selectedDate}, 2024
            </h3>
            {selectedJobs.length > 0 ? (
              <div className="space-y-3">
                {selectedJobs.map(job => (
                  <div key={job.id} className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <p className="font-medium text-gray-900">{job.service}</p>
                    <p className="text-sm text-gray-500">{job.time}</p>
                    <p className="text-sm text-gray-600 mt-1">{job.customer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No jobs scheduled</p>
            )}
            <button className="w-full mt-4 py-2 border border-orange text-orange rounded-lg hover:bg-orange-50 transition-colors">
              Block This Date
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-orange to-orange-dark rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-4">This Week</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-orange-100">Jobs</p>
              </div>
              <div>
                <p className="text-2xl font-bold">32h</p>
                <p className="text-sm text-orange-100">Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Availability Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Edit Availability</h3>
              <button onClick={() => setShowBlockModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {Object.entries(availability).map(([day, config]) => (
                <div key={day} className="flex items-center justify-between py-2">
                  <span className="capitalize font-medium">{day}</span>
                  <button
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-1 rounded-lg text-sm ${
                      config.available 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {config.available ? 'Available' : 'Blocked'}
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowBlockModal(false)}
              className="w-full mt-6 bg-orange text-white py-2 rounded-lg hover:bg-orange-dark"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
