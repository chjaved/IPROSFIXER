const { getDb, initTables } = require('./_db.js')

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
  res.setHeader('Content-Type', 'application/json')
  const allowedOrigins = ['https://iprofixer.com.my', 'https://www.iprofixer.com.my', 'https://iprosfixer.vercel.app']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()
  
  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const rateLimit = checkRateLimit(`services:${clientIp}`, 100)
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  const url = req.url || ''

  // Health check endpoint
  if (url === '/api/health' || url.includes('/health')) {
    return res.status(200).json({ success: true, message: 'iPROFIXER API running', timestamp: new Date().toISOString() })
  }

  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    try {
      await ensureTables()
    } catch (dbErr) {
      console.error('DB init error:', dbErr)
      return res.status(500).json({ success: false, message: 'Database connection failed: ' + dbErr.message })
    }
    const sql = getDb()
    const url = req.url || ''
    // Strip query string then check if there's a slug after /services/
    const slugMatch = url.replace(/\?.*$/, '').match(/\/services\/([\w-]+)$/)
    const slug = slugMatch ? slugMatch[1] : null

    if (!slug) {
      const { category } = req.query || {}
      const services = category
        ? await sql`SELECT * FROM services WHERE is_active=TRUE AND category=${category} ORDER BY name`
        : await sql`SELECT * FROM services WHERE is_active=TRUE ORDER BY category, name`

      const parsed = services.map(s => ({
        ...s,
        features: (() => { try { return JSON.parse(s.features || '[]') } catch { return [] } })()
      }))

      // Cache services list for 1 hour since it rarely changes
      res.setHeader('Cache-Control', 'public, max-age=3600')
      // Flutter BookingProvider reads data.services[] OR data.data[] — provide both
      return res.json({ success: true, data: { services: parsed, all: parsed } })
    }

    // GET /api/services/:slug
    const rows = await sql`SELECT * FROM services WHERE slug=${slug} AND is_active=TRUE`
    if (!rows.length) return res.status(404).json({ success: false, message: 'Service not found' })
    const svc = rows[0]
    return res.json({ success: true, data: { service: { ...svc, features: (() => { try { return JSON.parse(svc.features||'[]') } catch { return [] } })() } } })

  } catch (err) {
    console.error('Services error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}
