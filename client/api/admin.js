const { getDb, initTables } = require('./_db.js')
const { adminMiddleware } = require('./_auth.js')

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
  if (!checkRateLimit(`admin:${clientIp}`, 200, 15 * 60 * 1000)) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  try {
    // GET /api/admin/dashboard - Dashboard metrics
    if (req.method === 'GET' && url === '/admin/dashboard') {
      if (!(await adminMiddleware(req, res))) return;

      const [
        totalBookings,
        pendingBookings,
        activeJobs,
        awaitingApproval,
        completedJobs,
        todayRevenue,
        monthRevenue,
        openDisputes,
        activeProfessionals,
        totalCustomers
      ] = await Promise.all([
        sql`SELECT COUNT(*) as count FROM bookings`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status IN ('accepted', 'on_the_way', 'arrived', 'in_progress')`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status = 'awaiting_approval'`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'`,
        sql`SELECT COALESCE(SUM(price), 0) as total FROM bookings WHERE status = 'completed' AND DATE(created_at) = CURRENT_DATE`,
        sql`SELECT COALESCE(SUM(price), 0) as total FROM bookings WHERE status = 'completed' AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`,
        sql`SELECT COUNT(*) as count FROM disputes WHERE status IN ('open', 'investigating')`,
        sql`SELECT COUNT(*) as count FROM users WHERE type = 'professional' AND status = 'active'`,
        sql`SELECT COUNT(*) as count FROM users WHERE type = 'consumer' AND status = 'active'`
      ])

      return res.json({
        success: true,
        metrics: {
          totalBookings: parseInt(totalBookings[0].count),
          pendingBookings: parseInt(pendingBookings[0].count),
          activeJobs: parseInt(activeJobs[0].count),
          awaitingApproval: parseInt(awaitingApproval[0].count),
          completedJobs: parseInt(completedJobs[0].count),
          todayRevenue: parseFloat(todayRevenue[0].total),
          monthRevenue: parseFloat(monthRevenue[0].total),
          openDisputes: parseInt(openDisputes[0].count),
          activeProfessionals: parseInt(activeProfessionals[0].count),
          totalCustomers: parseInt(totalCustomers[0].count)
        }
      })
    }

    // GET /api/admin/bookings - List all bookings with filters
    if (req.method === 'GET' && url === '/admin/bookings') {
      if (!(await adminMiddleware(req, res))) return;

      const { status, date_from, date_to, service_id, limit = 50, offset = 0 } = req.query || {}
      
      let query = sql`
        SELECT b.*, 
               c.name as customer_name, c.phone as customer_phone,
               p.name as professional_name, p.phone as professional_phone,
               s.name as service_name, s.category as service_category
        FROM bookings b
        LEFT JOIN users c ON c.id = b.consumer_id
        LEFT JOIN users p ON p.id = b.professional_id
        LEFT JOIN services s ON s.id = b.service_id
        WHERE 1=1
      `

      if (status) {
        query = sql`${query} AND b.status = ${status}`
      }
      if (date_from) {
        query = sql`${query} AND b.scheduled_date >= ${date_from}`
      }
      if (date_to) {
        query = sql`${query} AND b.scheduled_date <= ${date_to}`
      }
      if (service_id) {
        query = sql`${query} AND b.service_id = ${service_id}`
      }

      query = sql`${query} ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`

      const bookings = await query
      return res.json({ success: true, bookings })
    }

    // GET /api/admin/bookings/:id - Get booking details
    if (req.method === 'GET' && url.match(/^\/admin\/bookings\/[\w-]+$/)) {
      if (!(await adminMiddleware(req, res))) return;

      const bookingId = url.split('/').pop()
      const booking = await sql`
        SELECT b.*, 
               c.name as customer_name, c.phone as customer_phone, c.email as customer_email,
               p.name as professional_name, p.phone as professional_phone, p.email as professional_email,
               s.name as service_name, s.category as service_category
        FROM bookings b
        LEFT JOIN users c ON c.id = b.consumer_id
        LEFT JOIN users p ON p.id = b.professional_id
        LEFT JOIN services s ON s.id = b.service_id
        WHERE b.id = ${bookingId}
      `

      if (booking.length === 0) {
        return res.status(404).json({ success: false, message: 'Booking not found' })
      }

      return res.json({ success: true, booking: booking[0] })
    }

    // PUT /api/admin/bookings/:id - Update booking (assign professional, cancel, set priority)
    if (req.method === 'PUT' && url.match(/^\/admin\/bookings\/[\w-]+$/)) {
      if (!(await adminMiddleware(req, res))) return;

      const bookingId = url.split('/').pop()
      const { professional_id, status, notes } = req.body || {}

      if (!professional_id && !status) {
        return res.status(400).json({ success: false, message: 'professional_id or status required' })
      }

      if (professional_id) {
        const pro = await sql`SELECT id, type FROM users WHERE id = ${professional_id} AND type = 'professional' AND status = 'active'`
        if (pro.length === 0) {
          return res.status(400).json({ success: false, message: 'Invalid professional' })
        }
      }

      const updates = []
      if (professional_id) updates.push(sql`professional_id = ${professional_id}`)
      if (status) updates.push(sql`status = ${status}`)
      if (notes) updates.push(sql`notes = ${notes}`)
      updates.push(sql`updated_at = NOW()`)

      await sql`
        UPDATE bookings 
        SET ${sql.unsafe(updates.join(', '))}
        WHERE id = ${bookingId}
      `

      return res.json({ success: true, message: 'Booking updated' })
    }

    // GET /api/admin/professionals - List all professionals
    if (req.method === 'GET' && url === '/admin/professionals') {
      if (!(await adminMiddleware(req, res))) return;

      const { status, limit = 50, offset = 0 } = req.query || {}
      
      let query = sql`
        SELECT u.id, u.name, u.email, u.phone, u.status,
               pp.service_category, pp.coverage_area, pp.experience_years,
               pp.rating, pp.total_jobs, pp.qa_score, pp.total_checklists_completed,
               pp.total_photos_uploaded, pp.is_available, pp.is_verified
        FROM users u
        LEFT JOIN professional_profiles pp ON pp.user_id = u.id
        WHERE u.type = 'professional'
      `

      if (status) {
        query = sql`${query} AND u.status = ${status}`
      }

      query = sql`${query} ORDER BY pp.rating DESC, pp.total_jobs DESC LIMIT ${limit} OFFSET ${offset}`

      const professionals = await query
      return res.json({ success: true, professionals })
    }

    // PUT /api/admin/professionals/:id - Update professional status (approve, suspend, verify)
    if (req.method === 'PUT' && url.match(/^\/admin\/professionals\/[\w-]+$/)) {
      if (!(await adminMiddleware(req, res))) return;

      const proId = url.split('/').pop()
      const { status, is_verified, admin_note } = req.body || {}

      if (!status && is_verified === undefined) {
        return res.status(400).json({ success: false, message: 'status or is_verified required' })
      }

      const updates = []
      if (status) updates.push(sql`u.status = ${status}`)
      if (is_verified !== undefined) updates.push(sql`pp.is_verified = ${is_verified}`)
      if (admin_note) updates.push(sql`pp.admin_note = ${admin_note}`)
      updates.push(sql`u.updated_at = NOW()`)

      await sql`
        UPDATE users u
        LEFT JOIN professional_profiles pp ON pp.user_id = u.id
        SET ${sql.unsafe(updates.join(', '))}
        WHERE u.id = ${proId} AND u.type = 'professional'
      `

      return res.json({ success: true, message: 'Professional updated' })
    }

    // GET /api/admin/customers - List all customers
    if (req.method === 'GET' && url === '/admin/customers') {
      if (!(await adminMiddleware(req, res))) return;

      const { status, limit = 50, offset = 0 } = req.query || {}
      
      let query = sql`
        SELECT u.id, u.name, u.email, u.phone, u.status, u.created_at,
               cp.loyalty_points, cp.total_bookings, cp.total_spent
        FROM users u
        LEFT JOIN consumer_profiles cp ON cp.user_id = u.id
        WHERE u.type = 'consumer'
      `

      if (status) {
        query = sql`${query} AND u.status = ${status}`
      }

      query = sql`${query} ORDER BY cp.total_spent DESC, cp.total_bookings DESC LIMIT ${limit} OFFSET ${offset}`

      const customers = await query
      return res.json({ success: true, customers })
    }

    // PUT /api/admin/customers/:id - Update customer status
    if (req.method === 'PUT' && url.match(/^\/admin\/customers\/[\w-]+$/)) {
      if (!(await adminMiddleware(req, res))) return;

      const customerId = url.split('/').pop()
      const { status } = req.body || {}

      if (!status) {
        return res.status(400).json({ success: false, message: 'status required' })
      }

      await sql`
        UPDATE users 
        SET status = ${status}, updated_at = NOW()
        WHERE id = ${customerId} AND type = 'consumer'
      `

      return res.json({ success: true, message: 'Customer updated' })
    }

    // GET /api/admin/revenue - Revenue reporting
    if (req.method === 'GET' && url === '/admin/revenue') {
      if (!(await adminMiddleware(req, res))) return;

      const { period = '30' } = req.query || {}
      const days = parseInt(period)

      const [revenue, bookings, completedJobs, avgRating] = await Promise.all([
        sql`SELECT COALESCE(SUM(price), 0) as total FROM bookings WHERE status = 'completed' AND created_at >= NOW() - (${days} || ' days')::interval`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE created_at >= NOW() - (${days} || ' days')::interval`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status = 'completed' AND created_at >= NOW() - (${days} || ' days')::interval`,
        sql`SELECT COALESCE(AVG(rating), 0) as avg FROM reviews WHERE created_at >= NOW() - (${days} || ' days')::interval`
      ])

      return res.json({
        success: true,
        report: {
          period: `${days} days`,
          revenue: parseFloat(revenue[0].total),
          bookings: parseInt(bookings[0].count),
          completedJobs: parseInt(completedJobs[0].count),
          averageRating: parseFloat(avgRating[0].avg)
        }
      })
    }

    // GET /api/admin/withdrawals - List all withdrawals
    if (req.method === 'GET' && url === '/admin/withdrawals') {
      if (!(await adminMiddleware(req, res))) return;

      const { status, limit = 50, offset = 0 } = req.query || {}
      
      let query = sql`
        SELECT w.*, u.name as professional_name, u.email as professional_email, u.phone as professional_phone
        FROM withdrawals w
        JOIN users u ON u.id = w.professional_id
        WHERE 1=1
      `

      if (status) {
        query = sql`${query} AND w.status = ${status}`
      }

      query = sql`${query} ORDER BY w.created_at DESC LIMIT ${limit} OFFSET ${offset}`

      const withdrawals = await query
      return res.json({ success: true, withdrawals })
    }

    // PUT /api/admin/withdrawals/:id - Update withdrawal status (approve, reject, mark paid)
    if (req.method === 'PUT' && url.match(/^\/admin\/withdrawals\/[\w-]+$/)) {
      if (!(await adminMiddleware(req, res))) return;

      const withdrawalId = url.split('/').pop()
      const { status, admin_note } = req.body || {}

      if (!status || !['pending', 'approved', 'rejected', 'paid'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Valid status required' })
      }

      const updates = [sql`status = ${status}`]
      if (admin_note) updates.push(sql`admin_note = ${admin_note}`)
      if (status === 'approved' || status === 'rejected' || status === 'paid') {
        updates.push(sql`processed_at = NOW()`)
      }
      updates.push(sql`updated_at = NOW()`)

      await sql`
        UPDATE withdrawals 
        SET ${sql.unsafe(updates.join(', '))}
        WHERE id = ${withdrawalId}
      `

      return res.json({ success: true, message: 'Withdrawal updated' })
    }

    // GET /api/admin/quality - Quality control overview
    if (req.method === 'GET' && url === '/admin/quality') {
      if (!(await adminMiddleware(req, res))) return;

      const { limit = 50, offset = 0 } = req.query || {}

      const jobs = await sql`
        SELECT b.id, b.booking_number, b.status, b.price, b.created_at,
               c.name as customer_name, p.name as professional_name,
               s.name as service_name,
               pp.rating as pro_rating, pp.qa_score,
               (SELECT COUNT(*) FROM booking_photos bp WHERE bp.booking_id = b.id) as photo_count,
               (SELECT COUNT(*) FROM checklists ch WHERE ch.booking_id = b.id) as checklist_count,
               (SELECT COUNT(*) FROM reviews r WHERE r.booking_id = b.id) as review_count
        FROM bookings b
        LEFT JOIN users c ON c.id = b.consumer_id
        LEFT JOIN users p ON p.id = b.professional_id
        LEFT JOIN services s ON s.id = b.service_id
        LEFT JOIN professional_profiles pp ON pp.user_id = b.professional_id
        WHERE b.status = 'completed'
        ORDER BY b.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `

      return res.json({ success: true, jobs })
    }

    // GET /api/admin/quality/:bookingId - Detailed quality inspection for a booking
    if (req.method === 'GET' && url.match(/^\/admin\/quality\/[\w-]+$/)) {
      if (!(await adminMiddleware(req, res))) return;

      const bookingId = url.split('/').pop()

      const [booking, photos, checklist, reviews, timeline] = await Promise.all([
        sql`
          SELECT b.*, c.name as customer_name, c.phone as customer_phone,
                 p.name as professional_name, p.phone as professional_phone,
                 s.name as service_name
          FROM bookings b
          LEFT JOIN users c ON c.id = b.consumer_id
          LEFT JOIN users p ON p.id = b.professional_id
          LEFT JOIN services s ON s.id = b.service_id
          WHERE b.id = ${bookingId}
        `,
        sql`SELECT * FROM booking_photos WHERE booking_id = ${bookingId} ORDER BY photo_type, created_at`,
        sql`SELECT * FROM checklists WHERE booking_id = ${bookingId}`,
        sql`SELECT * FROM reviews WHERE booking_id = ${bookingId}`,
        sql`SELECT * FROM booking_timeline WHERE booking_id = ${bookingId} ORDER BY created_at`
      ])

      if (booking.length === 0) {
        return res.status(404).json({ success: false, message: 'Booking not found' })
      }

      return res.json({
        success: true,
        booking: booking[0],
        photos,
        checklist,
        reviews,
        timeline
      })
    }

    // PUT /api/admin/quality/:bookingId/flag - Flag suspicious job
    if (req.method === 'PUT' && url.match(/^\/admin\/quality\/[\w-]+\/flag$/)) {
      if (!(await adminMiddleware(req, res))) return;

      const bookingId = url.split('/')[3]
      const { flagged, admin_note } = req.body || {}

      await sql`
        UPDATE bookings 
        SET notes = CASE WHEN ${flagged} THEN COALESCE(notes, '') || ' [FLAGGED: ' || ${admin_note || 'Suspicious activity'} || ']' 
                        ELSE REGEXP_REPLACE(notes, ' \[FLAGGED:.*?\]', '')
                  WHERE id = ${bookingId}
      `

      return res.json({ success: true, message: flagged ? 'Job flagged' : 'Job unflagged' })
    }

    // GET /api/admin/reschedules - List all reschedule requests
    if (req.method === 'GET' && url === '/admin/reschedules') {
      if (!(await adminMiddleware(req, res))) return;

      const { status, limit = 50, offset = 0 } = req.query || {}
      
      let query = sql`
        SELECT r.*, 
               b.booking_number, b.scheduled_date, b.scheduled_time,
               req.name as requester_name, req.type as requester_type,
               c.name as customer_name, p.name as professional_name
        FROM reschedule_requests r
        JOIN bookings b ON b.id = r.booking_id
        JOIN users req ON req.id = r.requested_by
        LEFT JOIN users c ON c.id = b.consumer_id
        LEFT JOIN users p ON p.id = b.professional_id
        WHERE 1=1
      `

      if (status) {
        query = sql`${query} AND r.status = ${status}`
      }

      query = sql`${query} ORDER BY r.created_at DESC LIMIT ${limit} OFFSET ${offset}`

      const reschedules = await query
      return res.json({ success: true, reschedules })
    }

    // GET /api/admin/cancellations - List all cancelled bookings
    if (req.method === 'GET' && url === '/admin/cancellations') {
      if (!(await adminMiddleware(req, res))) return;

      const { date_from, date_to, limit = 50, offset = 0 } = req.query || {}
      
      let query = sql`
        SELECT b.*, 
               c.name as customer_name, c.phone as customer_phone,
               p.name as professional_name, p.phone as professional_phone,
               s.name as service_name
        FROM bookings b
        LEFT JOIN users c ON c.id = b.consumer_id
        LEFT JOIN users p ON p.id = b.professional_id
        LEFT JOIN services s ON s.id = b.service_id
        WHERE b.status = 'cancelled'
      `

      if (date_from) {
        query = sql`${query} AND b.created_at >= ${date_from}`
      }
      if (date_to) {
        query = sql`${query} AND b.created_at <= ${date_to}`
      }

      query = sql`${query} ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`

      const cancellations = await query
      return res.json({ success: true, cancellations })
    }

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Admin API error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}
