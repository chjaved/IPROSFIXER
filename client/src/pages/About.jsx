import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { Shield, DollarSign, Zap, Heart, Star, MapPin, ArrowRight, CheckCircle } from 'lucide-react'

const STATS = [
  { num: '9,641+', label: 'Jobs Completed',    sub: 'And growing every month' },
  { num: '500+',   label: 'Active Pros',        sub: 'Vetted and insured' },
  { num: '98%',    label: 'Satisfaction Rate',  sub: 'From verified reviews' },
  { num: '4.8',    label: 'App Rating',          sub: 'iOS & Google Play' },
]

const VALUES = [
  { Icon: Shield,      title: 'Trust First',        desc: 'Every professional is background-checked, identity-verified and rated by real customers before their first job.' },
  { Icon: DollarSign,  title: 'Fair Pricing',        desc: 'No hidden charges. Transparent quotes upfront so you always know exactly what you pay for.' },
  { Icon: Zap,         title: 'Speed & Reliability', desc: 'We confirm bookings within 30 minutes and professionals arrive on time, every time.' },
  { Icon: Heart,       title: 'Community-First',      desc: 'We empower local tradespeople to grow their business and earn more in their own communities.' },
  { Icon: Star,        title: 'Quality Guaranteed',   desc: 'Not satisfied? We send someone back at no cost. Your satisfaction is always our commitment.' },
  { Icon: MapPin,      title: 'Proudly Malaysian',    desc: 'Built here, for here. We understand local needs, cultural nuances and what Malaysians expect.' },
]

const TEAM = [
  { name: 'Ahmad Fadzli',    role: 'Founder & CEO',          img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Nurul Ain',       role: 'Head of Operations',     img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Rajesh Kumar',    role: 'Head of Professionals',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Lim Wei Xian',    role: 'Tech Lead',              img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
]

export default function About() {
  return (
    <>
      <PageHero tag="Our Story" title="About iPROFIXER" subtitle="Built in Malaysia, for Malaysians — making home services simple, reliable and fair." breadcrumb="About" />

      {/* Story — split with real photo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
                alt="iPROFIXER team"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-5 left-5 bg-brand/90 backdrop-blur rounded-xl px-5 py-3">
                <div className="text-gold font-head font-black text-xs uppercase tracking-widest mb-0.5">Est. 2020</div>
                <div className="text-white font-head font-bold text-sm">Ara Damansara, Petaling Jaya</div>
              </div>
            </div>
            <div>
              <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-5">Who We Are</span>
              <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight mb-5 leading-tight">
                Home Services,<br />Reimagined for Malaysia
              </h2>
              <div className="space-y-4 text-gray-500 text-base leading-relaxed font-body">
                <p>iPROFIXER was founded in 2020 with one simple goal: make it easy for every Malaysian household to find a trusted, affordable professional — fast.</p>
                <p>We started in Ara Damansara, Petaling Jaya with just a handful of electricians and cleaners. Today we have a growing network of 500+ vetted professionals serving all of Klang Valley.</p>
                <p>Our mobile app connects homeowners with skilled tradespeople and caregivers in real-time — with transparent pricing, secure payments and a satisfaction guarantee on every single job.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                {['Background Checked','Fully Insured','Satisfaction Guaranteed','Fixed Pricing'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-xs font-body text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full">
                    <CheckCircle size={12} className="text-gold" /> {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/services"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-brand font-head font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-xl transition-all">
                  Our Services <ArrowRight size={14} />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white font-head font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-xl transition-all">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band with bg photo */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80" alt="professionals" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand/92" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="font-head font-black text-4xl sm:text-5xl text-gold mb-1">{s.num}</div>
                <div className="text-white font-head font-bold text-base uppercase tracking-wide">{s.label}</div>
                <div className="text-white/40 text-xs mt-1 font-body">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">What Drives Us</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-gold" />
                </div>
                <h4 className="font-head font-black text-brand text-xl uppercase tracking-wide mb-2">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Leadership</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Meet The Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(t => (
              <div key={t.name} className="group text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="font-head font-black text-brand text-base uppercase tracking-wide">{t.name}</h4>
                <p className="text-gray-400 text-sm font-body mt-0.5">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=1400&q=80" alt="cleaning" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gold/90" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight mb-4">Want to Work With Us?</h2>
          <p className="text-brand/70 mb-8 font-body">Join as a professional or partner with iPROFIXER for B2B home services.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/for-professionals"
              className="inline-flex items-center gap-2 bg-brand text-white font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl hover:bg-brand-light transition-all">
              Join as a Pro <ArrowRight size={16} />
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-white/40 hover:bg-white/60 text-brand font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
