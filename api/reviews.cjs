const { getDb, initTables, generateId } = require('./_db.cjs')
const { authMiddleware } = require('./_auth.cjs')

let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    await ensureTables()
    const ok = await authMiddleware(req, res)
    if (!ok) return

    const { pathname } = new URL(req.url, `http://${req.headers.host}`)
    const path = pathname.replace('/api/reviews', '')
    const sql = getDb()

    if (req.method === 'GET'  && (path === '' || path === '/')) return await listReviews(req, res, sql)
    if (req.method === 'POST' && (path === '' || path === '/')) return await createReview(req, res, sql)

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Reviews error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listReviews(req, res, sql) {
  const userId = req.user.id
  const userType = req.user.type
  const { professional_id } = req.query || {}

  let reviews, avgRating = null

  if (professional_id) {
    reviews = await sql`SELECT r.*, u.name as reviewer_name FROM reviews r JOIN users u ON r.consumer_id=u.id WHERE r.professional_id=${professional_id} AND r.is_public=TRUE ORDER BY r.created_at DESC`
    const avg = await sql`SELECT AVG(rating) as avg FROM reviews WHERE professional_id=${professional_id} AND is_public=TRUE`
    avgRating = avg[0]?.avg ? Math.round(parseFloat(avg[0].avg)*10)/10 : 0
  } else if (userType === 'professional') {
    reviews = await sql`SELECT r.*, u.name as reviewer_name FROM reviews r JOIN users u ON r.consumer_id=u.id WHERE r.professional_id=${userId} ORDER BY r.created_at DESC`
    const avg = await sql`SELECT AVG(rating) as avg FROM reviews WHERE professional_id=${userId}`
    avgRating = avg[0]?.avg ? Math.round(parseFloat(avg[0].avg)*10)/10 : 0
  } else {
    reviews = await sql`SELECT r.*, u.name as professional_name FROM reviews r JOIN users u ON r.professional_id=u.id WHERE r.consumer_id=${userId} ORDER BY r.created_at DESC`
  }

  return res.json({ success: true, data: { reviews, averageRating: avgRating } })
}

async function createReview(req, res, sql) {
  const userId = req.user.id
  const { booking_id, rating, comment } = req.body || {}

  if (!booking_id || !rating) return res.status(400).json({ success: false, message: 'booking_id and rating are required' })
  if (rating < 1 || rating > 5) return res.status(400).json({ success: false, message: 'Rating must be 1–5' })

  const bookings = await sql`SELECT * FROM bookings WHERE id=${booking_id} AND consumer_id=${userId} AND status='completed'`
  if (!bookings.length) return res.status(404).json({ success: false, message: 'Completed booking not found' })
  const booking = bookings[0]
  if (!booking.professional_id) return res.status(400).json({ success: false, message: 'No professional assigned' })

  const existing = await sql`SELECT id FROM reviews WHERE booking_id=${booking_id}`
  if (existing.length) return res.status(409).json({ success: false, message: 'Already reviewed' })

  const reviewId = generateId()
  await sql`INSERT INTO reviews (id, booking_id, consumer_id, professional_id, rating, comment) VALUES (${reviewId}, ${booking_id}, ${userId}, ${booking.professional_id}, ${rating}, ${comment||null})`

  // Update pro average rating
  const avg = await sql`SELECT AVG(rating) as avg FROM reviews WHERE professional_id=${booking.professional_id}`
  const newRating = avg[0]?.avg ? Math.round(parseFloat(avg[0].avg)*10)/10 : rating
  await sql`UPDATE professional_profiles SET rating=${newRating} WHERE user_id=${booking.professional_id}`

  return res.status(201).json({ success: true, message: 'Review submitted', data: { reviewId } })
}
