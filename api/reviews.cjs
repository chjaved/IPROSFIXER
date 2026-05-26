const { getDb, generateId } = require('./_db.cjs')
const { authMiddleware, requireRole } = require('./_auth.cjs')

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Apply auth middleware
  const next = () => handleRequest(req, res)
  authMiddleware(req, res, next)
}

async function handleRequest(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`)
  const path = pathname.replace('/api/reviews', '')

  try {
    const db = getDb()

    // GET /api/reviews - List reviews (for current user or professional)
    if (req.method === 'GET' && (path === '' || path === '/')) {
      return await listReviews(req, res, db)
    }

    // POST /api/reviews - Create review
    if (req.method === 'POST' && (path === '' || path === '/')) {
      return await createReview(req, res, db)
    }

    return res.status(404).json({ success: false, message: 'Endpoint not found' })
  } catch (err) {
    console.error('Reviews API error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// List reviews
async function listReviews(req, res, db) {
  const userId = req.user.id
  const userType = req.user.type
  const { professionalId, limit = 20, offset = 0 } = req.query || {}

  let query, countQuery, params

  if (professionalId) {
    // Get reviews for a specific professional
    query = `
      SELECT r.*, u.name as reviewer_name, b.booking_number
      FROM reviews r
      JOIN users u ON r.consumer_id = u.id
      JOIN bookings b ON r.booking_id = b.id
      WHERE r.professional_id = ? AND r.is_public = TRUE
    `
    countQuery = 'SELECT COUNT(*) as total FROM reviews WHERE professional_id = ? AND is_public = TRUE'
    params = [professionalId]
  } else if (userType === 'professional') {
    // Get reviews for logged-in professional
    query = `
      SELECT r.*, u.name as reviewer_name, b.booking_number
      FROM reviews r
      JOIN users u ON r.consumer_id = u.id
      JOIN bookings b ON r.booking_id = b.id
      WHERE r.professional_id = ?
    `
    countQuery = 'SELECT COUNT(*) as total FROM reviews WHERE professional_id = ?'
    params = [userId]
  } else {
    // Get reviews written by logged-in consumer
    query = `
      SELECT r.*, u.name as professional_name, b.booking_number
      FROM reviews r
      JOIN users u ON r.professional_id = u.id
      JOIN bookings b ON r.booking_id = b.id
      WHERE r.consumer_id = ?
    `
    countQuery = 'SELECT COUNT(*) as total FROM reviews WHERE consumer_id = ?'
    params = [userId]
  }

  query += ' ORDER BY r.created_at DESC'
  query += ' LIMIT ? OFFSET ?'

  const reviews = db.prepare(query).all(...params, parseInt(limit), parseInt(offset))
  const count = db.prepare(countQuery).get(...params)

  // Calculate average rating
  let avgRating = null
  if (professionalId || userType === 'professional') {
    const avgQuery = professionalId 
      ? 'SELECT AVG(rating) as avg FROM reviews WHERE professional_id = ? AND is_public = TRUE'
      : 'SELECT AVG(rating) as avg FROM reviews WHERE professional_id = ?'
    const avgResult = db.prepare(avgQuery).get(professionalId || userId)
    avgRating = avgResult.avg ? Math.round(avgResult.avg * 10) / 10 : 0
  }

  return res.json({
    success: true,
    data: {
      reviews,
      averageRating: avgRating,
      pagination: {
        total: count.total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    }
  })
}

// Create review
async function createReview(req, res, db) {
  const userId = req.user.id
  const { bookingId, rating, comment, isPublic = true } = req.body || {}

  // Validation
  if (!bookingId || !rating) {
    return res.status(400).json({
      success: false,
      message: 'Booking ID and rating are required'
    })
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Rating must be between 1 and 5'
    })
  }

  // Check if booking exists and belongs to user
  const booking = db.prepare(`
    SELECT * FROM bookings 
    WHERE id = ? AND consumer_id = ? AND status = 'completed'
  `).get(bookingId, userId)

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found or not completed'
    })
  }

  // Check if already reviewed
  const existing = db.prepare('SELECT id FROM reviews WHERE booking_id = ?').get(bookingId)
  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'Booking already reviewed'
    })
  }

  // Check if booking had a professional assigned
  if (!booking.professional_id) {
    return res.status(400).json({
      success: false,
      message: 'Cannot review - no professional was assigned to this booking'
    })
  }

  // Create review
  const reviewId = generateId()

  db.prepare(`
    INSERT INTO reviews (id, booking_id, consumer_id, professional_id, rating, comment, is_public)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    reviewId,
    bookingId,
    userId,
    booking.professional_id,
    rating,
    comment || null,
    isPublic
  )

  // Update professional's average rating
  const avgResult = db.prepare(`
    SELECT AVG(rating) as avg, COUNT(*) as count 
    FROM reviews 
    WHERE professional_id = ?
  `).get(booking.professional_id)

  db.prepare(`
    UPDATE professional_profiles 
    SET rating = ?, total_jobs = ?
    WHERE user_id = ?
  `).run(
    Math.round(avgResult.avg * 10) / 10,
    avgResult.count,
    booking.professional_id
  )

  return res.status(201).json({
    success: true,
    message: 'Review created successfully',
    data: { reviewId }
  })
}
