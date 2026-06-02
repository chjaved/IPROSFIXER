const express = require('express');
const router = express.Router();
const { getDb, initTables, generateId } = require('../middleware/db.js');
const { authMiddleware } = require('../middleware/auth.js');

let tablesReady = false;
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true; }
}

function genBookingRef() {
  const yr = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `IPF-${yr}-${rand}`;
}

// GET /api/bookings - List all bookings for current user
router.get('/', async (req, res) => {
  try {
    await ensureTables();
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const userType = req.user.type;
    const { status } = req.query || {};
    const sql = getDb();

    let bookings;
    if (userType === 'consumer') {
      bookings = status
        ? await sql`SELECT b.*, s.name as service_name, s.icon, u.name as professional_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id WHERE b.consumer_id=${userId} AND b.status=${status} ORDER BY b.created_at DESC`
        : await sql`SELECT b.*, s.name as service_name, s.icon, u.name as professional_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id WHERE b.consumer_id=${userId} ORDER BY b.created_at DESC`;
    } else {
      bookings = status
        ? await sql`SELECT b.*, s.name as service_name, s.icon, u.name as customer_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id WHERE (b.professional_id=${userId} OR b.professional_id IS NULL) AND b.status=${status} ORDER BY b.created_at DESC`
        : await sql`SELECT b.*, s.name as service_name, s.icon, u.name as customer_name FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id WHERE b.professional_id=${userId} OR b.professional_id IS NULL ORDER BY b.created_at DESC`;
    }

    // Normalise: Flutter BookingModel reads service_name, area, total_amount
    const normalised = bookings.map(b => ({
      ...b,
      service_name: b.service_name || b.service || '',
      area: b.area || b.address || '',
      total_amount: b.price || b.total_amount || 0,
    }));

    return res.json({ success: true, bookings: normalised, data: normalised });
  } catch (err) {
    console.error('Bookings error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
  try {
    await ensureTables();
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const body = req.body || {};
    const serviceId     = body.service_id     || body.serviceId;
    const scheduledDate = body.scheduled_date || body.scheduledDate;
    const scheduledTime = body.scheduled_time || body.scheduledTime;
    const area          = body.area           || body.address || '';
    const { notes, whatsapp } = body;
    const sql = getDb();

    if (!serviceId || !scheduledDate || !scheduledTime || !area)
      return res.status(400).json({ success: false, message: 'service_id, scheduled_date, scheduled_time, and area are required' });

    const svcRows = await sql`SELECT * FROM services WHERE id=${serviceId} AND is_active=TRUE`;
    if (!svcRows.length) return res.status(404).json({ success: false, message: 'Service not found' });
    const service = svcRows[0];

    const bookingId  = generateId();
    const bookingRef = genBookingRef();

    await sql`
      INSERT INTO bookings (id, booking_number, consumer_id, service_id, service_name, status, scheduled_date, scheduled_time, address, area, price, notes, whatsapp)
      VALUES (${bookingId}, ${bookingRef}, ${userId}, ${serviceId}, ${service.name}, 'pending', ${scheduledDate}, ${scheduledTime}, ${area}, ${area}, ${service.base_price}, ${notes||null}, ${whatsapp||null})
    `;
    await sql`UPDATE consumer_profiles SET total_bookings=total_bookings+1 WHERE user_id=${userId}`;

    const booking = { id: bookingId, booking_number: bookingRef, service_id: serviceId, service_name: service.name,
      area, scheduled_date: scheduledDate, scheduled_time: scheduledTime, status: 'pending',
      total_amount: service.base_price, price: service.base_price, created_at: new Date().toISOString() };

    return res.status(201).json({ success: true, message: 'Booking created', booking, data: booking });
  } catch (err) {
    console.error('Create booking error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// GET /api/bookings/:id - Get booking detail
router.get('/:id', async (req, res) => {
  try {
    await ensureTables();
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const id = req.params.id;
    const sql = getDb();

    const rows = await sql`
      SELECT b.*, s.name as service_name, s.icon, u.name as professional_name
      FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id
      WHERE b.id=${id} AND (b.consumer_id=${userId} OR b.professional_id=${userId})
    `;
    if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' });
    const b = rows[0];
    return res.json({ success: true, data: { ...b, area: b.area||b.address||'', total_amount: b.price||0 } });
  } catch (err) {
    console.error('Booking detail error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// PUT /api/bookings/:id - Update booking
router.put('/:id', async (req, res) => {
  try {
    await ensureTables();
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const userType = req.user.type;
    const id = req.params.id;
    const { status, cancellation_reason } = req.body || {};
    const sql = getDb();

    const rows = await sql`SELECT * FROM bookings WHERE id=${id}`;
    if (!rows.length) return res.status(404).json({ success: false, message: 'Booking not found' });
    const booking = rows[0];

    if (status) await sql`UPDATE bookings SET status=${status}, updated_at=NOW() WHERE id=${id}`;
    if (cancellation_reason) await sql`UPDATE bookings SET cancellation_reason=${cancellation_reason} WHERE id=${id}`;

    // Professional accepting: claim the job
    if (userType === 'professional' && status === 'accepted' && !booking.professional_id) {
      await sql`UPDATE bookings SET professional_id=${userId} WHERE id=${id}`;
    }

    // Completed: create transaction + update stats
    if (status === 'completed') {
      const proId = booking.professional_id || userId;
      await sql`INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status) VALUES (${generateId()}, ${id}, ${booking.consumer_id}, ${proId}, ${booking.price}, 'payment', 'completed')`;
      await sql`UPDATE professional_profiles SET total_jobs=total_jobs+1 WHERE user_id=${proId}`;
      await sql`UPDATE consumer_profiles SET total_spent=total_spent+${booking.price} WHERE user_id=${booking.consumer_id}`;
    }

    return res.json({ success: true, message: 'Booking updated' });
  } catch (err) {
    console.error('Update booking error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

module.exports = router;
