import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi.js'

const PERKS = [
  { icon: '💰', title: 'Earn More, Keep More',      desc: 'Set your own rates. iPROFIXER takes a small platform fee — you keep the majority. Top pros earn RM4,000–RM6,000/month.' },
  { icon: '📅', title: '100% Flexible Schedule',    desc: 'Work full-time or part-time. Accept jobs when you want, turn them down when you don\'t. Total control.' },
  { icon: '📍', title: 'Jobs Near You',             desc: 'Our smart matching sends you job requests close to your home — minimise travel time and fuel costs.' },
  { icon: '🎓', title: 'Free Training & Upskilling', desc: 'Access free skills workshops, safety training and certification support. Grow your expertise, grow your rates.' },
  { icon: '🔒', title: 'Insurance Coverage',        desc: 'All active professionals are covered by personal accident insurance while on the job. Work with peace of mind.' },
  { icon: '📱', title: 'Easy-to-Use App',           desc: 'Manage all bookings, earnings, reviews and schedule from one simple app. No paperwork, no fuss.' },
]

const STEPS = [
  { n: 1, icon: '📄', title: 'Apply Online',      desc: 'Fill the form or WhatsApp us your name, phone and service type.' },
  { n: 2, icon: '🔍', title: 'Verification',      desc: 'We check identity, references and experience within 24-48 hours.' },
  { n: 3, icon: '🎓', title: 'Onboarding',        desc: 'Quick briefing on standards, app walkthrough and first job support.' },
  { n: 4, icon: '💰', title: 'Start Earning',     desc: 'Accept jobs near you, complete them well and build your rating.' },
]

const TESTIMONIALS = [
  { initials: 'RS', name: 'Rajan Selvam',  role: 'Electrician — Subang Jaya',  text: 'Before iPROFIXER I was struggling to find clients. Now I get 3-5 jobs a day. My income doubled in 3 months. Terbaik!' },
  { initials: 'HB', name: 'Hairul Bahari', role: 'House Cleaner — Cheras',      text: 'The app is easy to use. I accept jobs during school hours and am back before my kids come home. Perfect.' },
  { initials: 'KA', name: 'Kamarul Azri',  role: 'AC Technician — PJ',          text: 'I was earning RM1,800/month on my own. Now on iPROFIXER I consistently earn above RM5,000. Payment is always on time.' },
]

function ApplyForm() {
  const { post, loading, success, error } = useApi()
  const [form, setForm] = useState({ name: '', phone: '', serviceType: '', experience: '', area: '' })
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => { e.preventDefault(); await post('join', form) }

  return (
    <div className="bg-white rounded-lg2 border border-gray-200 p-8">
      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-card p-5 text-sm font-medium">
          ✅ {success}
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input name="name" value={form.name} onChange={handle} placeholder="Your full name" required className="form-input" />
            </div>
            <div>
              <label className="form-label">Phone Number *</label>
              <input name="phone" value={form.phone} onChange={handle} placeholder="+60 1X-XXXX XXXX" required className="form-input" />
            </div>
          </div>
          <div>
            <label className="form-label">Service Type *</label>
            <select name="serviceType" value={form.serviceType} onChange={handle} required className="form-input">
              <option value="">— What do you offer? —</option>
              {['Electrician','AC Technician','Appliance Repair','Caregiver','Cleaner','Laundry','House Maid','Plumber','Painter','Other'].map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Years of Experience</label>
              <input name="experience" value={form.experience} onChange={handle} placeholder="e.g. 3 years" className="form-input" />
            </div>
            <div>
              <label className="form-label">Your Area</label>
              <input name="area" value={form.area} onChange={handle} placeholder="e.g. Subang Jaya" className="form-input" />
            </div>
          </div>
          {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 font-bold">
            {loading ? 'Sending…' : 'Submit Application →'}
          </button>
        </form>
      )}
    </div>
  )
}

export default function ForProfessionals() {
  return (
    <>
      {/* Hero split */}
      <div className="bg-brand pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-gold/20 text-gold px-4 py-1.5 rounded-full mb-5">
                Join Our Team
              </span>
              <h1 className="font-head font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-5">
                Be Your Own Boss.<br />Earn <span className="text-gold">More Income.</span>
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Join 500+ professionals already growing their business on iPROFIXER. Set your own hours, work near home, and get paid fast.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { num: '500+', label: 'Active Pros' },
                  { num: 'RM6K', label: 'Top Monthly Earn' },
                  { num: '48hrs', label: 'Approval Time' },
                  { num: 'Free', label: 'Training & Support' },
                ].map(s => (
                  <div key={s.label} className="bg-white/10 rounded-card p-4 text-center">
                    <div className="font-head font-extrabold text-gold text-xl">{s.num}</div>
                    <div className="text-white/60 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {['💰 Earn RM2K–RM6K/mo','📅 Flexible Schedule','📍 Work Near Home','🎓 Free Training'].map(t => (
                  <span key={t} className="bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-head font-bold text-white text-xl mb-5">🌟 Quick Apply — Takes 2 Minutes</h2>
              <ApplyForm />
            </div>
          </div>
        </div>
      </div>

      {/* Perks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Why iPROFIXER</span>
            <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2 mb-3">Benefits of Joining</h2>
            <p className="text-gray-500">Everything you need to build a successful service career.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map(p => (
              <div key={p.title} className="card">
                <span className="text-3xl block mb-4">{p.icon}</span>
                <h4 className="font-head font-bold text-brand mb-2">{p.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to register */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Registration Process</span>
            <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2 mb-3">How to Join</h2>
            <p className="text-gray-500">Get approved in 48 hours.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-brand text-gold font-head font-black text-lg flex items-center justify-center mx-auto mb-4">{s.n}</div>
                <span className="text-3xl block mb-3">{s.icon}</span>
                <h4 className="font-head font-bold text-brand mb-1 text-sm">{s.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-0 h-px border-t-2 border-dashed border-gold/30" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Pro Stories</span>
            <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2">Hear From Our Professionals</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-gold text-sm">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand text-gold font-bold text-sm flex items-center justify-center">{t.initials}</div>
                  <div>
                    <div className="font-bold text-brand text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gold py-16 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-head font-extrabold text-3xl text-brand mb-3">Ready to Start Earning?</h2>
          <p className="text-brand/70 mb-8">Apply now and get your first job within 48 hours of approval.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/60162104127?text=Hi%20iPROFIXER!%20I'd%20like%20to%20join%20as%20a%20professional." target="_blank" rel="noopener noreferrer" className="btn-dark px-8 py-3.5">💬 Apply on WhatsApp</a>
            <Link to="/how-it-works" className="bg-white/30 hover:bg-white/50 text-brand font-bold px-8 py-3.5 rounded-card transition-all inline-flex items-center">How It Works</Link>
          </div>
        </div>
      </section>
    </>
  )
}
