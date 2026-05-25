import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const WA_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function useStaggerReveal(count, threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const children = container.querySelectorAll('.reveal-card')
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 80))
          obs.unobserve(container)
        }
      },
      { threshold }
    )
    obs.observe(container)
    return () => obs.disconnect()
  }, [])
  return ref
}

function StatCounter({ target, suffix, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const increment = target / steps
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= target) { setCount(target); clearInterval(interval) }
            else setCount(Math.floor(current))
          }, 1600 / steps)
          obs.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="stat-number text-4xl sm:text-5xl text-white mb-1">{count.toLocaleString()}{suffix}</span>
      <span className="text-white/60 text-sm text-center font-medium">{label}</span>
    </div>
  )
}

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button className="faq-btn" onClick={onToggle} aria-expanded={isOpen}>
        <span>{q}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
          className={`flex-shrink-0 transition-transform duration-200 text-teal ${isOpen ? 'rotate-180' : ''}`}>
          <path d="M4.5 6.75L9 11.25l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && <div className="faq-body">{a}</div>}
    </div>
  )
}

const SERVICES = [
  {
    gradient: 'from-yellow-400 to-orange-500',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>),
    name: 'Electricians',
    desc: 'Wiring faults, trips, new points - our licensed electricians fix it right the first time.',
  },
  {
    gradient: 'from-sky-400 to-blue-600',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 6a6 6 0 0 1 6 6"/><circle cx="12" cy="12" r="2"/><path d="M4.93 19.07A10 10 0 0 1 2 12"/></svg>),
    name: 'AC Repair & Service',
    desc: 'Too hot? AC not cooling? We service all brands - Samsung, Daikin, Panasonic and more.',
  },
  {
    gradient: 'from-violet-500 to-purple-700',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>),
    name: 'Appliance Repair',
    desc: 'Washing machine, fridge, oven or dryer giving you trouble? We diagnose and fix on the spot.',
  },
  {
    gradient: 'from-[#0B6B52] to-emerald-600',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
    name: 'Cleaning Services',
    desc: 'Home deep clean, regular maid service, post-reno cleanup - you choose, we handle the rest.',
  },
  {
    gradient: 'from-rose-400 to-pink-600',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
    name: 'Caregiver',
    desc: 'Reliable, trained caregivers for your elderly parents or family members. Hourly or full-day.',
  },
  {
    gradient: 'from-amber-400 to-yellow-500',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 4v16M16 4v16"/></svg>),
    name: 'Laundry',
    desc: 'Wash, dry and fold - or full ironing service. We collect from your door and return the same day.',
  },
  {
    gradient: 'from-emerald-400 to-green-600',
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
    name: 'House Maid',
    desc: 'Need a trustworthy part-time maid? Weekly, bi-weekly or one-off. Always the same person.',
  },
]

const TESTIMONIALS = [
  { name: 'Ahmad Hafizi', loc: 'Petaling Jaya', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', text: 'Booked a deep clean after moving into my new place. The team came on time, knew exactly what they were doing and the house smelled amazing after. Will definitely book again.' },
  { name: 'Raj Kumar',    loc: 'Cheras',        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', text: 'Post-reno cleaning after my renovation. The cement dust, paint splatters - all gone. I was honestly shocked at how good the result was.' },
  { name: 'Nurul Kasih',  loc: 'Ara Damansara', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', text: 'My regular cleaner Kak Siti has been coming every week for 3 months now. Always the same person, knows how I like things. That consistency is priceless.' },
  { name: 'James Lim',    loc: 'Bangsar South', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', text: 'The electrician came within 2 hours of booking. Fixed my circuit trip issue in 45 minutes and explained what caused it. No upselling, just honest work.' },
  { name: 'Lily Heng',    loc: 'Subang Jaya',   img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', text: "Booked post-event cleanup after my daughter's birthday party. 2 hours later the house looked like nothing happened. Complete lifesaver." },
  { name: 'Azman Mokhtar',loc: 'Shah Alam',     img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', text: 'AC was not cooling properly for weeks. Booked through iPROFIXER, the technician came next morning. Turns out just needed a gas top-up. RM80 fix. Fair price.' },
]

const CITIES = ['Kuala Lumpur','Petaling Jaya','Shah Alam','Subang Jaya','Cheras','Klang','Cyberjaya','Putrajaya','Ampang','Bangsar','Mont Kiara','Damansara']

const FAQS = [
  { q: 'Is iPROFIXER a home services company or a marketplace?', a: "Both, kind of. We have our own team of vetted professionals AND we partner with trusted local service providers. Either way, every person who comes to your home has been background checked and insured by us." },
  { q: 'How quickly can someone come to my home?', a: "For most services, we can match you with someone the same day. For AC repair and electricians, usually within 2-4 hours. Book before 12pm and there's a good chance your pro arrives today." },
  { q: 'How much does it cost?', a: "Prices depend on the service and your location. You'll get a fixed quote before anyone comes to your house - no hidden charges. What we quote is what you pay." },
  { q: 'Do I pay before or after the job?', a: "After. We only collect payment once the job is done and you're satisfied. You can pay cash, DuitNow, Touch 'n Go or GrabPay." },
  { q: "What if I'm not happy with the service?", a: "Tell us within 24 hours and we'll send a replacement at no extra cost. If it still doesn't meet your expectations, you get a full refund. That's our guarantee." },
  { q: "I'm a cleaner or electrician. Can I join?", a: "Yes - and it's free. Go to the Professionals section, fill in your details and our team will WhatsApp you within 1 business day to explain how it works." },
]

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FACC15" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="#E0F4EE"/>
    <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#0B6B52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const servicesRef = useStaggerReveal(7)
  const reviewsRef  = useStaggerReveal(6)
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal()
  const r4 = useReveal(); const r5 = useReveal(); const r6 = useReveal()
  const r7 = useReveal(); const r8 = useReveal(); const r9 = useReveal()
  const r10 = useReveal(); const r11 = useReveal(); const r12 = useReveal()

  function toggleFaq(i) { setOpenFaq(openFaq === i ? null : i) }

  return (
    <>
      {/* HERO */}
      <section
        className="hero-circle-bg relative overflow-hidden pt-[68px]"
        style={{ background: 'linear-gradient(135deg, #04342C 0%, #0B6B52 55%, #1D9E75 100%)' }}
        aria-label="iPROFIXER home services Malaysia hero"
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="fade-up inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-6">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="7" fill="#1D9E75"/><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Vetted Pros &middot; KL, PJ &amp; Selangor
            </div>
            <h1 className="fade-up fade-up-1 font-head font-extrabold text-4xl sm:text-5xl lg:text-[52px] leading-tight text-white mb-5">
              The Easiest Way to Book{' '}
              <span className="text-[#7FFFD4]">Home Services in Malaysia</span>
            </h1>
            <p className="fade-up fade-up-2 text-white/80 text-[17px] leading-relaxed mb-6 max-w-lg">
              Electricians, cleaners, AC repair, caregivers and more - all in one place. Real pros. Fixed prices. Book in under 2 minutes.
            </p>
            <div className="fade-up fade-up-3 flex flex-wrap gap-2 mb-8">
              <span className="trust-chip">&#10003; Background Checked</span>
              <span className="trust-chip">&#10003; Insured on Every Job</span>
              <span className="trust-chip">&#10003; Pay After the Job</span>
            </div>
            <div className="fade-up fade-up-4 flex flex-wrap gap-3 mb-8">
              <a href="https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service."
                target="_blank" rel="noopener noreferrer"
                className="btn-orange text-base px-7 py-3.5 shadow-lg shadow-orange/30">
                Book a Service Now &#8594;
              </a>
              <a href="https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service."
                target="_blank" rel="noopener noreferrer"
                className="btn-wa text-base px-6 py-3.5">
                {WA_SVG} Chat on WhatsApp
              </a>
            </div>
            <div className="fade-up fade-up-5 flex flex-wrap gap-3 mb-5">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black/70 hover:bg-black text-white px-4 py-2.5 rounded-xl transition-all border border-white/15">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                <div><div className="text-[10px] text-white/60 leading-none">Get it on</div><div className="text-sm font-bold leading-tight">Google Play</div></div>
              </a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black/70 hover:bg-black text-white px-4 py-2.5 rounded-xl transition-all border border-white/15">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="white" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
                <div><div className="text-[10px] text-white/60 leading-none">Download on the</div><div className="text-sm font-bold leading-tight">App Store</div></div>
              </a>
            </div>
            <p className="fade-up text-white/50 text-sm">Trusted by <strong className="text-white/80">9,000+ homeowners</strong> in Klang Valley</p>
          </div>

          {/* Right: hero image with floating cards */}
          <div className="fade-up fade-up-2 lg:justify-self-end w-full max-w-md lg:ml-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="iPROFIXER professional at work"
                className="w-full h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04342C]/85 via-[#04342C]/10 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" width="16" height="16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 leading-none">Verified &amp; Insured</div>
                  <div className="text-xs font-bold text-gray-800">500+ Professionals</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg text-center">
                <div className="flex items-center gap-0.5 justify-center mb-0.5">
                  {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
                </div>
                <div className="text-xs font-bold text-gray-800">4.9 / 5.0</div>
                <div className="text-[10px] text-gray-500">9,641 reviews</div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <div className="flex -space-x-2 flex-shrink-0">
                    {[
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                    ].map((src, i) => (
                      <img key={i} src={src} alt="customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" loading="lazy"/>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-800">9,000+ happy clients</div>
                    <div className="text-[10px] text-gray-500">Across Klang Valley</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#04342C' }} className="py-12" aria-label="iPROFIXER statistics">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-white/10">
            <StatCounter target={9641} suffix="+"  label="Jobs completed so far" />
            <StatCounter target={98}   suffix="%"  label="Customers come back again" />
            <StatCounter target={50}   suffix="+"  label="Service types available" />
            <StatCounter target={12}   suffix=""   label="Cities in Klang Valley" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-bg-soft" aria-label="Home services available in Malaysia">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r1} className="reveal text-center mb-12">
            <span className="section-label">What We Cover</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-3">Every Home Service You'll Ever Need</h2>
            <p className="text-muted max-w-xl mx-auto">Stop juggling five different numbers. One platform for all of it.</p>
          </div>
          <div ref={servicesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.name} className="service-card reveal-card">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-1 shadow-md flex-shrink-0`} aria-hidden="true">
                  {s.icon}
                </div>
                <h3 className="font-head font-bold text-lg text-text">{s.name}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{s.desc}</p>
                <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                  className="text-teal font-semibold text-sm hover:text-teal-dark transition-colors">
                  Book Now &#8594;
                </a>
              </div>
            ))}
          </div>
          <div ref={r2} className="reveal text-center mt-10">
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
              className="btn-outline-teal text-base px-8 py-3 inline-flex items-center gap-2">
              {WA_SVG} Book via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white" aria-label="How iPROFIXER booking works">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r3} className="reveal text-center mb-14">
            <span className="section-label">Simple Process</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-3">Booking Takes Less Than 2 Minutes</h2>
            <p className="text-muted max-w-xl mx-auto">We've made it as simple as possible. Here's how it works.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { n: '1', title: 'Tell us what you need',       desc: 'Pick your service and area. Takes 30 seconds.' },
              { n: '2', title: 'We match you with a pro',     desc: "You'll get a WhatsApp message with your matched professional within 15 minutes." },
              { n: '3', title: 'They show up and do the job', desc: 'Vetted, insured, on time. You can track them live.' },
              { n: '4', title: 'Pay after. Rate your pro',    desc: "Cash, DuitNow, TnG or GrabPay. Only pay when you're satisfied." },
            ].map((step, i) => (
              <div key={step.n} ref={[r4,r5,r6,r7][i]} className="reveal flex flex-col items-center text-center gap-3 relative">
                <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center text-white font-head font-bold text-xl flex-shrink-0 z-10">
                  {step.n}
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] border-t-2 border-dashed border-teal/25" aria-hidden="true" />
                )}
                <h3 className="font-head font-semibold text-base text-text">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div ref={r8} className="reveal text-center mt-12">
            <div className="inline-flex items-center gap-2 text-teal font-medium text-sm">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="9" fill="#E0F4EE"/><path d="M5 9l3 3 5-5" stroke="#0B6B52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Not happy? We send a replacement for free.
            </div>
          </div>
        </div>
      </section>

      {/* TWO-SIDED PLATFORM */}
      <section id="for-pros" className="py-20 bg-bg-soft" aria-label="iPROFIXER for homeowners and professionals">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div ref={r9} className="reveal platform-card relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-light px-3 py-1 rounded-full w-fit relative z-10">FOR HOMEOWNERS</span>
              <h3 className="font-head font-bold text-2xl text-text relative z-10">Find someone you can actually trust</h3>
              <p className="text-muted text-sm leading-relaxed relative z-10">We check every professional before they join. Background check, IC verification, skills test and insurance. So you don't have to worry.</p>
              <ul className="space-y-2 relative z-10">
                {['Fixed upfront pricing - no surprises','Same-day bookings available','Live tracking when your pro is on the way',"Free replacement if you're not satisfied"].map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-text"><CheckIcon />{b}</li>
                ))}
              </ul>
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="btn-orange w-fit relative z-10">Book Your First Service &#8594;</a>
            </div>
            <div ref={r10} className="reveal platform-card relative overflow-hidden" style={{ background: '#F0FBF7', borderColor: '#B2E0D2' }}>
              <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-light px-3 py-1 rounded-full w-fit relative z-10">FOR PROFESSIONALS</span>
              <h3 className="font-head font-bold text-2xl text-text relative z-10">Earn more. Work on your own terms.</h3>
              <p className="text-muted text-sm leading-relaxed relative z-10">Join 500+ professionals already earning through iPROFIXER. Set your own hours, pick your own jobs and get paid straight after every booking.</p>
              <ul className="space-y-2 relative z-10">
                {['Free to join - no monthly fee','Set your own rates and availability','Get client requests in your city','Payments secured on every job'].map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-text"><CheckIcon />{b}</li>
                ))}
              </ul>
              <Link to="/for-professionals" className="btn-teal w-fit relative z-10">Join as a Professional &#8594;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white" aria-label="Customer reviews for iPROFIXER home services">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r11} className="reveal text-center mb-8">
            <span className="section-label">Real Reviews</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-4">What Our Customers Say</h2>
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
              <svg viewBox="0 0 24 24" width="26" height="26" aria-label="Google reviews">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
                  <span className="text-sm font-bold text-gray-800 ml-1">4.9</span>
                </div>
                <div className="text-xs text-gray-500">Based on 9,641 Google reviews</div>
              </div>
            </div>
          </div>
          <div ref={reviewsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="review-card reveal-card">
                <div className="flex gap-0.5" aria-label="5 star rating">
                  {[0,1,2,3,4].map(i => <StarIcon key={i} />)}
                </div>
                <p className="text-muted text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <img src={t.img} alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-teal-light flex-shrink-0"
                    loading="lazy"/>
                  <div>
                    <p className="font-semibold text-text text-sm">{t.name}</p>
                    <p className="text-muted text-xs">{t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="py-20 bg-bg-soft" aria-label="Coverage areas in Klang Valley">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r12} className="reveal text-center mb-10">
            <span className="section-label">Coverage</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-2">We Come to You - Across All of Klang Valley</h2>
            <p className="text-muted">Currently active in 12 cities. Expanding soon.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {CITIES.map(c => <span key={c} className="city-chip">{c}</span>)}
          </div>
          <p className="text-center text-muted text-sm">
            Don't see your area?{' '}
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="text-teal font-semibold hover:underline">WhatsApp us</a>
            {' '}- we may still be able to help.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20" style={{ background: '#F8FAF9' }} aria-label="Frequently asked questions about iPROFIXER">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2">Questions People Ask Before Booking</h2>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => toggleFaq(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-4" style={{ background: '#0B6B52' }} aria-label="Book home services in Malaysia">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-head font-bold text-3xl sm:text-4xl text-white mb-3">Ready to Book? Let's Sort It Out Today.</h2>
          <p className="text-white/80 text-lg mb-8">Over 9,000 homeowners have trusted us. Your turn.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-teal font-bold text-base px-8 py-3.5 rounded-card hover:bg-teal-light transition-all duration-200 shadow-md">
              Book a Service &#8594;
            </a>
            <a href="https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service."
              target="_blank" rel="noopener noreferrer"
              className="btn-wa text-base px-8 py-3.5">
              {WA_SVG} Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* MOBILE BOTTOM BAR */}
      <div className="mobile-bar" aria-label="Mobile quick actions">
        <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
          className="flex-1 bg-orange text-white font-bold text-sm py-4 text-center hover:bg-orange-dark transition-colors">
          Book Now
        </a>
        <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
          className="flex-1 bg-wa text-white font-bold text-sm py-4 text-center hover:bg-wa-dark transition-colors">
          WhatsApp
        </a>
        <a href="tel:+60380805249"
          className="flex-1 bg-teal text-white font-bold text-sm py-4 text-center hover:bg-teal-dark transition-colors">
          Call Us
        </a>
      </div>
    </>
  )
}