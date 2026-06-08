const { getDb } = require('../_db.js')
const { adminMiddleware } = require('../_auth.js')

module.exports = async function adminHandler(req, res) {
  if (!(await adminMiddleware(req, res))) return
  const sql = getDb()
  const url = req.url || ''
  // Normalise: strip /api prefix if present, keep /admin/...
  const path = url.replace(/^\/api/, '').replace(/\?.*$/, '')

  try {
    if (req.method === 'GET' && path === '/admin/dashboard') {
      const [totalBookings, pendingBookings, activeJobs, awaitingApproval, completedJobs, todayRevenue, monthRevenue, openDisputes, activeProfessionals, totalCustomers] = await Promise.all([
        sql`SELECT COUNT(*) as count FROM bookings`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status='pending'`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status IN ('accepted','on_the_way','arrived','in_progress')`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status='awaiting_approval'`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status='completed'`,
        sql`SELECT COALESCE(SUM(price),0) as total FROM bookings WHERE status='completed' AND DATE(created_at)=CURRENT_DATE`,
        sql`SELECT COALESCE(SUM(price),0) as total FROM bookings WHERE status='completed' AND DATE_TRUNC('month',created_at)=DATE_TRUNC('month',CURRENT_DATE)`,
        sql`SELECT COUNT(*) as count FROM disputes WHERE status IN ('open','investigating')`,
        sql`SELECT COUNT(*) as count FROM users WHERE type='professional' AND status='active'`,
        sql`SELECT COUNT(*) as count FROM users WHERE type='consumer' AND status='active'`
      ])
      return res.json({ success: true, metrics: { totalBookings: parseInt(totalBookings[0].count), pendingBookings: parseInt(pendingBookings[0].count), activeJobs: parseInt(activeJobs[0].count), awaitingApproval: parseInt(awaitingApproval[0].count), completedJobs: parseInt(completedJobs[0].count), todayRevenue: parseFloat(todayRevenue[0].total), monthRevenue: parseFloat(monthRevenue[0].total), openDisputes: parseInt(openDisputes[0].count), activeProfessionals: parseInt(activeProfessionals[0].count), totalCustomers: parseInt(totalCustomers[0].count) } })
    }

    if (req.method === 'GET' && path === '/admin/bookings') {
      const { status, date_from, date_to, service_id, limit = 50, offset = 0 } = req.query || {}
      let q = sql`SELECT b.*, c.name as customer_name, c.phone as customer_phone, p.name as professional_name, p.phone as professional_phone, s.name as service_name, s.category as service_category FROM bookings b LEFT JOIN users c ON c.id=b.consumer_id LEFT JOIN users p ON p.id=b.professional_id LEFT JOIN services s ON s.id=b.service_id WHERE 1=1`
      if (status) q = sql`${q} AND b.status=${status}`
      if (date_from) q = sql`${q} AND b.scheduled_date>=${date_from}`
      if (date_to) q = sql`${q} AND b.scheduled_date<=${date_to}`
      if (service_id) q = sql`${q} AND b.service_id=${service_id}`
      q = sql`${q} ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`
      const bookings = await q
      return res.json({ success: true, bookings })
    }

    if (req.method === 'GET' && path.match(/^\/admin\/bookings\/[\w-]+$/)) {
      const bookingId = path.split('/').pop()
      const booking = await sql`SELECT b.*, c.name as customer_name, c.phone as customer_phone, c.email as customer_email, p.name as professional_name, p.phone as professional_phone, p.email as professional_email, s.name as service_name, s.category as service_category FROM bookings b LEFT JOIN users c ON c.id=b.consumer_id LEFT JOIN users p ON p.id=b.professional_id LEFT JOIN services s ON s.id=b.service_id WHERE b.id=${bookingId}`
      if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
      return res.json({ success: true, booking: booking[0] })
    }

    if (req.method === 'PUT' && path.match(/^\/admin\/bookings\/[\w-]+$/)) {
      const bookingId = path.split('/').pop()
      const { professional_id, status, notes } = req.body || {}
      if (!professional_id && !status) return res.status(400).json({ success: false, message: 'professional_id or status required' })
      if (professional_id) {
        const pro = await sql`SELECT id FROM users WHERE id=${professional_id} AND type='professional' AND status='active'`
        if (!pro.length) return res.status(400).json({ success: false, message: 'Invalid professional' })
        await sql`UPDATE bookings SET professional_id=${professional_id}, updated_at=NOW() WHERE id=${bookingId}`
      }
      if (status) await sql`UPDATE bookings SET status=${status}, updated_at=NOW() WHERE id=${bookingId}`
      if (notes) await sql`UPDATE bookings SET notes=${notes}, updated_at=NOW() WHERE id=${bookingId}`
      return res.json({ success: true, message: 'Booking updated' })
    }

    if (req.method === 'GET' && path === '/admin/professionals') {
      const { status, limit = 50, offset = 0 } = req.query || {}
      let q = sql`SELECT u.id, u.name, u.email, u.phone, u.status, pp.service_category, pp.coverage_area, pp.experience_years, pp.rating, pp.total_jobs, pp.qa_score, pp.total_checklists_completed, pp.total_photos_uploaded, pp.is_available, pp.is_verified FROM users u LEFT JOIN professional_profiles pp ON pp.user_id=u.id WHERE u.type='professional'`
      if (status) q = sql`${q} AND u.status=${status}`
      q = sql`${q} ORDER BY pp.rating DESC, pp.total_jobs DESC LIMIT ${limit} OFFSET ${offset}`
      const professionals = await q
      return res.json({ success: true, professionals })
    }

    if (req.method === 'PUT' && path.match(/^\/admin\/professionals\/[\w-]+$/)) {
      const proId = path.split('/').pop()
      const { status, is_verified } = req.body || {}
      if (!status && is_verified === undefined) return res.status(400).json({ success: false, message: 'status or is_verified required' })
      if (status) await sql`UPDATE users SET status=${status}, updated_at=NOW() WHERE id=${proId} AND type='professional'`
      if (is_verified !== undefined) await sql`UPDATE professional_profiles SET is_verified=${is_verified} WHERE user_id=${proId}`
      return res.json({ success: true, message: 'Professional updated' })
    }

    if (req.method === 'GET' && path === '/admin/customers') {
      const { status, limit = 50, offset = 0 } = req.query || {}
      let q = sql`SELECT u.id, u.name, u.email, u.phone, u.status, u.created_at, cp.loyalty_points, cp.total_bookings, cp.total_spent FROM users u LEFT JOIN consumer_profiles cp ON cp.user_id=u.id WHERE u.type='consumer'`
      if (status) q = sql`${q} AND u.status=${status}`
      q = sql`${q} ORDER BY cp.total_spent DESC, cp.total_bookings DESC LIMIT ${limit} OFFSET ${offset}`
      const customers = await q
      return res.json({ success: true, customers })
    }

    if (req.method === 'PUT' && path.match(/^\/admin\/customers\/[\w-]+$/)) {
      const customerId = path.split('/').pop()
      const { status } = req.body || {}
      if (!status) return res.status(400).json({ success: false, message: 'status required' })
      await sql`UPDATE users SET status=${status}, updated_at=NOW() WHERE id=${customerId} AND type='consumer'`
      return res.json({ success: true, message: 'Customer updated' })
    }

    if (req.method === 'GET' && path === '/admin/revenue') {
      const { period = '30' } = req.query || {}
      const days = parseInt(period)
      const [revenue, bookings, completedJobs, avgRating] = await Promise.all([
        sql`SELECT COALESCE(SUM(price),0) as total FROM bookings WHERE status='completed' AND created_at>=NOW()-(${days}||' days')::interval`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE created_at>=NOW()-(${days}||' days')::interval`,
        sql`SELECT COUNT(*) as count FROM bookings WHERE status='completed' AND created_at>=NOW()-(${days}||' days')::interval`,
        sql`SELECT COALESCE(AVG(rating),0) as avg FROM reviews WHERE created_at>=NOW()-(${days}||' days')::interval`
      ])
      return res.json({ success: true, report: { period: `${days} days`, revenue: parseFloat(revenue[0].total), bookings: parseInt(bookings[0].count), completedJobs: parseInt(completedJobs[0].count), averageRating: parseFloat(avgRating[0].avg) } })
    }

    if (req.method === 'GET' && path === '/admin/withdrawals') {
      const { status, limit = 50, offset = 0 } = req.query || {}
      let q = sql`SELECT w.*, u.name as professional_name, u.email as professional_email, u.phone as professional_phone FROM withdrawals w JOIN users u ON u.id=w.professional_id WHERE 1=1`
      if (status) q = sql`${q} AND w.status=${status}`
      q = sql`${q} ORDER BY w.created_at DESC LIMIT ${limit} OFFSET ${offset}`
      const withdrawals = await q
      return res.json({ success: true, withdrawals })
    }

    if (req.method === 'PUT' && path.match(/^\/admin\/withdrawals\/[\w-]+$/)) {
      const withdrawalId = path.split('/').pop()
      const { status, admin_note } = req.body || {}
      if (!status || !['pending','approved','rejected','paid'].includes(status)) return res.status(400).json({ success: false, message: 'Valid status required' })
      await sql`UPDATE withdrawals SET status=${status}, admin_note=${admin_note||null}, processed_at=CASE WHEN ${['approved','rejected','paid'].includes(status)} THEN NOW() ELSE processed_at END, updated_at=NOW() WHERE id=${withdrawalId}`
      return res.json({ success: true, message: 'Withdrawal updated' })
    }

    if (req.method === 'GET' && path === '/admin/quality') {
      const { limit = 50, offset = 0 } = req.query || {}
      const jobs = await sql`SELECT b.id, b.booking_number, b.status, b.price, b.created_at, c.name as customer_name, p.name as professional_name, s.name as service_name, pp.rating as pro_rating, pp.qa_score, (SELECT COUNT(*) FROM booking_photos bp WHERE bp.booking_id=b.id) as photo_count, (SELECT COUNT(*) FROM checklists ch WHERE ch.booking_id=b.id) as checklist_count, (SELECT COUNT(*) FROM reviews r WHERE r.booking_id=b.id) as review_count FROM bookings b LEFT JOIN users c ON c.id=b.consumer_id LEFT JOIN users p ON p.id=b.professional_id LEFT JOIN services s ON s.id=b.service_id LEFT JOIN professional_profiles pp ON pp.user_id=b.professional_id WHERE b.status='completed' ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`
      return res.json({ success: true, jobs })
    }

    if (req.method === 'GET' && path.match(/^\/admin\/quality\/[\w-]+$/)) {
      const bookingId = path.split('/').pop()
      const [booking, photos, checklist, reviews, timeline] = await Promise.all([
        sql`SELECT b.*, c.name as customer_name, c.phone as customer_phone, p.name as professional_name, p.phone as professional_phone, s.name as service_name FROM bookings b LEFT JOIN users c ON c.id=b.consumer_id LEFT JOIN users p ON p.id=b.professional_id LEFT JOIN services s ON s.id=b.service_id WHERE b.id=${bookingId}`,
        sql`SELECT * FROM booking_photos WHERE booking_id=${bookingId} ORDER BY photo_type, created_at`,
        sql`SELECT * FROM checklists WHERE booking_id=${bookingId}`,
        sql`SELECT * FROM reviews WHERE booking_id=${bookingId}`,
        sql`SELECT * FROM booking_timeline WHERE booking_id=${bookingId} ORDER BY created_at`
      ])
      if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
      return res.json({ success: true, booking: booking[0], photos, checklist, reviews, timeline })
    }

    if (req.method === 'GET' && path === '/admin/reschedules') {
      const { status, limit = 50, offset = 0 } = req.query || {}
      let q = sql`SELECT r.*, b.booking_number, b.scheduled_date, b.scheduled_time, req.name as requester_name, req.type as requester_type, c.name as customer_name, p.name as professional_name FROM reschedule_requests r JOIN bookings b ON b.id=r.booking_id JOIN users req ON req.id=r.requested_by LEFT JOIN users c ON c.id=b.consumer_id LEFT JOIN users p ON p.id=b.professional_id WHERE 1=1`
      if (status) q = sql`${q} AND r.status=${status}`
      q = sql`${q} ORDER BY r.created_at DESC LIMIT ${limit} OFFSET ${offset}`
      const reschedules = await q
      return res.json({ success: true, reschedules })
    }

    if (req.method === 'GET' && path === '/admin/cancellations') {
      const { date_from, date_to, limit = 50, offset = 0 } = req.query || {}
      let q = sql`SELECT b.*, c.name as customer_name, c.phone as customer_phone, p.name as professional_name, p.phone as professional_phone, s.name as service_name FROM bookings b LEFT JOIN users c ON c.id=b.consumer_id LEFT JOIN users p ON p.id=b.professional_id LEFT JOIN services s ON s.id=b.service_id WHERE b.status='cancelled'`
      if (date_from) q = sql`${q} AND b.created_at>=${date_from}`
      if (date_to) q = sql`${q} AND b.created_at<=${date_to}`
      q = sql`${q} ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`
      const cancellations = await q
      return res.json({ success: true, cancellations })
    }

    return res.status(404).json({ success: false, message: 'Admin route not found' })
  } catch (err) {
    console.error('Admin error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}
