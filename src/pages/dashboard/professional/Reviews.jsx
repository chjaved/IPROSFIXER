import { useState, useEffect } from 'react'
import { Star, MessageSquare, User, Loader2 } from 'lucide-react'
import api from '../../../lib/api.js'

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={14} className={s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/reviews').then(data => {
      setReviews(data.data?.reviews || data.reviews || [])
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const filtered = reviews.filter(r => {
    if (filter === 'positive') return r.rating >= 4
    if (filter === 'critical') return r.rating <= 3
    return true
  })

  const total = reviews.length
  const avg   = total > 0 ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / total).toFixed(1) : '—'

  const breakdown = [5,4,3,2,1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length
    return { stars, count, pct: total > 0 ? Math.round(count / total * 100) : 0 }
  })

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
      <p className="text-gray-500 mb-6">Customer feedback on your services</p>

      {loading ? (
        <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-orange" size={32} /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-900">{avg}</p>
                <div className="flex justify-center gap-1 my-2">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={20} className={s <= Math.round(parseFloat(avg)||0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-gray-500">Based on {total} review{total !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                {breakdown.map(({ stars, count, pct }) => (
                  <div key={stars} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{stars}</span>
                      <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm text-gray-500 w-20 text-right">{count} ({pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Reviews</h3>
              <select value={filter} onChange={e => setFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
                <option value="all">All</option>
                <option value="positive">Positive (4-5★)</option>
                <option value="critical">Critical (1-3★)</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <Star size={40} className="mx-auto mb-3 opacity-30" />
                <p>No reviews yet. Complete jobs to earn reviews!</p>
              </div>
            ) : (
              <div className="divide-y">
                {filtered.map(r => (
                  <div key={r.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                        <User size={20} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{r.reviewer_name || 'Customer'}</h4>
                          <span className="text-xs text-gray-400">
                            {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRow rating={r.rating} />
                          {r.service_name && <span className="text-xs text-gray-400">• {r.service_name}</span>}
                        </div>
                        {r.comment && <p className="text-gray-700 mt-2 text-sm">{r.comment}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MessageSquare className="text-blue-600 mt-0.5" size={18} />
              <p className="text-sm text-blue-700">
                <strong className="text-blue-900">Tip:</strong> Respond to reviews promptly, deliver great service, and ask satisfied customers to leave feedback. Good reviews get you more jobs!
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
