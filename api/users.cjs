const { getDb, initTables, generateId } = require('./_db.cjs')
const { authMiddleware } = require('./_auth.cjs')

let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    try {
      await ensureTables()
    } catch (dbErr) {
      console.error('DB init error:', dbErr)
      return res.status(500).json({ success: false, message: 'Database connection failed: ' + dbErr.message })
    }
    const ok = await authMiddleware(req, res)
    if (!ok) return

    const { pathname } = new URL(req.url, `http://${req.headers.host}`)
    const path = pathname.replace('/api/users', '')
    const sql = getDb()

    if (req.method === 'GET' && path === '/me')           return await getMyProfile(req, res, sql)
    if (req.method === 'PUT' && path === '/me')           return await updateMyProfile(req, res, sql)
    if (req.method === 'GET' && path === '/me/dashboard') return await getDashboardStats(req, res, sql)
    if (req.method === 'GET' && path === '/professionals') return await listProfessionals(req, res, sql)

    return res.status(404).json({ success: false, message: 'Endpoint not found' })
  } catch (err) {
    console.error('Users API error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function getMyProfile(req, res, sql) {
  const userId = req.user.id
  const rows = await sql`SELECT id, email, name, phone, whatsapp, type, created_at FROM users WHERE id = ${userId}`
  const user = rows[0]
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })

  const base = { ...user, role: user.type }

  if (user.type === 'professional') {
    const pp = await sql`SELECT * FROM professional_profiles WHERE user_id = ${userId}`
    return res.json({ success: true, user: { ...base, professional_profile: pp[0] || {} } })
  }
  return res.json({ success: true, user: base })
}

async function updateMyProfile(req, res, sql) {
  const userId = req.user.id
  const { name, phone, whatsapp, address, city, postcode, service_category, coverage_area, bio, experience_years } = req.body || {}

  if (name)     await sql`UPDATE users SET name = ${name}, updated_at = NOW() WHERE id = ${userId}`
  if (phone)    await sql`UPDATE users SET phone = ${phone}, updated_at = NOW() WHERE id = ${userId}`
  if (whatsapp) await sql`UPDATE users SET whatsapp = ${whatsapp}, updated_at = NOW() WHERE id = ${userId}`

  if (req.user.type === 'professional') {
    if (service_category) await sql`UPDATE professional_profiles SET service_category = ${service_category}, updated_at = NOW() WHERE user_id = ${userId}`
    if (coverage_area)    await sql`UPDATE professional_profiles SET coverage_area = ${coverage_area}, updated_at = NOW() WHERE user_id = ${userId}`
    if (bio != null)      await sql`UPDATE professional_profiles SET bio = ${bio}, updated_at = NOW() WHERE user_id = ${userId}`
    if (experience_years != null) await sql`UPDATE professional_profiles SET experience_years = ${experience_years}, updated_at = NOW() WHERE user_id = ${userId}`
  }

  const rows = await sql`SELECT id, email, name, phone, whatsapp, type FROM users WHERE id = ${userId}`
  const u = rows[0]
  return res.json({ success: true, message: 'Profile updated successfully', user: { ...u, role: u.type } })
}

async function getDashboardStats(req, res, sql) {
  const userId = req.user.id
  const userType = req.user.type

  if (userType === 'consumer') {
    const stats = await sql`
      SELECT COUNT(*) as total_bookings,
        SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed_bookings,
        SUM(CASE WHEN status IN ('pending','confirmed') THEN 1 ELSE 0 END) as upcoming_bookings,
        SUM(CASE WHEN status='completed' THEN price ELSE 0 END) as total_spent
      FROM bookings WHERE consumer_id = ${userId}
    `
    const recentBookings = await sql`
      SELECT b.*, s.name as service_name, u.name as professional_name
      FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id
      WHERE b.consumer_id = ${userId} ORDER BY b.created_at DESC LIMIT 5
    `
    const s = stats[0]
    return res.json({ success: true, data: {
      stats: { totalBookings: parseInt(s.total_bookings)||0, completedBookings: parseInt(s.completed_bookings)||0,
        upcomingBookings: parseInt(s.upcoming_bookings)||0, totalSpent: parseFloat(s.total_spent)||0 },
      recentBookings
    }})
  } else {
    const stats = await sql`
      SELECT COUNT(*) as total_jobs,
        SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed_jobs,
        SUM(CASE WHEN status IN ('pending','confirmed') THEN 1 ELSE 0 END) as pending_jobs,
        SUM(CASE WHEN status='completed' THEN price ELSE 0 END) as total_earnings
      FROM bookings WHERE professional_id = ${userId}
    `
    const recentJobs = await sql`
      SELECT b.*, s.name as service_name, u.name as customer_name
      FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id
      WHERE b.professional_id = ${userId} ORDER BY b.created_at DESC LIMIT 5
    `
    const avgRating = await sql`SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM reviews WHERE professional_id = ${userId}`
    const s = stats[0]; const r = avgRating[0]
    return res.json({ success: true, data: {
      stats: { totalJobs: parseInt(s.total_jobs)||0, completedJobs: parseInt(s.completed_jobs)||0,
        pendingJobs: parseInt(s.pending_jobs)||0, totalEarnings: parseFloat(s.total_earnings)||0,
        rating: Math.round((parseFloat(r.avg_rating)||0)*10)/10, totalReviews: parseInt(r.total_reviews)||0 },
      recentJobs
    }})
  }
}

async function listProfessionals(req, res, sql) {
  const rows = await sql`
    SELECT u.id, u.name, u.phone, pp.service_category, pp.coverage_area, pp.experience_years, pp.rating, pp.total_jobs, pp.is_available
    FROM users u JOIN professional_profiles pp ON u.id=pp.user_id
    WHERE u.type='professional' AND u.status='active' ORDER BY pp.rating DESC
  `
  return res.json({ success: true, data: rows })
}
