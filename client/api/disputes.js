const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware, adminMiddleware } = require('./_auth.js')
const { createNotification } = require('./notifications.js')

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()
  
  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const rateLimit = checkRateLimit(`disputes:${clientIp}`, 50)
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
    const userType = req.user.type

    // Extract dispute ID if present: /api/disputes/some-id
    const disputeIdMatch = url.replace(/\?.*$/, '').match(/\/disputes\/([\w-]+)$/)
    const disputeId = disputeIdMatch ? disputeIdMatch[1] : null

    if (req.method === 'GET' && !disputeId) return await listDisputes(req, res, sql, userId, userType)
    if (req.method === 'POST' && !disputeId) return await createDispute(req, res, sql, userId)
    if (req.method === 'PUT' && disputeId) {
      if (!(await adminMiddleware(req, res))) return;
      return await updateDispute(req, res, sql, disputeId)
    }

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Disputes error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listDisputes(req, res, sql, userId, userType) {
  let disputes
  if (userType === 'admin') {
    disputes = await sql`
      SELECT d.*, b.booking_number, s.name as service_name,
             c.name as customer_name, p.name as professional_name
      FROM disputes d
      JOIN bookings b ON b.id = d.booking_id
      LEFT JOIN services s ON s.id = b.service_id
      LEFT JOIN users c ON c.id = d.customer_id
      LEFT JOIN users p ON p.id = d.professional_id
      ORDER BY d.created_at DESC
    `
  } else {
    disputes = await sql`
      SELECT d.*, b.booking_number, s.name as service_name,
             c.name as customer_name, p.name as professional_name
      FROM disputes d
      JOIN bookings b ON b.id = d.booking_id
      LEFT JOIN services s ON s.id = b.service_id
      LEFT JOIN users c ON c.id = d.customer_id
      LEFT JOIN users p ON p.id = d.professional_id
      WHERE d.customer_id = ${userId} OR d.professional_id = ${userId}
      ORDER BY d.created_at DESC
    `
  }

  return res.json({ success: true, disputes })
}

async function createDispute(req, res, sql, userId) {
  const { booking_id, reason, description } = req.body

  if (!booking_id || !reason) {
    return res.status(400).json({ success: false, message: 'booking_id and reason are required' })
  }

  const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]
  if (b.consumer_id !== userId) {
    return res.status(403).json({ success: false, message: 'Only customer can create disputes' })
  }

  const existing = await sql`SELECT * FROM disputes WHERE booking_id = ${booking_id}`
  if (existing.length) {
    return res.status(400).json({ success: false, message: 'Dispute already exists for this booking' })
  }

  const disputeId = generateId()
  await sql`
    INSERT INTO disputes (id, booking_id, customer_id, professional_id, reason, description)
    VALUES (${disputeId}, ${booking_id}, ${b.consumer_id}, ${b.professional_id}, ${reason}, ${description || null})
  `

  await sql`UPDATE bookings SET status='disputed' WHERE id = ${booking_id}`

  // Notify admin of new dispute
  const admins = await sql`SELECT id FROM users WHERE type = 'admin' AND status = 'active'`
  for (const admin of admins) {
    await createNotification({
      user_id: admin.id,
      type: 'new_dispute',
      title: 'New Dispute Created',
      body: `A new dispute has been created for booking ${booking_id}. Reason: ${reason}`,
      data: JSON.stringify({ dispute_id: disputeId, booking_id })
    })
  }

  // Notify professional
  if (b.professional_id) {
    await createNotification({
      user_id: b.professional_id,
      type: 'booking_disputed',
      title: 'Dispute Created',
      body: `A dispute has been created for your booking.`,
      data: JSON.stringify({ booking_id: booking_id })
    })
  }

  const newDispute = await sql`SELECT * FROM disputes WHERE id = ${disputeId}`
  return res.status(201).json({ success: true, dispute: newDispute[0] })
}

async function updateDispute(req, res, sql, disputeId) {
  const { status, admin_note } = req.body

  if (!status || !['open', 'investigating', 'resolved'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Valid status required' })
  }

  await sql`UPDATE disputes SET status=${status}, admin_note=${admin_note || null}, updated_at=NOW() WHERE id = ${disputeId}`

  return res.json({ success: true, message: 'Dispute updated' })
}
