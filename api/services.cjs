const { getDb } = require('./_db.cjs')

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { pathname } = new URL(req.url, `http://${req.headers.host}`)
  const path = pathname.replace('/api/services', '')

  try {
    const db = getDb()

    // GET /api/services - List all services
    if (path === '' || path === '/') {
      return await listServices(req, res, db)
    }

    // GET /api/services/:slug - Get service details
    const slug = path.replace('/', '')
    return await getServiceDetails(req, res, db, slug)

  } catch (err) {
    console.error('Services API error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// List all services
async function listServices(req, res, db) {
  const { category, active } = req.query || {}

  let query = 'SELECT * FROM services WHERE 1=1'
  const params = []

  if (category) {
    query += ' AND category = ?'
    params.push(category)
  }

  if (active === 'true') {
    query += ' AND is_active = TRUE'
  }

  query += ' ORDER BY category, name'

  const services = db.prepare(query).all(...params)

  // Group by category
  const grouped = services.reduce((acc, service) => {
    const cat = service.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push({
      ...service,
      features: JSON.parse(service.features || '[]')
    })
    return acc
  }, {})

  return res.json({
    success: true,
    data: {
      categories: Object.keys(grouped),
      services: grouped,
      all: services.map(s => ({
        ...s,
        features: JSON.parse(s.features || '[]')
      }))
    }
  })
}

// Get service details
async function getServiceDetails(req, res, db, slug) {
  const service = db.prepare('SELECT * FROM services WHERE slug = ?').get(slug)

  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' })
  }

  // Get professionals offering this service
  const professionals = db.prepare(`
    SELECT u.id, u.name, pp.rating, pp.total_jobs, pp.areas
    FROM users u
    JOIN professional_profiles pp ON u.id = pp.user_id
    WHERE u.type = 'professional' 
    AND u.status = 'active'
    AND pp.service_types LIKE ?
    ORDER BY pp.rating DESC
    LIMIT 5
  `).all(`%${service.name}%`)

  return res.json({
    success: true,
    data: {
      service: {
        ...service,
        features: JSON.parse(service.features || '[]')
      },
      professionals: professionals.map(p => ({
        ...p,
        areas: JSON.parse(p.areas || '[]')
      }))
    }
  })
}
