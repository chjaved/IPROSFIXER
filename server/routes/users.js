const express = require('express');
const router = express.Router();
const { getDb, initTables } = require('../middleware/db.js');
const { authMiddleware } = require('../middleware/auth.js');

let tablesReady = false;
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true; }
}

// GET /api/users/me - Get current user profile
router.get('/me', async (req, res) => {
  try {
    await ensureTables();
    const ok = await authMiddleware(req, res);
    if (!ok) return;
    
    const userId = req.user.id;
    const sql = getDb();
    const rows = await sql`SELECT id, email, name, phone, whatsapp, type, created_at FROM users WHERE id = ${userId}`;
    const user = rows[0];
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const base = { ...user, role: user.type };

    if (user.type === 'professional') {
      const pp = await sql`SELECT * FROM professional_profiles WHERE user_id = ${userId}`;
      return res.json({ success: true, user: { ...base, professional_profile: pp[0] || {} } });
    }
    return res.json({ success: true, user: base });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// PUT /api/users/me - Update current user profile
router.put('/me', async (req, res) => {
  try {
    await ensureTables();
    const ok = await authMiddleware(req, res);
    if (!ok) return;
    
    const userId = req.user.id;
    const { name, phone, whatsapp, address, city, postcode, service_category, coverage_area, bio, experience_years } = req.body || {};
    const sql = getDb();

    if (name)     await sql`UPDATE users SET name = ${name}, updated_at = NOW() WHERE id = ${userId}`;
    if (phone)    await sql`UPDATE users SET phone = ${phone}, updated_at = NOW() WHERE id = ${userId}`;
    if (whatsapp) await sql`UPDATE users SET whatsapp = ${whatsapp}, updated_at = NOW() WHERE id = ${userId}`;

    if (req.user.type === 'professional') {
      if (service_category) await sql`UPDATE professional_profiles SET service_category = ${service_category}, updated_at = NOW() WHERE user_id = ${userId}`;
      if (coverage_area)    await sql`UPDATE professional_profiles SET coverage_area = ${coverage_area}, updated_at = NOW() WHERE user_id = ${userId}`;
      if (bio != null)      await sql`UPDATE professional_profiles SET bio = ${bio}, updated_at = NOW() WHERE user_id = ${userId}`;
      if (experience_years != null) await sql`UPDATE professional_profiles SET experience_years = ${experience_years}, updated_at = NOW() WHERE user_id = ${userId}`;
    }

    const rows = await sql`SELECT id, email, name, phone, whatsapp, type FROM users WHERE id = ${userId}`;
    const u = rows[0];
    return res.json({ success: true, message: 'Profile updated successfully', user: { ...u, role: u.type } });
  } catch (err) {
    console.error('Update profile error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// GET /api/users/me/dashboard - Get dashboard stats
router.get('/me/dashboard', async (req, res) => {
  try {
    await ensureTables();
    const ok = await authMiddleware(req, res);
    if (!ok) return;
    
    const userId = req.user.id;
    const userType = req.user.type;
    const sql = getDb();

    if (userType === 'consumer') {
      const stats = await sql`
        SELECT COUNT(*) as total_bookings,
          SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed_bookings,
          SUM(CASE WHEN status IN ('pending','confirmed') THEN 1 ELSE 0 END) as upcoming_bookings,
          SUM(CASE WHEN status='completed' THEN price ELSE 0 END) as total_spent
        FROM bookings WHERE consumer_id = ${userId}
      `;
      const recentBookings = await sql`
        SELECT b.*, s.name as service_name, u.name as professional_name
        FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.professional_id=u.id
        WHERE b.consumer_id = ${userId} ORDER BY b.created_at DESC LIMIT 5
      `;
      const s = stats[0];
      return res.json({ success: true, data: {
        stats: { totalBookings: parseInt(s.total_bookings)||0, completedBookings: parseInt(s.completed_bookings)||0,
          upcomingBookings: parseInt(s.upcoming_bookings)||0, totalSpent: parseFloat(s.total_spent)||0 },
        recentBookings
      }});
    } else {
      const stats = await sql`
        SELECT COUNT(*) as total_jobs,
          SUM(CASE WHEN status='completed' THEN 1 ELSE 0 END) as completed_jobs,
          SUM(CASE WHEN status IN ('pending','confirmed') THEN 1 ELSE 0 END) as pending_jobs,
          SUM(CASE WHEN status='completed' THEN price ELSE 0 END) as total_earnings
        FROM bookings WHERE professional_id = ${userId}
      `;
      const recentJobs = await sql`
        SELECT b.*, s.name as service_name, u.name as customer_name
        FROM bookings b LEFT JOIN services s ON b.service_id=s.id LEFT JOIN users u ON b.consumer_id=u.id
        WHERE b.professional_id = ${userId} ORDER BY b.created_at DESC LIMIT 5
      `;
      const avgRating = await sql`SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM reviews WHERE professional_id = ${userId}`;
      const s = stats[0]; const r = avgRating[0];
      return res.json({ success: true, data: {
        stats: { totalJobs: parseInt(s.total_jobs)||0, completedJobs: parseInt(s.completed_jobs)||0,
          pendingJobs: parseInt(s.pending_jobs)||0, totalEarnings: parseFloat(s.total_earnings)||0,
          rating: Math.round((parseFloat(r.avg_rating)||0)*10)/10, totalReviews: parseInt(r.total_reviews)||0 },
        recentJobs
      }});
    }
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// GET /api/users/professionals - List all professionals
router.get('/professionals', async (req, res) => {
  try {
    await ensureTables();
    const sql = getDb();
    const rows = await sql`
      SELECT u.id, u.name, u.phone, pp.service_category, pp.coverage_area, pp.experience_years, pp.rating, pp.total_jobs, pp.is_available
      FROM users u JOIN professional_profiles pp ON u.id=pp.user_id
      WHERE u.type='professional' AND u.status='active' ORDER BY pp.rating DESC
    `;
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('List professionals error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

module.exports = router;
