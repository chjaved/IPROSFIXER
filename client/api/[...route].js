// Single catch-all serverless function — routes all /api/* requests internally
const { initTables } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')

const authHandler         = require('./lib/auth.js')
const usersHandler        = require('./lib/users.js')
const servicesHandler     = require('./lib/services.js')
const bookingsHandler     = require('./lib/bookings.js')
const notificationsHandler = require('./lib/notifications.js')
const conversationsHandler = require('./lib/conversations.js')
const adminHandler        = require('./lib/admin.js')
const dataHandler         = require('./lib/data.js')
const jobsHandler         = require('./lib/jobs.js')
const contactHandler      = require('./lib/contact.js')

let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

const rateLimitStore = new Map()
function checkRateLimit(key, max = 200) {
  const now = Date.now(); const win = now - 15 * 60 * 1000
  if (!rateLimitStore.has(key)) rateLimitStore.set(key, [])
  const reqs = rateLimitStore.get(key).filter(t => t > win)
  if (reqs.length >= max) return false
  reqs.push(now); rateLimitStore.set(key, reqs); return true
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Content-Type', 'application/json')
  const allowedOrigins = ['https://iprofixer.com.my', 'https://www.iprofixer.com.my', 'https://iprosfixer.vercel.app', 'http://localhost:5173', 'http://localhost:3000']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://iprofixer.com.my')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(`catchall:${clientIp}`, 300)) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  const url = req.url || ''

  // Health check — no auth needed
  if (url.includes('/health')) {
    return res.json({ success: true, message: 'iPROFIXER API running', timestamp: new Date().toISOString() })
  }

  // DB init
  try {
    await ensureTables()
  } catch (dbErr) {
    console.error('DB init error:', dbErr)
    return res.status(500).json({ success: false, message: 'Database connection failed: ' + dbErr.message })
  }

  // Public routes (no auth)
  if (url.includes('/api/auth'))     return authHandler(req, res)
  if (url.includes('/api/services')) return servicesHandler(req, res)
  if (url.includes('/api/contact') || url.includes('/api/join')) return contactHandler(req, res)

  // Auth-required routes
  const ok = await authMiddleware(req, res)
  if (!ok) return

  if (url.includes('/api/users'))          return usersHandler(req, res)
  if (url.includes('/api/notifications'))  return notificationsHandler(req, res)
  if (url.includes('/api/conversations'))  return conversationsHandler(req, res)
  if (url.includes('/api/admin'))          return adminHandler(req, res)
  if (url.includes('/api/bookings'))       return bookingsHandler(req, res)

  // data.js routes
  if (url.includes('/api/reviews'))        return dataHandler(req, res)
  if (url.includes('/api/transactions'))   return dataHandler(req, res)
  if (url.includes('/api/withdrawals'))    return dataHandler(req, res)
  if (url.includes('/api/disputes'))       return dataHandler(req, res)
  if (url.includes('/api/timeline'))       return dataHandler(req, res)

  // jobs.js routes
  if (url.includes('/api/booking-photos')) return jobsHandler(req, res)
  if (url.includes('/api/checklists'))     return jobsHandler(req, res)
  if (url.includes('/api/checklist-templates')) return jobsHandler(req, res)
  if (url.includes('/api/reschedule'))     return jobsHandler(req, res)

  return res.status(404).json({ success: false, message: 'API route not found: ' + url })
}
