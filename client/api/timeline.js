const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')

let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

// Rate limiting store
const rateLimitStore = new Map()

function checkRateLimit(key, maxRequests = 100, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const windowStart = now - windowMs
  if (!rateLimitStore.has(key)) rateLimitStore.set(key, [])
  const requests = rateLimitStore.get(key).filter(time => time > windowStart)
  if (requests.length >= maxRequests) return { allowed: false }
  requests.push(now)
  rateLimitStore.set(key, requests)
  return { allowed: true }
}

// Security headers
function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
}

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json')
  const allowedOrigins = ['https://iprofixer.com.my', 'https://www.iprofixer.com.my', 'https://iprosfixer.vercel.app']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()
  
  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const rateLimit = checkRateLimit(`timeline:${clientIp}`, 100)
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  try {
    try {
      await ensureTables()
    } catch (dbErr) {
      console.error('DB init error:', dbErr)
      return res.status(500).json({ success: false, message: 'Database connection failed: ' + dbErr.message })
    }
    const ok = await authMiddleware(req, res)
    if (!ok) return

    const url = req.url || ''
    const sql = getDb()
    const userId = req.user.id

    if (req.method === 'GET' && url.includes('?booking_id=')) return await listTimeline(req, res, sql, userId)
    if (req.method === 'POST') return await createTimelineEvent(req, res, sql, userId)

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Timeline error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listTimeline(req, res, sql, userId) {
  const { booking_id } = req.query

  if (!booking_id) {
    return res.status(400).json({ success: false, message: 'booking_id is required' })
  }

  const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]

  // Security: Only booking participants can view timeline
  if (b.consumer_id !== userId && b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  const timeline = await sql`
    SELECT bt.*, u.name as created_by_name
    FROM booking_timeline bt
    LEFT JOIN users u ON u.id = bt.created_by
    WHERE bt.booking_id = ${booking_id}
    ORDER BY bt.created_at ASC
  `

  return res.json({ success: true, timeline })
}

async function createTimelineEvent(req, res, sql, userId) {
  const { booking_id, status, notes } = req.body

  if (!booking_id || !status) {
    return res.status(400).json({ success: false, message: 'booking_id and status are required' })
  }

  const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]

  // Security: Only booking participants can create timeline events
  if (b.consumer_id !== userId && b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  const timelineId = generateId()
  await sql`
    INSERT INTO booking_timeline (id, booking_id, status, notes, created_by)
    VALUES (${timelineId}, ${booking_id}, ${status}, ${notes || null}, ${userId})
  `

  const newEvent = await sql`SELECT * FROM booking_timeline WHERE id = ${timelineId}`
  return res.status(201).json({ success: true, event: newEvent[0] })
}
