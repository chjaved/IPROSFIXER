const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getDb } = require('./_db.js')

const JWT_SECRET = process.env.JWT_SECRET || 'iprofixer-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, type: user.type, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

// Async auth middleware — call as: await authMiddleware(req, res); if (!req.user) return;
async function authMiddleware(req, res) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authentication required' })
    return false
  }
  const token = authHeader.substring(7)
  const decoded = verifyToken(token)
  if (!decoded) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' })
    return false
  }
  try {
    const sql = getDb()
    const rows = await sql`SELECT id, email, name, phone, whatsapp, type, status FROM users WHERE id = ${decoded.userId}`
    const user = rows[0]
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' })
      return false
    }
    if (user.status !== 'active') {
      res.status(403).json({ success: false, message: 'Account is not active' })
      return false
    }
    req.user = user
    return true
  } catch (err) {
    res.status(500).json({ success: false, message: 'Auth error' })
    return false
  }
}

module.exports = { hashPassword, verifyPassword, generateToken, verifyToken, authMiddleware }
