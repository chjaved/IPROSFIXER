const { getDb, generateId } = require('./_db.cjs')
const { hashPassword, verifyPassword, generateToken } = require('./_auth.cjs')

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { action } = req.query

  try {
    const db = getDb()

    switch (action) {
      case 'register':
        return await handleRegister(req, res, db)
      
      case 'login':
        return await handleLogin(req, res, db)
      
      case 'register-pro':
        return await handleRegisterPro(req, res, db)
      
      default:
        return res.status(400).json({ success: false, message: 'Invalid action' })
    }
  } catch (err) {
    console.error('Auth error:', err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// Consumer registration
async function handleRegister(req, res, db) {
  const { email, password, name, phone } = req.body || {}

  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email, password, and name are required' 
    })
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 6 characters' 
    })
  }

  // Check if email exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) {
    return res.status(409).json({ 
      success: false, 
      message: 'Email already registered' 
    })
  }

  // Create user
  const userId = generateId()
  const passwordHash = await hashPassword(password)

  db.prepare(`
    INSERT INTO users (id, email, password_hash, name, phone, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, email, passwordHash, name, phone || null, 'consumer')

  // Create consumer profile
  const profileId = generateId()
  db.prepare(`
    INSERT INTO consumer_profiles (id, user_id)
    VALUES (?, ?)
  `).run(profileId, userId)

  // Generate token
  const token = generateToken({
    id: userId,
    email,
    name,
    type: 'consumer'
  })

  return res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      user: {
        id: userId,
        email,
        name,
        type: 'consumer'
      },
      token
    }
  })
}

// Professional registration
async function handleRegisterPro(req, res, db) {
  const { email, password, name, phone, serviceTypes, areas, experienceYears } = req.body || {}

  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email, password, and name are required' 
    })
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false, 
      message: 'Password must be at least 6 characters' 
    })
  }

  // Check if email exists
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) {
    return res.status(409).json({ 
      success: false, 
      message: 'Email already registered' 
    })
  }

  // Create user
  const userId = generateId()
  const passwordHash = await hashPassword(password)

  db.prepare(`
    INSERT INTO users (id, email, password_hash, name, phone, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(userId, email, passwordHash, name, phone || null, 'professional')

  // Create professional profile
  const profileId = generateId()
  db.prepare(`
    INSERT INTO professional_profiles (id, user_id, service_types, areas, experience_years)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    profileId, 
    userId,
    JSON.stringify(serviceTypes || []),
    JSON.stringify(areas || []),
    experienceYears || 0
  )

  // Generate token
  const token = generateToken({
    id: userId,
    email,
    name,
    type: 'professional'
  })

  return res.status(201).json({
    success: true,
    message: 'Professional account created successfully',
    data: {
      user: {
        id: userId,
        email,
        name,
        type: 'professional'
      },
      token
    }
  })
}

// Login
async function handleLogin(req, res, db) {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    })
  }

  // Find user
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    })
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash)
  
  if (!isValid) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    })
  }

  // Check status
  if (user.status !== 'active') {
    return res.status(403).json({ 
      success: false, 
      message: 'Account is not active' 
    })
  }

  // Generate token
  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    type: user.type
  })

  return res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        type: user.type
      },
      token
    }
  })
}
