const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')
const { getTemplateForService } = require('./checklist-templates.js')
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

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json')
  const allowedOrigins = ['https://iprofixer.com.my', 'https://www.iprofixer.com.my', 'https://iprosfixer.vercel.app']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setSecurityHeaders(res)
  
  if (req.method === 'OPTIONS') return res.status(200).end()
  
  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  const rateLimit = checkRateLimit(`checklists:${clientIp}`, 50)
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

    // Extract checklist ID if present: /api/checklists/some-id
    const checklistIdMatch = url.replace(/\?.*$/, '').match(/\/checklists\/([\w-]+)$/)
    const checklistId = checklistIdMatch ? checklistIdMatch[1] : null

    // Extract items path: /api/checklists/some-id/items
    const itemsMatch = url.replace(/\?.*$/, '').match(/\/checklists\/([\w-]+)\/items$/)
    const isItems = !!itemsMatch
    const targetChecklistId = itemsMatch ? itemsMatch[1] : null

    // Extract item ID: /api/checklists/some-id/items/item-id
    const itemMatch = url.replace(/\?.*$/, '').match(/\/checklists\/[\w-]+\/items\/([\w-]+)$/)
    const itemId = itemMatch ? itemMatch[1] : null

    if (req.method === 'GET' && !checklistId && !isItems) return await listChecklists(req, res, sql, userId, userType)
    if (req.method === 'GET' && checklistId && !isItems) return await getChecklist(req, res, sql, checklistId, userId, userType)
    if (req.method === 'POST' && !checklistId) return await createChecklist(req, res, sql, userId, userType)
    if (req.method === 'PUT' && checklistId && !isItems) return await updateChecklist(req, res, sql, checklistId, userId, userType)
    if (req.method === 'PUT' && isItems && itemId) return await updateChecklistItem(req, res, sql, targetChecklistId, itemId, userId, userType)

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Checklists error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

async function listChecklists(req, res, sql, userId, userType) {
  const { booking_id } = req.query

  if (!booking_id) {
    return res.status(400).json({ success: false, message: 'booking_id is required' })
  }

  const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]

  // Security: Only booking participants can view checklists
  if (b.consumer_id !== userId && b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  const checklists = await sql`
    SELECT c.*, s.slug as service_slug, s.category as service_category
    FROM checklists c
    LEFT JOIN services s ON s.id = c.service_id
    WHERE c.booking_id = ${booking_id}
  `

  if (checklists.length === 0) {
    return res.json({ success: true, checklist: null, items: [] })
  }

  const checklist = checklists[0]
  const items = await sql`
    SELECT * FROM checklist_items WHERE checklist_id = ${checklist.id} ORDER BY created_at ASC
  `

  return res.json({ success: true, checklist, items })
}

async function getChecklist(req, res, sql, checklistId, userId, userType) {
  const checklists = await sql`SELECT * FROM checklists WHERE id = ${checklistId}`
  if (!checklists.length) {
    return res.status(404).json({ success: false, message: 'Checklist not found' })
  }

  const checklist = checklists[0]

  // Security: Only booking participants can view
  const booking = await sql`SELECT * FROM bookings WHERE id = ${checklist.booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]
  if (b.consumer_id !== userId && b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  const items = await sql`
    SELECT * FROM checklist_items WHERE checklist_id = ${checklistId} ORDER BY created_at ASC
  `

  return res.json({ success: true, checklist, items })
}

async function createChecklist(req, res, sql, userId, userType) {
  const { booking_id } = req.body

  if (!booking_id) {
    return res.status(400).json({ success: false, message: 'booking_id is required' })
  }

  const booking = await sql`SELECT b.*, s.slug as service_slug, s.category as service_category FROM bookings b LEFT JOIN services s ON s.id = b.service_id WHERE b.id = ${booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]

  // Security: Only assigned professional can create checklist
  if (userType !== 'professional' || b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Only assigned professional can create checklist' })
  }

  // Check if checklist already exists
  const existing = await sql`SELECT * FROM checklists WHERE booking_id = ${booking_id}`
  if (existing.length) {
    return res.json({ success: true, checklist: existing[0], message: 'Checklist already exists' })
  }

  // Get template
  const template = getTemplateForService(b.service_slug, b.service_category)

  // Create checklist
  const checklistId = generateId()
  await sql`
    INSERT INTO checklists (id, booking_id, service_id, created_by, status)
    VALUES (${checklistId}, ${booking_id}, ${b.service_id}, ${userId}, 'in_progress')
  `

  // Create items from template
  for (const item of template) {
    const itemId = generateId()
    await sql`
      INSERT INTO checklist_items (id, checklist_id, title, completed)
      VALUES (${itemId}, ${checklistId}, ${item.title}, FALSE)
    `
  }

  const newChecklist = await sql`SELECT * FROM checklists WHERE id = ${checklistId}`
  const items = await sql`SELECT * FROM checklist_items WHERE checklist_id = ${checklistId} ORDER BY created_at ASC`

  return res.status(201).json({ success: true, checklist: newChecklist[0], items })
}

async function updateChecklist(req, res, sql, checklistId, userId, userType) {
  const { status } = req.body

  const checklists = await sql`SELECT * FROM checklists WHERE id = ${checklistId}`
  if (!checklists.length) {
    return res.status(404).json({ success: false, message: 'Checklist not found' })
  }

  const checklist = checklists[0]

  // Security: Only assigned professional can update
  const booking = await sql`SELECT * FROM bookings WHERE id = ${checklist.booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]
  if (userType !== 'professional' || b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Only assigned professional can update checklist' })
  }

  if (status) {
    await sql`UPDATE checklists SET status=${status}, updated_at=NOW() WHERE id = ${checklistId}`
  }

  const updated = await sql`SELECT * FROM checklists WHERE id = ${checklistId}`
  return res.json({ success: true, checklist: updated[0] })
}

async function updateChecklistItem(req, res, sql, checklistId, itemId, userId, userType) {
  const { completed, notes } = req.body

  const items = await sql`SELECT * FROM checklist_items WHERE id = ${itemId}`
  if (!items.length) {
    return res.status(404).json({ success: false, message: 'Item not found' })
  }

  const item = items[0]

  // Security: Verify checklist belongs to user's booking
  const checklists = await sql`SELECT * FROM checklists WHERE id = ${checklistId}`
  if (!checklists.length) {
    return res.status(404).json({ success: false, message: 'Checklist not found' })
  }

  const checklist = checklists[0]
  const booking = await sql`SELECT * FROM bookings WHERE id = ${checklist.booking_id}`
  if (!booking.length) {
    return res.status(404).json({ success: false, message: 'Booking not found' })
  }

  const b = booking[0]
  if (userType !== 'professional' || b.professional_id !== userId) {
    return res.status(403).json({ success: false, message: 'Access denied' })
  }

  const completedAt = completed === true ? 'NOW()' : 'NULL'
  await sql`
    UPDATE checklist_items 
    SET completed = ${completed !== undefined ? completed : item.completed},
        notes = ${notes !== undefined ? notes : item.notes},
        completed_at = ${completed === true ? sql`NOW()` : sql`NULL`}
    WHERE id = ${itemId}
  `

  // Update checklist status if all items completed
  const allItems = await sql`SELECT * FROM checklist_items WHERE checklist_id = ${checklistId}`
  const allCompleted = allItems.every(i => i.completed)
  if (allCompleted) {
    await sql`UPDATE checklists SET status='completed', updated_at=NOW() WHERE id = ${checklistId}`
    
    // Update professional QA score
    const checklistData = await sql`SELECT * FROM checklists WHERE id = ${checklistId}`
    if (checklistData.length) {
      const booking = await sql`SELECT professional_id, consumer_id FROM bookings WHERE id = ${checklistData[0].booking_id}`
      if (booking.length && booking[0].professional_id) {
        const proId = booking[0].professional_id
        await sql`
          UPDATE professional_profiles 
          SET total_checklists_completed = total_checklists_completed + 1,
              qa_score = LEAST(100, qa_score + 5)
          WHERE user_id = ${proId}
        `
        // Create timeline event
        await createTimelineEvent(sql, checklistData[0].booking_id, 'checklist_completed', proId, 'Job checklist completed')
        
        // Notify customer
        if (booking[0].consumer_id) {
          await createNotification({
            user_id: booking[0].consumer_id,
            type: 'checklist_completed',
            title: 'Checklist Completed',
            body: `Professional has completed the job checklist.`,
            data: JSON.stringify({ booking_id: checklistData[0].booking_id })
          })
        }
      }
    }
  }

  const updatedItem = await sql`SELECT * FROM checklist_items WHERE id = ${itemId}`
  return res.json({ success: true, item: updatedItem[0] })
}
