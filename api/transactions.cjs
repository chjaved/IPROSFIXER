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
    const path = pathname.replace('/api/transactions', '')
    const sql = getDb()

    if (req.method === 'GET'  && (path === '' || path === '/'))  return await listTransactions(req, res, sql)
    if (req.method === 'GET'  && path === '/summary')            return await getSummary(req, res, sql)
    if (req.method === 'POST' && (path === '' || path === '/'))  return await createTransaction(req, res, sql)

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Transactions error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listTransactions(req, res, sql) {
  const userId = req.user.id
  const userType = req.user.type

  const transactions = userType === 'consumer'
    ? await sql`SELECT t.*, b.booking_number, s.name as service_name FROM transactions t LEFT JOIN bookings b ON t.booking_id=b.id LEFT JOIN services s ON b.service_id=s.id WHERE t.payer_id=${userId} ORDER BY t.created_at DESC`
    : await sql`SELECT t.*, b.booking_number, s.name as service_name, u.name as customer_name FROM transactions t LEFT JOIN bookings b ON t.booking_id=b.id LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON t.payer_id=u.id WHERE t.payee_id=${userId} ORDER BY t.created_at DESC`

  return res.json({ success: true, data: { transactions } })
}

async function getSummary(req, res, sql) {
  const userId = req.user.id
  const userType = req.user.type
  const days = req.query?.period === 'week' ? 7 : 30

  if (userType === 'professional') {
    const total  = await sql`SELECT COALESCE(SUM(amount),0) as total FROM transactions WHERE payee_id=${userId} AND status='completed'`
    const period = await sql`SELECT COALESCE(SUM(amount),0) as total, COUNT(*) as count FROM transactions WHERE payee_id=${userId} AND status='completed' AND created_at >= NOW() - (${days} || ' days')::interval`
    const daily  = await sql`SELECT DATE(created_at) as date, SUM(amount) as total FROM transactions WHERE payee_id=${userId} AND status='completed' AND created_at >= NOW() - (${days} || ' days')::interval GROUP BY DATE(created_at) ORDER BY date`
    return res.json({ success: true, data: {
      totalEarnings: parseFloat(total[0].total)||0,
      thisPeriod: { earnings: parseFloat(period[0].total)||0, jobs: parseInt(period[0].count)||0 },
      dailyBreakdown: daily
    }})
  } else {
    const total  = await sql`SELECT COALESCE(SUM(amount),0) as total FROM transactions WHERE payer_id=${userId} AND status='completed'`
    const period = await sql`SELECT COALESCE(SUM(amount),0) as total, COUNT(*) as count FROM transactions WHERE payer_id=${userId} AND status='completed' AND created_at >= NOW() - (${days} || ' days')::interval`
    return res.json({ success: true, data: {
      totalSpent: parseFloat(total[0].total)||0,
      thisPeriod: { spent: parseFloat(period[0].total)||0, bookings: parseInt(period[0].count)||0 }
    }})
  }
}

async function createTransaction(req, res, sql) {
  const userId = req.user.id
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
