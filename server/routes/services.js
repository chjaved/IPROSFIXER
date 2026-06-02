const express = require('express');
const router = express.Router();
const { getDb, initTables } = require('../middleware/db.js');

let tablesReady = false;
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true; }
}

// GET /api/services - List all services
router.get('/', async (req, res) => {
  try {
    await ensureTables();
    const sql = getDb();
    const { category } = req.query || {};
    const services = category
      ? await sql`SELECT * FROM services WHERE is_active=TRUE AND category=${category} ORDER BY name`
      : await sql`SELECT * FROM services WHERE is_active=TRUE ORDER BY category, name`;

    const parsed = services.map(s => ({
      ...s,
      features: (() => { try { return JSON.parse(s.features || '[]') } catch { return [] } })()
    }));

    return res.json({ success: true, data: { services: parsed, all: parsed } });
  } catch (err) {
    console.error('Services error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// GET /api/services/:slug - Get service by slug
router.get('/:slug', async (req, res) => {
  try {
    await ensureTables();
    const sql = getDb();
    const slug = req.params.slug;
    const rows = await sql`SELECT * FROM services WHERE slug=${slug} AND is_active=TRUE`;
    if (!rows.length) return res.status(404).json({ success: false, message: 'Service not found' });
    const svc = rows[0];
    return res.json({ success: true, data: { service: { ...svc, features: (() => { try { return JSON.parse(svc.features||'[]') } catch { return [] } })() } } });
  } catch (err) {
    console.error('Service detail error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

module.exports = router;
