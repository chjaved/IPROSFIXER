import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp, Filter, Search, User, Calendar } from 'lucide-react'

const REVIEWS = [
  { id: 1, customer: 'Ahmad Hafizi', service: 'Deep Cleaning', rating: 5, date: '2024-01-20', comment: 'Excellent service! Very thorough and professional. Will definitely book again.', helpful: 12 },
  { id: 2, customer: 'Sarah Lim', service: 'AC Service', rating: 4, date: '2024-01-18', comment: 'Good job, arrived on time. The AC is working much better now.', helpful: 8 },
  { id: 3, customer: 'Raj Kumar', service: 'Sofa Cleaning', rating: 5, date: '2024-01-15', comment: 'Amazing! My sofa looks brand new. Highly recommended!', helpful: 15 },
  { id: 4, customer: 'Nurul Ain', service: 'Post-Reno Clean', rating: 5, date: '2024-01-12', comment: 'Fantastic work on our post-renovation cleaning. Attention to detail was impressive.', helpful: 10 },
  { id: 5, customer: 'Tan Wei', service: 'Mattress Cleaning', rating: 4, date: '2024-01-10', comment: 'Very good service. Professional and efficient.', helpful: 6 },
  { id: 6, customer: 'Lisa Wong', service: 'Regular Maid', rating: 5, date: '2024-01-08', comment: 'Third time booking. Always reliable and thorough!', helpful: 9 },
]

const RATING_STATS = [
  { stars: 5, count: 89, percent: 70 },
  { stars: 4, count: 28, percent: 22 },
  { stars: 3, count: 7, percent: 5 },
  { stars: 2, count: 3, percent: 2 },
  { stars: 1, count: 1, percent: 1 },
]

export default function Reviews() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('recent')
  
  const filteredReviews = REVIEWS.filter(review => {
    if (filter === 'all') return true
    if (filter === 'positive') return review.rating >= 4
    if (filter === 'critical') return review.rating <= 3
    return true
  })

  const totalReviews = REVIEWS.length
  const averageRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
      <p className="text-gray-500 mb-6">View and respond to customer feedback</p>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overall Rating */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-900">{averageRating}</p>
            <div className="flex justify-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  size={20} 
                  className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                />
              ))}
            </div>
            <p className="text-gray-500">Based on {totalReviews} reviews</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Response Rate</span>
              <span className="font-medium text-gray-900">98%</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Avg Response Time</span>
              <span className="font-medium text-gray-900">2 hours</span>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
          <div className="space-y-3">
            {RATING_STATS.map(stat => (
              <div key={stat.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{stat.stars}</span>
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${stat.percent}%` }}
                    />
                  </div>
                </div>
                <div className="w-20 text-right">
                  <span className="text-sm text-gray-600">{stat.count}</span>
                  <span className="text-sm text-gray-400 ml-1">({stat.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
          <div className="flex gap-2">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Reviews</option>
              <option value="positive">Positive (4-5 stars)</option>
              <option value="critical">Critical (1-3 stars)</option>
            </select>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

        <div className="divide-y">
          {filteredReviews.map(review => (
            <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.customer}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              size={14} 
                              className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{review.service}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3">{review.comment}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp size={14} />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-orange hover:underline">
                      <MessageSquare size={14} />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Star size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No reviews found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Tips Card */}
      <div className="mt-6 bg-blue-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <MessageSquare className="text-blue-600 mt-1" size={20} />
          <div>
            <h3 className="font-medium text-blue-900">Tips for Getting More Reviews</h3>
            <p className="text-sm text-blue-700 mt-1">
              Respond to all reviews promptly, provide excellent service, and politely ask satisfied customers to leave a review. Good reviews help you get more job requests!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
