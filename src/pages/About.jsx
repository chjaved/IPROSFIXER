import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'

const STATS = [
  { num: '9,641+', label: 'Jobs Completed' },
  { num: '500+',   label: 'Professionals' },
  { num: '98%',    label: 'Satisfaction Rate' },
  { num: '4.8⭐',  label: 'App Rating' },
]

const VALUES = [
  { icon: '🔒', title: 'Trust First',         desc: 'Every professional is background-checked, identity-verified and rated by real customers.' },
  { icon: '💰', title: 'Fair Pricing',         desc: 'No hidden charges. Transparent quotes upfront so you always know what you pay for.' },
  { icon: '⚡', title: 'Speed & Reliability',  desc: 'We confirm bookings within 30 minutes and professionals arrive on time, every time.' },
  { icon: '🌍', title: 'Community-First',       desc: 'We empower local tradespeople to grow their business and earn more in their own community.' },
  { icon: '✨', title: 'Quality Guaranteed',    desc: 'Not satisfied? We send someone back at no cost. Your satisfaction is our commitment.' },
  { icon: '🇲🇾', title: 'Proudly Malaysian',   desc: 'Built here, for here. We understand local needs, cultural nuances and what Malaysians expect.' },
]

export default function About() {
  return (
    <>
      <PageHero tag="Our Story" title="About iPROFIXER" subtitle="Built in Malaysia, for Malaysians — making home services simple, reliable and fair." breadcrumb="About" />

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
            <div className="bg-brand rounded-lg2 flex flex-col items-center justify-center h-72 text-center">
              <span className="text-7xl mb-4">🏠</span>
              <div className="text-gold font-head font-black text-xl italic">iPROFIXER</div>
              <div className="text-white/60 text-sm mt-1">Est. 2020 — Ara Damansara, PJ</div>
            </div>
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2 mb-4">Home Services, Reimagined for Malaysia</h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>iPROFIXER was founded in 2020 with one simple goal: make it easy for every Malaysian household to find a trusted, affordable professional — fast.</p>
                <p>We started in Ara Damansara, Petaling Jaya with just a handful of electricians and cleaners. Today we have a growing network of 500+ vetted professionals serving Klang Valley.</p>
                <p>Our mobile app connects homeowners with skilled tradespeople and caregivers in real-time — with transparent pricing, secure payments and a satisfaction guarantee on every job.</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/services" className="btn-primary px-7">Our Services →</Link>
                <Link to="/contact" className="btn-dark px-7">Get In Touch</Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-brand rounded-lg2 p-10 mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-head font-extrabold text-2xl sm:text-3xl text-gold">{s.num}</div>
                  <div className="text-white/60 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <span className="section-tag">What Drives Us</span>
            <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="card">
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h4 className="font-head font-bold text-brand mb-2">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-16 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-head font-extrabold text-3xl text-brand mb-3">Want to Work With Us?</h2>
          <p className="text-brand/70 mb-8">Join as a professional or partner with iPROFIXER for B2B home services.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/for-professionals" className="btn-dark px-8 py-3.5">Join as a Pro →</Link>
            <Link to="/contact" className="bg-white/30 hover:bg-white/50 text-brand font-bold px-8 py-3.5 rounded-card transition-all inline-flex items-center gap-2">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
