import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { CheckCircle, ArrowRight, Shield, Clock, Star, Users } from 'lucide-react'

const CUSTOMER_STEPS = [
  {
    n: '01', title: 'Book in Minutes',
    desc: 'Select your service, area and preferred time. Use our website, WhatsApp or app — whichever is easiest for you.',
    items: ['50+ services available','Cover all Klang Valley areas','Same-day bookings available','Fixed price quoted upfront'],
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80',
  },
  {
    n: '02', title: 'Get Matched Instantly',
    desc: 'We match you with the best-rated available professional near you. You receive their name, photo, rating and ETA.',
    items: ['Verified professional profile sent','Real-time ETA tracking','Direct WhatsApp contact','No surprise costs'],
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80',
  },
  {
    n: '03', title: 'Professional Does the Job',
    desc: 'Your vetted professional arrives on time, assesses the issue and gets to work. Any extra costs are communicated before proceeding.',
    items: ['On-time arrival guaranteed','Full assessment first','Clean, professional work','Minimal disruption to your home'],
    img: 'https://images.unsplash.com/photo-1621905252507-b35492db74fd?w=700&q=80',
  },
  {
    n: '04', title: 'Pay & Rate',
    desc: 'Pay after the job is done — cash, DuitNow, TnG or GrabPay. Rate your professional and get a digital receipt instantly.',
    items: ['Pay only after completion','Cash, DuitNow, TnG, GrabPay','Digital receipt on WhatsApp','30-day repair warranty'],
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
  },
]

const PRO_STEPS = [
  {
    n: '01', title: 'Apply Online',
    desc: 'Fill in your name, phone, service type and area. Upload your IC and any trade certificates. Takes less than 5 minutes.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80',
  },
  {
    n: '02', title: 'Get Verified',
    desc: 'Our team reviews your application within 48 hours. Background check, identity verification and optional skills assessment.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
  },
  {
    n: '03', title: 'Start Getting Jobs',
    desc: 'Download the app, set your availability and areas. Job requests start coming in immediately — accept or decline any booking.',
    img: 'https://images.unsplash.com/photo-1621905252507-b35492db74fd?w=700&q=80',
  },
  {
    n: '04', title: 'Earn More Every Week',
    desc: 'Get paid instantly on job completion. Build your rating, earn repeat customers and grow your income on your own schedule.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
  },
]

const GUARANTEES = [
  { Icon: Shield, title: 'Vetted Professionals',   desc: 'All pros are background-checked, identity-verified and reviewed by real customers before their first job.' },
  { Icon: Clock,  title: 'On-Time Arrival',        desc: 'We monitor every job. If your professional is delayed, we update you proactively. Your time is valuable.' },
  { Icon: Star,   title: 'Satisfaction Guarantee', desc: 'Not happy within 24 hours of job completion? We send someone back at zero cost. No hassle, no arguments.' },
  { Icon: Users,  title: '500+ Active Pros',        desc: 'A large pool of professionals means faster matching and more availability, even on weekends and public holidays.' },
]

export default function HowItWorks() {
  return (
    <>
      <PageHero tag="Simple Process" title="How iPROFIXER Works" subtitle="Book a professional in under 2 minutes — we handle everything else." breadcrumb="How It Works" />

      {/* For Customers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">For Homeowners</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Booking a Service</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto font-body">From request to job done — here is what happens every step of the way.</p>
          </div>

          <div className="space-y-16">
            {CUSTOMER_STEPS.map((s, i) => (
              <div key={s.n} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:[&_.step-img]:order-1 lg:[&_.step-text]:order-2' : ''}`}>
                <div className="step-img relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-brand/90 backdrop-blur flex items-center justify-center">
                    <span className="font-head font-black text-gold text-xl">{s.n}</span>
                  </div>
                </div>
                <div className="step-text">
                  <span className="text-gold font-head font-black text-5xl opacity-20 block mb-2">{s.n}</span>
                  <h3 className="font-head font-black text-3xl sm:text-4xl text-brand uppercase tracking-tight mb-4">{s.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed mb-5 font-body">{s.desc}</p>
                  {s.items && (
                    <ul className="space-y-2">
                      {s.items.map(item => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700 font-body">
                          <CheckCircle size={15} className="text-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-brand font-head font-bold text-base uppercase tracking-wide px-10 py-4 rounded-xl transition-all shadow-lg shadow-gold/20">
              Book Your First Service <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* For Pros */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">For Professionals</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Getting Jobs on iPROFIXER</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto font-body">Join 500+ professionals already earning more with flexible bookings.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRO_STEPS.map(s => (
              <div key={s.n} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 font-head font-black text-gold text-3xl opacity-60">{s.n}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-head font-black text-brand text-lg uppercase tracking-wide mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/for-professionals"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white font-head font-bold text-base uppercase tracking-wide px-10 py-4 rounded-xl transition-all">
              Join as a Professional <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Our Promise</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">The iPROFIXER Guarantee</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUARANTEES.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:border-gold/30 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-gold" />
                </div>
                <h4 className="font-head font-black text-brand text-lg uppercase tracking-wide mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80" alt="Pro at work" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand/90" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <h2 className="font-head font-black text-4xl sm:text-5xl text-white uppercase tracking-tight mb-4">Ready to Get Started?</h2>
          <p className="text-white/60 mb-8 font-body">Book your first service today — free quote, no commitment.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-wa hover:bg-wa-dark text-white font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all">
              WhatsApp Us Now
            </a>
            <Link to="/services"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all">
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
