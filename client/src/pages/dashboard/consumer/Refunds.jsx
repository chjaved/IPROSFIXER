import { useState, useEffect } from 'react'
import { RefreshCcw, AlertCircle, CheckCircle, Clock, FileText, Loader2, Calendar } from 'lucide-react'
import api from '../../../lib/api.js'

const statusColors = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
}

const statusIcons = {
  approved: CheckCircle,
  pending: Clock,
  rejected: AlertCircle,
}

function formatDateMY(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Refunds() {
  const [cancelledBookings, setCancelledBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showNewRequest, setShowNewRequest] = useState(false)

  useEffect(() => {
    loadCancelledBookings()
  }, [])

  const loadCancelledBookings = () => {
    setLoading(true)
    setError('')
    api.get('/bookings')
      .then(data => {
        const allBookings = data.data?.bookings || data.bookings || []
        const cancelled = allBookings.filter(b => b.status === 'cancelled')
        setCancelledBookings(cancelled)
      })
      .catch(e => {
        setError('Failed to load refund data. Please try again.')
        console.error(e)
      })
      .finally(() => setLoading(false))
  }

  if (loading) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Refunds</h1>
        <p className="text-gray-500 mb-6">Request and track refund status</p>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-teal" size={32} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Refunds</h1>
        <p className="text-gray-500 mb-6">Request and track refund status</p>
        <div className="bg-red-50 rounded-xl p-8 text-center">
          <AlertCircle size={40} className="mx-auto mb-3 text-red-500" />
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadCancelledBookings} className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-dark">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Refunds</h1>
          <p className="text-gray-500">Request and track refund status</p>
        </div>
        <button
          onClick={() => setShowNewRequest(!showNewRequest)}
          className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal-dark transition-colors"
        >
          {showNewRequest ? 'Cancel' : 'New Request'}
        </button>
      </div>

      {/* New Refund Request Form */}
      {showNewRequest && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Request New Refund</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Booking</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal">
                <option>Choose a booking...</option>
                <option>AC Service - Jan 22, 2024 (RM 120)</option>
                <option>Laundry Service - Jan 25, 2024 (RM 80)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Refund</label>
              <textarea
                rows={3}
                placeholder="Please explain why you're requesting a refund..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-teal-dark transition-colors"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setShowNewRequest(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Refund Policy Card */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <FileText className="text-blue-600 mt-1" size={20} />
          <div>
            <h3 className="font-medium text-blue-900">Refund Policy</h3>
            <p className="text-sm text-blue-700 mt-1">
              Refunds are processed within 5-7 business days. You can request a refund if the service was not completed as described or if the professional did not show up.
            </p>
          </div>
        </div>
      </div>

      {/* Cancelled Bookings / Refunds List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Cancelled Bookings</h3>
        </div>
        {cancelledBookings.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <RefreshCcw size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-1">No refund requests yet</p>
            <p className="text-sm">Cancelled bookings will appear here. Contact support if you need a refund.</p>
          </div>
        ) : (
          <div className="divide-y">
            {cancelledBookings.map((booking) => {
              const StatusIcon = statusIcons.pending // Default to pending for refunds
              return (
                <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusColors.pending}`}>
                        <StatusIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{booking.service_name || 'Service'}</h4>
                          <span className="text-sm text-gray-400">Ref: {booking.booking_number || booking.id?.slice(0,8)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Cancelled on {formatDateMY(booking.updated_at || booking.created_at)}</p>
                        <p className="text-xs text-gray-400 mt-1">Reason: {booking.cancellation_reason || 'No reason provided'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">RM {parseFloat(booking.price||0).toFixed(0)}</p>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize mt-2 ${statusColors.pending}`}>
                        <StatusIcon size={12} />
                        Pending Refund
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="mt-6 text-center">
        <p className="text-gray-500">
          Need help with a refund?{' '}
          <a href="/contact" className="text-teal hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  )
}
