const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()
  
  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const rateLimit = checkRateLimit(`notifications:${clientIp}`, 100)
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

    // Extract notification ID if present: /api/notifications/some-id
    const notificationIdMatch = url.replace(/\?.*$/, '').match(/\/notifications\/([\w-]+)$/)
    const notificationId = notificationIdMatch ? notificationIdMatch[1] : null

    // Check for /read-all endpoint
    const isReadAll = url.replace(/\?.*$/, '').match(/\/notifications\/read-all$/)

    if (req.method === 'GET' && !notificationId && !isReadAll) return await listNotifications(req, res, sql, userId)
    if (req.method === 'PUT' && notificationId && !isReadAll) return await markAsRead(req, res, sql, notificationId, userId)
    if (req.method === 'PUT' && isReadAll) return await markAllAsRead(req, res, sql, userId)

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Notifications error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listNotifications(req, res, sql, userId) {
  const notifications = await sql`
    SELECT * FROM notifications 
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 50
  `

  const unreadCount = await sql`
    SELECT COUNT(*) as count FROM notifications 
    WHERE user_id = ${userId} AND is_read = FALSE
  `

  return res.json({ 
    success: true, 
    notifications, 
    unread_count: unreadCount[0]?.count || 0 
  })
}

async function markAsRead(req, res, sql, notificationId, userId) {
  const notification = await sql`SELECT * FROM notifications WHERE id = ${notificationId}`
  if (!notification.length) {
    return res.status(404).json({ success: false, message: 'Notification not found' })
  }

  const n = notification[0]

  // Security: User can only mark own notifications as read
  if (n.user_id !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  await sql`UPDATE notifications SET is_read = TRUE WHERE id = ${notificationId}`

  return res.json({ success: true, message: 'Notification marked as read' })
}

async function markAllAsRead(req, res, sql, userId) {
  await sql`UPDATE notifications SET is_read = TRUE WHERE user_id = ${userId} AND is_read = FALSE`

  return res.json({ success: true, message: 'All notifications marked as read' })
}

// Helper function to create notifications
async function createNotification({ user_id, type, title, body, data }) {
  const sql = getDb()
  const notificationId = generateId()
  
  await sql`
    INSERT INTO notifications (id, user_id, type, title, body, data)
    VALUES (${notificationId}, ${user_id}, ${type}, ${title}, ${body}, ${data})
  `
  
  return notificationId
}

module.exports.createNotification = createNotification
