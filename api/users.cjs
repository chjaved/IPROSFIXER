const { getDb, generateId } = require('./_db.cjs')
const { authMiddleware, requireRole } = require('./_auth.cjs')

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Apply auth middleware
  const next = () => handleRequest(req, res)
  authMiddleware(req, res, next)
}

async function handleRequest(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`)
  const path = pathname.replace('/api/users', '')

  try {
    const db = getDb()

    // GET /api/users/me - Get current user profile
    if (req.method === 'GET' && path === '/me') {
      return await getMyProfile(req, res, db)
    }

    // PUT /api/users/me - Update current user profile
    if (req.method === 'PUT' && path === '/me') {
      return await updateMyProfile(req, res, db)
    }

    // GET /api/users/me/dashboard - Get dashboard stats
    if (req.method === 'GET' && path === '/me/dashboard') {
      return await getDashboardStats(req, res, db)
    }

    // GET /api/users/professionals - List professionals (for consumers)
    if (req.method === 'GET' && path === '/professionals') {
      return await listProfessionals(req, res, db)
    }

    // GET /api/users/professionals/:id - Get professional details
    if (req.method === 'GET' && path.startsWith('/professionals/')) {
      const id = path.replace('/professionals/', '')
      return await getProfessionalDetails(req, res, db, id)
    }

    return res.status(404).json({ success: false, message: 'Endpoint not found' })
  } catch (err) {
    console.error('Users API error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// Get current user profile
async function getMyProfile(req, res, db) {
  const userId = req.user.id
  const userType = req.user.type

  // Get base user info
  const user = db.prepare('SELECT id, email, name, phone, type, created_at FROM users WHERE id = ?').get(userId)

  if (userType === 'consumer') {
    const profile = db.prepare('SELECT * FROM consumer_profiles WHERE user_id = ?').get(userId)
    return res.json({
      success: true,
      data: {
        ...user,
        profile: {
          ...profile,
          addresses: JSON.parse(profile.addresses || '[]'),
          preferred_services: JSON.parse(profile.preferred_services || '[]')
        }
      }
    })
  } else {
    const profile = db.prepare('SELECT * FROM professional_profiles WHERE user_id = ?').get(userId)
    return res.json({
      success: true,
      data: {
        ...user,
        profile: {
          ...profile,
          service_types: JSON.parse(profile.service_types || '[]'),
          areas: JSON.parse(profile.areas || '[]'),
          documents: JSON.parse(profile.documents || '[]')
        }
      }
    })
  }
}

// Update current user profile
async function updateMyProfile(req, res, db) {
  const userId = req.user.id
  const userType = req.user.type
  const updates = req.body || {}

  // Update base user info
  const allowedUserFields = ['name', 'phone']
  const userUpdates = {}
  
  for (const field of allowedUserFields) {
    if (updates[field] !== undefined) {
      userUpdates[field] = updates[field]
    }
  }

  if (Object.keys(userUpdates).length > 0) {
    const setClause = Object.keys(userUpdates).map(k => `${k} = ?`).join(', ')
    const values = [...Object.values(userUpdates), userId]
    db.prepare(`UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values)
  }

  // Update profile-specific info
  if (userType === 'consumer') {
    const allowedProfileFields = ['addresses', 'preferred_services']
    const profileUpdates = {}
    
    for (const field of allowedProfileFields) {
      if (updates[field] !== undefined) {
        profileUpdates[field] = JSON.stringify(updates[field])
      }
    }

    if (Object.keys(profileUpdates).length > 0) {
      const setClause = Object.keys(profileUpdates).map(k => `${k} = ?`).join(', ')
      const values = [...Object.values(profileUpdates), userId]
      db.prepare(`UPDATE consumer_profiles SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`).run(...values)
    }
  } else {
    const allowedProfileFields = ['service_types', 'areas', 'experience_years', 'bio', 'documents']
    const profileUpdates = {}
    
    for (const field of allowedProfileFields) {
      if (updates[field] !== undefined) {
        profileUpdates[field] = Array.isArray(updates[field]) ? JSON.stringify(updates[field]) : updates[field]
      }
    }

    if (Object.keys(profileUpdates).length > 0) {
      const setClause = Object.keys(profileUpdates).map(k => `${k} = ?`).join(', ')
      const values = [...Object.values(profileUpdates), userId]
      db.prepare(`UPDATE professional_profiles SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`).run(...values)
    }
  }

  return res.json({
    success: true,
    message: 'Profile updated successfully'
  })
}

// Get dashboard stats
async function getDashboardStats(req, res, db) {
  const userId = req.user.id
  const userType = req.user.type

  if (userType === 'consumer') {
    // Consumer stats
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_bookings,
        SUM(CASE WHEN status IN ('pending', 'confirmed') THEN 1 ELSE 0 END) as upcoming_bookings,
        SUM(CASE WHEN status = 'completed' THEN price ELSE 0 END) as total_spent
      FROM bookings 
      WHERE consumer_id = ?
    `).get(userId)

    const recentBookings = db.prepare(`
      SELECT b.*, s.name as service_name, u.name as professional_name
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON b.professional_id = u.id
      WHERE b.consumer_id = ?
      ORDER BY b.created_at DESC
      LIMIT 5
    `).all(userId)

    return res.json({
      success: true,
      data: {
        stats: {
          totalBookings: stats.total_bookings || 0,
          completedBookings: stats.completed_bookings || 0,
          upcomingBookings: stats.upcoming_bookings || 0,
          totalSpent: stats.total_spent || 0
        },
        recentBookings
      }
    })
  } else {
    // Professional stats
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_jobs,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_jobs,
        SUM(CASE WHEN status IN ('pending', 'confirmed') THEN 1 ELSE 0 END) as pending_jobs,
        SUM(CASE WHEN status = 'completed' THEN price ELSE 0 END) as total_earnings
      FROM bookings 
      WHERE professional_id = ?
    `).get(userId)

    const recentJobs = db.prepare(`
      SELECT b.*, s.name as service_name, u.name as customer_name
      FROM bookings b
      LEFT JOIN services s ON b.service_id = s.id
      LEFT JOIN users u ON b.consumer_id = u.id
      WHERE b.professional_id = ?
      ORDER BY b.created_at DESC
      LIMIT 5
    `).all(userId)

    const avgRating = db.prepare(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews
      FROM reviews 
      WHERE professional_id = ?
    `).get(userId)

    return res.json({
      success: true,
      data: {
        stats: {
          totalJobs: stats.total_jobs || 0,
          completedJobs: stats.completed_jobs || 0,
          pendingJobs: stats.pending_jobs || 0,
          totalEarnings: stats.total_earnings || 0,
          rating: Math.round((avgRating.avg_rating || 0) * 10) / 10,
          totalReviews: avgRating.total_reviews || 0
        },
        recentJobs
      }
    })
  }
}

// List professionals (for consumers to browse)
async function listProfessionals(req, res, db) {
  const { service, area, minRating } = req.query || {}

  let query = `
    SELECT 
      u.id, u.name, u.phone,
      pp.service_types, pp.areas, pp.experience_years, pp.rating, pp.total_jobs, pp.bio,
      AVG(r.rating) as avg_rating,
      COUNT(r.id) as review_count
    FROM users u
    JOIN professional_profiles pp ON u.id = pp.user_id
    LEFT JOIN reviews r ON u.id = r.professional_id
    WHERE u.type = 'professional' AND u.status = 'active'
  `

  const params = []

  if (service) {
    query += ` AND pp.service_types LIKE ?`
    params.push(`%${service}%`)
  }

  if (area) {
    query += ` AND pp.areas LIKE ?`
    params.push(`%${area}%`)
  }

  query += ` GROUP BY u.id`

  if (minRating) {
    query += ` HAVING avg_rating >= ?`
    params.push(parseFloat(minRating))
  }

  query += ` ORDER BY pp.rating DESC, pp.total_jobs DESC`

  const professionals = db.prepare(query).all(...params)

  // Parse JSON fields
  const formatted = professionals.map(p => ({
    ...p,
    service_types: JSON.parse(p.service_types || '[]'),
    areas: JSON.parse(p.areas || '[]'),
    rating: p.avg_rating || p.rating || 0,
    review_count: p.review_count || 0
  }))

  return res.json({
    success: true,
    data: formatted
  })
}

// Get professional details
async function getProfessionalDetails(req, res, db, id) {
  const professional = db.prepare(`
    SELECT 
      u.id, u.name, u.phone, u.created_at,
      pp.service_types, pp.areas, pp.experience_years, pp.rating, pp.total_jobs, pp.bio,
      pp.id_verified, pp.background_checked
    FROM users u
    JOIN professional_profiles pp ON u.id = pp.user_id
    WHERE u.id = ? AND u.type = 'professional'
  `).get(id)

  if (!professional) {
    return res.status(404).json({ success: false, message: 'Professional not found' })
  }

  // Get reviews
  const reviews = db.prepare(`
    SELECT r.*, u.name as reviewer_name
    FROM reviews r
    JOIN users u ON r.consumer_id = u.id
    WHERE r.professional_id = ? AND r.is_public = TRUE
    ORDER BY r.created_at DESC
    LIMIT 10
  `).all(id)

  return res.json({
    success: true,
    data: {
      ...professional,
      service_types: JSON.parse(professional.service_types || '[]'),
      areas: JSON.parse(professional.areas || '[]'),
      reviews
    }
  })
}
