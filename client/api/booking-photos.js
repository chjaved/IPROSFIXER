const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')
const { put } = require('@vercel/blob')
const { createNotification } = require('./notifications.js')

// Helper to create timeline event
async function createTimelineEvent(sql, bookingId, status, userId, notes = null) {
  const timelineId = generateId()
  await sql`
    INSERT INTO booking_timeline (id, booking_id, status, notes, created_by)
    VALUES (${timelineId}, ${bookingId}, ${status}, ${notes}, ${userId})
  `
}

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

// Max file size: 5MB in base64 (approx 3.75MB actual)
const MAX_FILE_SIZE = 5 * 1024 * 1024

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json')
  const allowedOrigins = ['https://iprofixer.com.my', 'https://www.iprofixer.com.my', 'https://iprosfixer.vercel.app']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()
  
  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const rateLimit = checkRateLimit(`booking-photos:${clientIp}`, 50)
  if (!rateLimit.allowed) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  try {
    try {
      await ensureTables()
    } catch (dbErr) {
      console.error('DB init error:', dbErr)
      return res.status(500).json({ success: false, message: 'Database connection failed: ' + dbErr.message })
    }
    const ok = await authMiddleware(req, res)
    if (!ok) return

    const url = req.url || ''
    const sql = getDb()
    const userId = req.user.id
    const userType = req.user.type

    // Extract photo ID if present: /api/booking-photos/some-id
    const photoIdMatch = url.replace(/\?.*$/, '').match(/\/booking-photos\/([\w-]+)$/)
    const photoId = photoIdMatch ? photoIdMatch[1] : null

    if (req.method === 'GET' && !photoId) return await listPhotos(req, res, sql, userId, userType)
    if (req.method === 'POST' && !photoId) return await uploadPhoto(req, res, sql, userId, userType)
    if (req.method === 'DELETE' && photoId) return await deletePhoto(req, res, sql, photoId, userId, userType)

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Booking photos error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listPhotos(req, res, sql, userId, userType) {
  const { booking_id } = req.query

  if (!booking_id) {
    return res.status(400).json({ success: false, message: 'booking_id is required' })
  }

  const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]

  // Security: Only booking participants can view photos
  if (b.consumer_id !== userId && b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  const photos = await sql`
    SELECT bp.*, u.name as uploader_name
    FROM booking_photos bp
    LEFT JOIN users u ON u.id = bp.uploaded_by
    WHERE bp.booking_id = ${booking_id}
    ORDER BY bp.photo_type, bp.created_at ASC
  `

  return res.json({ success: true, photos })
}

async function uploadPhoto(req, res, sql, userId, userType) {
  const { booking_id, photo_type, photo_base64, caption, mime_type, file_size } = req.body

  if (!booking_id || !photo_type || !photo_base64) {
    return res.status(400).json({ success: false, message: 'booking_id, photo_type, and photo_base64 are required' })
  }

  if (!['before', 'after'].includes(photo_type)) {
    return res.status(400).json({ success: false, message: 'photo_type must be "before" or "after"' })
  }

  const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]

  // Security: Only assigned professional can upload photos
  if (userType !== 'professional' || b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Only assigned professional can upload photos' })
  }

  // Validate file size
  const size = file_size || photo_base64.length
  if (size > MAX_FILE_SIZE) {
    return res.status(400).json({ success: false, message: 'File too large. Maximum 5MB.' })
  }

  // Upload to Vercel Blob (falls back to base64 data URL if Blob not configured)
  let photoUrl
  try {
    const buffer = Buffer.from(photo_base64, 'base64')
    const filename = `booking-photos/${booking_id}_${photo_type}_${Date.now()}.jpg`
    const blob = await put(filename, buffer, { access: 'public' })
    photoUrl = blob.url
  } catch (blobErr) {
    console.warn('Vercel Blob unavailable, storing as data URL:', blobErr.message)
    const mimeType = mime_type || 'image/jpeg'
    photoUrl = `data:${mimeType};base64,${photo_base64}`
  }

  // Save to database
  const photoId = generateId()
  await sql`
    INSERT INTO booking_photos (id, booking_id, uploaded_by, photo_type, photo_url, caption, mime_type, file_size)
    VALUES (${photoId}, ${booking_id}, ${userId}, ${photo_type}, ${photoUrl}, ${caption || null}, ${mime_type || 'image/jpeg'}, ${size})
  `

  // Update professional photo count and QA score
  // TODO: Consider preventing duplicate scoring for repeated uploads of same photo_type per booking
  await sql`
    UPDATE professional_profiles 
    SET total_photos_uploaded = total_photos_uploaded + 1,
        qa_score = LEAST(100, qa_score + 2)
    WHERE user_id = ${userId}
  `

  // Create timeline event
  await createTimelineEvent(sql, booking_id, `photo_${photo_type}`, userId, `${photo_type === 'before' ? 'Before' : 'After'} photos uploaded`)

  // Notify customer
  await createNotification({
    user_id: b.consumer_id,
    type: 'photo_uploaded',
    title: 'New Photo Uploaded',
    body: `Professional has uploaded ${photo_type} photos for your booking.`,
    data: JSON.stringify({ booking_id: booking_id, photo_type })
  })

  const newPhoto = await sql`SELECT * FROM booking_photos WHERE id = ${photoId}`
  return res.status(201).json({ success: true, photo: newPhoto[0] })
}

async function deletePhoto(req, res, sql, photoId, userId, userType) {
  const photo = await sql`SELECT * FROM booking_photos WHERE id = ${photoId}`
  if (!photo.length) {
    return res.status(404).json({ success: false, message: 'Photo not found' })
  }

  const p = photo[0]

  // Security: Only uploader can delete
  if (p.uploaded_by !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  await sql`DELETE FROM booking_photos WHERE id = ${photoId}`

  return res.json({ success: true, message: 'Photo deleted' })
}
