import { useState } from 'react'
import { RefreshCcw, AlertCircle, CheckCircle, Clock, ChevronRight, FileText } from 'lucide-react'

const MOCK_REFUNDS = [
  { id: 'REF-001', bookingId: 5, service: 'Post-Reno Clean', amount: 'RM 350', status: 'approved', date: '2024-01-12', reason: 'Service not completed as described' },
  { id: 'REF-002', bookingId: 8, service: 'AC Service', amount: 'RM 120', status: 'pending', date: '2024-01-18', reason: 'Professional did not show up' },
  { id: 'REF-003', bookingId: 12, service: 'Deep Cleaning', amount: 'RM 180', status: 'rejected', date: '2024-01-08', reason: 'Service was completed satisfactorily' },
]

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

export default function Refunds() {
  const [showNewRequest, setShowNewRequest] = useState(false)

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

      {/* Refunds List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Refund History</h3>
        </div>
        <div className="divide-y">
          {MOCK_REFUNDS.map((refund) => {
            const StatusIcon = statusIcons[refund.status]
            return (
              <div key={refund.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusColors[refund.status]}`}>
                      <StatusIcon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{refund.service}</h4>
                        <span className="text-sm text-gray-400">{refund.id}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{refund.reason}</p>
                      <p className="text-xs text-gray-400 mt-1">Requested on {refund.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{refund.amount}</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize mt-2 ${statusColors[refund.status]}`}>
                      <StatusIcon size={12} />
                      {refund.status}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
