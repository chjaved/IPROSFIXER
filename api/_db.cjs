const Database = require('better-sqlite3')
const path = require('path')
const crypto = require('crypto')

const DB_PATH = process.env.DB_PATH || path.join('/tmp', 'iprofixer.db')

let db = null

function getDb() {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    initTables()
  }
  return db
}

function initTables() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT,
      type TEXT NOT NULL CHECK(type IN ('consumer', 'professional')),
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'suspended', 'deleted')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Professional profiles
  db.exec(`
    CREATE TABLE IF NOT EXISTS professional_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      service_types TEXT, -- JSON array
      areas TEXT, -- JSON array
      experience_years INTEGER,
      id_verified BOOLEAN DEFAULT FALSE,
      background_checked BOOLEAN DEFAULT FALSE,
      rating REAL DEFAULT 0,
      total_jobs INTEGER DEFAULT 0,
      bio TEXT,
      documents TEXT, -- JSON array of document URLs
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  // Consumer profiles
  db.exec(`
    CREATE TABLE IF NOT EXISTS consumer_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      addresses TEXT, -- JSON array
      loyalty_points INTEGER DEFAULT 0,
      total_bookings INTEGER DEFAULT 0,
      total_spent REAL DEFAULT 0,
      preferred_services TEXT, -- JSON array
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  // Services catalog
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      base_price REAL,
      price_unit TEXT,
      duration_minutes INTEGER,
      image_url TEXT,
      features TEXT, -- JSON array
      is_active BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Bookings
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      booking_number TEXT UNIQUE NOT NULL,
      consumer_id TEXT NOT NULL,
      professional_id TEXT,
      service_id TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
      scheduled_date DATE NOT NULL,
      scheduled_time TIME NOT NULL,
      address TEXT NOT NULL,
      price REAL NOT NULL,
      notes TEXT,
      cancellation_reason TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (consumer_id) REFERENCES users(id),
      FOREIGN KEY (professional_id) REFERENCES users(id),
      FOREIGN KEY (service_id) REFERENCES services(id)
    )
  `)

  // Transactions / Payments
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL,
      payer_id TEXT NOT NULL,
      payee_id TEXT,
      amount REAL NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('payment', 'refund', 'payout')),
      method TEXT, -- cash, duitnow, tng, grabpay, card
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'failed', 'refunded')),
      reference_code TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id),
      FOREIGN KEY (payer_id) REFERENCES users(id),
      FOREIGN KEY (payee_id) REFERENCES users(id)
    )
  `)

  // Reviews
  db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      booking_id TEXT NOT NULL UNIQUE,
      consumer_id TEXT NOT NULL,
      professional_id TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      comment TEXT,
      is_public BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id),
      FOREIGN KEY (consumer_id) REFERENCES users(id),
      FOREIGN KEY (professional_id) REFERENCES users(id)
    )
  `)

  // Professional availability schedule
  db.exec(`
    CREATE TABLE IF NOT EXISTS professional_schedules (
      id TEXT PRIMARY KEY,
      professional_id TEXT NOT NULL,
      day_of_week INTEGER NOT NULL CHECK(day_of_week >= 0 AND day_of_week <= 6),
      start_time TIME,
      end_time TIME,
      is_available BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (professional_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `)

  // Create indexes
  db.exec(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_users_type ON users(type)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_bookings_consumer ON bookings(consumer_id)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_bookings_professional ON bookings(professional_id)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_transactions_booking ON transactions(booking_id)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_reviews_professional ON reviews(professional_id)`)

  // Insert default services if none exist
  const count = db.prepare('SELECT COUNT(*) as count FROM services').get()
  if (count.count === 0) {
    insertDefaultServices()
  }
}

function insertDefaultServices() {
  const services = [
    {
      id: generateId(),
      slug: 'home-deep-cleaning',
      name: 'Home Deep Cleaning',
      category: 'cleaning',
      description: 'Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas.',
      base_price: 350,
      price_unit: 'per session',
      duration_minutes: 240,
      image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      features: JSON.stringify(['Eco-friendly products', '3-8 hour packages', 'Satisfaction guaranteed'])
    },
    {
      id: generateId(),
      slug: 'kitchen-deep-clean',
      name: 'Kitchen Deep Clean',
      category: 'cleaning',
      description: 'Complete kitchen transformation with grease removal, cabinet wipe-down, appliance cleaning.',
      base_price: 250,
      price_unit: 'per session',
      duration_minutes: 180,
      image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      features: JSON.stringify(['Degreaser treatment', 'All surfaces covered', 'Odour elimination'])
    },
    {
      id: generateId(),
      slug: 'bathroom-deep-clean',
      name: 'Bathroom Deep Clean',
      category: 'cleaning',
      description: 'Complete bathroom sanitisation with tile scrubbing, limescale removal, toilet sanitising.',
      base_price: 180,
      price_unit: 'per session',
      duration_minutes: 120,
      image_url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      features: JSON.stringify(['Anti-bacterial treatment', 'Grout cleaning', 'Streak-free mirrors'])
    },
    {
      id: generateId(),
      slug: 'ac-service-repair',
      name: 'AC Service & Repair',
      category: 'repair',
      description: 'Complete AC servicing including cleaning, gas refill, and repairs.',
      base_price: 150,
      price_unit: 'per unit',
      duration_minutes: 90,
      image_url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
      features: JSON.stringify(['Chemical cleaning', 'Gas refill available', 'All brands serviced'])
    },
    {
      id: generateId(),
      slug: 'plumbing-repair',
      name: 'Plumbing Repair',
      category: 'repair',
      description: 'Fix leaks, clogs, pipe repairs, and fixture installations.',
      base_price: 120,
      price_unit: 'per hour',
      duration_minutes: 60,
      image_url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80',
      features: JSON.stringify(['Leak detection', 'Pipe repairs', 'Fixture installation'])
    },
    {
      id: generateId(),
      slug: 'electrical-works',
      name: 'Electrical Works',
      category: 'repair',
      description: 'Wiring, installations, repairs, and electrical safety checks.',
      base_price: 100,
      price_unit: 'per hour',
      duration_minutes: 60,
      image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
      features: JSON.stringify(['Wiring installation', 'Switch repairs', 'Safety certified'])
    },
    {
      id: generateId(),
      slug: 'part-time-maid',
      name: 'Part-Time Maid',
      category: 'maid',
      description: '4-hour or 8-hour daily cleaning and household help.',
      base_price: 80,
      price_unit: 'per 4 hours',
      duration_minutes: 240,
      image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
      features: JSON.stringify(['Vetted maids', 'Regular or one-time', 'All household chores'])
    },
    {
      id: generateId(),
      slug: 'laundry-service',
      name: 'Laundry & Ironing',
      category: 'laundry',
      description: 'Wash, dry, fold, and ironing services at your doorstep.',
      base_price: 3,
      price_unit: 'per kg',
      duration_minutes: 1440,
      image_url: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=600&q=80',
      features: JSON.stringify(['Free pickup', '48-hour delivery', 'Steam ironing available'])
    },
    {
      id: generateId(),
      slug: 'sofa-cleaning',
      name: 'Sofa & Carpet Cleaning',
      category: 'cleaning',
      description: 'Deep cleaning for sofas, mattresses, and carpets.',
      base_price: 120,
      price_unit: 'per piece',
      duration_minutes: 120,
      image_url: 'https://images.unsplash.com/photo-1558317374-a354d5f6d4da?w=600&q=80',
      features: JSON.stringify(['Steam cleaning', 'Stain removal', 'Quick dry'])
    },
    {
      id: generateId(),
      slug: 'post-event-cleanup',
      name: 'Post-Event Cleanup',
      category: 'cleaning',
      description: 'Complete cleanup after parties, events, or gatherings.',
      base_price: 400,
      price_unit: 'per session',
      duration_minutes: 300,
      image_url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
      features: JSON.stringify(['Same-day service', 'All venue types', 'Waste disposal included'])
    }
  ]

  const insert = db.prepare(`
    INSERT INTO services (id, slug, name, category, description, base_price, price_unit, duration_minutes, image_url, features)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  for (const s of services) {
    insert.run(s.id, s.slug, s.name, s.category, s.description, s.base_price, s.price_unit, s.duration_minutes, s.image_url, s.features)
  }
}

function generateId() {
  return crypto.randomUUID()
}

module.exports = { getDb, generateId }
