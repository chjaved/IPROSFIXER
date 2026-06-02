const express = require('express');
const router = express.Router();
const { getDb } = require('../middleware/db.js');
const { requireAuth } = require('../middleware/auth.js');
const nodemailer = require('nodemailer');

// POST /api/payments/upload — customer uploads receipt
router.post('/upload', requireAuth, async (req, res) => {
  try {
    const sql = getDb();
    const user = req.user;
    const { booking_id, amount, payment_method, receipt_base64, receipt_filename } = req.body;

    if (!booking_id || !amount || !receipt_base64) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Verify booking belongs to this customer
    const booking = await sql`
      SELECT b.*, u.name as customer_name, u.email as customer_email, s.name as service_name
      FROM bookings b
      JOIN users u ON u.id = b.consumer_id
      LEFT JOIN services s ON s.id = b.service_id
      WHERE b.id = ${booking_id} AND b.consumer_id = ${user.id}
    `;

    if (booking.length === 0) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    const job = booking[0];

    // Save receipt to file (in production, use cloud storage)
    const receiptRef = `RCP-${Date.now()}`;
    // For cPanel deployment, we'll store base64 in DB or save to uploads folder
    // Simplified: store reference and base64 (in production, use proper file storage)

    // Save payment record to database
    await sql`
      INSERT INTO payments (
        id, booking_id, customer_id, amount, payment_method, 
        receipt_url, receipt_filename, reference_code, status
      ) VALUES (
        gen_random_uuid()::text, ${booking_id}, ${user.id}, ${amount}, ${payment_method || 'duitnow'},
        ${receipt_base64}, ${receipt_filename || 'receipt.jpg'}, ${receiptRef}, 'pending_verification'
      )
    `;

    // Update booking payment status
    await sql`
      UPDATE bookings SET payment_status = 'receipt_uploaded' 
      WHERE id = ${booking_id}
    `;

    // Send email to admin
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B6B52; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">iPROFIXER</h1>
          <p style="color: #E0F4EE; margin: 5px 0;">Payment Receipt — Admin Verification Required</p>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #111827;">New Payment Receipt Uploaded</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: white;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Reference</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB;">${receiptRef}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Booking ID</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB;">${job.booking_number}</td>
            </tr>
            <tr style="background: white;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Customer</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB;">${job.customer_name} (${job.customer_email})</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Service</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB;">${job.service_name || 'N/A'}</td>
            </tr>
            <tr style="background: white;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Area</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB;">${job.address}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Amount Claimed</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB; color: #0B6B52; font-weight: bold; font-size: 18px;">RM ${amount}</td>
            </tr>
            <tr style="background: white;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Payment Method</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB;">${payment_method || 'DuitNow'}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 12px; border: 1px solid #E5E7EB; font-weight: bold; color: #6B7280;">Submitted At</td>
              <td style="padding: 12px; border: 1px solid #E5E7EB;">${new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })} MYT</td>
            </tr>
          </table>

          <div style="background: #FEF0E4; border-left: 4px solid #F47B20; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #111827;"><strong>Action Required:</strong> Please verify this receipt matches the booking amount of <strong>RM ${job.price}</strong> and approve or reject it in the admin panel.</p>
          </div>
        </div>

        <div style="background: #084D3C; padding: 20px; text-align: center;">
          <p style="color: #E0F4EE; margin: 0; font-size: 14px;">iPROFIXER — IPROS EDUCTECH SDN BHD</p>
          <p style="color: #9FE1CB; margin: 5px 0; font-size: 12px;">for_services@iprofixer.com.my | +03-8080 5249</p>
        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"iPROFIXER System" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `🧾 Payment Receipt Verification Required — ${receiptRef} — RM ${amount}`,
        html: emailHTML,
      });
      console.log('Admin notification email sent');
    } catch (emailErr) {
      console.error('Email failed:', emailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Receipt uploaded successfully. Admin will verify within 24 hours.',
      reference: receiptRef
    });
  } catch (err) {
    console.error('Payments upload error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/payments — get payments for current user
router.get('/', requireAuth, async (req, res) => {
  try {
    const sql = getDb();
    const user = req.user;
    const payments = await sql`
      SELECT p.*, b.booking_number, s.name as service_name, b.address
      FROM payments p
      JOIN bookings b ON b.id = p.booking_id
      LEFT JOIN services s ON s.id = b.service_id
      WHERE p.customer_id = ${user.id}
      ORDER BY p.created_at DESC
    `;
    return res.status(200).json({ success: true, payments });
  } catch (err) {
    console.error('Payments get error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/payments/admin — admin gets all pending payments
router.get('/admin', async (req, res) => {
  try {
    const sql = getDb();
    const payments = await sql`
      SELECT p.*, 
             b.booking_number, s.name as service_name, b.address, b.price as booking_amount,
             cu.name as customer_name, cu.email as customer_email,
             pu.name as professional_name, pu.email as professional_email
      FROM payments p
      JOIN bookings b ON b.id = p.booking_id
      JOIN users cu ON cu.id = p.customer_id
      LEFT JOIN services s ON s.id = b.service_id
      LEFT JOIN users pu ON pu.id = b.professional_id
      ORDER BY p.created_at DESC
    `;
    return res.status(200).json({ success: true, payments });
  } catch (err) {
    console.error('Payments admin error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/payments/approve — admin approves payment
router.put('/approve', async (req, res) => {
  try {
    const sql = getDb();
    const { payment_id, action, admin_note } = req.body;
    const commission_rate = 0.15;

    if (action === 'approve') {
      const payment = await sql`SELECT * FROM payments WHERE id = ${payment_id}`;
      if (payment.length === 0) return res.status(404).json({ success: false, error: 'Payment not found' });

      const p = payment[0];
      const commission = parseFloat((p.amount * commission_rate).toFixed(2));
      const pro_payout = parseFloat((p.amount - commission).toFixed(2));

      // Update payment status
      await sql`
        UPDATE payments SET 
          status = 'verified',
          commission_amount = ${commission},
          pro_payout_amount = ${pro_payout},
          verified_at = NOW(),
          admin_note = ${admin_note || ''}
        WHERE id = ${payment_id}
      `;

      // Update booking
      await sql`
        UPDATE bookings SET payment_status = 'verified' WHERE id = ${p.booking_id}
      `;

      // Create transaction records
      await sql`
        INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status, reference_code)
        VALUES (gen_random_uuid()::text, ${p.booking_id}, ${p.customer_id}, ${p.customer_id}, ${p.amount}, 'payment', 'completed', ${p.reference_code})
      `;

      // Get professional id
      const booking = await sql`SELECT professional_id FROM bookings WHERE id = ${p.booking_id}`;
      if (booking.length > 0 && booking[0].professional_id) {
        await sql`
          INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status, reference_code)
          VALUES (gen_random_uuid()::text, ${p.booking_id}, ${p.customer_id}, ${booking[0].professional_id}, ${pro_payout}, 'payout', 'pending', ${p.reference_code})
        `;
      }

      return res.status(200).json({
        success: true,
        message: 'Payment approved',
        commission: `RM ${commission}`,
        pro_payout: `RM ${pro_payout}` 
      });

    } else if (action === 'reject') {
      await sql`
        UPDATE payments SET 
          status = 'rejected',
          admin_note = ${admin_note || 'Receipt does not match'},
          verified_at = NOW()
        WHERE id = ${payment_id}
      `;
      await sql`
        UPDATE bookings SET payment_status = 'receipt_rejected' WHERE id = (SELECT booking_id FROM payments WHERE id = ${payment_id})
      `;
      return res.status(200).json({ success: true, message: 'Payment rejected' });
    }

    return res.status(400).json({ success: false, error: 'Invalid action' });
  } catch (err) {
    console.error('Payments approve error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
