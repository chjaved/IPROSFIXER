const { getDb, generateId } = require('../_db.js')
const { createNotification } = require('./notifications.js')

const VALID_AREAS = ['KL', 'PJ', 'Shah Alam', 'Subang', 'Cheras', 'Klang', 'Cyberjaya', 'Putrajaya', 'Ampang', 'Bangsar', 'Mont Kiara', 'Damansara']

function genBookingRef() {
  const yr = new Date().getFullYear()
  return `IPF-${yr}-${Math.floor(1000 + Math.random() * 9000)}`
}

async function createTimelineEvent(sql, bookingId, status, userId, notes) {
  await sql`INSERT INTO booking_timeline (id, booking_id, status, notes, created_by) VALUES (${generateId()}, ${bookingId}, ${status}, ${notes||null}, ${userId})`
}

module.exports = async function bookingsHandler(req, res) {
  const url = req.url || ''
  const sql = getDb()
  const userId = req.user.id

  const idMatch = url.replace(/\?.*$/, '').match(/\/bookings\/([\w-]+)/)
  const bookingId = idMatch ? idMatch[1] : null
  const isApprove = url.includes('/approve')

  if (req.method === 'GET'  && !bookingId)              return await listBookings(req, res, sql, userId)
  if (req.method === 'POST' && !bookingId)              return await createBooking(req, res, sql, userId)
  if (req.method === 'GET'  && bookingId)               return await getBookingDetail(req, res, sql, bookingId, userId)
  if (req.method === 'POST' && bookingId && isApprove)  return await approveBooking(req, res, sql, bookingId, userId)
  if (req.method === 'PUT'  && bookingId)               return await updateBooking(req, res, sql, bookingId, userId)

  return res.status(404).json({ success: false, message: 'Not found' })
}

async function listBookings(req, res, sql, userId) {
  const userType = req.user.type
  const { status, page = 1, limit = 20 } = req.query || {}
  const pageNum = Math.max(1, parseInt(page) || 1)
  const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20))
  const offset = (pageNum - 1) * limitNum
  let bookings
  if (userType === 'consumer') {
    bookings = status
      ? await sql`SELECT b.*, s.name as service_name, s.icon, u.name as professional_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id WHERE b.consumer_id=${userId} AND b.status=${status} ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
      : await sql`SELECT b.*, s.name as service_name, s.icon, u.name as professional_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id WHERE b.consumer_id=${userId} ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
  } else {
    bookings = status
      ? await sql`SELECT b.*, s.name as service_name, s.icon, u.name as customer_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id WHERE (b.professional_id=${userId} OR b.professional_id IS NULL) AND b.status=${status} ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
      : await sql`SELECT b.*, s.name as service_name, s.icon, u.name as customer_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id WHERE b.professional_id=${userId} OR b.professional_id IS NULL ORDER BY b.created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
  }
  const normalised = bookings.map(b => ({ ...b, service_name: b.service_name || b.service || '', area: b.area || b.address || '', total_amount: b.price || b.total_amount || 0 }))
  return res.json({ success: true, bookings: normalised, data: normalised, pagination: { page: pageNum, limit: limitNum } })
}

async function createBooking(req, res, sql, userId) {
  const body = req.body || {}
  const serviceId     = body.service_id     || body.serviceId
  const scheduledDate = body.scheduled_date || body.scheduledDate
  const scheduledTime = body.scheduled_time || body.scheduledTime
  const area          = body.area           || body.address || ''
  const { notes, whatsapp } = body
  if (!serviceId || !scheduledDate || !scheduledTime || !area)
    return res.status(400).json({ success: false, message: 'service_id, scheduled_date, scheduled_time, and area are required' })
  if (!VALID_AREAS.some(v => area.toLowerCase().includes(v.toLowerCase())))
    return res.status(400).json({ success: false, message: `Area must be one of: ${VALID_AREAS.join(', ')}` })
  const bookingDate = new Date(scheduledDate)
  const today = new Date(); today.setHours(0, 0, 0, 0)
  if (bookingDate < today) return res.status(400).json({ success: false, message: 'Booking date must be in the future' })
  const svcRows = await sql`SELECT * FROM services WHERE id=${serviceId} AND is_active=TRUE`
  if (!svcRows.length) return res.status(404).json({ success: false, message: 'Service not found' })
  const service = svcRows[0]
  const bookingId = generateId()
  const bookingRef = genBookingRef()
  await sql`INSERT INTO bookings (id, booking_number, consumer_id, service_id, service_name, status, scheduled_date, scheduled_time, address, area, price, notes, whatsapp) VALUES (${bookingId}, ${bookingRef}, ${userId}, ${serviceId}, ${service.name}, 'pending', ${scheduledDate}, ${scheduledTime}, ${area}, ${area}, ${service.base_price}, ${notes||null}, ${whatsapp||null})`
  await sql`UPDATE consumer_profiles SET total_bookings=total_bookings+1 WHERE user_id=${userId}`
  const booking = { id: bookingId, booking_number: bookingRef, service_id: serviceId, service_name: service.name, area, scheduled_date: scheduledDate, scheduled_time: scheduledTime, status: 'pending', total_amount: service.base_price, price: service.base_price, created_at: new Date().toISOString() }
  return res.status(201).json({ success: true, message: 'Booking created', booking, data: booking })
}

async function getBookingDetail(req, res, sql, id, userId) {
  const rows = await sql`SELECT b.*, s.name as service_name, s.icon, u.name as professional_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id WHERE b.id=${id} AND (b.consumer_id=${userId} OR b.professional_id=${userId})`
  if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = rows[0]
  return res.json({ success: true, data: { ...b, area: b.area||b.address||'', total_amount: b.price||0 } })
}

async function updateBooking(req, res, sql, id, userId) {
  const userType = req.user.type
  const { status, cancellation_reason } = req.body || {}
  const rows = await sql`SELECT * FROM bookings WHERE id=${id}`
  if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const booking = rows[0]
  if (status) await sql`UPDATE bookings SET status=${status}, updated_at=NOW() WHERE id=${id}`
  if (cancellation_reason) await sql`UPDATE bookings SET cancellation_reason=${cancellation_reason} WHERE id=${id}`
  if (userType === 'professional' && status === 'accepted' && !booking.professional_id) {
    await sql`UPDATE bookings SET professional_id=${userId} WHERE id=${id}`
    await createTimelineEvent(sql, id, 'accepted', userId, 'Professional accepted the booking')
    await createNotification({ user_id: booking.consumer_id, type: 'booking_accepted', title: 'Booking Accepted', body: `A professional has accepted your booking for ${booking.service_name}.`, data: JSON.stringify({ booking_id: id }) })
  }
  if (status === 'on_the_way') {
    await createTimelineEvent(sql, id, 'on_the_way', userId, 'Professional is on the way')
    await createNotification({ user_id: booking.consumer_id, type: 'on_the_way', title: 'Professional On The Way', body: 'Your professional is on the way to your location.', data: JSON.stringify({ booking_id: id }) })
  }
  if (status === 'arrived') {
    await createTimelineEvent(sql, id, 'arrived', userId, 'Professional arrived at location')
    await createNotification({ user_id: booking.consumer_id, type: 'arrived', title: 'Professional Arrived', body: 'Your professional has arrived at your location.', data: JSON.stringify({ booking_id: id }) })
  }
  if (status === 'in_progress') {
    await createTimelineEvent(sql, id, 'in_progress', userId, 'Work started')
    await createNotification({ user_id: booking.consumer_id, type: 'work_started', title: 'Work Started', body: 'Your professional has started working on your service.', data: JSON.stringify({ booking_id: id }) })
  }
  if (status === 'awaiting_approval') {
    await createTimelineEvent(sql, id, 'awaiting_approval', userId, 'Job completed, awaiting customer approval')
    await createNotification({ user_id: booking.consumer_id, type: 'booking_awaiting_approval', title: 'Job Awaiting Your Approval', body: 'Your professional has completed the job. Please review and approve.', data: JSON.stringify({ booking_id: id }) })
  }
  if (status === 'completed') {
    const proId = booking.professional_id || userId
    await sql`INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status) VALUES (${generateId()}, ${id}, ${booking.consumer_id}, ${proId}, ${booking.price}, 'payment', 'completed')`
    await sql`UPDATE professional_profiles SET total_jobs=total_jobs+1 WHERE user_id=${proId}`
    await sql`UPDATE consumer_profiles SET total_spent=total_spent+${booking.price} WHERE user_id=${booking.consumer_id}`
  }
  return res.json({ success: true, message: 'Booking updated' })
}

async function approveBooking(req, res, sql, bookingId, userId) {
  const rows = await sql`SELECT * FROM bookings WHERE id=${bookingId}`
  if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const booking = rows[0]
  if (booking.consumer_id !== userId) return res.status(403).json({ success: false, message: 'Only customer can approve booking' })
  if (booking.status !== 'awaiting_approval') return res.status(400).json({ success: false, message: 'Booking is not awaiting approval' })
  await sql`UPDATE bookings SET status='completed', updated_at=NOW() WHERE id=${bookingId}`
  await createTimelineEvent(sql, bookingId, 'completed', userId, 'Booking completed and approved')
  const proId = booking.professional_id
  await sql`INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status) VALUES (${generateId()}, ${bookingId}, ${booking.consumer_id}, ${proId}, ${booking.price}, 'payment', 'completed')`
  await sql`UPDATE professional_profiles SET total_jobs=total_jobs+1 WHERE user_id=${proId}`
  await sql`UPDATE consumer_profiles SET total_spent=total_spent+${booking.price} WHERE user_id=${booking.consumer_id}`
  await createNotification({ user_id: proId, type: 'booking_completed', title: 'Booking Completed', body: 'Your booking has been approved and completed. Payment has been processed.', data: JSON.stringify({ booking_id: bookingId }) })
  return res.json({ success: true, message: 'Booking approved and completed' })
}
