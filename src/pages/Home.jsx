import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* â”€â”€â”€ WA SVG â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const WA_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

/* â”€â”€â”€ SCROLL REVEAL HOOK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ STAGGERED REVEAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function useStaggerReveal(count, threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const children = container.querySelectorAll('.reveal-card')
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 80)
          })
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

/* â”€â”€â”€ STAT COUNTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
          const duration = 1600
          const steps = 60
          const increment = target / steps
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= target) { setCount(target); clearInterval(interval) }
            else setCount(Math.floor(current))
          }, duration / steps)
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
      <span className="stat-number text-4xl sm:text-5xl text-white mb-1">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-white/60 text-sm text-center font-medium">{label}</span>
    </div>
  )
}

/* â”€â”€â”€ FAQ ITEM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button className="faq-btn" onClick={onToggle} aria-expanded={isOpen}>
        <span>{q}</span>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
          className={`flex-shrink-0 transition-transform duration-200 text-teal ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4.5 6.75L9 11.25l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && <div className="faq-body">{a}</div>}
    </div>
  )
}

/* â”€â”€â”€ SERVICES DATA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const SERVICES = [
  {
    icon: 'âš¡',
    name: 'Electricians',
    desc: 'Wiring faults, trips, new points â€” our licensed electricians fix it right the first time.',
  },
  {
    icon: 'â„ï¸',
    name: 'AC Repair & Service',
    desc: 'Too hot? AC not cooling? We service all brands â€” Samsung, Daikin, Panasonic and more.',
  },
  {
    icon: 'ðŸ”§',
    name: 'Appliance Repair',
    desc: 'Washing machine, fridge, oven or dryer giving you trouble? We diagnose and fix on the spot.',
  },
  {
    icon: 'ðŸ§¹',
    name: 'Cleaning Services',
    desc: 'Home deep clean, regular maid service, post-reno cleanup â€” you choose, we handle the rest.',
  },
  {
    icon: 'ðŸ¤',
    name: 'Caregiver',
    desc: 'Reliable, trained caregivers for your elderly parents or family members. Hourly or full-day.',
  },
  {
    icon: 'ðŸ‘•',
    name: 'Laundry',
    desc: 'Wash, dry and fold â€” or full ironing service. We collect from your door and return the same day.',
  },
  {
    icon: 'ðŸ ',
    name: 'House Maid',
    desc: 'Need a trustworthy part-time maid? Weekly, bi-weekly or one-off. Always the same person.',
  },
]

const TESTIMONIALS = [
  { name: 'Ahmad Hafizi', loc: 'Petaling Jaya', text: 'Booked a deep clean after moving into my new place. The team came on time, knew exactly what they were doing and the house smelled amazing after. Will definitely book again.' },
  { name: 'Raj Kumar',    loc: 'Cheras',        text: 'Post-reno cleaning after my renovation. The cement dust, paint splatters â€” all gone. I was honestly shocked at how good the result was.' },
  { name: 'Nurul Kasih',  loc: 'Ara Damansara', text: 'My regular cleaner Kak Siti has been coming every week for 3 months now. Always the same person, knows how I like things. That consistency is priceless.' },
  { name: 'James Lim',    loc: 'Bangsar South', text: 'The electrician came within 2 hours of booking. Fixed my circuit trip issue in 45 minutes and explained what caused it. No upselling, just honest work.' },
  { name: 'Lily Heng',    loc: 'Subang Jaya',   text: "Booked post-event cleanup after my daughter's birthday party. 2 hours later the house looked like nothing happened. Complete lifesaver." },
  { name: 'Azman Mokhtar',loc: 'Shah Alam',     text: 'AC was not cooling properly for weeks. Booked through iPROFIXER, the technician came next morning. Turns out just needed a gas top-up. RM80 fix. Fair price.' },
]

const CITIES = ['Kuala Lumpur','Petaling Jaya','Shah Alam','Subang Jaya','Cheras','Klang','Cyberjaya','Putrajaya','Ampang','Bangsar','Mont Kiara','Damansara']

const FAQS = [
  {
    q: 'Is iPROFIXER a home services company or a marketplace?',
    a: "Both, kind of. We have our own team of vetted professionals AND we partner with trusted local service providers. Either way, every person who comes to your home has been background checked and insured by us.",
  },
  {
    q: 'How quickly can someone come to my home?',
    a: "For most services, we can match you with someone the same day. For AC repair and electricians, usually within 2â€“4 hours. Book before 12pm and there's a good chance your pro arrives today.",
  },
  {
    q: 'How much does it cost?',
    a: "Prices depend on the service and your location. You'll get a fixed quote before anyone comes to your house â€” no hidden charges, no \"we'll see when we get there.\" What we quote is what you pay.",
  },
  {
    q: 'Do I pay before or after the job?',
    a: "After. We only collect payment once the job is done and you're satisfied. You can pay cash, DuitNow, Touch 'n Go or GrabPay.",
  },
  {
    q: "What if I'm not happy with the service?",
    a: "Tell us within 24 hours and we'll send a replacement at no extra cost. If it still doesn't meet your expectations, you get a full refund. That's our guarantee.",
  },
  {
    q: "I'm a cleaner or electrician. Can I join?",
    a: "Yes â€” and it's free. Go to the Professionals section, fill in your details and our team will WhatsApp you within 1 business day to explain how it works.",
  },
]

/* â”€â”€â”€ BOOKING FORM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function BookingForm() {
  const [service, setService] = useState('')
  const [area, setArea]       = useState('')
  const [date, setDate]       = useState('')
  const [phone, setPhone]     = useState('')
  const [focused, setFocused] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const svc  = service || 'a service'
    const loc  = area    || 'my area'
    const dt   = date    || 'a date TBD'
    const num  = phone   || 'my number'
    const msg  = encodeURIComponent(`Hi, I'd like to book a ${svc} in ${loc} on ${dt}. My number is ${num}.`)
    window.open(`https://wa.me/60162104127?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      id="hero-form"
      className={`bg-white rounded-xl2 p-6 shadow-2xl transition-all duration-300 ${focused ? 'ring-2 ring-teal/40' : ''}`}
    >
      <h2 className="font-head font-bold text-teal text-xl mb-1">Get a Free Quote in 2 Minutes</h2>
      <p className="text-muted text-sm mb-5">No payment needed until the job is done.</p>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="svc" className="form-lbl">What service do you need?</label>
          <select id="svc" className="form-field" value={service} required
            onChange={e => setService(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            aria-label="Select home service needed in Malaysia"
          >
            <option value="" disabled>Select a serviceâ€¦</option>
            {['Electrician','AC Repair','Appliance Repair','Cleaning','Caregiver','Laundry','House Maid','Other'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="area" className="form-lbl">Which area are you in?</label>
          <select id="area" className="form-field" value={area} required
            onChange={e => setArea(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            aria-label="Select your area in Klang Valley"
          >
            <option value="" disabled>Select your areaâ€¦</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="pdate" className="form-lbl">Preferred Date</label>
          <input id="pdate" type="date" className="form-field" value={date} required
            onChange={e => setDate(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            aria-label="Preferred date for home service booking"
          />
        </div>
        <div>
          <label htmlFor="phone" className="form-lbl">Your WhatsApp Number</label>
          <input id="phone" type="tel" className="form-field" placeholder="012-345 6789" value={phone} required
            onChange={e => setPhone(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            aria-label="Your WhatsApp number for booking confirmation"
          />
        </div>
        <button type="submit" className="btn-orange w-full justify-center py-3.5 text-base">
          Send My Request â†’
        </button>
      </form>
      <p className="text-muted text-xs text-center mt-3">We'll WhatsApp you within 15 minutes. No spam.</p>
    </div>
  )
}

/* â”€â”€â”€ HOME PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const servicesRef  = useStaggerReveal(7)
  const reviewsRef   = useStaggerReveal(6)
  const r1 = useReveal(); const r2 = useReveal(); const r3 = useReveal()
  const r4 = useReveal(); const r5 = useReveal(); const r6 = useReveal()
  const r7 = useReveal(); const r8 = useReveal(); const r9 = useReveal()
  const r10 = useReveal(); const r11 = useReveal(); const r12 = useReveal()

  function toggleFaq(i) { setOpenFaq(openFaq === i ? null : i) }

  return (
    <>
      {/* â•â•â•â•â•â• SECTION 2: HERO â•â•â•â•â•â• */}
      <section
        className="hero-circle-bg relative overflow-hidden pt-[68px]"
        style={{ background: 'linear-gradient(135deg, #04342C 0%, #0B6B52 55%, #1D9E75 100%)' }}
        aria-label="iPROFIXER â€” home services Malaysia hero"
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left copy */}
          <div className="text-white">
            <div className="fade-up inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-6">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="7" fill="#1D9E75"/><path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Vetted Pros Â· KL, PJ &amp; Selangor
            </div>

            <h1 className="fade-up fade-up-1 font-head font-extrabold text-4xl sm:text-5xl lg:text-[52px] leading-tight text-white mb-5">
              The Easiest Way to Book{' '}
              <span className="text-[#7FFFD4]">Home Services in Malaysia</span>
            </h1>

            <p className="fade-up fade-up-2 text-white/80 text-[17px] leading-relaxed mb-6 max-w-lg">
              Electricians, cleaners, AC repair, caregivers and more â€” all in one place. Real pros. Fixed prices. Book in under 2 minutes.
            </p>

            <div className="fade-up fade-up-3 flex flex-wrap gap-2 mb-7">
              <span className="trust-chip">âœ“ Background Checked</span>
              <span className="trust-chip">âœ“ Insured on Every Job</span>
              <span className="trust-chip">âœ“ Pay After the Job</span>
            </div>

            <div className="fade-up fade-up-4 flex flex-wrap gap-3 mb-5">
              <a
                href="#hero-form"
                className="btn-orange text-base px-7 py-3.5 shadow-lg shadow-orange/30"
                aria-label="Book home services in Malaysia now"
              >
                Book a Service Now â†’
              </a>
              <a
                href="https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa text-base px-6 py-3.5"
                aria-label="Chat on WhatsApp to book home services"
              >
                {WA_SVG} Chat on WhatsApp
              </a>
            </div>

            <p className="fade-up fade-up-5 text-white/50 text-sm">
              Trusted by <strong className="text-white/80">9,000+ homeowners</strong> in Klang Valley
            </p>
          </div>

          {/* Right: Booking form */}
          <div className="fade-up fade-up-2 lg:justify-self-end w-full max-w-md lg:ml-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â• SECTION 3: STATS STRIP â•â•â•â•â•â• */}
      <section style={{ background: '#04342C' }} className="py-12" aria-label="iPROFIXER statistics">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-white/10">
            <StatCounter target={9641}  suffix="+"  label="Jobs completed so far" />
            <StatCounter target={98}    suffix="%"  label="Customers come back again" />
            <StatCounter target={50}    suffix="+"  label="Service types available" />
            <StatCounter target={12}    suffix=""   label="Cities in Klang Valley" />
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â• SECTION 4: SERVICES â•â•â•â•â•â• */}
      <section id="services" className="py-20 bg-bg-soft" aria-label="Home services available in Malaysia">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r1} className="reveal text-center mb-12">
            <span className="section-label">What We Cover</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-3">Every Home Service You'll Ever Need â€” In One Place</h2>
            <p className="text-muted max-w-xl mx-auto">Stop juggling five different numbers. We've got one platform for all of it.</p>
          </div>

          <div ref={servicesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.name} className="service-card reveal-card">
                <div className="text-3xl mb-1" aria-hidden="true">{s.icon}</div>
                <h3 className="font-head font-bold text-lg text-text">{s.name}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{s.desc}</p>
                <a href="#hero-form" className="text-teal font-semibold text-sm hover:text-teal-dark transition-colors"
                  aria-label={`Book ${s.name} in KL and Selangor`}>
                  Book Now â†’
                </a>
              </div>
            ))}
          </div>

          <div ref={r2} className="reveal text-center mt-10">
            <a href="#hero-form" className="btn-outline-teal text-base px-8 py-3">See All Services â†’</a>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â• SECTION 5: HOW IT WORKS â•â•â•â•â•â• */}
      <section id="how-it-works" className="py-20 bg-white" aria-label="How iPROFIXER home services booking works">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r3} className="reveal text-center mb-14">
            <span className="section-label">Simple Process</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-3">Booking Takes Less Than 2 Minutes</h2>
            <p className="text-muted max-w-xl mx-auto">We've made it as simple as possible. Here's how it works.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { n: '1', title: 'Tell us what you need',        desc: 'Pick your service and area. Takes 30 seconds.' },
              { n: '2', title: 'We match you with a pro',      desc: "You'll get a WhatsApp message with your matched professional within 15 minutes." },
              { n: '3', title: 'They show up and do the job',  desc: 'Vetted, insured, on time. You can track them live.' },
              { n: '4', title: 'Pay after. Rate your pro',     desc: "Cash, DuitNow, TnG or GrabPay. Only pay when you're satisfied." },
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

      {/* â•â•â•â•â•â• SECTION 6: TWO-SIDED PLATFORM â•â•â•â•â•â• */}
      <section id="for-pros" className="py-20 bg-bg-soft" aria-label="iPROFIXER for homeowners and professionals">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Homeowners */}
            <div ref={r9} className="reveal platform-card">
              <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-light px-3 py-1 rounded-full w-fit">FOR HOMEOWNERS</span>
              <h3 className="font-head font-bold text-2xl text-text">Find someone you can actually trust</h3>
              <p className="text-muted text-sm leading-relaxed">
                We check every professional before they join our platform. Background check, IC verification, skills test and insurance. So you don't have to worry.
              </p>
              <ul className="space-y-2">
                {['Fixed upfront pricing â€” no surprises','Same-day bookings available','Live tracking when your pro is on the way',"Free replacement if you're not satisfied"].map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-text">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="#E0F4EE"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#0B6B52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#hero-form" className="btn-orange w-fit">Book Your First Service â†’</a>
            </div>

            {/* For Professionals */}
            <div ref={r10} className="reveal platform-card" style={{ background: '#F0FBF7', borderColor: '#B2E0D2' }}>
              <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal-light px-3 py-1 rounded-full w-fit">FOR PROFESSIONALS</span>
              <h3 className="font-head font-bold text-2xl text-text">Earn more. Work on your own terms.</h3>
              <p className="text-muted text-sm leading-relaxed">
                Join 500+ professionals already earning through iPROFIXER. Set your own hours, pick your own jobs and get paid straight after every booking.
              </p>
              <ul className="space-y-2">
                {['Free to join â€” no monthly fee','Set your own rates and availability','Get client requests in your city','Payments secured on every job'].map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-text">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="#E0F4EE"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#0B6B52" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/for-professionals" className="btn-teal w-fit">Join as a Professional â†’</Link>
            </div>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â• SECTION 7: TESTIMONIALS â•â•â•â•â•â• */}
      <section className="py-20 bg-white" aria-label="Customer reviews for iPROFIXER home services">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r11} className="reveal text-center mb-12">
            <span className="section-label">Real Reviews</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-2">What Our Customers Say</h2>
            <p className="text-muted">Real reviews from homeowners across Klang Valley.</p>
          </div>

          <div ref={reviewsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="review-card reveal-card">
                <div className="flex gap-0.5 text-yellow-400 text-lg" aria-label="5 star rating">
                  {'â˜…â˜…â˜…â˜…â˜…'}
                </div>
                <p className="text-muted text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-text text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â• SECTION 8: COVERAGE â•â•â•â•â•â• */}
      <section className="py-20 bg-white" aria-label="Coverage areas in Klang Valley">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div ref={r12} className="reveal text-center mb-10">
            <span className="section-label">Coverage</span>
            <h2 className="font-head font-bold text-3xl sm:text-4xl text-text mt-2 mb-2">We Come to You â€” Across All of Klang Valley</h2>
            <p className="text-muted">Currently active in 12 cities. Expanding soon.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {CITIES.map(c => (
              <span key={c} className="city-chip">{c}</span>
            ))}
          </div>
          <p className="text-center text-muted text-sm">
            Don't see your area?{' '}
            <a
              href="https://wa.me/60162104127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal font-semibold hover:underline"
            >
              WhatsApp us
            </a>
            {' '}â€” we may still be able to help.
          </p>
        </div>
      </section>

      {/* â•â•â•â•â•â• SECTION 9: FAQ â•â•â•â•â•â• */}
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

      {/* â•â•â•â•â•â• SECTION 10: FINAL CTA BANNER â•â•â•â•â•â• */}
      <section className="py-16 px-4" style={{ background: '#0B6B52' }} aria-label="Book home services in Malaysia">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-head font-bold text-3xl sm:text-4xl text-white mb-3">Ready to Book? Let's Sort It Out Today.</h2>
          <p className="text-white/80 text-lg mb-8">Over 9,000 homeowners have trusted us. Your turn.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#hero-form"
              className="inline-flex items-center gap-2 bg-white text-teal font-bold text-base px-8 py-3.5 rounded-card hover:bg-teal-light transition-all duration-200 shadow-md"
            >
              Book a Service â†’
            </a>
            <a
              href="https://wa.me/60162104127?text=Hi%2C%20I%20need%20help%20booking%20a%20home%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa text-base px-8 py-3.5"
            >
              {WA_SVG} Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â• MOBILE BOTTOM BAR â•â•â•â•â•â• */}
      <div className="mobile-bar" aria-label="Mobile quick actions">
        <a href="#hero-form"
          className="flex-1 bg-orange text-white font-bold text-sm py-4 text-center hover:bg-orange-dark transition-colors">
          Book Now
        </a>
        <a href="https://wa.me/60162104127"
          target="_blank" rel="noopener noreferrer"
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
