const { neon } = require('@neondatabase/serverless')
const crypto = require('crypto')

let sql = null
let envError = null

// Lazy initialization - check env vars when first connecting
function initDb() {
  if (sql) return sql
  
  if (!process.env.DATABASE_URL) {
    envError = 'DATABASE_URL environment variable is required'
    console.error(`[DB] ${envError}`)
    return null
  }
  if (!process.env.JWT_SECRET) {
    envError = 'JWT_SECRET environment variable is required'
    console.error(`[DB] ${envError}`)
    return null
  }
  
  // Connection pooling with Neon
  sql = neon(process.env.DATABASE_URL, {
    fetchConnectionCache: true
  })
  
  return sql
}

function getDb() {
  const db = initDb()
  if (!db) {
    throw new Error(envError || 'Database not initialized')
  }
  return db
}

function checkEnvVars() {
  return {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasJwtSecret: !!process.env.JWT_SECRET,
    error: envError
  }
}

// Sanitize user object - remove sensitive fields
function sanitizeUser(user) {
  if (!user) return null
  const { password_hash, password, ...safe } = user
  return safe
}

module.exports = { getDb, initTables, generateId, sanitizeUser, checkEnvVars }

async function initTables() {
  const sql = getDb()

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      whatsapp TEXT,
      type TEXT NOT NULL CHECK(type IN ('consumer', 'professional')),
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'suspended', 'deleted')),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS professional_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      service_category TEXT,
      coverage_area TEXT,
      experience_years INTEGER DEFAULT 0,
      is_available BOOLEAN DEFAULT TRUE,
      rating REAL DEFAULT 5.0,
      total_jobs INTEGER DEFAULT 0,
      bio TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS consumer_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      loyalty_points INTEGER DEFAULT 0,
      total_bookings INTEGER DEFAULT 0,
      total_spent REAL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

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

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      booking_number TEXT UNIQUE NOT NULL,
      consumer_id TEXT NOT NULL,
      professional_id TEXT,
      service_id TEXT NOT NULL,
      service_name TEXT,
      status TEXT DEFAULT 'pending',
      scheduled_date DATE NOT NULL,
      scheduled_time TIME NOT NULL,
      address TEXT NOT NULL,
      area TEXT,
      price REAL NOT NULL,
      notes TEXT,
      whatsapp TEXT,
      cancellation_reason TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      payer_id TEXT NOT NULL,
      payee_id TEXT,
      amount REAL NOT NULL,
      type TEXT NOT NULL DEFAULT 'payment',
      method TEXT,
      status TEXT DEFAULT 'completed',
      reference_code TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL UNIQUE,
      consumer_id TEXT NOT NULL,
      professional_id TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      is_public BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      message TEXT,
      response TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  // Create database indexes for performance
  await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`
  await sql`CREATE INDEX IF NOT EXISTS idx_bookings_consumer_id ON bookings(consumer_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_bookings_professional_id ON bookings(professional_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`
  await sql`CREATE INDEX IF NOT EXISTS idx_reviews_professional_id ON reviews(professional_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_transactions_payee_id ON transactions(payee_id)`
  await sql`CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug)`
  await sql`CREATE INDEX IF NOT EXISTS idx_services_category ON services(category)`

  // Add payment_status column to bookings if not exists
  await sql`
    ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'unpaid'
  `

  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      booking_id TEXT REFERENCES bookings(id),
      customer_id TEXT REFERENCES users(id),
      amount REAL NOT NULL,
      payment_method VARCHAR(50) DEFAULT 'duitnow',
      receipt_url TEXT,
      receipt_filename TEXT,
      reference_code VARCHAR(100) UNIQUE,
      status VARCHAR(50) DEFAULT 'pending_verification',
      commission_amount REAL,
      pro_payout_amount REAL,
      admin_note TEXT,
      verified_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  // Seed default services if empty
  const existing = await sql`SELECT COUNT(*) as count FROM services`
  if (parseInt(existing[0].count) === 0) {
    await seedServices(sql)
  }
}

async function seedServices(sql) {
  const services = [
    { slug: 'home-deep-cleaning',  name: 'Home Deep Cleaning',    category: 'cleaning', description: 'Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas.',         base_price: 350, price_unit: 'per session', duration_minutes: 240, icon: '🧹', features: JSON.stringify(['Eco-friendly products', '3–8 hour packages', 'Satisfaction guaranteed']) },
    { slug: 'ac-service-repair',   name: 'AC Service & Repair',   category: 'repair',   description: 'Complete AC servicing including cleaning, gas refill, and fault repairs for all brands.',   base_price: 150, price_unit: 'per unit',    duration_minutes: 90,  icon: '❄️', features: JSON.stringify(['Chemical cleaning', 'Gas refill available', 'All brands serviced']) },
    { slug: 'electrical-works',    name: 'Electrical Works',      category: 'repair',   description: 'Licensed electricians for wiring, trips, new points and safety inspections.',               base_price: 100, price_unit: 'per hour',    duration_minutes: 60,  icon: '⚡', features: JSON.stringify(['Wiring installation', 'Circuit repairs', 'Safety certified']) },
    { slug: 'plumbing-repair',     name: 'Plumbing Repair',       category: 'repair',   description: 'Fix leaks, clogs, pipe repairs, and fixture installations same-day.',                       base_price: 120, price_unit: 'per hour',    duration_minutes: 60,  icon: '🔧', features: JSON.stringify(['Leak detection', 'Pipe repairs', 'Fixture installation']) },
    { slug: 'part-time-maid',      name: 'Part-Time Maid',        category: 'maid',     description: '4-hour or 8-hour daily cleaning and household help by vetted maids.',                       base_price: 80,  price_unit: 'per 4 hours', duration_minutes: 240, icon: '🏠', features: JSON.stringify(['Vetted & insured', 'Regular or one-time', 'All household chores']) },
    { slug: 'laundry-service',     name: 'Laundry & Ironing',     category: 'laundry',  description: 'Wash, dry, fold and iron — free pickup and same-day delivery to your door.',                base_price: 3,   price_unit: 'per kg',      duration_minutes: 1440,icon: '👕', features: JSON.stringify(['Free pickup & delivery', '48-hour turnaround', 'Steam ironing available']) },
    { slug: 'sofa-carpet-clean',   name: 'Sofa & Carpet Cleaning',category: 'cleaning', description: 'Deep extraction cleaning for sofas, mattresses, carpets and rugs — stain removal included.', base_price: 120, price_unit: 'per piece',   duration_minutes: 120, icon: '🛋️', features: JSON.stringify(['Steam extraction', 'Stain & odour removal', 'Quick dry technology']) },
    { slug: 'appliance-repair',    name: 'Appliance Repair',      category: 'repair',   description: 'Fridge, washing machine, oven and dryer repair by certified technicians.',                  base_price: 90,  price_unit: 'per visit',   duration_minutes: 90,  icon: '🔌', features: JSON.stringify(['All major brands', 'On-site diagnosis', '30-day repair warranty']) },
    { slug: 'caregiver',           name: 'Caregiver',             category: 'care',     description: 'Trained and compassionate caregivers for elderly family members — hourly or live-in.',       base_price: 25,  price_unit: 'per hour',    duration_minutes: 240, icon: '🤲', features: JSON.stringify(['Trained & certified', 'Elder care specialists', 'Daily or live-in options']) },
    { slug: 'post-event-cleanup',  name: 'Post-Event Cleanup',    category: 'cleaning', description: 'Complete cleanup after weddings, parties or gatherings — any venue type.',                   base_price: 400, price_unit: 'per session', duration_minutes: 300, icon: '🎉', features: JSON.stringify(['Same-day service', 'All venue types', 'Waste disposal included']) },
  ]

  for (const s of services) {
    const id = generateId()
    await sql`
      INSERT INTO services (id, slug, name, category, description, base_price, price_unit, duration_minutes, icon, features)
      VALUES (${id}, ${s.slug}, ${s.name}, ${s.category}, ${s.description}, ${s.base_price}, ${s.price_unit}, ${s.duration_minutes}, ${s.icon}, ${s.features})
      ON CONFLICT (slug) DO NOTHING
    `
  }
}

function generateId() {
  return crypto.randomUUID()
}

module.exports = { getDb, initTables, generateId, sanitizeUser }
