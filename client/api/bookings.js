const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')
const { createNotification } = require('./notifications.js')

// Helper to create timeline event
async function createTimelineEvent(sql, bookingId, status, userId, notes = null) {
  const timelineId = generateId()
  await sql`
    INSERT INTO booking_timeline (id, booking_id, status, notes, created_by)
    VALUES (${timelineId}, ${bookingId}, ${status}, ${notes}, ${userId})
  `
}

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

// Valid Klang Valley areas
const VALID_AREAS = ['KL', 'PJ', 'Shah Alam', 'Subang', 'Cheras', 'Klang', 'Cyberjaya', 'Putrajaya', 'Ampang', 'Bangsar', 'Mont Kiara', 'Damansara']

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
  const rateLimit = checkRateLimit(`bookings:${clientIp}`, 50)
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
    // Extract booking ID — handles both /bookings/:id and /bookings/:id/approve
    const idMatch = url.replace(/\?.*$/, '').match(/\/bookings\/([\w-]+)/)
    const bookingId = idMatch ? idMatch[1] : null
    const isApprove = url.includes('/approve')

    if (req.method === 'GET'  && !bookingId) return await listBookings(req, res, sql)
    if (req.method === 'POST' && !bookingId) return await createBooking(req, res, sql)
    if (req.method === 'GET'  && bookingId)  return await getBookingDetail(req, res, sql, bookingId)
    if (req.method === 'POST' && bookingId && isApprove) return await approveBooking(req, res, sql, bookingId, userId)
    if (req.method === 'PUT'  && bookingId)  return await updateBooking(req, res, sql, bookingId)

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Bookings error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

function genBookingRef() {
  const yr = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `IPF-${yr}-${rand}`
}

async function listBookings(req, res, sql) {
  const userId = req.user.id
  const userType = req.user.type
  const { status, page = 1, limit = 20 } = req.query || {}
  
  // Pagination
  const pageNum = Math.max(1, parseInt(page) || 1)
  const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20))
  const offset = (pageNum - 1) * limitNum

  let bookings
  if (userType === 'consumer') {
    bookings = status
      ? await sql`SELECT b.*, s.name as service_name, s.icon, u.name as professional_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id WHERE b.consumer_id=${userId} AND b.status=${status} ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
      : await sql`SELECT b.*, s.name as service_name, s.icon, u.name as professional_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id WHERE b.consumer_id=${userId} ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
  } else {
    bookings = status
      ? await sql`SELECT b.*, s.name as service_name, s.icon, u.name as customer_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id WHERE (b.professional_id=${userId} OR b.professional_id IS NULL) AND b.status=${status} ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
      : await sql`SELECT b.*, s.name as service_name, s.icon, u.name as customer_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id WHERE b.professional_id=${userId} OR b.professional_id IS NULL ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
  }

  // Normalise: Flutter BookingModel reads service_name, area, total_amount
  const normalised = bookings.map(b => ({
    ...b,
    service_name: b.service_name || b.service || '',
    area: b.area || b.address || '',
    total_amount: b.price || b.total_amount || 0,
  }))

  return res.json({ success: true, bookings: normalised, data: normalised, pagination: { page: pageNum, limit: limitNum } })
}

async function createBooking(req, res, sql) {
  const userId = req.user.id
  // Accept both Flutter field names (service_id, area) and legacy (serviceId, address)
  const body = req.body || {}
  const serviceId     = body.service_id     || body.serviceId
  const scheduledDate = body.scheduled_date || body.scheduledDate
  const scheduledTime = body.scheduled_time || body.scheduledTime
  const area          = body.area           || body.address || ''
  const { notes, whatsapp } = body

  if (!serviceId || !scheduledDate || !scheduledTime || !area)
    return res.status(400).json({ success: false, message: 'service_id, scheduled_date, scheduled_time, and area are required' })
  
  // Validate area is in valid Klang Valley areas
  if (!VALID_AREAS.some(validArea => area.toLowerCase().includes(validArea.toLowerCase()))) {
    return res.status(400).json({ success: false, message: `Area must be one of: ${VALID_AREAS.join(', ')}` })
  }
  
  // Validate date is in future
  const bookingDate = new Date(scheduledDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (bookingDate < today) {
    return res.status(400).json({ success: false, message: 'Booking date must be in the future' })
  }

  const svcRows = await sql`SELECT * FROM services WHERE id=${serviceId} AND is_active=TRUE`
  if (!svcRows.length) return res.status(404).json({ success: false, message: 'Service not found' })
  const service = svcRows[0]

  const bookingId  = generateId()
  const bookingRef = genBookingRef()

  await sql`
    INSERT INTO bookings (id, booking_number, consumer_id, service_id, service_name, status, scheduled_date, scheduled_time, address, area, price, notes, whatsapp)
    VALUES (${bookingId}, ${bookingRef}, ${userId}, ${serviceId}, ${service.name}, 'pending', ${scheduledDate}, ${scheduledTime}, ${area}, ${area}, ${service.base_price}, ${notes||null}, ${whatsapp||null})
  `
  await sql`UPDATE consumer_profiles SET total_bookings=total_bookings+1 WHERE user_id=${userId}`

  const booking = { id: bookingId, booking_number: bookingRef, service_id: serviceId, service_name: service.name,
    area, scheduled_date: scheduledDate, scheduled_time: scheduledTime, status: 'pending',
    total_amount: service.base_price, price: service.base_price, created_at: new Date().toISOString() }

  return res.status(201).json({ success: true, message: 'Booking created', booking, data: booking })
}

async function getBookingDetail(req, res, sql, id) {
  const userId = req.user.id
  const rows = await sql`
    SELECT b.*, s.name as service_name, s.icon, u.name as professional_name
    FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id
    WHERE b.id=${id} AND (b.consumer_id=${userId} OR b.professional_id=${userId})
  `
  if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = rows[0]
  return res.json({ success: true, data: { ...b, area: b.area||b.address||'', total_amount: b.price||0 } })
}

async function updateBooking(req, res, sql, id) {
  const userId = req.user.id
  const userType = req.user.type
  const { status, cancellation_reason } = req.body || {}

  const rows = await sql`SELECT * FROM bookings WHERE id=${id}`
  if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const booking = rows[0]

  if (status) await sql`UPDATE bookings SET status=${status}, updated_at=NOW() WHERE id=${id}`
  if (cancellation_reason) await sql`UPDATE bookings SET cancellation_reason=${cancellation_reason} WHERE id=${id}`

  // Professional accepting: claim the job
  if (userType === 'professional' && status === 'accepted' && !booking.professional_id) {
    await sql`UPDATE bookings SET professional_id=${userId} WHERE id=${id}`
    // Create timeline event
    await createTimelineEvent(sql, id, 'accepted', userId, 'Professional accepted the booking')
    // Notify customer
    await createNotification({
      user_id: booking.consumer_id,
      type: 'booking_accepted',
      title: 'Booking Accepted',
      body: `A professional has accepted your booking for ${booking.service_name}.`,
      data: JSON.stringify({ booking_id: id })
    })
  }

  // On the way
  if (status === 'on_the_way') {
    await createTimelineEvent(sql, id, 'on_the_way', userId, 'Professional is on the way')
    await createNotification({
      user_id: booking.consumer_id,
      type: 'on_the_way',
      title: 'Professional On The Way',
      body: `Your professional is on the way to your location.`,
      data: JSON.stringify({ booking_id: id })
    })
  }

  // Arrived
  if (status === 'arrived') {
    await createTimelineEvent(sql, id, 'arrived', userId, 'Professional arrived at location')
    await createNotification({
      user_id: booking.consumer_id,
      type: 'arrived',
      title: 'Professional Arrived',
      body: `Your professional has arrived at your location.`,
      data: JSON.stringify({ booking_id: id })
    })
  }

  // In progress (work started)
  if (status === 'in_progress') {
    await createTimelineEvent(sql, id, 'in_progress', userId, 'Work started')
    await createNotification({
      user_id: booking.consumer_id,
      type: 'work_started',
      title: 'Work Started',
      body: `Your professional has started working on your service.`,
      data: JSON.stringify({ booking_id: id })
    })
  }

  // Completed: create transaction + update stats
  if (status === 'completed') {
    const proId = booking.professional_id || userId
    await sql`INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status) VALUES (${generateId()}, ${id}, ${booking.consumer_id}, ${proId}, ${booking.price}, 'payment', 'completed')`
    await sql`UPDATE professional_profiles SET total_jobs=total_jobs+1 WHERE user_id=${proId}`
    await sql`UPDATE consumer_profiles SET total_spent=total_spent+${booking.price} WHERE user_id=${booking.consumer_id}`
  }

  // awaiting_approval: do NOT create transaction (wait for customer approval)
  if (status === 'awaiting_approval') {
    await createTimelineEvent(sql, id, 'awaiting_approval', userId, 'Job completed, awaiting customer approval')
    // Notify customer
    await createNotification({
      user_id: booking.consumer_id,
      type: 'booking_awaiting_approval',
      title: 'Job Awaiting Your Approval',
      body: `Your professional has completed the job. Please review and approve.`,
      data: JSON.stringify({ booking_id: id })
    })
  }

  return res.json({ success: true, message: 'Booking updated' })
}

async function approveBooking(req, res, sql, bookingId, userId) {
  const rows = await sql`SELECT * FROM bookings WHERE id = ${bookingId}`
  if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const booking = rows[0]

  if (booking.consumer_id !== userId) {
    return res.status(403).json({ success: false, message: 'Only customer can approve booking' })
  }

  if (booking.status !== 'awaiting_approval') {
    return res.status(400).json({ success: false, message: 'Booking is not awaiting approval' })
  }

  // Update status to completed
  await sql`UPDATE bookings SET status='completed', updated_at=NOW() WHERE id = ${bookingId}`
  
  // Create timeline event
  await createTimelineEvent(sql, bookingId, 'completed', userId, 'Booking completed and approved')

  // Create transaction
  const proId = booking.professional_id
  await sql`INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status) VALUES (${generateId()}, ${bookingId}, ${booking.consumer_id}, ${proId}, ${booking.price}, 'payment', 'completed')`

  // Update stats
  await sql`UPDATE professional_profiles SET total_jobs=total_jobs+1 WHERE user_id=${proId}`
  await sql`UPDATE consumer_profiles SET total_spent=total_spent+${booking.price} WHERE user_id=${booking.consumer_id}`

  // Notify professional
  await createNotification({
    user_id: proId,
    type: 'booking_completed',
    title: 'Booking Completed',
    body: `Your booking has been approved and completed. Payment has been processed.`,
    data: JSON.stringify({ booking_id: bookingId })
  })

  return res.json({ success: true, message: 'Booking approved and completed' })
}
