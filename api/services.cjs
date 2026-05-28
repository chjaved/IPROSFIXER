const { getDb, initTables } = require('./_db.cjs')

let tablesReady = false
async function ensureTables() {
  if (!tablesReady) { await initTables(); tablesReady = true }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    await ensureTables()
    const sql = getDb()
    const { pathname } = new URL(req.url, `http://${req.headers.host}`)
    const path = pathname.replace('/api/services', '')

    if (path === '' || path === '/') {
      const { category } = req.query || {}
      const services = category
        ? await sql`SELECT * FROM services WHERE is_active=TRUE AND category=${category} ORDER BY name`
        : await sql`SELECT * FROM services WHERE is_active=TRUE ORDER BY category, name`

      const parsed = services.map(s => ({
        ...s,
        features: (() => { try { return JSON.parse(s.features || '[]') } catch { return [] } })()
      }))

      // Flutter BookingProvider reads data.services[] OR data.data[] — provide both
      return res.json({ success: true, data: { services: parsed, all: parsed } })
    }

    // GET /api/services/:slug
    const slug = path.replace('/', '')
    const rows = await sql`SELECT * FROM services WHERE slug=${slug} AND is_active=TRUE`
    if (!rows.length) return res.status(404).json({ success: false, message: 'Service not found' })
    const svc = rows[0]
    return res.json({ success: true, data: { service: { ...svc, features: (() => { try { return JSON.parse(svc.features||'[]') } catch { return [] } })() } } })

  } catch (err) {
    console.error('Services error:', err)
    return res.status(500).json({ success: false, message: err.message || 'Server error' })
  }
}
