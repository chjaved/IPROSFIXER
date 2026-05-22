import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { useApi } from '../hooks/useApi.js'

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const STATS = [
  { num: '9,641+', label: 'Solutions Delivered', icon: '🏆' },
  { num: '98%',    label: 'Satisfaction Rate',   icon: '⭐' },
  { num: '400K+',  label: 'App Downloads',        icon: '📱' },
]

const FEATURES = [
  {
    tag: 'HIRE',
    title: 'Find The Right\nPro For You,\nOn Demand',
    desc: 'Browse vetted professionals near you and book in minutes. Real-time matching — no more waiting days for a callback.',
    link: '/services',
    mockupBg: 'from-blue-50 to-indigo-100',
    mockupContent: [
      { label: 'Electrician', sub: 'Available now', dot: 'bg-green-400' },
      { label: 'AC Technician', sub: '2 nearby', dot: 'bg-green-400' },
      { label: 'House Cleaner', sub: 'Available now', dot: 'bg-green-400' },
      { label: 'Caregiver', sub: '3 nearby', dot: 'bg-yellow-400' },
    ],
  },
  {
    tag: 'MANAGE',
    title: 'Track & Manage\nAll Your Jobs\nIn Real-Time',
    desc: 'See live job status, chat with your professional, receive arrival alerts and approve completed work — all from the app.',
    link: '/how-it-works',
    mockupBg: 'from-amber-50 to-yellow-100',
    mockupContent: 'map',
  },
  {
    tag: 'APP',
    title: 'A Powerful\nApp That Puts\nYou In Control',
    desc: 'Book, track and pay securely. Rate your professional. Manage recurring schedules and get notified every step of the way.',
    link: '/how-it-works',
    mockupBg: 'from-purple-50 to-pink-100',
    mockupContent: 'phone',
  },
  {
    tag: 'TRAIN',
    title: 'Certified &\nTrained\nProfessionals',
    desc: 'Every pro on iPROFIXER passes a thorough background check, skills test and orientation before taking their first job.',
    link: '/about',
    mockupBg: 'from-teal-50 to-emerald-100',
    mockupContent: 'badges',
  },
  {
    tag: 'REWARD',
    title: 'Loyalty Rewards\nFor Regular\nCustomers',
    desc: 'Earn iPRO Points on every booking. Redeem for free services, priority scheduling and exclusive member discounts.',
    link: '/contact',
    mockupBg: 'from-rose-50 to-orange-100',
    mockupContent: 'rewards',
  },
]

const PARTNERS = [
  'Maxis', 'Grab', 'Sunway', 'IGB', 'Tropicana', 'UEM Sunrise', 'IOI Properties', 'SP Setia'
]

const TESTIMONIALS = [
  { initials: 'AH', name: 'Ahmad Hafizi',   loc: 'Petaling Jaya',  text: 'The electrician arrived within 2 hours. Fixed our DB box and replaced all switches. Super professional. 10/10.' },
  { initials: 'NK', name: 'Nurul Kasih',    loc: 'Ara Damansara',  text: 'Booked AC service for 3 units. The technician caught a gas leak early. Saved us so much money and hassle!' },
  { initials: 'SW', name: 'Siti Wanita',    loc: 'Subang Jaya',    text: 'My maid through iPROFIXER is trustworthy and hardworking. The house was spotless after post-raya cleaning.' },
  { initials: 'RK', name: 'Raj Kumar',      loc: 'Cheras',         text: 'Washing machine was leaking. The repair guy came same afternoon, fixed it in under an hour. Very reasonable.' },
  { initials: 'LH', name: 'Lily Heng',      loc: 'Bangsar South',  text: 'Hired a caregiver for my mother after her surgery. Incredibly patient and professional. Highly recommend.' },
  { initials: 'AM', name: 'Azman Mokhtar',  loc: 'Shah Alam',      text: 'Weekly cleaning subscription is the best thing I discovered this year. Consistent quality every single time.' },
]

const FAQS = [
  { q: 'How do I book a service?',        a: 'Use the quote form on this page, visit our Services page, or WhatsApp us at +60162104127. We confirm within 30 minutes.' },
  { q: 'What payment methods are accepted?', a: "Cash, DuitNow, TnG eWallet and GrabPay. Payment is made after the job is completed to your satisfaction — no upfront deposits." },
  { q: 'Which areas do you cover?',       a: 'All of Klang Valley: KL, PJ, Subang Jaya, Shah Alam, Klang, Cheras, Ampang and Putrajaya/Cyberjaya. Expanding soon.' },
  { q: 'Is there a satisfaction guarantee?', a: 'Yes — unhappy within 24 hours? We send someone back for free. All pros are vetted, trained and insured.' },
  { q: 'Can I reschedule or cancel?',     a: 'Yes. Cancel or reschedule up to 4 hours before the job at no charge. Just WhatsApp us with your booking reference.' },
  { q: 'How do I join as a professional?', a: 'Visit our For Professionals page or WhatsApp us. Applications reviewed within 48 hours. No joining fee.' },
]

/* ─── BOOKING FORM ──────────────────────────────────────────────────────────── */
function BookingForm() {
  const { post, loading, success, error } = useApi()
  const [form, setForm] = useState({ service: '', area: '', name: '', phone: '', date: '' })
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => { e.preventDefault(); await post('booking', form) }

  if (success) return (
    <div className="bg-white/10 border border-white/30 rounded-2xl p-6 text-white text-center">
      <div className="text-4xl mb-3">✅</div>
      <div className="font-bold text-lg mb-1">Request Sent!</div>
      <div className="text-white/70 text-sm">{success}</div>
    </div>
  )

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-2xl space-y-3 w-full">
      <h3 className="font-head font-bold text-brand text-lg mb-1">Get a Free Quote</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="form-label text-xs">Service</label>
          <select name="service" value={form.service} onChange={handle} required className="form-input text-sm">
            <option value="">Select service</option>
            {['Electrician','AC Repair','Appliance Repair','Caregiver','Cleaning','Laundry','House Maid'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label text-xs">Area</label>
          <select name="area" value={form.area} onChange={handle} required className="form-input text-sm">
            <option value="">Select area</option>
            {['Kuala Lumpur','Petaling Jaya','Ara Damansara','Subang Jaya','Shah Alam','Klang','Cheras','Ampang','Putrajaya'].map(a => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="form-label text-xs">Your Name</label>
          <input name="name" value={form.name} onChange={handle} placeholder="Full name" className="form-input text-sm" />
        </div>
        <div>
          <label className="form-label text-xs">Phone</label>
          <input name="phone" value={form.phone} onChange={handle} placeholder="+60 1X-XXXX" className="form-input text-sm" />
        </div>
      </div>
      <div>
        <label className="form-label text-xs">Preferred Date</label>
        <input type="date" name="date" value={form.date} onChange={handle} className="form-input text-sm" />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 font-bold text-sm">
        {loading ? 'Sending…' : 'Get Free Quote →'}
      </button>
      <p className="text-center text-xs text-gray-400">No credit card · Free · Instant confirmation</p>
    </form>
  )
}

/* ─── FEATURE MOCKUPS ───────────────────────────────────────────────────────── */
function FeatureMockup({ bg, content }) {
  if (content === 'map') return (
    <div className={`mockup-card h-72 bg-gradient-to-br ${bg} flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #1a1a2e 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative text-center">
        <div className="text-6xl mb-3">🗺️</div>
        <div className="bg-white rounded-xl px-4 py-2 shadow-lg inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs font-bold text-brand">Pro arriving in 18 min</span>
        </div>
      </div>
    </div>
  )

  if (content === 'phone') return (
    <div className={`mockup-card h-72 bg-gradient-to-br ${bg} flex items-center justify-center`}>
      <div className="w-36 h-60 bg-brand rounded-[1.8rem] border-4 border-brand-light shadow-2xl flex flex-col items-center justify-center gap-3 p-4">
        <div className="font-head font-black text-base italic"><span className="text-white">iPRO</span><span className="text-gold">FIXER</span></div>
        <div className="text-3xl">🏠</div>
        <div className="w-full space-y-1.5">
          <div className="h-1.5 bg-gold/40 rounded-full w-full" />
          <div className="h-1.5 bg-white/20 rounded-full w-4/5" />
          <div className="h-1.5 bg-white/20 rounded-full w-3/5" />
        </div>
        <div className="w-full bg-gold rounded-xl py-1.5 text-center text-brand font-bold text-xs">Book Now</div>
      </div>
    </div>
  )

  if (content === 'badges') return (
    <div className={`mockup-card h-72 bg-gradient-to-br ${bg} flex items-center justify-center p-6`}>
      <div className="grid grid-cols-2 gap-3 w-full">
        {['✅ Vetted','🎓 Certified','🔒 Insured','⭐ Rated'].map(b => (
          <div key={b} className="bg-white rounded-xl py-3 text-center shadow text-xs font-bold text-brand">{b}</div>
        ))}
        <div className="col-span-2 bg-brand rounded-xl py-3 text-center text-gold font-bold text-sm">500+ Active Professionals</div>
      </div>
    </div>
  )

  if (content === 'rewards') return (
    <div className={`mockup-card h-72 bg-gradient-to-br ${bg} flex items-center justify-center p-6`}>
      <div className="bg-white rounded-2xl p-5 w-full shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-400">iPRO Points</div>
            <div className="font-head font-black text-2xl text-brand">2,450</div>
          </div>
          <div className="text-4xl">🏅</div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full mb-2"><div className="h-2 bg-gold rounded-full w-3/5" /></div>
        <div className="text-xs text-gray-400">550 pts to next reward</div>
        <div className="mt-4 bg-gold/10 rounded-xl p-3 text-xs font-bold text-brand">🎁 Free AC Service (3,000 pts)</div>
      </div>
    </div>
  )

  // Default: list of pros
  return (
    <div className={`mockup-card h-72 bg-gradient-to-br ${bg} flex flex-col justify-center p-5 gap-3`}>
      {content.map(item => (
        <div key={item.label} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center text-lg">🔧</div>
            <div>
              <div className="font-bold text-brand text-sm">{item.label}</div>
              <div className="text-gray-400 text-xs">{item.sub}</div>
            </div>
          </div>
          <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
        </div>
      ))}
    </div>
  )
}

/* ─── FAQ ITEM ──────────────────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-brand hover:bg-gray-50 transition-colors"
      >
        {q}
        <ChevronDown size={16} className={`flex-shrink-0 ml-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{a}</div>}
    </div>
  )
}

/* ─── CONTACT BAND FORM ─────────────────────────────────────────────────────── */
function ContactBandForm() {
  const { post, loading, success, error } = useApi()
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Book a Service', message: '' })
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => { e.preventDefault(); await post('contact', form) }

  if (success) return (
    <div className="bg-white rounded-2xl p-8 text-center">
      <div className="text-5xl mb-3">✅</div>
      <div className="font-bold text-brand text-lg">{success}</div>
    </div>
  )

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-7 shadow-xl space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Name *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="Your name" className="form-input" />
        </div>
        <div>
          <label className="form-label">Phone *</label>
          <input name="phone" value={form.phone} onChange={handle} required placeholder="+60 1X-XXXX" className="form-input" />
        </div>
      </div>
      <div>
        <label className="form-label">Email</label>
        <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@email.com" className="form-input" />
      </div>
      <div>
        <label className="form-label">Service Needed</label>
        <select name="subject" value={form.subject} onChange={handle} className="form-input">
          {['Book a Service','General Enquiry','Join as a Professional','Other'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 font-bold">
        {loading ? 'Sending…' : 'Submit →'}
      </button>
    </form>
  )
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [faqLeft, faqRight] = [FAQS.slice(0, 3), FAQS.slice(3)]

  return (
    <>
      {/* ════════════════════════════════════════════════════
          HERO — full-bleed photo + left copy + right form
      ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background photo simulation — dark brand gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-light to-[#0d0d22]" />
        {/* Geometric grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,184,0,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,184,0,0.4) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Right side glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-gold/10 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-gold text-xs font-bold uppercase tracking-widest">🇲🇾 Malaysia's #1 Home Services App</span>
              </div>
              <h1 className="font-head font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                Home Services<br />
                <span className="text-gold italic">For Your</span><br />
                Blended Life
              </h1>
              <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-md">
                Vetted electricians, AC technicians, cleaners, caregivers and more — booked in under 2 minutes and at your door on time.
              </p>

              {/* Stats row — like GoGet */}
              <div className="flex flex-wrap gap-0 mb-8">
                {STATS.map((s, i) => (
                  <div key={s.label} className={`stat-pill ${i < STATS.length - 1 ? 'border-r border-white/15' : ''}`} style={{ padding: '0 28px 0 0', marginRight: 28 }}>
                    <span className="font-head font-extrabold text-3xl text-gold">{s.num}</span>
                    <span className="text-white/55 text-xs mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-wa hover:bg-wa-dark text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-wa/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
                <Link to="/services" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200">
                  Browse Services <ArrowRight size={16} />
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {['✅ Background Checked','🔒 Insured','⭐ 98% Satisfaction','📱 iOS & Android'].map(t => (
                  <span key={t} className="text-xs bg-white/8 border border-white/15 text-white/70 px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="fade-up fade-up-delay-2 lg:justify-self-end w-full max-w-md lg:ml-auto">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TRUST BAR — logos scrolling (like GoGet)
      ════════════════════════════════════════════════════ */}
      <div className="bg-gray-50 border-y border-gray-200 py-5 overflow-hidden">
        <div className="ticker-track">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div key={i} className="flex-shrink-0 mx-10 flex items-center">
              <span className="text-gray-300 font-head font-black text-xl uppercase tracking-widest select-none">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          FEATURE SECTIONS — alternating (like GoGet)
      ════════════════════════════════════════════════════ */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center py-14">
            <span className="section-tag">One Stop Solution</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-brand mt-2">Your Home Services Platform</h2>
          </div>

          {FEATURES.map((feat, i) => (
            <div
              key={feat.tag}
              className={`feature-row grid lg:grid-cols-2 gap-12 items-center py-14 border-t border-gray-100 ${i % 2 === 1 ? 'lg:[&_.feature-text]:order-2 lg:[&_.feature-img]:order-1' : ''}`}
            >
              <div className="feature-text">
                <div className="inline-block text-xs font-black uppercase tracking-[0.18em] text-gold bg-gold/10 px-3 py-1 rounded mb-4">{feat.tag}</div>
                <h3 className="font-head font-extrabold text-3xl sm:text-4xl text-brand leading-tight mb-5 whitespace-pre-line">{feat.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed mb-7 max-w-md">{feat.desc}</p>
                <Link to={feat.link} className="inline-flex items-center gap-2 text-gold font-bold text-sm hover:gap-3 transition-all duration-200">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
              <div className="feature-img">
                <FeatureMockup bg={feat.mockupBg} content={feat.mockupContent} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ON-DEMAND CTA BAND (teal/gold split — like GoGet)
      ════════════════════════════════════════════════════ */}
      <section className="bg-brand py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-gold to-gold-dark rounded-3xl px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-brand/60 mb-2">On-Demand Service</div>
              <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-brand leading-tight">
                Get a Professional<br />At Your Door Today
              </h2>
              <p className="text-brand/70 mt-3 max-w-md">Same-day bookings available. Vetted, insured and ready.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                className="bg-brand text-white font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 hover:bg-brand-light transition-all shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Book on WhatsApp
              </a>
              <Link to="/services" className="bg-white/30 hover:bg-white/50 text-brand font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 transition-all">
                View All Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          TESTIMONIALS — photo grid (like GoGet)
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Real Reviews</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-brand mt-2 mb-2">Perform at your best with iPROFIXER</h2>
            <p className="text-gray-400">Real reviews from homeowners across Klang Valley.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#FFB800" stroke="none" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand text-gold font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-brand text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PARTNER LOGOS — "We've Helped X Serve Customers"
      ════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-8">We've helped 10,000+ homeowners in</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {PARTNERS.map(p => (
              <div key={p} className="font-head font-black text-lg text-gray-300 uppercase tracking-wide select-none hover:text-gold-dark transition-colors">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FAQs — two-column (like GoGet)
      ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">FAQs</span>
            <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-brand mt-2">Common Questions</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              {faqLeft.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
            <div className="space-y-3">
              {faqRight.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/faq" className="inline-flex items-center gap-2 text-gold font-bold text-sm hover:underline">
              View All FAQs <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CONTACT BAND — "Let us help" (like GoGet footer CTA)
      ════════════════════════════════════════════════════ */}
      <section className="bg-brand py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="section-tag mb-4">Get In Touch</span>
              <h2 className="font-head font-extrabold text-3xl sm:text-4xl text-white mt-2 mb-4 leading-tight">
                Let us help grow<br />your business
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Whether you need home services or want to join our professional network — we're ready. Average WhatsApp response: under 10 minutes.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: '📍', label: 'Ara Damansara, PJ, Selangor' },
                  { icon: '📞', label: '+03-8080 5249' },
                  { icon: '✉️', label: 'for_services@iprofixer.com.my' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-3 text-white/70 text-sm">
                    <span>{c.icon}</span>{c.label}
                  </div>
                ))}
              </div>

              {/* App badges — like GoGet */}
              <div className="flex flex-wrap gap-3">
                <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-xl transition-all">
                  <span className="text-2xl">🍎</span>
                  <div className="text-left"><div className="text-white/50 text-xs">Download on the</div><div className="text-white font-bold text-sm">App Store</div></div>
                </a>
                <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 rounded-xl transition-all">
                  <span className="text-2xl">▶️</span>
                  <div className="text-left"><div className="text-white/50 text-xs">Get it on</div><div className="text-white font-bold text-sm">Google Play</div></div>
                </a>
              </div>
            </div>

            <div>
              <ContactBandForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
