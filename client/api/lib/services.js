const { getDb } = require('../_db.js')

module.exports = async function servicesHandler(req, res) {
  const url = req.url || ''

  if (url.includes('/health')) {
    return res.status(200).json({ success: true, message: 'iPROFIXER API running', timestamp: new Date().toISOString() })
  }

  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })

  const sql = getDb()
  const slugMatch = url.replace(/\?.*$/, '').match(/\/services\/([\w-]+)/)
  const slug = slugMatch ? slugMatch[1] : null

  if (!slug) {
    const { category } = req.query || {}
    const services = category
      ? await sql`SELECT * FROM services WHERE is_active=TRUE AND category=${category} ORDER BY name`
      : await sql`SELECT * FROM services WHERE is_active=TRUE ORDER BY category, name`
    const parsed = services.map(s => ({ ...s, features: (() => { try { return JSON.parse(s.features || '[]') } catch { return [] } })() }))
    res.setHeader('Cache-Control', 'public, max-age=3600')
    return res.json({ success: true, data: { services: parsed, all: parsed } })
  }

  const rows = await sql`SELECT * FROM services WHERE slug=${slug} AND is_active=TRUE`
  if (!rows.length) return res.status(404).json({ success: false, message: 'Service not found' })
  const svc = rows[0]
  return res.json({ success: true, data: { service: { ...svc, features: (() => { try { return JSON.parse(svc.features || '[]') } catch { return [] } })() } } })
}
