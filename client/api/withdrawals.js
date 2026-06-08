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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()

  await ensureTables()
  const sql = getDb()
  const url = new URL(req.url, `http://${req.headers.host}`).pathname

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress
  if (!checkRateLimit(`withdrawals:${clientIp}`, 50, 15 * 60 * 1000)) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  try {
    // GET /api/withdrawals/summary - Get withdrawal summary for professional
    if (req.method === 'GET' && url.includes('/summary')) {
      if (!(await authMiddleware(req, res))) return;

      const userId = req.user.id

      const earned = await sql`
        SELECT COALESCE(SUM(amount), 0) as total 
        FROM transactions 
        WHERE payee_id = ${userId} AND status = 'completed'
      `
      const pending = await sql`
        SELECT COALESCE(SUM(amount), 0) as total 
        FROM withdrawals 
        WHERE professional_id = ${userId} AND status = 'pending'
      `
      const approved = await sql`
        SELECT COALESCE(SUM(amount), 0) as total 
        FROM withdrawals 
        WHERE professional_id = ${userId} AND status IN ('approved', 'paid')
      `
      const withdrawn = await sql`
        SELECT COALESCE(SUM(amount), 0) as total 
        FROM withdrawals 
        WHERE professional_id = ${userId} AND status IN ('pending', 'approved', 'paid')
      `

      const totalEarned = parseFloat(earned[0].total) || 0
      const totalWithdrawn = parseFloat(withdrawn[0].total) || 0
      const availableBalance = totalEarned - totalWithdrawn

      return res.json({
        success: true,
        summary: {
          availableBalance: Math.max(0, availableBalance),
          totalEarned,
          pendingAmount: parseFloat(pending[0].total) || 0,
          paidAmount: parseFloat(approved[0].total) || 0,
        }
      })
    }

    // POST /api/withdrawals - Create withdrawal request
    if (req.method === 'POST' && url.includes('/withdrawals') && !url.includes('/summary')) {
      if (!(await authMiddleware(req, res))) return;

      const { amount, method, account_name, account_number, bank_name } = req.body || {}
      const userId = req.user.id

      if (!amount || !method || !account_name || !account_number) {
        return res.status(400).json({ success: false, message: 'amount, method, account_name, and account_number are required' })
      }

      if (req.user.type !== 'professional') {
        return res.status(403).json({ success: false, message: 'Only professionals can request withdrawals' })
      }

      if (amount <= 0) {
        return res.status(400).json({ success: false, message: 'Amount must be greater than 0' })
      }

      // Check available balance (sum of completed transactions)
      const balance = await sql`
        SELECT COALESCE(SUM(amount), 0) as total 
        FROM transactions 
        WHERE payee_id = ${userId} AND status = 'completed'
      `
      
      const withdrawn = await sql`
        SELECT COALESCE(SUM(amount), 0) as total 
        FROM withdrawals 
        WHERE professional_id = ${userId} AND status IN ('pending', 'approved', 'paid')
      `

      const availableBalance = parseFloat(balance[0].total) - parseFloat(withdrawn[0].total)
      
      if (amount > availableBalance) {
        return res.status(400).json({ success: false, message: `Insufficient balance. Available: RM ${availableBalance.toFixed(2)}` })
      }

      const withdrawalId = generateId()
      await sql`
        INSERT INTO withdrawals (id, professional_id, amount, method, account_name, account_number, bank_name, status)
        VALUES (${withdrawalId}, ${userId}, ${amount}, ${method}, ${account_name}, ${account_number}, ${bank_name || null}, 'pending')
      `

      // Notify admin of new withdrawal request
      const admins = await sql`SELECT id FROM users WHERE type = 'admin' AND status = 'active'`
      for (const admin of admins) {
        await createNotification({
          user_id: admin.id,
          type: 'new_withdrawal',
          title: 'New Withdrawal Request',
          body: `Withdrawal request of RM ${amount} from professional ${req.user.name}`,
          data: JSON.stringify({ withdrawal_id: withdrawalId, professional_id: userId, amount })
        })
      }

      const newWithdrawal = await sql`SELECT * FROM withdrawals WHERE id = ${withdrawalId}`
      return res.status(201).json({ success: true, withdrawal: newWithdrawal[0] })
    }

    // GET /api/withdrawals - Get user's withdrawals
    if (req.method === 'GET' && !url.includes('/summary')) {
      if (!(await authMiddleware(req, res))) return;

      const userId = req.user.id
      const withdrawals = await sql`
        SELECT * FROM withdrawals 
        WHERE professional_id = ${userId}
        ORDER BY created_at DESC
      `
      return res.json({ success: true, withdrawals })
    }

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Withdrawals error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}
