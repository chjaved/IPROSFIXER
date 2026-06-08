const { neon } = require('@neondatabase/serverless');
const { put } = require('@vercel/blob');
const { verifyToken, adminMiddleware } = require('./_auth.js');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);
  const url = req.url || '';

  try {
    // POST /api/payments/upload — customer uploads receipt
    if (req.method === 'POST' && url.includes('/upload')) {
      const user = verifyToken(req);
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
        WHERE b.id = ${booking_id} AND b.consumer_id = ${user.userId}
      `;

      if (booking.length === 0) {
        return res.status(404).json({ success: false, error: 'Booking not found' });
      }

      const job = booking[0];

      // Save receipt to Vercel Blob
      const buffer = Buffer.from(receipt_base64, 'base64');
      const filename = `receipts/${booking_id}_${Date.now()}_${receipt_filename || 'receipt.jpg'}`;
      const blob = await put(filename, buffer, { access: 'public' });

      // Save payment record to database
      const receiptRef = `RCP-${Date.now()}`;
      await sql`
        INSERT INTO payments (
          id, booking_id, customer_id, amount, payment_method, 
          receipt_url, receipt_filename, reference_code, status
        ) VALUES (
          gen_random_uuid()::text, ${booking_id}, ${user.userId}, ${amount}, ${payment_method || 'duitnow'},
          ${blob.url}, ${receipt_filename || 'receipt.jpg'}, ${receiptRef}, 'pending_verification'
        )
      `;

      // Update booking payment status
      await sql`
        UPDATE bookings SET payment_status = 'receipt_uploaded' 
        WHERE id = ${booking_id}
      `;

      // Send email to admin
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_EMAIL_PASSWORD
        }
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

            <div style="background: white; border: 2px solid #0B6B52; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #0B6B52; margin-top: 0;">Payment Receipt Image</h3>
              <img src="${blob.url}" style="max-width: 100%; border-radius: 4px;" alt="Payment Receipt" />
            </div>

            <div style="background: #FEF0E4; border-left: 4px solid #F47B20; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #111827;"><strong>Action Required:</strong> Please verify this receipt matches the booking amount of <strong>RM ${job.price}</strong> and approve or reject it in the admin panel.</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://iprosfixer.vercel.app/admin/payments" 
                 style="background: #0B6B52; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Open Admin Panel to Verify
              </a>
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
          from: `"iPROFIXER System" <${process.env.ADMIN_EMAIL}>`,
          to: 'for_services@iprofixer.com.my',
          subject: `🧾 Payment Receipt Verification Required — ${receiptRef} — RM ${amount}`,
          html: emailHTML,
        });
        console.log('Admin notification email sent');
      } catch (emailErr) {
        console.error('Email failed:', emailErr.message);
        // Don't fail the request if email fails
      }

      return res.status(200).json({
        success: true,
        message: 'Receipt uploaded successfully. Admin will verify within 24 hours.',
        reference: receiptRef,
        receipt_url: blob.url
      });
    }

    // GET /api/payments — get payments for current user
    if (req.method === 'GET' && !url.includes('/admin')) {
      const user = verifyToken(req);
      const payments = await sql`
        SELECT p.*, b.booking_number, s.name as service_name, b.address
        FROM payments p
        JOIN bookings b ON b.id = p.booking_id
        LEFT JOIN services s ON s.id = b.service_id
        WHERE p.customer_id = ${user.userId}
        ORDER BY p.created_at DESC
      `;
      return res.status(200).json({ success: true, payments });
    }

    // GET /api/payments/admin — admin gets all pending payments
    if (req.method === 'GET' && url.includes('/admin')) {
      if (!(await adminMiddleware(req, res))) return;
      
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
    }

    // PUT /api/payments/approve — admin approves payment
    if (req.method === 'PUT' && url.includes('/approve')) {
      if (!(await adminMiddleware(req, res))) return;
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
    }

    return res.status(404).json({ success: false, error: 'Route not found' });

  } catch (err) {
    console.error('Payments error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
