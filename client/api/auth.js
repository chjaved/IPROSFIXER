const { getDb, initTables, generateId, sanitizeUser } = require('./_db.js')
const { hashPassword, verifyPassword, generateToken, authMiddleware } = require('./_auth.js')

let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

// Rate limiting store (in-memory)
const rateLimitStore = new Map()

// Rate limiter function
function checkRateLimit(key, maxRequests = 100, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const windowStart = now - windowMs
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, [])
  }
  
  const requests = rateLimitStore.get(key).filter(time => time > windowStart)
  
  if (requests.length >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((requests[0] + windowMs - now) / 1000) }
  }
  
  requests.push(now)
  rateLimitStore.set(key, requests)
  return { allowed: true }
}

// Input validation helpers
const validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  password: (pwd) => pwd && pwd.length >= 8,
  name: (name) => name && name.length >= 2 && name.length <= 100,
  phone: (phone) => /^\d{10,12}$/.test(phone),
  whatsapp: (wa) => /^\d{10,12}$/.test(wa)
}

// Security headers
function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
}

module.exports = async function handler(req, res) {
  // Set CORS headers - allow production domains
  res.setHeader('Content-Type', 'application/json')
  const allowedOrigins = [
    'https://iprofixer.com.my',
    'https://www.iprofixer.com.my', 
    'https://iprosfixer.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ]
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    // Fallback for cPanel/production
    res.setHeader('Access-Control-Allow-Origin', 'https://iprofixer.com.my')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  console.log(`[AUTH] ${req.method} ${req.url} - Origin: ${origin || 'none'}`)
  
  if (req.method === 'OPTIONS') return res.status(200).end()
  
  // Check rate limit for this endpoint
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const rateLimitKey = `auth:${clientIp}`
  const rateLimit = checkRateLimit(rateLimitKey, 10, 15 * 60 * 1000) // 10 requests per 15 min for auth
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' })
  }

  try {
    try {
      await ensureTables()
    } catch (dbErr) {
      console.error('DB init error:', dbErr)
      return res.status(500).json({ success: false, message: 'Database connection failed: ' + dbErr.message })
    }

    const url = req.url || ''
    const action = url.includes('/register-pro') ? 'register-pro'
      : url.includes('/register')               ? 'register'
      : url.includes('/login')                  ? 'login'
      : url.includes('/verify')                 ? 'verify'
      : (req.query && req.query.action)         ? req.query.action
      : null

    if (req.method === 'POST' && action === 'register')     return await handleRegister(req, res)
    if (req.method === 'POST' && action === 'register-pro') return await handleRegisterPro(req, res)
    if (req.method === 'POST' && action === 'login')        return await handleLogin(req, res)
    if (req.method === 'GET'  && action === 'verify') {
      const ok = await authMiddleware(req, res)
      if (!ok) return
      return res.json({ success: true, user: sanitizeUser(req.user) })
    }

    return res.status(404).json({ success: false, message: 'Route not found: ' + url })
  } catch (err) {
    console.error('Auth error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}


async function handleRegister(req, res) {
  const { email, password, name, phone } = req.body || {}
  console.log('[AUTH] Register attempt:', { email, name, phone })
  
  // Input validation
  if (!email || !password || !name) {
    console.log('[AUTH] Validation failed: missing fields')
    return res.status(400).json({ success: false, message: 'Email, password, and name are required' })
  }
  if (!validators.email(email)) {
    console.log('[AUTH] Validation failed: invalid email')
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' })
  }
  if (!validators.password(password)) {
    console.log('[AUTH] Validation failed: password too short')
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' })
  }
  if (!validators.name(name)) {
    console.log('[AUTH] Validation failed: name invalid')
    return res.status(400).json({ success: false, message: 'Name must be 2-100 characters' })
  }

  const sql = getDb()
  console.log('[AUTH] DB connection established')
  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length > 0)
    return res.status(409).json({ success: false, message: 'Email already registered' })

  const userId = generateId()
  const passwordHash = await hashPassword(password)
  await sql`INSERT INTO users (id, email, password_hash, name, phone, type) VALUES (${userId}, ${email}, ${passwordHash}, ${name}, ${phone || null}, 'consumer')`
  await sql`INSERT INTO consumer_profiles (id, user_id) VALUES (${generateId()}, ${userId})`

  const token = generateToken({ id: userId, email, name, type: 'consumer' })
  return res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: sanitizeUser({ id: userId, email, name, phone: phone || '', type: 'consumer', role: 'consumer' })
  })
}

async function handleRegisterPro(req, res) {
  const { email, password, name, phone, whatsapp, service_category, coverage_area, years_of_experience } = req.body || {}
  
  // Input validation
  if (!email || !password || !name)
    return res.status(400).json({ success: false, message: 'Email, password, and name are required' })
  if (!validators.email(email))
    return res.status(400).json({ success: false, message: 'Please enter a valid email address' })
  if (!validators.password(password))
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' })
  if (!validators.name(name))
    return res.status(400).json({ success: false, message: 'Name must be 2-100 characters' })

  const sql = getDb()
  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length > 0)
    return res.status(409).json({ success: false, message: 'Email already registered' })

  const userId = generateId()
  const passwordHash = await hashPassword(password)
  await sql`INSERT INTO users (id, email, password_hash, name, phone, whatsapp, type) VALUES (${userId}, ${email}, ${passwordHash}, ${name}, ${phone || null}, ${whatsapp || null}, 'professional')`
  await sql`
    INSERT INTO professional_profiles (id, user_id, service_category, coverage_area, experience_years)
    VALUES (${generateId()}, ${userId}, ${service_category || null}, ${coverage_area || null}, ${parseInt(years_of_experience) || 0})
  `

  const token = generateToken({ id: userId, email, name, type: 'professional' })
  return res.status(201).json({
    success: true,
    message: 'Professional account created successfully',
    token,
    user: sanitizeUser({ id: userId, email, name, phone: phone || '', type: 'professional', role: 'professional' })
  })
}

async function handleLogin(req, res) {
  const { email, password } = req.body || {}
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required' })

  const sql = getDb()
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`
  const user = rows[0]
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' })

  const isValid = await verifyPassword(password, user.password_hash)
  if (!isValid) return res.status(401).json({ success: false, message: 'Invalid credentials' })
  if (user.status !== 'active') return res.status(403).json({ success: false, message: 'Account is not active' })

  const token = generateToken({ id: user.id, email: user.email, name: user.name, type: user.type })
  return res.json({
    success: true,
    message: 'Login successful',
    token,
    user: sanitizeUser(user)
  })
}
