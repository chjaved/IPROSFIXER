import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Star, ArrowRight, CheckCircle, Phone, MapPin, Mail, Smartphone, Download } from 'lucide-react'
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
  { num: '9,641+', label: 'Jobs Completed' },
  { num: '98%',    label: 'Satisfaction Rate' },
  { num: '500+',   label: 'Vetted Pros' },
  { num: '50+',    label: 'Services Available' },
]

const PHOTOS_CLEANING = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
  'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
]

const SERVICES = [
  { img: PHOTOS_CLEANING[0], tag: 'DEEP CLEAN',     title: 'Home Deep Clean',          desc: 'Full top-to-bottom deep cleaning for kitchens, bathrooms & living areas — eco-friendly products.' },
  { img: PHOTOS_CLEANING[1], tag: 'HOUSEKEEPING',   title: 'Regular Maid Service',     desc: 'Weekly or bi-weekly part-time maid — vetted, insured, flexible scheduling.' },
  { img: PHOTOS_CLEANING[2], tag: 'SOFA & CARPET',  title: 'Sofa & Carpet Cleaning',   desc: 'Deep extraction cleaning for fabric sofas, leather treatment and carpet shampooing.' },
  { img: PHOTOS_CLEANING[3], tag: 'POST-RENO',      title: 'Post-Renovation Clean',    desc: 'Industrial-grade clean — remove cement dust, debris and construction residue fast.' },
]

const FEATURES = [
  {
    tag: 'HIRE ON DEMAND',
    title: 'Find The Right Pro For You, Instantly',
    desc: 'Browse 500+ vetted professionals near you and book in under 2 minutes. Real-time matching, no more waiting days for a callback.',
    bullets: ['Same-day bookings available', 'See ratings & reviews before booking', 'Fixed prices — no surprise bills'],
    link: '/services',
    img: PHOTOS.electrician,
    imgAlt: 'Electrician professional at work',
  },
  {
    tag: 'TRACK YOUR JOB',
    title: 'Real-Time Tracking & Live Updates',
    desc: 'See your professional on a live map. Get notified when they\'re on the way, when they arrive, and when the job is done.',
    bullets: ['Live GPS tracking', 'In-app chat with your pro', 'Digital receipt on completion'],
    link: '/how-it-works',
    img: PHOTOS.booking,
    imgAlt: 'Customer tracking job on mobile phone',
  },
  {
    tag: 'CERTIFIED PROS',
    title: 'Trained, Vetted & Insured Professionals',
    desc: 'Every professional on iPROFIXER goes through a rigorous background check, skills test and in-person orientation before their first job.',
    bullets: ['Background & IC check', 'Skills assessment & certification', 'Personal accident insurance on every job'],
    link: '/about',
    img: PHOTOS.team,
    imgAlt: 'iPROFIXER professional team',
  },
  {
    tag: 'LOYALTY REWARDS',
    title: 'Earn Points. Get Free Services.',
    desc: 'Every booking earns you iPRO Points. Redeem them for free services, priority scheduling and exclusive member discounts.',
    bullets: ['Points on every booking', 'Redeem for free services', 'VIP priority scheduling for members'],
    link: '/contact',
    img: PHOTOS.cleaning,
    imgAlt: 'Happy customer after cleaning service',
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
  { q: 'How do I book a cleaning?',           a: 'Download the iPROFIXER app (iOS or Android), select your cleaning type, pick a city and time. Confirmed within 30 minutes.' },
  { q: 'What payment methods are accepted?', a: 'Cash, DuitNow, TnG eWallet and GrabPay. Payment after job completion — no upfront deposits.' },
  { q: 'Which cities do you cover?',          a: 'Kuala Lumpur, Petaling Jaya, Subang Jaya, Shah Alam, Cheras, Klang, Putrajaya, Cyberjaya, Ampang, Bangsar, Mont Kiara and Damansara.' },
  { q: 'Is there a satisfaction guarantee?', a: 'Yes — unhappy within 24 hours? We send a cleaner back for free. All staff are vetted, trained and insured.' },
  { q: 'Can I reschedule or cancel?',        a: 'Yes, up to 4 hours before the booking at no charge. Manage everything in the app.' },
  { q: 'How do I join as a cleaning professional?', a: 'Visit our For Professionals page or WhatsApp us. Applications reviewed in 48 hours. No joining fee.' },
]

const PARTNERS = ['Maxis','Grab','Sunway','IGB','Tropicana','UEM Sunrise','IOI Properties','SP Setia','CIMB','Maybank']

/* ─── HERO APP CTA CARD ─────────────────────────────────────────────────────── */
function HeroAppCard() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 flex flex-col gap-6">
      <div>
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-3 py-1 mb-4">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs font-bold uppercase tracking-widest">Book in 60 seconds</span>
        </div>
        <h3 className="font-head font-black text-3xl text-brand uppercase tracking-tight leading-tight mb-2">
          Malaysia's #1<br />Cleaning App
        </h3>
        <p className="text-gray-500 text-sm font-body leading-relaxed">
          Book vetted cleaners in KL, PJ, Shah Alam & 9 more cities — same-day, tracked, guaranteed.
        </p>
      </div>

      <div className="space-y-3">
        {[
          'Same-day & scheduled bookings',
          'Live GPS tracking of your cleaner',
          'Pay after — DuitNow, TnG, GrabPay',
          '24h satisfaction guarantee',
        ].map(t => (
          <div key={t} className="flex items-center gap-3 text-sm text-gray-700 font-body">
            <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <CheckCircle size={12} className="text-brand" />
            </span>
            {t}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-brand hover:bg-brand-light text-white font-head font-bold text-base uppercase tracking-wide py-4 rounded-2xl transition-all duration-200 shadow-lg">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
          Download on Google Play
        </a>
        <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-gold hover:bg-gold-dark text-brand font-head font-bold text-base uppercase tracking-wide py-4 rounded-2xl transition-all duration-200 shadow-lg">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
          Download on App Store
        </a>
        <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-head font-bold text-base uppercase tracking-wide py-4 rounded-2xl transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Book via WhatsApp
        </a>
      </div>

      <div className="flex items-center justify-center gap-6 pt-1 border-t border-gray-100">
        <span className="text-xs text-gray-400 flex items-center gap-1"><CheckCircle size={11} className="text-green-500" /> Free download</span>
        <span className="text-xs text-gray-400 flex items-center gap-1"><CheckCircle size={11} className="text-green-500" /> No signup fee</span>
        <span className="text-xs text-gray-400 flex items-center gap-1"><CheckCircle size={11} className="text-green-500" /> Pay after job</span>
      </div>
    </div>
  )
}

/* ─── CITIES GRID ───────────────────────────────────────────────────────────── */
function CitiesGrid() {
  return (
    <section className="py-16 bg-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-head font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Coverage</span>
          <h2 className="font-head font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">We Clean Across Malaysia</h2>
          <p className="text-white/50 mt-3 font-body">Professional cleaning in all major Klang Valley cities — same prices, same standards.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {BIG_CITIES.map(c => (
            <div key={c.name} className="group relative bg-white/5 hover:bg-gold/15 border border-white/10 hover:border-gold/50 rounded-2xl p-4 text-center transition-all duration-200 cursor-default">
              <div className="font-head font-black text-lg text-gold mb-1">{c.tag}</div>
              <div className="text-white/70 text-xs font-body">{c.name}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-dark text-brand font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all shadow-xl">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
            Get on Google Play
          </a>
          <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
            Get on App Store
          </a>
          <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Book via WhatsApp
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
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-gold/40 bg-gold/5' : 'border-gray-200 bg-white'}`}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-head font-bold text-base text-brand tracking-wide hover:bg-gold/5 transition-colors">
        {q}
        <ChevronDown size={17} className={`flex-shrink-0 ml-3 text-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gold/20 pt-3">{a}</div>}
    </div>
  )
}

/* ─── CONTACT BAND APP CTA ───────────────────────────────────────────────────── */
function ContactBandCTA() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-6">
      <div>
        <div className="font-head font-black text-2xl text-gold uppercase tracking-tight mb-2">Download & Start Booking</div>
        <p className="text-white/60 text-sm font-body leading-relaxed">The fastest way to book a cleaner in Malaysia. Available on iOS and Android. Free to download.</p>
      </div>
      <div className="flex flex-col gap-3">
        <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-brand font-head font-bold text-base uppercase tracking-wide py-4 rounded-2xl transition-all duration-200">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
          Google Play
        </a>
        <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-gold hover:bg-gold-dark text-brand font-head font-bold text-base uppercase tracking-wide py-4 rounded-2xl transition-all duration-200">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
          App Store
        </a>
        <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-head font-bold text-base uppercase tracking-wide py-4 rounded-2xl transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Us
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
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-gold text-xs font-bold uppercase tracking-widest">Malaysia's #1 Home Services App</span>
              </div>

              <h1 className="font-head font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.0] mb-6 tracking-tight uppercase">
                Home Services<br />
                <span className="text-gold italic">For Your</span><br />
                Blended Life
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg font-body">
                Vetted electricians, AC technicians, cleaners, caregivers and more — booked in 2 minutes and at your door on time, every time.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-0 mb-8 border-l-2 border-gold/30 pl-5">
                {STATS.map((s, i) => (
                  <div key={s.label} className={`pr-8 ${i < STATS.length - 1 ? 'border-r border-white/20 mr-8' : ''}`}>
                    <div className="font-head font-black text-3xl text-gold">{s.num}</div>
                    <div className="text-white/55 text-xs mt-0.5 font-body">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* App Store Download Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-brand font-bold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none uppercase tracking-wide">Get it on</div>
                    <div className="text-sm font-head font-black leading-none">Google Play</div>
                  </div>
                </a>
                <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-5 py-3 rounded-xl transition-all duration-200">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-none uppercase tracking-wide">Download on the</div>
                    <div className="text-sm font-head font-black leading-none">App Store</div>
                  </div>
                </a>
              </div>

              {/* Alternative: Browse Services Link */}
              <Link to="/services"
                className="inline-flex items-center gap-2 text-gold hover:text-white font-head font-bold text-sm uppercase tracking-wide transition-all duration-200">
                Or browse services on web <ArrowRight size={14} />
              </Link>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { icon: 'shield', text: 'Background Checked' },
                  { icon: 'lock', text: 'Fully Insured' },
                  { icon: 'star', text: '98% Satisfaction' },
                  { icon: 'phone', text: 'iOS & Android' },
                ].map(({ icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 text-xs bg-white/8 border border-white/15 text-white/65 px-3.5 py-1.5 rounded-full font-body">
                    {icon === 'shield' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                    {icon === 'lock' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                    {icon === 'star' && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                    {icon === 'phone' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>}
                    {text}
                  </span>
                ))}
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
      <div className="bg-gray-50 border-y border-gray-200 py-4 overflow-hidden">
        <div className="ticker-track">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div key={i} className="flex-shrink-0 mx-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gray-300 font-head font-black text-base uppercase tracking-widest select-none">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SERVICES PHOTO GRID
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-head font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">What We Offer</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Professional Cleaning Services</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto font-body">Vetted cleaners across 12 major Malaysian cities — book in 60 seconds on the app.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(s => (
              <Link key={s.title} to="/services"
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] block cursor-pointer">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-xs font-head font-black uppercase tracking-[0.2em] text-gold mb-1">{s.tag}</div>
                  <h3 className="font-head font-black text-xl text-white uppercase tracking-wide mb-1">{s.title}</h3>
                  <p className="text-white/65 text-xs leading-relaxed font-body">{s.desc}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight size={14} className="text-brand" />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand text-white font-head font-bold text-base uppercase tracking-wide px-8 py-3.5 rounded-xl hover:bg-brand-light transition-all duration-200">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
              Google Play
            </a>
            <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-brand font-head font-bold text-base uppercase tracking-wide px-8 py-3.5 rounded-xl transition-all duration-200">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
              App Store
            </a>
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-head font-bold text-base uppercase tracking-wide px-8 py-3.5 rounded-xl transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ALTERNATING FEATURE SECTIONS with real photos
      ══════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center py-12">
            <span className="inline-block text-xs font-head font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">One Stop Solution</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Your Home Services Platform</h2>
          </div>

          {FEATURES.map((feat, i) => (
            <div key={feat.tag}
              className={`grid lg:grid-cols-2 gap-12 items-center py-14 border-t border-gray-200 ${i % 2 === 1 ? 'lg:[&_.feat-text]:order-2 lg:[&_.feat-img]:order-1' : ''}`}>

              <div className="feat-text">
                <div className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-3 py-1 rounded mb-5">{feat.tag}</div>
                <h3 className="font-head font-black text-4xl sm:text-5xl text-brand leading-tight mb-5 uppercase tracking-tight">{feat.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed mb-6 max-w-md font-body">{feat.desc}</p>
                <ul className="space-y-3 mb-8">
                  {feat.bullets.map(b => (
                    <li key={b} className="flex items-center gap-3 text-sm text-gray-700 font-body">
                      <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={12} className="text-brand" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to={feat.link}
                  className="inline-flex items-center gap-2 font-head font-bold text-base uppercase tracking-wide text-gold hover:gap-3 transition-all duration-200">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>

              <div className="feat-img">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <img src={feat.img} alt={feat.imgAlt} className="w-full h-full object-cover" />
                  {/* Brand overlay badge */}
                  <div className="absolute bottom-5 left-5 bg-brand/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
                    <img src="/logo.png" alt="iPROFIXER" className="h-7 w-auto" style={{ mixBlendMode: 'screen' }} />
                    <div>
                      <div className="font-head font-black text-gold text-xs uppercase tracking-wide">Verified Pro</div>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_,i) => <Star key={i} size={9} fill="#FFB800" stroke="none" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ON-DEMAND CTA BAND
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[320px]">
          <img src={PHOTOS.team} alt="iPROFIXER team" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/85 to-gold/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <div className="text-xs font-head font-black uppercase tracking-[0.2em] text-gold/70 mb-2">On-Demand Service</div>
                  <h2 className="font-head font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
                    Get A Pro At Your<br />Door Today
                  </h2>
                  <p className="text-white/70 mt-2 font-body">Same-day bookings. Vetted. Insured. On time.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                  <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-brand font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl hover:bg-gold transition-all shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Book on WhatsApp
                  </a>
                  <Link to="/services"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-brand font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all">
                    All Services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS — with real profile photos
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-head font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Real Reviews</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight mb-2">Perform At Your Best</h2>
            <p className="text-gray-400 font-body">Real reviews from homeowners across Klang Valley.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="#FFB800" stroke="none" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 font-body italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.photo} alt={t.name}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0 border-2 border-gold/30" />
                  <div>
                    <div className="font-head font-bold text-brand text-sm uppercase tracking-wide">{t.name}</div>
                    <div className="text-gray-400 text-xs font-body flex items-center gap-1">
                      <MapPin size={10} /> {t.loc}
                    </div>
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
      <section className="py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-xs font-head font-bold uppercase tracking-[0.2em] mb-8">Trusted by homeowners in</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {PARTNERS.map(p => (
              <div key={p} className="font-head font-black text-lg text-gray-300 uppercase tracking-wide hover:text-gold-dark transition-colors cursor-default">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQs — two-column
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-head font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Help Centre</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Common Questions</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 mb-8">
            <div className="space-y-3">{faqLeft.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
            <div className="space-y-3">{faqRight.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
          </div>
          <div className="text-center">
            <Link to="/faq" className="inline-flex items-center gap-2 font-head font-bold text-base uppercase tracking-wide text-gold hover:underline">
              View All FAQs <ArrowRight size={15} />
            </Link>
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
      <section className="bg-brand py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-block text-xs font-head font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-5">Book a Cleaning Today</span>
              <h2 className="font-head font-black text-4xl sm:text-5xl text-white uppercase tracking-tight mt-2 mb-4 leading-tight">
                Clean Home.<br />Happy Life.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8 font-body max-w-sm">
                Professional cleaning services across Kuala Lumpur, Petaling Jaya, Shah Alam and 9 more cities. Respond in under 10 minutes on WhatsApp.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { Icon: MapPin, label: 'Ara Damansara, PJ, Selangor' },
                  { Icon: Phone, label: '+03-8080 5249' },
                  { Icon: Mail,  label: 'for_services@iprofixer.com.my' },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-white/65 text-sm font-body">
                    <Icon size={15} className="text-gold flex-shrink-0" /> {label}
                  </div>
                ))}
              </div>

              <AppBadges className="mb-8" />
              <img src="/logo.png" alt="iPROFIXER" className="h-16 w-auto opacity-90" style={{ mixBlendMode: 'screen' }} />
            </div>
            <div><ContactBandCTA /></div>
          </div>
        </div>
      </section>
    </>
  )
}
