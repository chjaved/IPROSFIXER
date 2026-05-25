import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Star, ArrowRight, Phone, MapPin, Mail } from 'lucide-react'
import AppBadges from '../components/AppBadges.jsx'

/* ─── REAL PHOTO URLs (Unsplash — free, no auth needed) ─────────────────────── */
const PHOTOS = {
  hero:        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80', // electrician working
  electrician: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', // electrician panel
  acRepair:    'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=800&q=80', // AC unit
  cleaning:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',   // house cleaning
  caregiver:   'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80', // caregiver
  booking:     'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',   // using phone/app
  team:        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80', // team/professionals
  review1:     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  review2:     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  review3:     'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  review4:     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  review5:     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  review6:     'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
}

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const STATS = [
  { num: '9,641+', label: 'Jobs Matched' },
  { num: '98%',    label: 'Client Satisfaction' },
  { num: '500+',   label: 'Pro Vendors Listed' },
  { num: '2 Min',  label: 'Avg. Booking Time' },
]

const PHOTOS_CLEANING = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
]

const SERVICES = [
  { img: PHOTOS_CLEANING[0], tag: 'DEEP CLEAN',     title: 'Home Deep Clean',          desc: 'Browse & hire vetted deep-clean specialists near you — compare ratings, prices and availability.' },
  { img: PHOTOS_CLEANING[1], tag: 'HOUSEKEEPING',   title: 'Regular Maid Service',     desc: 'Find trusted part-time maids in your area — weekly, bi-weekly or one-off. All independently listed.' },
  { img: PHOTOS_CLEANING[2], tag: 'SOFA & CARPET',  title: 'Sofa & Carpet Cleaning',   desc: 'Connect with certified upholstery specialists. Compare quotes and book directly through the app.' },
  { img: PHOTOS_CLEANING[3], tag: 'POST-RENO',      title: 'Post-Renovation Clean',    desc: 'Hire vetted post-reno cleaning pros who list their services on the iPROFIXER marketplace.' },
]

const FEATURES = [
  {
    tag: 'FOR CLIENTS',
    title: 'Find & Book Any Cleaning Pro Near You',
    desc: 'Browse hundreds of independently listed cleaning professionals. Compare ratings, reviews and prices — then book instantly in 2 minutes.',
    bullets: ['Same-day & scheduled bookings', 'Compare quotes from multiple vendors', 'Fixed prices — no hidden fees'],
    link: '/services',
    img: PHOTOS.booking,
    imgAlt: 'Client booking a professional on the app',
  },
  {
    tag: 'FOR PROFESSIONALS',
    title: 'List Your Cleaning Business. Grow Your Client Base.',
    desc: 'iPROFIXER is an open marketplace. Register as a cleaning vendor, set your own prices and availability, and get matched with clients in your city.',
    bullets: ['Free to list — no joining fee', 'Set your own prices & schedule', 'Get paid directly after each job'],
    link: '/for-professionals',
    img: PHOTOS.team,
    imgAlt: 'Professional cleaning vendor',
  },
  {
    tag: 'PLATFORM TRUST',
    title: 'Every Vendor is Vetted Before They List',
    desc: 'We verify every professional on the platform. Background checks, IC verification, skills assessment and insurance before they can accept bookings.',
    bullets: ['Background & IC check', 'Skills assessment & certification', 'Personal accident insurance on every job'],
    link: '/about',
    img: PHOTOS.team,
    imgAlt: 'iPROFIXER verified platform',
  },
  {
    tag: 'LOYALTY REWARDS',
    title: 'Earn Points on Every Booking.',
    desc: 'Every booking through the platform earns you iPRO Points. Redeem for discounts, free bookings or priority matching with top-rated vendors.',
    bullets: ['Points on every booking', 'Redeem for free bookings', 'VIP priority matching for members'],
    link: '/contact',
    img: PHOTOS.cleaning,
    imgAlt: 'Happy client after cleaning service',
  },
]

const TESTIMONIALS = [
  { photo: PHOTOS.review1, name: 'Ahmad Hafizi',  loc: 'Petaling Jaya',  text: 'Booked a full home deep clean after moving in. The team arrived on time and the house was spotless. Highly recommend!' },
  { photo: PHOTOS.review2, name: 'Raj Kumar',     loc: 'Cheras',          text: 'Post-reno cleaning was incredible. Cement dust gone, tiles polished. Could not believe how good it looked after.' },
  { photo: PHOTOS.review3, name: 'Nurul Kasih',   loc: 'Ara Damansara',   text: 'My weekly cleaner Kak Siti is amazing. Same person every week, knows exactly how I like things. 10/10.' },
  { photo: PHOTOS.review4, name: 'James Lim',     loc: 'Bangsar South',   text: 'Sofa extraction cleaning was worth every ringgit. Stains I thought were permanent just vanished. Super professional.' },
  { photo: PHOTOS.review5, name: 'Lily Heng',     loc: 'Subang Jaya',     text: 'Booked post-event cleanup after my daughter\'s birthday party. 2 hours and the house was back to normal. Lifesaver!' },
  { photo: PHOTOS.review6, name: 'Azman Mokhtar', loc: 'Shah Alam',       text: 'Weekly cleaning subscription is the best thing I found this year. Consistent quality and always eco-friendly products.' },
]

const BIG_CITIES = [
  { name: 'Kuala Lumpur',  tag: 'KL' },
  { name: 'Petaling Jaya', tag: 'PJ' },
  { name: 'Subang Jaya',   tag: 'SJ' },
  { name: 'Shah Alam',     tag: 'SA' },
  { name: 'Cheras',        tag: 'CH' },
  { name: 'Klang',         tag: 'KG' },
  { name: 'Putrajaya',     tag: 'PJ' },
  { name: 'Cyberjaya',     tag: 'CJ' },
  { name: 'Ampang',        tag: 'AM' },
  { name: 'Bangsar',       tag: 'BS' },
  { name: 'Mont Kiara',    tag: 'MK' },
  { name: 'Damansara',     tag: 'DM' },
]

const FAQS = [
  { q: 'Is iPROFIXER a cleaning company?',    a: 'No — we are a marketplace platform. We connect clients who need cleaning services with independent professional vendors. The pros are not our employees.' },
  { q: 'How do I find and book a cleaner?',   a: 'Download the iPROFIXER app, browse listed vendors by service type and city, compare ratings and prices, then book directly in the app.' },
  { q: 'How do I list my cleaning business?', a: 'Visit our For Professionals page or WhatsApp us. Set up your vendor profile, list your services and pricing, and start receiving booking requests. No joining fee.' },
  { q: 'What payment methods are accepted?', a: 'Cash, DuitNow, TnG eWallet and GrabPay. Clients pay the vendor directly after job completion — no upfront deposits.' },
  { q: 'Which cities is the marketplace active in?', a: 'Kuala Lumpur, Petaling Jaya, Subang Jaya, Shah Alam, Cheras, Klang, Putrajaya, Cyberjaya, Ampang, Bangsar, Mont Kiara and Damansara.' },
  { q: 'Is there a satisfaction guarantee?', a: 'Yes — if you are unhappy within 24 hours, we facilitate a re-booking with the vendor at no extra charge. All listed vendors are vetted and insured.' },
]

const PARTNERS = ['Maxis','Grab','Sunway','IGB','Tropicana','UEM Sunrise','IOI Properties','SP Setia','CIMB','Maybank']

/* ─── HERO APP CTA CARD ─────────────────────────────────────────────────────── */
function HeroAppCard() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border flex flex-col gap-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Available on iOS & Android</p>
        <h3 className="font-head text-2xl font-bold text-brand mb-2">The cleaning services marketplace</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Clients book vetted pros. Vendors grow their business. All in one app — KL, PJ, Shah Alam and 9 more cities.
        </p>
      </div>

      <ul className="space-y-2 text-sm text-gray-600">
        <li>— Browse and book vetted cleaning vendors instantly</li>
        <li>— Vendors list services, set their own prices</li>
        <li>— Live tracking on every booking</li>
        <li>— Pay after the job — DuitNow, TnG, GrabPay</li>
      </ul>

      <div className="flex flex-col gap-2.5">
        <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-light text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-200">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
          Download on Google Play
        </a>
        <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-200">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
          Download on App Store
        </a>
        <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-200">
          Book via WhatsApp
        </a>
      </div>

      <p className="text-xs text-gray-400 text-center pt-1 border-t border-border">Free to download · No signup fee · Pay after the job</p>
    </div>
  )
}

/* ─── CITIES GRID ───────────────────────────────────────────────────────────── */
function CitiesGrid() {
  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Coverage</p>
          <h2 className="font-head text-2xl font-bold text-brand">Active across Malaysia</h2>
          <p className="text-gray-500 text-sm mt-1">Our marketplace is live in all major Klang Valley cities.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {BIG_CITIES.map(c => (
            <span key={c.name} className="border border-border bg-white text-brand text-sm px-4 py-1.5 rounded-full">{c.name}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200">
            Google Play
          </a>
          <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200">
            App Store
          </a>
          <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border hover:border-brand text-brand font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ITEM ──────────────────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-sm text-brand hover:text-gold transition-colors">
        {q}
        <ChevronDown size={15} className={`flex-shrink-0 ml-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4 text-sm text-gray-500 leading-relaxed">{a}</div>}
    </div>
  )
}

/* ─── CONTACT BAND APP CTA ───────────────────────────────────────────────────── */
function ContactBandCTA() {
  return (
    <div className="bg-white/8 border border-white/10 rounded-xl p-7 flex flex-col gap-5">
      <div>
        <h3 className="font-head text-xl font-bold text-white mb-1">Download the app</h3>
        <p className="text-white/55 text-sm leading-relaxed">Book a cleaning professional or list your business. Free on iOS and Android.</p>
      </div>
      <div className="flex flex-col gap-2.5">
        <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center bg-white hover:bg-gray-100 text-brand font-semibold text-sm py-3 rounded-lg transition-colors duration-200">
          Google Play
        </a>
        <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center bg-gold hover:bg-gold-dark text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-200">
          App Store
        </a>
        <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm py-3 rounded-lg transition-colors duration-200">
          WhatsApp us
        </a>
      </div>
    </div>
  )
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [faqLeft, faqRight] = [FAQS.slice(0, 3), FAQS.slice(3)]

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — Real photo BG + logo mascot + booking form
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Real background photo */}
        <div className="absolute inset-0">
          <img src={PHOTOS.hero} alt="iPROFIXER professional at work" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/80 to-brand/40" />
        </div>

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,184,0,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,184,0,0.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy + mascot logo */}
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Cleaning Services Marketplace · Malaysia</p>

              <h1 className="font-head text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                Connect with vetted cleaning professionals
              </h1>

              <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
                iPROFIXER is a multi-vendor marketplace. Clients find and book cleaning professionals. Vendors list their services and grow their client base.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                {STATS.map(s => (
                  <div key={s.label}>
                    <div className="font-head text-2xl font-bold text-gold">{s.num}</div>
                    <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-5">
                <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-100 text-brand font-semibold text-sm px-5 py-3 rounded-lg transition-colors">
                  Google Play
                </a>
                <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
                  className="bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors">
                  App Store
                </a>
                <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                  className="border border-white/25 hover:border-white/50 text-white/80 font-semibold text-sm px-5 py-3 rounded-lg transition-colors">
                  WhatsApp
                </a>
              </div>
              <Link to="/services" className="text-sm text-white/40 hover:text-white/70 transition-colors">Browse services on web →</Link>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-6 text-xs text-white/40">
                <span>Background checked</span>
                <span>·</span>
                <span>Fully insured</span>
                <span>·</span>
                <span>98% satisfaction</span>
                <span>·</span>
                <span>iOS & Android</span>
              </div>
            </div>

            {/* Right: App CTA Card */}
            <div className="lg:justify-self-end w-full max-w-md lg:ml-auto">
              <HeroAppCard />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PARTNER TICKER
      ══════════════════════════════════════════════════════ */}
      <div className="bg-surface border-y border-border py-3 overflow-hidden">
        <div className="ticker-track">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="flex-shrink-0 mx-8 text-gray-300 text-xs font-semibold uppercase tracking-widest select-none">{p}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TWO-SIDED PLATFORM SPLIT
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Who is it for</p>
            <h2 className="font-head text-2xl font-bold text-brand">A platform built for two sides</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-brand rounded-xl p-7 flex flex-col gap-4">
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">For clients</p>
              <h3 className="font-head text-xl font-bold text-white">Find and book a cleaning professional</h3>
              <p className="text-white/60 text-sm leading-relaxed">Browse independently listed vendors near you. Compare ratings, prices and availability — then book in minutes on the app.</p>
              <ul className="space-y-1.5 text-sm text-white/65">
                <li>— Browse vendors by city and service type</li>
                <li>— Compare quotes from multiple professionals</li>
                <li>— Pay the vendor directly after the job</li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
                  className="bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  Download the app
                </a>
                <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                  className="border border-white/20 hover:border-white/50 text-white/80 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  WhatsApp us
                </a>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-7 flex flex-col gap-4">
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">For vendors</p>
              <h3 className="font-head text-xl font-bold text-brand">List your business, grow your clients</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Register as a cleaning vendor on iPROFIXER. Set your own services, pricing and schedule — and start receiving bookings from clients in your city.</p>
              <ul className="space-y-1.5 text-sm text-gray-500">
                <li>— Free to join, no listing fee</li>
                <li>— Set your own prices and availability</li>
                <li>— Get paid directly after every job</li>
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                <Link to="/for-professionals"
                  className="bg-brand hover:bg-brand-light text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  Join as a vendor
                </Link>
                <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                  className="border border-border hover:border-brand text-brand font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES PHOTO GRID
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">On the marketplace</p>
            <h2 className="font-head text-2xl font-bold text-brand">Cleaning services you can book</h2>
            <p className="text-gray-500 text-sm mt-1">All services are listed by independent vendors. Compare, choose, and book directly.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <Link key={s.title} to="/services"
                className="group relative overflow-hidden rounded-xl aspect-[4/5] block">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs text-gold/80 mb-0.5">{s.tag}</p>
                  <h3 className="font-head font-semibold text-base text-white leading-snug">{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
              className="bg-brand hover:bg-brand-light text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">Google Play</a>
            <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">App Store</a>
            <Link to="/services" className="border border-border hover:border-brand text-brand font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">Browse all services</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ALTERNATING FEATURE SECTIONS with real photos
      ══════════════════════════════════════════════════════ */}
      <section className="bg-surface border-b border-border py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">How it works</p>
            <h2 className="font-head text-2xl font-bold text-brand">Why use iPROFIXER</h2>
          </div>
          {FEATURES.map((feat, i) => (
            <div key={feat.tag}
              className={`grid lg:grid-cols-2 gap-10 items-center py-10 border-t border-border ${i % 2 === 1 ? 'lg:[&_.feat-text]:order-2 lg:[&_.feat-img]:order-1' : ''}`}>
              <div className="feat-text">
                <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">{feat.tag}</p>
                <h3 className="font-head text-xl font-bold text-brand mb-3">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{feat.desc}</p>
                <ul className="space-y-1.5 text-sm text-gray-500 mb-6">
                  {feat.bullets.map(b => <li key={b}>— {b}</li>)}
                </ul>
                <Link to={feat.link} className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">Learn more →</Link>
              </div>
              <div className="feat-img">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={feat.img} alt={feat.imgAlt} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ON-DEMAND CTA BAND
      ══════════════════════════════════════════════════════ */}
      <section className="bg-brand py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-head text-2xl font-bold text-white mb-1">Ready to get started?</h2>
            <p className="text-white/55 text-sm">Find a cleaning pro in your city, or list your business today.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-dark text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">Download the app</a>
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/50 text-white/80 font-semibold text-sm px-6 py-3 rounded-lg transition-colors">WhatsApp us</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS — with real profile photos
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="font-head text-2xl font-bold text-brand">What clients are saying</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-surface border border-border rounded-xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#0ea5e9" stroke="none" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <img src={t.photo} alt={t.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-brand text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PARTNER LOGOS STATIC
      ══════════════════════════════════════════════════════ */}
      <section className="py-10 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-5">Trusted by homeowners across</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {PARTNERS.map(p => (
              <span key={p} className="text-gray-300 text-sm font-semibold">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQs — two-column
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="font-head text-2xl font-bold text-brand">Common questions</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-12">
            <div>{faqLeft.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
            <div>{faqRight.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
          </div>
          <div className="mt-6">
            <Link to="/faq" className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">View all FAQs →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CITIES COVERAGE
      ══════════════════════════════════════════════════════ */}
      <CitiesGrid />

      {/* ══════════════════════════════════════════════════════
          CONTACT BAND — app download focus
      ══════════════════════════════════════════════════════ */}
      <section className="bg-brand py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Get in touch</p>
              <h2 className="font-head text-2xl font-bold text-white mb-3">Join the marketplace</h2>
              <p className="text-white/55 text-sm leading-relaxed mb-7">
                Clients, download the app and book a vetted professional in minutes. Vendors, list your business and start receiving bookings.
              </p>
              <div className="space-y-2 text-sm text-white/50">
                <p>Ara Damansara, Petaling Jaya, Selangor</p>
                <p>+03-8080 5249</p>
                <p>for_services@iprofixer.com.my</p>
              </div>
            </div>
            <div><ContactBandCTA /></div>
          </div>
        </div>
      </section>
    </>
  )
}
