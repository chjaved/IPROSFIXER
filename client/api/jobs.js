// Consolidated handler: booking-photos, checklists, reschedule
const { getDb, initTables, generateId } = require('./_db.js')
const { authMiddleware } = require('./_auth.js')
const { createNotification } = require('./notifications.js')

let blobPut = null
try { blobPut = require('@vercel/blob').put } catch (_) {}

const MAX_FILE_SIZE = 5 * 1024 * 1024

// ── Checklist templates (inlined) ─────────────────────────────────────────────
const CHECKLIST_TEMPLATES = {
  cleaning:        [{ title: 'Sweep floors' }, { title: 'Mop floors' }, { title: 'Dust surfaces' }, { title: 'Clean mirrors' }, { title: 'Empty trash' }, { title: 'Final inspection' }],
  deep_cleaning:   [{ title: 'Deep floor cleaning' }, { title: 'Kitchen degreasing' }, { title: 'Bathroom sanitizing' }, { title: 'Window cleaning' }, { title: 'Dusting all surfaces' }, { title: 'Final inspection' }],
  post_renovation: [{ title: 'Dust removal' }, { title: 'Floor cleaning' }, { title: 'Surface wipe down' }, { title: 'Debris collection' }, { title: 'Final inspection' }],
  repair:          [{ title: 'Diagnosis completed' }, { title: 'Repair work completed' }, { title: 'Safety check performed' }, { title: 'Area cleaned up' }, { title: 'Final inspection' }],
  maid:            [{ title: 'General cleaning' }, { title: 'Dusting' }, { title: 'Mopping' }, { title: 'Kitchen cleaning' }, { title: 'Bathroom cleaning' }, { title: 'Final inspection' }],
  laundry:         [{ title: 'Items sorted' }, { title: 'Washing completed' }, { title: 'Drying completed' }, { title: 'Folding completed' }, { title: 'Quality check' }],
  care:            [{ title: 'Personal care provided' }, { title: 'Medication administered' }, { title: 'Meal preparation' }, { title: 'Hygiene assistance' }, { title: 'Safety check performed' }],
}
const SLUG_MAP = { 'home-deep-cleaning': 'deep_cleaning', 'sofa-carpet-clean': 'deep_cleaning', 'post-event-cleanup': 'post_renovation', 'ac-service-repair': 'repair', 'electrical-works': 'repair', 'plumbing-repair': 'repair', 'appliance-repair': 'repair', 'part-time-maid': 'maid', 'laundry-service': 'laundry', 'caregiver': 'care' }
function getTemplate(slug, category) {
  const type = SLUG_MAP[slug] || category
  return CHECKLIST_TEMPLATES[type] || CHECKLIST_TEMPLATES.cleaning
}

// ── Shared helpers ─────────────────────────────────────────────────────────────
let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

async function addTimelineEvent(sql, bookingId, status, userId, notes) {
  await sql`INSERT INTO booking_timeline (id, booking_id, status, notes, created_by) VALUES (${generateId()}, ${bookingId}, ${status}, ${notes||null}, ${userId})`
}

const rateLimitStore = new Map()
function checkRateLimit(key, max = 100) {
  const now = Date.now(); const win = now - 15 * 60 * 1000
  if (!rateLimitStore.has(key)) rateLimitStore.set(key, [])
  const reqs = rateLimitStore.get(key).filter(t => t > win)
  if (reqs.length >= max) return false
  reqs.push(now); rateLimitStore.set(key, reqs); return true
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(`jobs:${clientIp}`, 100)) {
    return res.status(429).json({ success: false, message: 'Too many requests' })
  }

  try {
    await ensureTables()
  } catch (dbErr) {
    return res.status(500).json({ success: false, message: 'Database connection failed: ' + dbErr.message })
  }

  const ok = await authMiddleware(req, res)
  if (!ok) return

  const url = req.url || ''
  const sql = getDb()
  const userId = req.user.id
  const userType = req.user.type

  try {
    // ── BOOKING PHOTOS (/api/booking-photos) ───────────────────────────────
    if (url.includes('/booking-photos')) {
      const photoIdMatch = url.replace(/\?.*$/, '').match(/\/booking-photos\/([\w-]+)/)
      const photoId = photoIdMatch ? photoIdMatch[1] : null
      if (req.method === 'GET')    return await listPhotos(req, res, sql, userId)
      if (req.method === 'POST')   return await uploadPhoto(req, res, sql, userId, userType)
      if (req.method === 'DELETE' && photoId) return await deletePhoto(req, res, sql, photoId, userId)
    }

    // ── CHECKLISTS (/api/checklists) ───────────────────────────────────────
    if (url.includes('/checklists')) {
      const clIdMatch = url.replace(/\?.*$/, '').match(/\/checklists\/([\w-]+)/)
      const checklistId = clIdMatch ? clIdMatch[1] : null
      const itemsMatch = url.replace(/\?.*$/, '').match(/\/checklists\/([\w-]+)\/items\/([\w-]+)/)
      const isItems = url.includes('/items')
      const itemId = itemsMatch ? itemsMatch[2] : null
      const targetClId = itemsMatch ? itemsMatch[1] : checklistId

      if (req.method === 'GET'  && !checklistId) return await listChecklists(req, res, sql, userId)
      if (req.method === 'GET'  && checklistId)  return await getChecklist(req, res, sql, checklistId, userId)
      if (req.method === 'POST' && !checklistId) return await createChecklist(req, res, sql, userId, userType)
      if (req.method === 'PUT'  && checklistId && !isItems) return await updateChecklist(req, res, sql, checklistId, userId, userType)
      if (req.method === 'PUT'  && isItems && itemId) return await updateChecklistItem(req, res, sql, targetClId, itemId, userId, userType)
    }

    // ── CHECKLIST TEMPLATES (/api/checklist-templates) ────────────────────
    if (url.includes('/checklist-templates')) {
      return res.json({ success: true, templates: CHECKLIST_TEMPLATES })
    }

    // ── RESCHEDULE (/api/reschedule) ───────────────────────────────────────
    if (url.includes('/reschedule')) {
      const pathMatch = url.replace(/\?.*$/, '').match(/\/reschedule\/([\w-]+)/)
      const rescheduleId = pathMatch ? pathMatch[1] : null
      if (req.method === 'POST' && !rescheduleId) return await createReschedule(req, res, sql, userId, userType)
      if (req.method === 'GET'  && rescheduleId)  return await getReschedule(req, res, sql, rescheduleId)
      if (req.method === 'PUT'  && rescheduleId)  return await respondReschedule(req, res, sql, rescheduleId, userId)
    }

    return res.status(404).json({ success: false, message: 'Not found' })
  } catch (err) {
    console.error('Jobs handler error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}

// ── Booking Photos ─────────────────────────────────────────────────────────────
async function listPhotos(req, res, sql, userId) {
  const { booking_id } = req.query
  if (!booking_id) return res.status(400).json({ success: false, message: 'booking_id is required' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (b.consumer_id !== userId && b.professional_id !== userId)
    return res.status(403).json({ success: false, message: 'Access denied' })
  const photos = await sql`SELECT bp.*, u.name as uploader_name FROM booking_photos bp LEFT JOIN users u ON u.id=bp.uploaded_by WHERE bp.booking_id=${booking_id} ORDER BY bp.photo_type, bp.created_at ASC`
  return res.json({ success: true, photos })
}

async function uploadPhoto(req, res, sql, userId, userType) {
  const { booking_id, photo_type, photo_base64, caption, mime_type, file_size } = req.body
  if (!booking_id || !photo_type || !photo_base64)
    return res.status(400).json({ success: false, message: 'booking_id, photo_type, and photo_base64 are required' })
  if (!['before', 'after'].includes(photo_type))
    return res.status(400).json({ success: false, message: 'photo_type must be "before" or "after"' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (userType !== 'professional' || b.professional_id !== userId)
    return res.status(403).json({ success: false, message: 'Only assigned professional can upload photos' })
  const size = file_size || photo_base64.length
  if (size > MAX_FILE_SIZE) return res.status(400).json({ success: false, message: 'File too large. Maximum 5MB.' })

  let photoUrl
  try {
    if (!blobPut) throw new Error('Blob not available')
    const buffer = Buffer.from(photo_base64, 'base64')
    const blob = await blobPut(`booking-photos/${booking_id}_${photo_type}_${Date.now()}.jpg`, buffer, { access: 'public' })
    photoUrl = blob.url
  } catch (_) {
    photoUrl = `data:${mime_type||'image/jpeg'};base64,${photo_base64}`
  }

  const photoId = generateId()
  await sql`INSERT INTO booking_photos (id, booking_id, uploaded_by, photo_type, photo_url, caption, mime_type, file_size) VALUES (${photoId}, ${booking_id}, ${userId}, ${photo_type}, ${photoUrl}, ${caption||null}, ${mime_type||'image/jpeg'}, ${size})`
  await sql`UPDATE professional_profiles SET total_photos_uploaded=total_photos_uploaded+1, qa_score=LEAST(100,qa_score+2) WHERE user_id=${userId}`
  await addTimelineEvent(sql, booking_id, `photo_${photo_type}`, userId, `${photo_type === 'before' ? 'Before' : 'After'} photos uploaded`)
  await createNotification({ user_id: b.consumer_id, type: 'photo_uploaded', title: 'New Photo Uploaded', body: `Professional has uploaded ${photo_type} photos for your booking.`, data: JSON.stringify({ booking_id, photo_type }) })
  const newPhoto = await sql`SELECT * FROM booking_photos WHERE id=${photoId}`
  return res.status(201).json({ success: true, photo: newPhoto[0] })
}

async function deletePhoto(req, res, sql, photoId, userId) {
  const photo = await sql`SELECT * FROM booking_photos WHERE id=${photoId}`
  if (!photo.length) return res.status(404).json({ success: false, message: 'Photo not found' })
  if (photo[0].uploaded_by !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
  await sql`DELETE FROM booking_photos WHERE id=${photoId}`
  return res.json({ success: true, message: 'Photo deleted' })
}

// ── Checklists ─────────────────────────────────────────────────────────────────
async function listChecklists(req, res, sql, userId) {
  const { booking_id } = req.query
  if (!booking_id) return res.status(400).json({ success: false, message: 'booking_id is required' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (b.consumer_id !== userId && b.professional_id !== userId)
    return res.status(403).json({ success: false, message: 'Access denied' })
  const checklists = await sql`SELECT c.*, s.slug as service_slug, s.category as service_category FROM checklists c LEFT JOIN services s ON s.id=c.service_id WHERE c.booking_id=${booking_id}`
  if (!checklists.length) return res.json({ success: true, checklist: null, items: [] })
  const checklist = checklists[0]
  const items = await sql`SELECT * FROM checklist_items WHERE checklist_id=${checklist.id} ORDER BY created_at ASC`
  return res.json({ success: true, checklist, items })
}

async function getChecklist(req, res, sql, checklistId, userId) {
  const checklists = await sql`SELECT * FROM checklists WHERE id=${checklistId}`
  if (!checklists.length) return res.status(404).json({ success: false, message: 'Checklist not found' })
  const checklist = checklists[0]
  const booking = await sql`SELECT * FROM bookings WHERE id=${checklist.booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (b.consumer_id !== userId && b.professional_id !== userId)
    return res.status(403).json({ success: false, message: 'Access denied' })
  const items = await sql`SELECT * FROM checklist_items WHERE checklist_id=${checklistId} ORDER BY created_at ASC`
  return res.json({ success: true, checklist, items })
}

async function createChecklist(req, res, sql, userId, userType) {
  const { booking_id } = req.body
  if (!booking_id) return res.status(400).json({ success: false, message: 'booking_id is required' })
  const booking = await sql`SELECT b.*, s.slug as service_slug, s.category as service_category FROM bookings b LEFT JOIN services s ON s.id=b.service_id WHERE b.id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (userType !== 'professional' || b.professional_id !== userId)
    return res.status(403).json({ success: false, message: 'Only assigned professional can create checklist' })
  const existing = await sql`SELECT * FROM checklists WHERE booking_id=${booking_id}`
  if (existing.length) return res.json({ success: true, checklist: existing[0], message: 'Checklist already exists' })
  const template = getTemplate(b.service_slug, b.service_category)
  const checklistId = generateId()
  await sql`INSERT INTO checklists (id, booking_id, service_id, created_by, status) VALUES (${checklistId}, ${booking_id}, ${b.service_id}, ${userId}, 'in_progress')`
  for (const item of template) {
    await sql`INSERT INTO checklist_items (id, checklist_id, title, completed) VALUES (${generateId()}, ${checklistId}, ${item.title}, FALSE)`
  }
  const newChecklist = await sql`SELECT * FROM checklists WHERE id=${checklistId}`
  const items = await sql`SELECT * FROM checklist_items WHERE checklist_id=${checklistId} ORDER BY created_at ASC`
  return res.status(201).json({ success: true, checklist: newChecklist[0], items })
}

async function updateChecklist(req, res, sql, checklistId, userId, userType) {
  const { status } = req.body
  const checklists = await sql`SELECT * FROM checklists WHERE id=${checklistId}`
  if (!checklists.length) return res.status(404).json({ success: false, message: 'Checklist not found' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${checklists[0].booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  if (userType !== 'professional' || booking[0].professional_id !== userId)
    return res.status(403).json({ success: false, message: 'Only assigned professional can update checklist' })
  if (status) await sql`UPDATE checklists SET status=${status}, updated_at=NOW() WHERE id=${checklistId}`
  const updated = await sql`SELECT * FROM checklists WHERE id=${checklistId}`
  return res.json({ success: true, checklist: updated[0] })
}

async function updateChecklistItem(req, res, sql, checklistId, itemId, userId, userType) {
  const { completed, notes } = req.body
  const items = await sql`SELECT * FROM checklist_items WHERE id=${itemId}`
  if (!items.length) return res.status(404).json({ success: false, message: 'Item not found' })
  const item = items[0]
  const checklists = await sql`SELECT * FROM checklists WHERE id=${checklistId}`
  if (!checklists.length) return res.status(404).json({ success: false, message: 'Checklist not found' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${checklists[0].booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (userType !== 'professional' || b.professional_id !== userId)
    return res.status(403).json({ success: false, message: 'Access denied' })
  await sql`UPDATE checklist_items SET completed=${completed !== undefined ? completed : item.completed}, notes=${notes !== undefined ? notes : item.notes}, completed_at=${completed === true ? sql`NOW()` : sql`NULL`} WHERE id=${itemId}`
  const allItems = await sql`SELECT * FROM checklist_items WHERE checklist_id=${checklistId}`
  if (allItems.every(i => i.completed)) {
    await sql`UPDATE checklists SET status='completed', updated_at=NOW() WHERE id=${checklistId}`
    await sql`UPDATE professional_profiles SET total_checklists_completed=total_checklists_completed+1, qa_score=LEAST(100,qa_score+5) WHERE user_id=${userId}`
    await addTimelineEvent(sql, checklists[0].booking_id, 'checklist_completed', userId, 'Job checklist completed')
    if (b.consumer_id) {
      await createNotification({ user_id: b.consumer_id, type: 'checklist_completed', title: 'Checklist Completed', body: 'Professional has completed the job checklist.', data: JSON.stringify({ booking_id: checklists[0].booking_id }) })
    }
  }
  const updatedItem = await sql`SELECT * FROM checklist_items WHERE id=${itemId}`
  return res.json({ success: true, item: updatedItem[0] })
}

// ── Reschedule ─────────────────────────────────────────────────────────────────
async function createReschedule(req, res, sql, userId, userType) {
  const { booking_id, new_date, new_time, reason } = req.body || {}
  if (!booking_id || !new_date || !new_time)
    return res.status(400).json({ success: false, message: 'booking_id, new_date, and new_time are required' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (userType === 'consumer' && b.consumer_id !== userId) return res.status(403).json({ success: false, message: 'You can only reschedule your own bookings' })
  if (userType === 'professional' && b.professional_id !== userId) return res.status(403).json({ success: false, message: 'You can only reschedule your assigned bookings' })
  if (!['pending','accepted','on_the_way','arrived'].includes(b.status))
    return res.status(400).json({ success: false, message: `Cannot reschedule booking with status: ${b.status}` })
  const existing = await sql`SELECT * FROM reschedule_requests WHERE booking_id=${booking_id} AND status='pending'`
  if (existing.length) return res.status(400).json({ success: false, message: 'A reschedule request is already pending for this booking' })
  const rescheduleId = generateId()
  await sql`INSERT INTO reschedule_requests (id, booking_id, requested_by, old_date, old_time, new_date, new_time, reason, status) VALUES (${rescheduleId}, ${booking_id}, ${userId}, ${b.scheduled_date}, ${b.scheduled_time}, ${new_date}, ${new_time}, ${reason||null}, 'pending')`
  await sql`UPDATE bookings SET status='reschedule_pending', updated_at=NOW() WHERE id=${booking_id}`
  await addTimelineEvent(sql, booking_id, 'reschedule_requested', userId, reason || 'Reschedule requested')
  const otherUserId = userType === 'consumer' ? b.professional_id : b.consumer_id
  if (otherUserId) {
    await createNotification({ user_id: otherUserId, type: 'reschedule_requested', title: 'Reschedule Requested', body: `A reschedule request has been made for booking ${b.booking_number}`, data: JSON.stringify({ reschedule_id: rescheduleId, booking_id }) })
  }
  const newR = await sql`SELECT * FROM reschedule_requests WHERE id=${rescheduleId}`
  return res.status(201).json({ success: true, reschedule: newR[0] })
}

async function getReschedule(req, res, sql, bookingId) {
  const requests = await sql`SELECT r.*, u.name as requester_name, u.type as requester_type FROM reschedule_requests r JOIN users u ON u.id=r.requested_by WHERE r.booking_id=${bookingId} ORDER BY r.created_at DESC`
  return res.json({ success: true, requests })
}

async function respondReschedule(req, res, sql, rescheduleId, userId) {
  const { action, rejection_reason } = req.body || {}
  if (!action || !['approve','reject'].includes(action))
    return res.status(400).json({ success: false, message: 'Valid action required (approve or reject)' })
  const reschedule = await sql`SELECT * FROM reschedule_requests WHERE id=${rescheduleId}`
  if (!reschedule.length) return res.status(404).json({ success: false, message: 'Reschedule request not found' })
  const r = reschedule[0]
  if (r.requested_by === userId) return res.status(403).json({ success: false, message: 'You cannot approve/reject your own request' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${r.booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (b.consumer_id !== userId && b.professional_id !== userId) return res.status(403).json({ success: false, message: 'You are not authorized for this booking' })
  if (action === 'approve') {
    await sql`UPDATE reschedule_requests SET status='approved', updated_at=NOW() WHERE id=${rescheduleId}`
    await sql`UPDATE bookings SET scheduled_date=${r.new_date}, scheduled_time=${r.new_time}, status='accepted', updated_at=NOW() WHERE id=${r.booking_id}`
    await addTimelineEvent(sql, r.booking_id, 'reschedule_approved', userId, 'Reschedule approved')
    await createNotification({ user_id: r.requested_by, type: 'reschedule_approved', title: 'Reschedule Approved', body: `Your reschedule request for booking ${b.booking_number} has been approved`, data: JSON.stringify({ reschedule_id: rescheduleId, booking_id: r.booking_id }) })
    return res.json({ success: true, message: 'Reschedule approved' })
  } else {
    await sql`UPDATE reschedule_requests SET status='rejected', rejection_reason=${rejection_reason||null}, updated_at=NOW() WHERE id=${rescheduleId}`
    await sql`UPDATE bookings SET status='accepted', updated_at=NOW() WHERE id=${r.booking_id}`
    await addTimelineEvent(sql, r.booking_id, 'reschedule_rejected', userId, rejection_reason || 'Reschedule rejected')
    await createNotification({ user_id: r.requested_by, type: 'reschedule_rejected', title: 'Reschedule Rejected', body: `Your reschedule request for booking ${b.booking_number} has been rejected`, data: JSON.stringify({ reschedule_id: rescheduleId, booking_id: r.booking_id }) })
    return res.json({ success: true, message: 'Reschedule rejected' })
  }
}
