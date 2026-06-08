const express = require('express');
const router = express.Router();
const { getDb, generateId } = require('../middleware/db.js');
const { authMiddleware } = require('../middleware/auth.js');

// POST /api/disputes - Create a dispute
router.post('/', async (req, res) => {
  try {
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const userType = req.user.type;
    const { booking_id, reason, description } = req.body;
    const sql = getDb();

    if (!booking_id || !reason) {
      return res.status(400).json({ success: false, message: 'booking_id and reason are required' });
    }

    // Get booking details
    const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`;
    if (!booking.length) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const b = booking[0];

    // Only customer can create dispute for their own booking
    if (userType !== 'consumer' || b.consumer_id !== userId) {
      return res.status(403).json({ success: false, message: 'Only customer can dispute their own booking' });
    }

    if (b.status !== 'awaiting_approval') {
      return res.status(400).json({ success: false, message: 'Booking is not awaiting approval' });
    }

    // Create dispute
    const disputeId = generateId();
    await sql`
      INSERT INTO disputes (id, booking_id, customer_id, professional_id, reason, description, status)
      VALUES (${disputeId}, ${booking_id}, ${b.consumer_id}, ${b.professional_id}, ${reason}, ${description || null}, 'open')
    `;

    // Update booking status to disputed
    await sql`UPDATE bookings SET status='disputed', updated_at=NOW() WHERE id=${booking_id}`;

    return res.status(201).json({ success: true, message: 'Dispute created successfully' });
  } catch (err) {
    console.error('Create dispute error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// GET /api/disputes - Get disputes for current user
router.get('/', async (req, res) => {
  try {
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const userType = req.user.type;
    const sql = getDb();

    let disputes;
    if (userType === 'consumer') {
      disputes = await sql`
        SELECT d.*, b.booking_number, s.name as service_name, u.name as professional_name
        FROM disputes d
        JOIN bookings b ON b.id = d.booking_id
        LEFT JOIN services s ON s.id = b.service_id
        LEFT JOIN users u ON u.id = d.professional_id
        WHERE d.customer_id = ${userId}
        ORDER BY d.created_at DESC
      `;
    } else {
      disputes = await sql`
        SELECT d.*, b.booking_number, s.name as service_name, u.name as customer_name
        FROM disputes d
        JOIN bookings b ON b.id = d.booking_id
        LEFT JOIN services s ON s.id = b.service_id
        LEFT JOIN users u ON u.id = d.customer_id
        WHERE d.professional_id = ${userId}
        ORDER BY d.created_at DESC
      `;
    }

    return res.json({ success: true, disputes });
  } catch (err) {
    console.error('Get disputes error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// GET /api/disputes/admin - Admin gets all disputes
router.get('/admin', async (req, res) => {
  try {
    const sql = getDb();
    const disputes = await sql`
      SELECT d.*, b.booking_number, s.name as service_name, 
             cu.name as customer_name, cu.email as customer_email,
             pu.name as professional_name, pu.email as professional_email
      FROM disputes d
      JOIN bookings b ON b.id = d.booking_id
      LEFT JOIN services s ON s.id = b.service_id
      LEFT JOIN users cu ON cu.id = d.customer_id
      LEFT JOIN users pu ON pu.id = d.professional_id
      ORDER BY d.created_at DESC
    `;
    return res.json({ success: true, disputes });
  } catch (err) {
    console.error('Get disputes admin error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// PUT /api/disputes/:id - Admin updates dispute status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_note } = req.body;
    const sql = getDb();

    if (!status || !['open', 'investigating', 'resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    await sql`
      UPDATE disputes SET status=${status}, admin_note=${admin_note || null}, updated_at=NOW()
      WHERE id=${id}
    `;

    return res.json({ success: true, message: 'Dispute updated' });
  } catch (err) {
    console.error('Update dispute error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

module.exports = router;
