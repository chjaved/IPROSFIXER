const express = require('express');
const router = express.Router();
const { getDb, initTables, generateId } = require('../middleware/db.js');
const bcrypt = require('bcryptjs');

// POST /api/seed-data - Seed demo data (users, bookings, reviews)
router.post('/', async (req, res) => {
  try {
    await initTables();
    const sql = getDb();
    const password = await bcrypt.hash('Test1234!', 10);

    // Create 10 customer accounts
    const customers = [
      { name: 'Ahmad Hafizi', email: 'ahmad.hafizi@demo.com', phone: '0123456789' },
      { name: 'Nurul Kasih', email: 'nurul.kasih@demo.com', phone: '0123456790' },
      { name: 'James Lim', email: 'james.lim@demo.com', phone: '0123456791' },
      { name: 'Priya Raj', email: 'priya.raj@demo.com', phone: '0123456792' },
      { name: 'Lily Heng', email: 'lily.heng@demo.com', phone: '0123456793' },
      { name: 'Azman Mokhtar', email: 'azman.mokhtar@demo.com', phone: '0123456794' },
      { name: 'Tan Wei Ming', email: 'tan.weiming@demo.com', phone: '0123456795' },
      { name: 'Farah Nadia', email: 'farah.nadia@demo.com', phone: '0123456796' },
      { name: 'Ravi Kumar', email: 'ravi.kumar@demo.com', phone: '0123456797' },
      { name: 'Melissa Wong', email: 'melissa.wong@demo.com', phone: '0123456798' },
    ];

    // Create 15 professional accounts
    const professionals = [
      { name: 'Siti Rahimah', email: 'siti.rahimah@demo.com', phone: '0187654321', service_category: 'Part-Time Maid / Cleaner', coverage_area: 'Petaling Jaya' },
      { name: 'Kak Mimi', email: 'kak.mimi@demo.com', phone: '0187654322', service_category: 'Part-Time Maid / Cleaner', coverage_area: 'Subang Jaya' },
      { name: 'Rohani Binti Ali', email: 'rohani.ali@demo.com', phone: '0187654323', service_category: 'Full-Time Maid', coverage_area: 'Shah Alam' },
      { name: 'Zainab Hassan', email: 'zainab.hassan@demo.com', phone: '0187654324', service_category: 'Deep Home Cleaning', coverage_area: 'Cheras' },
      { name: 'Aminah Yusof', email: 'aminah.yusof@demo.com', phone: '0187654325', service_category: 'Wash & Fold Service', coverage_area: 'Klang' },
      { name: 'Norhaida Malik', email: 'norhaida.malik@demo.com', phone: '0187654326', service_category: 'Deep Home Cleaning', coverage_area: 'Bangsar' },
      { name: 'Suraya Idris', email: 'suraya.idris@demo.com', phone: '0187654327', service_category: 'Full-Time Maid', coverage_area: 'Petaling Jaya' },
      { name: 'Halimah Daud', email: 'halimah.daud@demo.com', phone: '0187654328', service_category: 'Part-Time Maid / Cleaner', coverage_area: 'Ampang' },
      { name: 'Kartini Ahmad', email: 'kartini.ahmad@demo.com', phone: '0187654329', service_category: 'Post-Renovation Cleaning', coverage_area: 'Mont Kiara' },
      { name: 'Norzahra Said', email: 'norzahra.said@demo.com', phone: '0187654330', service_category: 'Deep Home Cleaning', coverage_area: 'Damansara' },
      { name: 'Rosnah Ismail', email: 'rosnah.ismail@demo.com', phone: '0187654331', service_category: 'Full-Time Maid', coverage_area: 'Subang Jaya' },
      { name: 'Fazilah Omar', email: 'fazilah.omar@demo.com', phone: '0187654332', service_category: 'Sofa & Upholstery Cleaning', coverage_area: 'Kuala Lumpur' },
      { name: 'Mariam Taib', email: 'mariam.taib@demo.com', phone: '0187654333', service_category: 'Wash & Fold Service', coverage_area: 'Petaling Jaya' },
      { name: 'Noraini Ghani', email: 'noraini.ghani@demo.com', phone: '0187654334', service_category: 'Part-Time Maid / Cleaner', coverage_area: 'Shah Alam' },
      { name: 'Hayati Razali', email: 'hayati.razali@demo.com', phone: '0187654335', service_category: 'Full-Time Maid', coverage_area: 'Cheras' },
    ];

    const areas = ['Petaling Jaya', 'Kuala Lumpur', 'Shah Alam', 'Subang Jaya', 'Cheras', 'Klang', 'Bangsar', 'Ampang', 'Mont Kiara', 'Damansara'];
    const addresses = [
      '12 Jalan SS2/24, Petaling Jaya', '45 Jalan Ampang, Kuala Lumpur', '8 Persiaran Setia, Shah Alam',
      '23 Jalan USJ 9, Subang Jaya', '77 Jalan Cheras, Cheras', '15 Jalan Tengku Klang, Klang',
      '5 Jalan Bangsar, Bangsar', '90 Jalan Ampang Hilir, Ampang', '3 Jalan Kiara, Mont Kiara',
      '60 Jalan Damansara, Damansara',
    ];
    const statuses = ['pending', 'accepted', 'completed', 'completed', 'completed'];
    const notes = [
      'Please bring eco-friendly products',
      'Focus on kitchen and bathrooms',
      'Have a cat at home, please be careful',
      'Need deep clean for move-in',
      'Post renovation dust everywhere',
      'Weekly regular clean',
      'Extra attention to living room',
      'Sofa and carpet need special attention',
    ];

    let customerIds = [];
    let proIds = [];

    // Insert customers
    for (const c of customers) {
      const existing = await sql`SELECT id FROM users WHERE email = ${c.email}`;
      if (existing.length > 0) {
        customerIds.push(existing[0].id);
        continue;
      }
      const id = generateId();
      await sql`
        INSERT INTO users (id, email, password_hash, name, phone, type, status)
        VALUES (${id}, ${c.email}, ${password}, ${c.name}, ${c.phone}, 'consumer', 'active')
      `;
      const cpId = generateId();
      await sql`
        INSERT INTO consumer_profiles (id, user_id)
        VALUES (${cpId}, ${id})
        ON CONFLICT (user_id) DO NOTHING
      `;
      customerIds.push(id);
    }

    // Insert professionals
    for (const p of professionals) {
      let proId;
      const existing = await sql`SELECT id FROM users WHERE email = ${p.email}`;
      if (existing.length > 0) {
        proId = existing[0].id;
      } else {
        proId = generateId();
        await sql`
          INSERT INTO users (id, email, password_hash, name, phone, type, status)
          VALUES (${proId}, ${p.email}, ${password}, ${p.name}, ${p.phone}, 'professional', 'active')
        `;
      }
      const rating = (4.5 + Math.random() * 0.5).toFixed(1);
      const expYears = Math.floor(Math.random() * 8) + 1;
      const ppId = generateId();
      await sql`
        INSERT INTO professional_profiles (id, user_id, service_category, coverage_area, experience_years, rating, is_available, bio)
        VALUES (${ppId}, ${proId}, ${p.service_category}, ${p.coverage_area}, ${expYears}, ${rating}, true, ${'Experienced ' + p.service_category + ' professional serving ' + p.coverage_area + ' and surrounding areas.'})
        ON CONFLICT (user_id) DO UPDATE SET
          service_category = EXCLUDED.service_category,
          coverage_area = EXCLUDED.coverage_area,
          experience_years = EXCLUDED.experience_years,
          rating = EXCLUDED.rating,
          bio = EXCLUDED.bio
      `;
      proIds.push(proId);
    }

    // Get services
    const services = await sql`SELECT id, name, base_price FROM services LIMIT 7`;

    // Create 30 bookings
    let bookingsCreated = 0;
    for (let i = 0; i < 30; i++) {
      const custId = customerIds[i % customerIds.length];
      const proId = proIds[i % proIds.length];
      const service = services[i % services.length];
      const status = statuses[i % statuses.length];
      const area = areas[i % areas.length];
      const address = addresses[i % addresses.length];
      const note = notes[i % notes.length];
      const ref = `IPF-2026-${String(1000 + i).padStart(4, '0')}`;
      const daysOffset = i - 15;
      const date = new Date();
      date.setDate(date.getDate() + daysOffset);
      const dateStr = date.toISOString().split('T')[0];

      const existing = await sql`SELECT id FROM bookings WHERE booking_number = ${ref}`;
      if (existing.length > 0) continue;

      const bookingId = generateId();
      await sql`
        INSERT INTO bookings (id, booking_number, consumer_id, professional_id, service_id, service_name, status, scheduled_date, scheduled_time, address, area, price, notes, whatsapp)
        VALUES (
          ${bookingId}, ${ref}, ${custId}, ${status !== 'pending' ? proId : null},
          ${service.id}, ${service.name}, ${status},
          ${dateStr}, '10:00', ${address}, ${area},
          ${service.base_price}, ${note}, '0123456789'
        )
      `;
      bookingsCreated++;

      // Create transaction for completed bookings
      if (status === 'completed') {
        const txId = generateId();
        await sql`
          INSERT INTO transactions (id, booking_id, payer_id, payee_id, amount, type, status, reference_code)
          VALUES (${txId}, ${bookingId}, ${custId}, ${proId}, ${service.base_price}, 'payment', 'completed', ${ref})
        `;
      }
    }

    // Create reviews for completed bookings
    const completedBookings = await sql`
      SELECT b.id, b.consumer_id, b.professional_id
      FROM bookings b
      WHERE b.status = 'completed'
      AND b.professional_id IS NOT NULL
      LIMIT 20
    `;

    const reviewComments = [
      'Excellent work! The house was spotless after the clean.',
      'Very professional and punctual. Will book again.',
      'Great service, very thorough cleaning.',
      'Highly recommended! Kak was very friendly and efficient.',
      'Satisfied with the results. Good value for money.',
      'The team was professional and did a great job.',
      'Very happy with the cleaning service. Will definitely use again.',
      'Post-reno cleaning was perfect. All dust gone!',
    ];

    let reviewsCreated = 0;
    for (let i = 0; i < completedBookings.length; i++) {
      const booking = completedBookings[i];
      const rating = Math.floor(Math.random() * 2) + 4;
      const existing = await sql`SELECT id FROM reviews WHERE booking_id = ${booking.id}`;
      if (existing.length > 0) continue;
      const reviewId = generateId();
      await sql`
        INSERT INTO reviews (id, booking_id, consumer_id, professional_id, rating, comment)
        VALUES (${reviewId}, ${booking.id}, ${booking.consumer_id}, ${booking.professional_id}, ${rating}, ${reviewComments[i % reviewComments.length]})
      `;
      reviewsCreated++;
    }

    // Update professional ratings and total_jobs
    for (const proId of proIds) {
      await sql`
        UPDATE professional_profiles
        SET rating = (
          SELECT COALESCE(AVG(rating), 5.0) FROM reviews WHERE professional_id = ${proId}
        ),
        total_jobs = (
          SELECT COUNT(*) FROM bookings WHERE professional_id = ${proId} AND status = 'completed'
        )
        WHERE user_id = ${proId}
      `;
    }

    return res.status(200).json({
      success: true,
      message: 'Demo data seeded successfully',
      data: {
        customers_created: customerIds.length,
        professionals_created: proIds.length,
        bookings_created: bookingsCreated,
        reviews_created: reviewsCreated,
      }
    });

  } catch (err) {
    console.error('Seed-data error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
