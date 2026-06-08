const { getDb, generateId, sanitizeUser, checkEnvVars } = require('../_db.js')
const { hashPassword, verifyPassword, generateToken, authMiddleware } = require('../_auth.js')

const validators = {
  email: (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
  password: (p) => p && p.length >= 8,
  name: (n) => n && n.length >= 2 && n.length <= 100,
}

module.exports = async function authHandler(req, res) {
  const url = req.url || ''

  if (req.method === 'GET' && url.includes('/health')) {
    const envStatus = checkEnvVars()
    return res.json({ success: true, message: 'iPROFIXER API running', env: envStatus, timestamp: new Date().toISOString() })
  }

  const action = url.includes('/register-pro') ? 'register-pro'
    : url.includes('/register') ? 'register'
    : url.includes('/login')    ? 'login'
    : url.includes('/verify')   ? 'verify'
    : (req.query && req.query.action) ? req.query.action
    : null

  if (req.method === 'POST' && action === 'register')     return await handleRegister(req, res)
  if (req.method === 'POST' && action === 'register-pro') return await handleRegisterPro(req, res)
  if (req.method === 'POST' && action === 'login')        return await handleLogin(req, res)
  if (req.method === 'GET'  && action === 'verify') {
    const ok = await authMiddleware(req, res)
    if (!ok) return
    return res.json({ success: true, user: sanitizeUser(req.user) })
  }

  return res.status(404).json({ success: false, message: 'Auth route not found: ' + url })
}

async function handleRegister(req, res) {
  const { email, password, name, phone } = req.body || {}
  if (!email || !password || !name) return res.status(400).json({ success: false, message: 'Email, password, and name are required' })
  if (!validators.email(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email address' })
  if (!validators.password(password)) return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' })
  if (!validators.name(name)) return res.status(400).json({ success: false, message: 'Name must be 2-100 characters' })
  const sql = getDb()
  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length > 0) return res.status(409).json({ success: false, message: 'Email already registered' })
  const userId = generateId()
  const passwordHash = await hashPassword(password)
  await sql`INSERT INTO users (id, email, password_hash, name, phone, type) VALUES (${userId}, ${email}, ${passwordHash}, ${name}, ${phone || null}, 'consumer')`
  await sql`INSERT INTO consumer_profiles (id, user_id) VALUES (${generateId()}, ${userId})`
  const token = generateToken({ id: userId, email, name, type: 'consumer' })
  return res.status(201).json({ success: true, message: 'Account created successfully', token, user: sanitizeUser({ id: userId, email, name, phone: phone || '', type: 'consumer', role: 'consumer' }) })
}

async function handleRegisterPro(req, res) {
  const { email, password, name, phone, whatsapp, service_category, coverage_area, years_of_experience } = req.body || {}
  if (!email || !password || !name) return res.status(400).json({ success: false, message: 'Email, password, and name are required' })
  if (!validators.email(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email address' })
  if (!validators.password(password)) return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' })
  const sql = getDb()
  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length > 0) return res.status(409).json({ success: false, message: 'Email already registered' })
  const userId = generateId()
  const passwordHash = await hashPassword(password)
  await sql`INSERT INTO users (id, email, password_hash, name, phone, whatsapp, type) VALUES (${userId}, ${email}, ${passwordHash}, ${name}, ${phone || null}, ${whatsapp || null}, 'professional')`
  await sql`INSERT INTO professional_profiles (id, user_id, service_category, coverage_area, experience_years) VALUES (${generateId()}, ${userId}, ${service_category || null}, ${coverage_area || null}, ${parseInt(years_of_experience) || 0})`
  const token = generateToken({ id: userId, email, name, type: 'professional' })
  return res.status(201).json({ success: true, message: 'Professional account created successfully', token, user: sanitizeUser({ id: userId, email, name, phone: phone || '', type: 'professional', role: 'professional' }) })
}

async function handleLogin(req, res) {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' })
  const sql = getDb()
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`
  const user = rows[0]
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' })
  const isValid = await verifyPassword(password, user.password_hash)
  if (!isValid) return res.status(401).json({ success: false, message: 'Invalid credentials' })
  if (user.status !== 'active') return res.status(403).json({ success: false, message: 'Account is not active' })
  const token = generateToken({ id: user.id, email: user.email, name: user.name, type: user.type })
  return res.json({ success: true, message: 'Login successful', token, user: sanitizeUser(user) })
}
