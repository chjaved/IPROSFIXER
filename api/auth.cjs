const { getDb, initTables, generateId } = require('./_db.cjs')
const { hashPassword, verifyPassword, generateToken, authMiddleware } = require('./_auth.cjs')

let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    await ensureTables()
    const { pathname } = new URL(req.url, `http://${req.headers.host}`)
    const action = pathname.replace('/api/auth', '').replace(/^\//, '') || req.query.action || ''

    if (req.method === 'POST') {
      if (action === 'register')     return await handleRegister(req, res)
      if (action === 'register-pro') return await handleRegisterPro(req, res)
      if (action === 'login')        return await handleLogin(req, res)
    }
    if (req.method === 'GET' && action === 'verify') {
      const ok = await authMiddleware(req, res)
      if (!ok) return
      return res.json({ success: true, user: safeUser(req.user) })
    }
    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Auth error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

function safeUser(u) {
  return { id: u.id, email: u.email, name: u.name, phone: u.phone || '', type: u.type }
}

async function handleRegister(req, res) {
  const { email, password, name, phone } = req.body || {}
  if (!email || !password || !name)
    return res.status(400).json({ success: false, message: 'Email, password, and name are required' })
  if (password.length < 6)
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })

  const sql = getDb()
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
    user: { id: userId, email, name, phone: phone || '', type: 'consumer' }
  })
}

async function handleRegisterPro(req, res) {
  const { email, password, name, phone, whatsapp, service_category, coverage_area, years_of_experience } = req.body || {}
  if (!email || !password || !name)
    return res.status(400).json({ success: false, message: 'Email, password, and name are required' })
  if (password.length < 6)
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })

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
    user: { id: userId, email, name, phone: phone || '', type: 'professional' }
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
    user: safeUser(user)
  })
}
