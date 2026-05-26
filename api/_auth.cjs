const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getDb } = require('./_db.cjs')

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

// Hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Verify password
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

// Generate JWT token
function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    type: user.type,
    name: user.name
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}

// Authentication middleware for API routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  const token = authHeader.substring(7)
  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }

  // Attach user info to request
  req.user = decoded
  
  // Get full user from database
  const db = getDb()
  const user = db.prepare('SELECT id, email, name, phone, type, status FROM users WHERE id = ?').get(decoded.userId)
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'User not found' })
  }

  if (user.status !== 'active') {
    return res.status(403).json({ success: false, message: 'Account is not active' })
  }

  req.user = user
  next()
}

// Role-based access control
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' })
    }
    
    if (req.user.type !== role) {
      return res.status(403).json({ success: false, message: 'Access denied' })
    }
    
    next()
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  authMiddleware,
  requireRole
}
