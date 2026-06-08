const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')
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
  const requests = rateLimitStore.get(key) || []
  const validRequests = requests.filter(time => time > windowStart)
  
  if (validRequests.length >= maxRequests) {
    return false
  }
  
  validRequests.push(now)
  rateLimitStore.set(key, validRequests)
  return true
}

// Security headers
function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.removeHeader('X-Powered-By')
}

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json')
  const allowedOrigins = ['https://iprofixer.com.my', 'https://www.iprofixer.com.my', 'https://iprosfixer.vercel.app']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()

  await ensureTables()
  const sql = getDb()
  const url = new URL(req.url, `http://${req.headers.host}`).pathname

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress
  if (!checkRateLimit(`reschedule:${clientIp}`, 50, 15 * 60 * 1000)) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  try {
    // POST /api/reschedule - Create reschedule request
    if (req.method === 'POST' && url === '/reschedule') {
      if (!(await authMiddleware(req, res))) return;

      const { booking_id, new_date, new_time, reason } = req.body || {}
      const userId = req.user.id
      const userType = req.user.type

      if (!booking_id || !new_date || !new_time) {
        return res.status(400).json({ success: false, message: 'booking_id, new_date, and new_time are required' })
      }

      // Get booking details
      const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`
      if (!booking.length) {
        return res.status(404).json({ success: false, message: 'Booking not found' })
      }

      const b = booking[0]

      // Validate user can request reschedule
      if (userType === 'consumer' && b.consumer_id !== userId) {
        return res.status(403).json({ success: false, message: 'You can only reschedule your own bookings' })
      }
      if (userType === 'professional' && b.professional_id !== userId) {
        return res.status(403).json({ success: false, message: 'You can only reschedule your assigned bookings' })
      }

      // Validate booking status
      const validStatuses = ['pending', 'accepted', 'on_the_way', 'arrived']
      if (!validStatuses.includes(b.status)) {
        return res.status(400).json({ success: false, message: `Cannot reschedule booking with status: ${b.status}` })
      }

      // Check for existing pending reschedule request
      const existing = await sql`
        SELECT * FROM reschedule_requests 
        WHERE booking_id = ${booking_id} AND status = 'pending'
      `
      if (existing.length) {
        return res.status(400).json({ success: false, message: 'A reschedule request is already pending for this booking' })
      }

      const rescheduleId = generateId()
      await sql`
        INSERT INTO reschedule_requests (id, booking_id, requested_by, old_date, old_time, new_date, new_time, reason, status)
        VALUES (${rescheduleId}, ${booking_id}, ${userId}, ${b.scheduled_date}, ${b.scheduled_time}, ${new_date}, ${new_time}, ${reason || null}, 'pending')
      `

      // Update booking status to reschedule_pending
      await sql`
        UPDATE bookings 
        SET status = 'reschedule_pending', updated_at = NOW()
        WHERE id = ${booking_id}
      `

      // Create timeline event
      await sql`
        INSERT INTO booking_timeline (id, booking_id, status, notes, created_by, created_at)
        VALUES (${generateId()}, ${booking_id}, 'reschedule_requested', ${reason || 'Reschedule requested'}, ${userId}, NOW())
      `

      // Notify the other party
      const otherUserId = userType === 'consumer' ? b.professional_id : b.consumer_id
      if (otherUserId) {
        await createNotification({
          user_id: otherUserId,
          type: 'reschedule_requested',
          title: 'Reschedule Requested',
          body: `A reschedule request has been made for booking ${b.booking_number}`,
          data: JSON.stringify({ reschedule_id: rescheduleId, booking_id })
        })
      }

      const newReschedule = await sql`SELECT * FROM reschedule_requests WHERE id = ${rescheduleId}`
      return res.status(201).json({ success: true, reschedule: newReschedule[0] })
    }

    // GET /api/reschedule/:bookingId - Get reschedule requests for a booking
    if (req.method === 'GET' && url.match(/^\/reschedule\/[\w-]+$/)) {
      if (!(await authMiddleware(req, res))) return;

      const bookingId = url.split('/').pop()
      const requests = await sql`
        SELECT r.*, u.name as requester_name, u.type as requester_type
        FROM reschedule_requests r
        JOIN users u ON u.id = r.requested_by
        WHERE r.booking_id = ${bookingId}
        ORDER BY r.created_at DESC
      `
      return res.json({ success: true, requests })
    }

    // PUT /api/reschedule/:id - Approve or reject reschedule request
    if (req.method === 'PUT' && url.match(/^\/reschedule\/[\w-]+$/)) {
      if (!(await authMiddleware(req, res))) return;

      const rescheduleId = url.split('/').pop()
      const { action, rejection_reason } = req.body || {}
      const userId = req.user.id

      if (!action || !['approve', 'reject'].includes(action)) {
        return res.status(400).json({ success: false, message: 'Valid action required (approve or reject)' })
      }

      const reschedule = await sql`SELECT * FROM reschedule_requests WHERE id = ${rescheduleId}`
      if (!reschedule.length) {
        return res.status(404).json({ success: false, message: 'Reschedule request not found' })
      }

      const r = reschedule[0]

      // Validate user can approve/reject
      if (r.requested_by === userId) {
        return res.status(403).json({ success: false, message: 'You cannot approve/reject your own request' })
      }

      const booking = await sql`SELECT * FROM bookings WHERE id = ${r.booking_id}`
      if (!booking.length) {
        return res.status(404).json({ success: false, message: 'Booking not found' })
      }

      const b = booking[0]

      // Validate user is part of the booking
      if (b.consumer_id !== userId && b.professional_id !== userId) {
        return res.status(403).json({ success: false, message: 'You are not authorized for this booking' })
      }

      if (action === 'approve') {
        // Update reschedule request
        await sql`
          UPDATE reschedule_requests 
          SET status = 'approved', updated_at = NOW()
          WHERE id = ${rescheduleId}
        `

        // Update booking with new date/time
        await sql`
          UPDATE bookings 
          SET scheduled_date = ${r.new_date}, 
              scheduled_time = ${r.new_time},
              status = 'accepted',
              updated_at = NOW()
          WHERE id = ${r.booking_id}
        `

        // Create timeline event
        await sql`
          INSERT INTO booking_timeline (id, booking_id, status, notes, created_by, created_at)
          VALUES (${generateId()}, ${r.booking_id}, 'reschedule_approved', 'Reschedule approved', ${userId}, NOW())
        `

        // Notify requester
        await createNotification({
          user_id: r.requested_by,
          type: 'reschedule_approved',
          title: 'Reschedule Approved',
          body: `Your reschedule request for booking ${b.booking_number} has been approved`,
          data: JSON.stringify({ reschedule_id: rescheduleId, booking_id: r.booking_id })
        })

        return res.json({ success: true, message: 'Reschedule approved' })
      } else {
        // Reject reschedule request
        await sql`
          UPDATE reschedule_requests 
          SET status = 'rejected', rejection_reason = ${rejection_reason || null}, updated_at = NOW()
          WHERE id = ${rescheduleId}
        `

        // Revert booking status to previous state
        await sql`
          UPDATE bookings 
          SET status = 'accepted', updated_at = NOW()
          WHERE id = ${r.booking_id}
        `

        // Create timeline event
        await sql`
          INSERT INTO booking_timeline (id, booking_id, status, notes, created_by, created_at)
          VALUES (${generateId()}, ${r.booking_id}, 'reschedule_rejected', ${rejection_reason || 'Reschedule rejected'}, ${userId}, NOW())
        `

        // Notify requester
        await createNotification({
          user_id: r.requested_by,
          type: 'reschedule_rejected',
          title: 'Reschedule Rejected',
          body: `Your reschedule request for booking ${b.booking_number} has been rejected`,
          data: JSON.stringify({ reschedule_id: rescheduleId, booking_id: r.booking_id })
        })

        return res.json({ success: true, message: 'Reschedule rejected' })
      }
    }

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Reschedule error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}
