// Consolidated: reviews, transactions, withdrawals, disputes, timeline
const { getDb, generateId } = require('../_db.js')
const { adminMiddleware } = require('../_auth.js')
const { createNotification } = require('./notifications.js')

module.exports = async function dataHandler(req, res) {
  const url = req.url || ''
  const sql = getDb()
  const userId = req.user.id
  const userType = req.user.type

  try {
    if (url.includes('/reviews')) {
      if (req.method === 'GET') return await listReviews(req, res, sql, userId, userType)
      if (req.method === 'POST') return await createReview(req, res, sql, userId)
    }
    if (url.includes('/transactions')) {
      if (req.method === 'GET' && url.includes('/summary')) return await getTransactionSummary(req, res, sql, userId, userType)
      if (req.method === 'GET') return await listTransactions(req, res, sql, userId, userType)
      if (req.method === 'POST') return await createTransaction(req, res, sql, userId)
    }
    if (url.includes('/withdrawals')) {
      if (req.method === 'GET' && url.includes('/summary')) return await getWithdrawalSummary(req, res, sql, userId)
      if (req.method === 'GET') return await listWithdrawals(req, res, sql, userId)
      if (req.method === 'POST') return await createWithdrawal(req, res, sql, req.user)
    }
    if (url.includes('/disputes')) {
      const disputeIdMatch = url.replace(/\?.*$/, '').match(/\/disputes\/([\w-]+)/)
      const disputeId = disputeIdMatch ? disputeIdMatch[1] : null
      if (req.method === 'GET') return await listDisputes(req, res, sql, userId, userType)
      if (req.method === 'POST') return await createDispute(req, res, sql, userId)
      if (req.method === 'PUT' && disputeId) {
        if (!(await adminMiddleware(req, res))) return
        return await updateDispute(req, res, sql, disputeId)
      }
    }
    if (url.includes('/timeline')) {
      if (req.method === 'GET') return await listTimeline(req, res, sql, userId)
      if (req.method === 'POST') return await createTimelineEventHandler(req, res, sql, userId)
    }
    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Data error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listReviews(req, res, sql, userId, userType) {
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

async function createReview(req, res, sql, userId) {
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
  const avg = await sql`SELECT AVG(rating) as avg FROM reviews WHERE professional_id=${booking.professional_id}`
  const newRating = avg[0]?.avg ? Math.round(parseFloat(avg[0].avg)*10)/10 : rating
  await sql`UPDATE professional_profiles SET rating=${newRating} WHERE user_id=${booking.professional_id}`
  return res.status(201).json({ success: true, message: 'Review submitted', data: { reviewId } })
}

async function listTransactions(req, res, sql, userId, userType) {
  const transactions = userType === 'consumer'
    ? await sql`SELECT t.*, b.booking_number, s.name as service_name FROM transactions t LEFT JOIN bookings b ON t.booking_id=b.id LEFT JOIN services s ON b.service_id=s.id WHERE t.payer_id=${userId} ORDER BY t.created_at DESC`
    : await sql`SELECT t.*, b.booking_number, s.name as service_name, u.name as customer_name FROM transactions t LEFT JOIN bookings b ON t.booking_id=b.id LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON t.payer_id=u.id WHERE t.payee_id=${userId} ORDER BY t.created_at DESC`
  return res.json({ success: true, data: { transactions } })
}

async function getTransactionSummary(req, res, sql, userId, userType) {
  const days = req.query?.period === 'week' ? 7 : 30
  if (userType === 'professional') {
    const total  = await sql`SELECT COALESCE(SUM(amount),0) as total FROM transactions WHERE payee_id=${userId} AND status='completed'`
    const period = await sql`SELECT COALESCE(SUM(amount),0) as total, COUNT(*) as count FROM transactions WHERE payee_id=${userId} AND status='completed' AND created_at>=NOW()-(${days}||' days')::interval`
    const daily  = await sql`SELECT DATE(created_at) as date, SUM(amount) as total FROM transactions WHERE payee_id=${userId} AND status='completed' AND created_at>=NOW()-(${days}||' days')::interval GROUP BY DATE(created_at) ORDER BY date`
    return res.json({ success: true, data: { totalEarnings: parseFloat(total[0].total)||0, thisPeriod: { earnings: parseFloat(period[0].total)||0, jobs: parseInt(period[0].count)||0 }, dailyBreakdown: daily } })
  } else {
    const total  = await sql`SELECT COALESCE(SUM(amount),0) as total FROM transactions WHERE payer_id=${userId} AND status='completed'`
    const period = await sql`SELECT COALESCE(SUM(amount),0) as total, COUNT(*) as count FROM transactions WHERE payer_id=${userId} AND status='completed' AND created_at>=NOW()-(${days}||' days')::interval`
    return res.json({ success: true, data: { totalSpent: parseFloat(total[0].total)||0, thisPeriod: { spent: parseFloat(period[0].total)||0, bookings: parseInt(period[0].count)||0 } } })
  }
}

async function createTransaction(req, res, sql, userId) {
  const { booking_id, method, reference_code } = req.body || {}
  if (!booking_id || !method) return res.status(400).json({ success: false, message: 'booking_id and method required' })
  const bookings = await sql`SELECT * FROM bookings WHERE id=${booking_id} AND consumer_id=${userId}`
  if (!bookings.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const booking = bookings[0]
  const existing = await sql`SELECT id FROM transactions WHERE booking_id=${booking_id} AND status='completed'`
  if (existing.length) return res.status(400).json({ success: false, message: 'Already paid' })
  const txId = generateId()
  await sql`INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, method, status, reference_code) VALUES (${txId}, ${booking_id}, ${userId}, ${booking.professional_id}, ${booking.price}, 'payment', ${method}, 'completed', ${reference_code||null})`
  return res.status(201).json({ success: true, data: { transactionId: txId } })
}

async function getWithdrawalSummary(req, res, sql, userId) {
  const earned    = await sql`SELECT COALESCE(SUM(amount),0) as total FROM transactions WHERE payee_id=${userId} AND status='completed'`
  const pending   = await sql`SELECT COALESCE(SUM(amount),0) as total FROM withdrawals WHERE professional_id=${userId} AND status='pending'`
  const approved  = await sql`SELECT COALESCE(SUM(amount),0) as total FROM withdrawals WHERE professional_id=${userId} AND status IN ('approved','paid')`
  const withdrawn = await sql`SELECT COALESCE(SUM(amount),0) as total FROM withdrawals WHERE professional_id=${userId} AND status IN ('pending','approved','paid')`
  const totalEarned = parseFloat(earned[0].total)||0
  return res.json({ success: true, summary: { availableBalance: Math.max(0, totalEarned - (parseFloat(withdrawn[0].total)||0)), totalEarned, pendingAmount: parseFloat(pending[0].total)||0, paidAmount: parseFloat(approved[0].total)||0 } })
}

async function listWithdrawals(req, res, sql, userId) {
  const withdrawals = await sql`SELECT * FROM withdrawals WHERE professional_id=${userId} ORDER BY created_at DESC`
  return res.json({ success: true, withdrawals })
}

async function createWithdrawal(req, res, sql, user) {
  const { amount, method, account_name, account_number, bank_name } = req.body || {}
  const userId = user.id
  if (!amount || !method || !account_name || !account_number) return res.status(400).json({ success: false, message: 'amount, method, account_name, and account_number are required' })
  if (user.type !== 'professional') return res.status(403).json({ success: false, message: 'Only professionals can request withdrawals' })
  if (amount <= 0) return res.status(400).json({ success: false, message: 'Amount must be greater than 0' })
  const balance  = await sql`SELECT COALESCE(SUM(amount),0) as total FROM transactions WHERE payee_id=${userId} AND status='completed'`
  const withdrawn = await sql`SELECT COALESCE(SUM(amount),0) as total FROM withdrawals WHERE professional_id=${userId} AND status IN ('pending','approved','paid')`
  const available = parseFloat(balance[0].total) - parseFloat(withdrawn[0].total)
  if (amount > available) return res.status(400).json({ success: false, message: `Insufficient balance. Available: RM ${available.toFixed(2)}` })
  const withdrawalId = generateId()
  await sql`INSERT INTO withdrawals (id, professional_id, amount, method, account_name, account_number, bank_name, status) VALUES (${withdrawalId}, ${userId}, ${amount}, ${method}, ${account_name}, ${account_number}, ${bank_name||null}, 'pending')`
  const admins = await sql`SELECT id FROM users WHERE type='admin' AND status='active'`
  for (const admin of admins) {
    await createNotification({ user_id: admin.id, type: 'new_withdrawal', title: 'New Withdrawal Request', body: `Withdrawal request of RM ${amount}`, data: JSON.stringify({ withdrawal_id: withdrawalId, professional_id: userId, amount }) })
  }
  const newW = await sql`SELECT * FROM withdrawals WHERE id=${withdrawalId}`
  return res.status(201).json({ success: true, withdrawal: newW[0] })
}

async function listDisputes(req, res, sql, userId, userType) {
  const disputes = userType === 'admin'
    ? await sql`SELECT d.*, b.booking_number, s.name as service_name, c.name as customer_name, p.name as professional_name FROM disputes d JOIN bookings b ON b.id=d.booking_id LEFT JOIN services s ON s.id=b.service_id LEFT JOIN users c ON c.id=d.customer_id LEFT JOIN users p ON p.id=d.professional_id ORDER BY d.created_at DESC`
    : await sql`SELECT d.*, b.booking_number, s.name as service_name, c.name as customer_name, p.name as professional_name FROM disputes d JOIN bookings b ON b.id=d.booking_id LEFT JOIN services s ON s.id=b.service_id LEFT JOIN users c ON c.id=d.customer_id LEFT JOIN users p ON p.id=d.professional_id WHERE d.customer_id=${userId} OR d.professional_id=${userId} ORDER BY d.created_at DESC`
  return res.json({ success: true, disputes })
}

async function createDispute(req, res, sql, userId) {
  const { booking_id, reason, description } = req.body
  if (!booking_id || !reason) return res.status(400).json({ success: false, message: 'booking_id and reason are required' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (b.consumer_id !== userId) return res.status(403).json({ success: false, message: 'Only customer can create disputes' })
  const existing = await sql`SELECT * FROM disputes WHERE booking_id=${booking_id}`
  if (existing.length) return res.status(400).json({ success: false, message: 'Dispute already exists' })
  const disputeId = generateId()
  await sql`INSERT INTO disputes (id, booking_id, customer_id, professional_id, reason, description) VALUES (${disputeId}, ${booking_id}, ${b.consumer_id}, ${b.professional_id}, ${reason}, ${description||null})`
  await sql`UPDATE bookings SET status='disputed' WHERE id=${booking_id}`
  const admins = await sql`SELECT id FROM users WHERE type='admin' AND status='active'`
  for (const admin of admins) await createNotification({ user_id: admin.id, type: 'new_dispute', title: 'New Dispute Created', body: `Dispute for booking ${booking_id}. Reason: ${reason}`, data: JSON.stringify({ dispute_id: disputeId, booking_id }) })
  if (b.professional_id) await createNotification({ user_id: b.professional_id, type: 'booking_disputed', title: 'Dispute Created', body: 'A dispute has been created for your booking.', data: JSON.stringify({ booking_id }) })
  const newDispute = await sql`SELECT * FROM disputes WHERE id=${disputeId}`
  return res.status(201).json({ success: true, dispute: newDispute[0] })
}

async function updateDispute(req, res, sql, disputeId) {
  const { status, admin_note } = req.body
  if (!status || !['open','investigating','resolved'].includes(status)) return res.status(400).json({ success: false, message: 'Valid status required' })
  await sql`UPDATE disputes SET status=${status}, admin_note=${admin_note||null}, updated_at=NOW() WHERE id=${disputeId}`
  return res.json({ success: true, message: 'Dispute updated' })
}

async function listTimeline(req, res, sql, userId) {
  const { booking_id } = req.query
  if (!booking_id) return res.status(400).json({ success: false, message: 'booking_id is required' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (b.consumer_id !== userId && b.professional_id !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
  const timeline = await sql`SELECT bt.*, u.name as created_by_name FROM booking_timeline bt LEFT JOIN users u ON u.id=bt.created_by WHERE bt.booking_id=${booking_id} ORDER BY bt.created_at ASC`
  return res.json({ success: true, timeline })
}

async function createTimelineEventHandler(req, res, sql, userId) {
  const { booking_id, status, notes } = req.body
  if (!booking_id || !status) return res.status(400).json({ success: false, message: 'booking_id and status are required' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (b.consumer_id !== userId && b.professional_id !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
  const timelineId = generateId()
  await sql`INSERT INTO booking_timeline (id, booking_id, status, notes, created_by) VALUES (${timelineId}, ${booking_id}, ${status}, ${notes||null}, ${userId})`
  const newEvent = await sql`SELECT * FROM booking_timeline WHERE id=${timelineId}`
  return res.status(201).json({ success: true, event: newEvent[0] })
}
