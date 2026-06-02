const { neon } = require('@neondatabase/serverless')
const crypto = require('crypto')

function generateId() { return crypto.randomUUID() }

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    const sql = neon(process.env.DATABASE_URL)

    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        base_price REAL,
        price_unit TEXT DEFAULT 'per visit',
        duration_minutes INTEGER,
        icon TEXT DEFAULT '🔧',
        features TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    const services = [
      { slug: 'home-deep-cleaning',      name: 'Home Deep Cleaning',       category: 'cleaning', description: 'Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas.',             base_price: 120, price_unit: 'per session', duration_minutes: 240, icon: '🧹', features: JSON.stringify(['Eco-friendly products', '3–8 hour packages', 'Satisfaction guaranteed']) },
      { slug: 'regular-maid-service',    name: 'Regular Maid Service',     category: 'cleaning', description: 'Flexible 4–8 hour cleaning sessions — weekly, bi-weekly or one-off bookings.',                 base_price: 80,  price_unit: 'per session', duration_minutes: 240, icon: '🏠', features: JSON.stringify(['Vetted & insured', 'Flexible scheduling', 'Cancel anytime']) },
      { slug: 'post-renovation-cleaning',name: 'Post-Renovation Cleaning', category: 'cleaning', description: 'Industrial-grade clean to remove cement dust, paint splatters and construction residue.',      base_price: 200, price_unit: 'per session', duration_minutes: 300, icon: '🔨', features: JSON.stringify(['Tile & glass polishing', 'Dust extraction equipment', 'Same-day available']) },
      { slug: 'sofa-carpet-cleaning',     name: 'Sofa & Carpet Cleaning',   category: 'cleaning', description: 'Deep extraction cleaning for sofas, mattresses, carpets and rugs — stain removal included.',     base_price: 120, price_unit: 'per piece',   duration_minutes: 120, icon: '🛋️', features: JSON.stringify(['Steam extraction', 'Stain & odour removal', 'Quick dry technology']) },
      { slug: 'post-event-cleanup',      name: 'Post-Event Cleanup',       category: 'cleaning', description: 'After your kenduri, birthday or gathering — restore your home fast.',                         base_price: 150, price_unit: 'per session', duration_minutes: 180, icon: '🎉', features: JSON.stringify(['Same-day availability', 'Waste disposal included', '2–4 hour rapid clean']) },
      { slug: 'laundry-ironing',         name: 'Laundry & Ironing',        category: 'laundry',  description: 'Wash, dry and fold — free pickup and same-day delivery to your door.',                         base_price: 3,   price_unit: 'per kg',      duration_minutes: 1440, icon: '👕', features: JSON.stringify(['Free pickup & delivery', '48-hour turnaround', 'Steam ironing available']) },
      { slug: 'part-time-maid',          name: 'Part-Time Maid',           category: 'maid',     description: '4-hour or 8-hour daily cleaning and household help by vetted maids.',                        base_price: 80,  price_unit: 'per 4 hours', duration_minutes: 240, icon: '👩', features: JSON.stringify(['Vetted & insured', 'Regular or one-time', 'All household chores']) },
    ]

    let inserted = 0
    for (const s of services) {
      const id = generateId()
      await sql`
        INSERT INTO services (id, slug, name, category, description, base_price, price_unit, duration_minutes, icon, features, is_active)
        VALUES (${id}, ${s.slug}, ${s.name}, ${s.category}, ${s.description}, ${s.base_price}, ${s.price_unit}, ${s.duration_minutes}, ${s.icon}, ${s.features}, true)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          base_price = EXCLUDED.base_price,
          icon = EXCLUDED.icon,
          is_active = true
      `
      inserted++
    }

    const all = await sql`SELECT id, slug, name, category, base_price, icon FROM services ORDER BY name`
    return res.status(200).json({ success: true, message: `Seeded ${inserted} services`, services: all })
  } catch (err) {
    console.error('Seed error:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
