const { getDb, generateId } = require('./_db.cjs')
const { authMiddleware } = require('./_auth.cjs')

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
  const path = pathname.replace('/api/transactions', '')

  try {
    const db = getDb()

    // GET /api/transactions - List user's transactions
    if (req.method === 'GET' && (path === '' || path === '/')) {
      return await listTransactions(req, res, db)
    }

    // POST /api/transactions - Create payment
    if (req.method === 'POST' && (path === '' || path === '/')) {
      return await createTransaction(req, res, db)
    }

    // GET /api/transactions/summary - Get earnings/spending summary
    if (req.method === 'GET' && path === '/summary') {
      return await getSummary(req, res, db)
    }

    return res.status(404).json({ success: false, message: 'Endpoint not found' })
  } catch (err) {
    console.error('Transactions API error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// List transactions
async function listTransactions(req, res, db) {
  const userId = req.user.id
  const userType = req.user.type
  const { type, status, limit = 20, offset = 0 } = req.query || {}

  let query, countQuery, params

  if (userType === 'consumer') {
    // Consumers see payments they made and refunds
    query = `
      SELECT t.*, b.booking_number, s.name as service_name,
        u.name as other_party_name
      FROM transactions t
      LEFT JOIN bookings b ON t.booking_id = b.id
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON t.payee_id = u.id
      WHERE t.payer_id = ?
    `
    countQuery = 'SELECT COUNT(*) as total FROM transactions WHERE payer_id = ?'
    params = [userId]
  } else {
    // Professionals see payouts they received
    query = `
      SELECT t.*, b.booking_number, s.name as service_name,
        u.name as customer_name
      FROM transactions t
      LEFT JOIN bookings b ON t.booking_id = b.id
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON t.payer_id = u.id
      WHERE t.payee_id = ?
    `
    countQuery = 'SELECT COUNT(*) as total FROM transactions WHERE payee_id = ?'
    params = [userId]
  }

  if (type) {
    query += ' AND t.type = ?'
    countQuery += ' AND type = ?'
    params.push(type)
  }

  if (status) {
    query += ' AND t.status = ?'
    countQuery += ' AND status = ?'
    params.push(status)
  }

  query += ' ORDER BY t.created_at DESC'
  query += ' LIMIT ? OFFSET ?'

  const transactions = db.prepare(query).all(...params, parseInt(limit), parseInt(offset))
  const count = db.prepare(countQuery).get(...params.slice(0, -2))

  return res.json({
    success: true,
    data: {
      transactions,
      pagination: {
        total: count.total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    }
  })
}

// Create transaction (payment)
async function createTransaction(req, res, db) {
  const userId = req.user.id
  const { bookingId, method, referenceCode } = req.body || {}

  if (!bookingId || !method) {
    return res.status(400).json({
      success: false,
      message: 'Booking ID and payment method are required'
    })
  }

  // Get booking details
  const booking = db.prepare(`
    SELECT * FROM bookings WHERE id = ? AND consumer_id = ?
  `).get(bookingId, userId)

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  // Check if already paid
  const existing = db.prepare(`
    SELECT * FROM transactions 
    WHERE booking_id = ? AND type = 'payment' AND status = 'completed'
  `).get(bookingId)

  if (existing) {
    return res.status(400).json({ success: false, message: 'Payment already completed for this booking' })
  }

  // Create payment transaction
  const transactionId = generateId()

  db.prepare(`
    INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, method, status, reference_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    transactionId,
    bookingId,
    userId,
    booking.professional_id,
    booking.price,
    'payment',
    method,
    'completed',
    referenceCode || null
  )

  return res.status(201).json({
    success: true,
    message: 'Payment recorded successfully',
    data: { transactionId }
  })
}

// Get summary (earnings for pros, spending for consumers)
async function getSummary(req, res, db) {
  const userId = req.user.id
  const userType = req.user.type
  const { period = 'month' } = req.query || {}

  const db_period = period === 'week' ? '-7 days' : '-30 days'

  if (userType === 'professional') {
    // Professional earnings summary
    const totalEarnings = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions 
      WHERE payee_id = ? AND type = 'payment' AND status = 'completed'
    `).get(userId)

    const thisPeriod = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM transactions 
      WHERE payee_id = ? AND type = 'payment' AND status = 'completed'
      AND created_at >= datetime('now', ?)
    `).get(userId, db_period)

    const dailyBreakdown = db.prepare(`
      SELECT date(created_at) as date, SUM(amount) as total
      FROM transactions 
      WHERE payee_id = ? AND type = 'payment' AND status = 'completed'
      AND created_at >= datetime('now', ?)
      GROUP BY date(created_at)
      ORDER BY date
    `).all(userId, db_period)

    const pendingPayouts = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions 
      WHERE payee_id = ? AND type = 'payout' AND status = 'pending'
    `).get(userId)

    return res.json({
      success: true,
      data: {
        totalEarnings: totalEarnings.total,
        thisPeriod: {
          earnings: thisPeriod.total,
          jobs: thisPeriod.count
        },
        dailyBreakdown,
        pendingPayouts: pendingPayouts.total
      }
    })
  } else {
    // Consumer spending summary
    const totalSpent = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM transactions 
      WHERE payer_id = ? AND type = 'payment' AND status = 'completed'
    `).get(userId)

    const thisPeriod = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM transactions 
      WHERE payer_id = ? AND type = 'payment' AND status = 'completed'
      AND created_at >= datetime('now', ?)
    `).get(userId, db_period)

    const byService = db.prepare(`
      SELECT s.name as service, SUM(t.amount) as total, COUNT(*) as count
      FROM transactions t
      JOIN bookings b ON t.booking_id = b.id
      JOIN services s ON b.service_id = s.id
      WHERE t.payer_id = ? AND t.type = 'payment' AND t.status = 'completed'
      GROUP BY s.name
      ORDER BY total DESC
    `).all(userId)

    return res.json({
      success: true,
      data: {
        totalSpent: totalSpent.total,
        thisPeriod: {
          spent: thisPeriod.total,
          bookings: thisPeriod.count
        },
        byService
      }
    })
  }
}
