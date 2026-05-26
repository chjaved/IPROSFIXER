const { getDb, generateId } = require('./_db.cjs')
const { authMiddleware, requireRole } = require('./_auth.cjs')

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
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
  const path = pathname.replace('/api/bookings', '')

  try {
    const db = getDb()

    // GET /api/bookings - List user's bookings
    if (req.method === 'GET' && (path === '' || path === '/')) {
      return await listBookings(req, res, db)
    }

    // POST /api/bookings - Create new booking
    if (req.method === 'POST' && (path === '' || path === '/')) {
      return await createBooking(req, res, db)
    }

    // GET /api/bookings/:id - Get booking details
    if (req.method === 'GET' && path.match(/^\/[\w-]+$/)) {
      const id = path.replace('/', '')
      return await getBookingDetails(req, res, db, id)
    }

    // PUT /api/bookings/:id - Update booking (status, etc.)
    if (req.method === 'PUT' && path.match(/^\/[\w-]+$/)) {
      const id = path.replace('/', '')
      return await updateBooking(req, res, db, id)
    }

    // GET /api/bookings/available-slots - Get available time slots
    if (req.method === 'GET' && path === '/available-slots') {
      return await getAvailableSlots(req, res, db)
    }

    return res.status(404).json({ success: false, message: 'Endpoint not found' })
  } catch (err) {
    console.error('Bookings API error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// Generate booking number
function generateBookingNumber() {
  const prefix = 'BK'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

// List bookings
async function listBookings(req, res, db) {
  const userId = req.user.id
  const userType = req.user.type
  const { status, limit = 20, offset = 0 } = req.query || {}

  let query, countQuery, params

  if (userType === 'consumer') {
    query = `
      SELECT b.*, s.name as service_name, s.image_url as service_image,
        u.name as professional_name, u.phone as professional_phone
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON b.professional_id = u.id
      WHERE b.consumer_id = ?
    `
    countQuery = 'SELECT COUNT(*) as total FROM bookings WHERE consumer_id = ?'
    params = [userId]
  } else {
    query = `
      SELECT b.*, s.name as service_name, s.image_url as service_image,
        u.name as customer_name, u.phone as customer_phone
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON b.consumer_id = u.id
      WHERE b.professional_id = ? OR b.professional_id IS NULL
    `
    countQuery = 'SELECT COUNT(*) as total FROM bookings WHERE professional_id = ? OR professional_id IS NULL'
    params = [userId]
  }

  if (status) {
    query += ' AND b.status = ?'
    countQuery += ' AND status = ?'
    params.push(status)
  }

  query += ' ORDER BY b.scheduled_date DESC, b.scheduled_time DESC'
  query += ' LIMIT ? OFFSET ?'

  const bookings = db.prepare(query).all(...params, parseInt(limit), parseInt(offset))
  const count = db.prepare(countQuery).get(...params.slice(0, -2))

  return res.json({
    success: true,
    data: {
      bookings,
      pagination: {
        total: count.total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    }
  })
}

// Create booking
async function createBooking(req, res, db) {
  const userId = req.user.id
  const { serviceId, scheduledDate, scheduledTime, address, notes, preferredProfessionalId } = req.body || {}

  // Validation
  if (!serviceId || !scheduledDate || !scheduledTime || !address) {
    return res.status(400).json({
      success: false,
      message: 'Service, date, time, and address are required'
    })
  }

  // Get service details for pricing
  const service = db.prepare('SELECT * FROM services WHERE id = ? AND is_active = TRUE').get(serviceId)
  
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' })
  }

  // Find available professional if none specified
  let professionalId = preferredProfessionalId
  
  if (!professionalId) {
    // Find professional who offers this service and works in the area
    const availablePro = db.prepare(`
      SELECT u.id
      FROM users u
      JOIN professional_profiles pp ON u.id = pp.user_id
      WHERE u.type = 'professional'
      AND u.status = 'active'
      AND pp.service_types LIKE ?
      ORDER BY pp.rating DESC, RANDOM()
      LIMIT 1
    `).get(`%${service.name}%`)

    if (availablePro) {
      professionalId = availablePro.id
    }
  }

  // Create booking
  const bookingId = generateId()
  const bookingNumber = generateBookingNumber()

  db.prepare(`
    INSERT INTO bookings (id, booking_number, consumer_id, professional_id, service_id, status, scheduled_date, scheduled_time, address, price, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    bookingId,
    bookingNumber,
    userId,
    professionalId,
    serviceId,
    professionalId ? 'confirmed' : 'pending',
    scheduledDate,
    scheduledTime,
    address,
    service.base_price,
    notes || null
  )

  // Update consumer stats
  db.prepare(`
    UPDATE consumer_profiles 
    SET total_bookings = total_bookings + 1
    WHERE user_id = ?
  `).run(userId)

  return res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: {
      bookingId,
      bookingNumber,
      status: professionalId ? 'confirmed' : 'pending',
      price: service.base_price
    }
  })
}

// Get booking details
async function getBookingDetails(req, res, db, id) {
  const userId = req.user.id
  const userType = req.user.type

  let query
  if (userType === 'consumer') {
    query = `
      SELECT b.*, s.name as service_name, s.image_url as service_image,
        u.name as professional_name, u.phone as professional_phone
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON b.professional_id = u.id
      WHERE b.id = ? AND b.consumer_id = ?
    `
  } else {
    query = `
      SELECT b.*, s.name as service_name, s.image_url as service_image,
        u.name as customer_name, u.phone as customer_phone
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON b.consumer_id = u.id
      WHERE b.id = ? AND (b.professional_id = ? OR b.professional_id IS NULL)
    `
  }

  const booking = db.prepare(query).get(id, userId)

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  // Get transactions
  const transactions = db.prepare(`
    SELECT * FROM transactions 
    WHERE booking_id = ? 
    ORDER BY created_at DESC
  `).all(id)

  // Get review if exists
  const review = db.prepare(`
    SELECT * FROM reviews 
    WHERE booking_id = ?
  `).get(id)

  return res.json({
    success: true,
    data: {
      booking,
      transactions,
      review
    }
  })
}

// Update booking
async function updateBooking(req, res, db, id) {
  const userId = req.user.id
  const userType = req.user.type
  const { status, cancellationReason } = req.body || {}

  // Check if booking exists and belongs to user
  let bookingQuery
  if (userType === 'consumer') {
    bookingQuery = 'SELECT * FROM bookings WHERE id = ? AND consumer_id = ?'
  } else {
    bookingQuery = 'SELECT * FROM bookings WHERE id = ? AND (professional_id = ? OR professional_id IS NULL)'
  }

  const booking = db.prepare(bookingQuery).get(id, userId)

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  // Validate status transitions
  const validTransitions = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['in_progress', 'cancelled'],
    'in_progress': ['completed', 'cancelled'],
    'completed': [],
    'cancelled': []
  }

  if (status && !validTransitions[booking.status].includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Cannot transition from ${booking.status} to ${status}`
    })
  }

  // Build update query
  const updates = {}
  if (status) updates.status = status
  if (cancellationReason) updates.cancellation_reason = cancellationReason

  if (userType === 'professional' && status === 'confirmed' && !booking.professional_id) {
    // Professional accepting a pending job
    updates.professional_id = userId
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ success: false, message: 'No updates provided' })
  }

  const setClause = Object.keys(updates).map(k => `${k} = ?`).join(', ')
  const values = [...Object.values(updates), id]

  db.prepare(`UPDATE bookings SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values)

  // Handle side effects
  if (status === 'completed') {
    // Update professional stats
    if (booking.professional_id || (userType === 'professional' && updates.professional_id)) {
      const proId = booking.professional_id || userId
      db.prepare(`
        UPDATE professional_profiles 
        SET total_jobs = total_jobs + 1
        WHERE user_id = ?
      `).run(proId)
    }

    // Update consumer stats
    db.prepare(`
      UPDATE consumer_profiles 
      SET total_spent = total_spent + ?
      WHERE user_id = ?
    `).run(booking.price, booking.consumer_id)
  }

  return res.json({
    success: true,
    message: 'Booking updated successfully'
  })
}

// Get available time slots
async function getAvailableSlots(req, res, db) {
  const { date, professionalId } = req.query || {}

  if (!date) {
    return res.status(400).json({ success: false, message: 'Date is required' })
  }

  // Generate time slots (9 AM to 6 PM, hourly)
  const slots = []
  const startHour = 9
  const endHour = 18

  for (let hour = startHour; hour < endHour; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`
    
    // Check if slot is booked
    const isBooked = db.prepare(`
      SELECT COUNT(*) as count 
      FROM bookings 
      WHERE professional_id = ? 
      AND scheduled_date = ? 
      AND scheduled_time = ?
      AND status NOT IN ('cancelled', 'completed')
    `).get(professionalId || 'any', date, time)

    slots.push({
      time,
      available: !isBooked || isBooked.count === 0
    })
  }

  return res.json({
    success: true,
    data: { date, slots }
  })
}
