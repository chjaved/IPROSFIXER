import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi.js'
import { Banknote, Calendar, MapPin, GraduationCap, ShieldCheck, Smartphone, MessageCircle, ArrowRight, Star, CheckCircle } from 'lucide-react'

const PERKS = [
  { Icon: Banknote,      title: 'Earn More, Keep More',       desc: 'Set your own rates. iPROFIXER takes a small platform fee — you keep the majority. Top pros earn RM4,000–RM6,000/month.', img: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=80' },
  { Icon: Calendar,      title: '100% Flexible Schedule',     desc: 'Work full-time or part-time. Accept jobs when you want, turn them down when you do not. Total control.', img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80' },
  { Icon: MapPin,        title: 'Jobs Near You',              desc: 'Our smart matching sends you job requests close to your home — minimise travel time and fuel costs.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { Icon: GraduationCap, title: 'Free Training & Upskilling',  desc: 'Access free skills workshops, safety training and certification support. Grow your expertise, grow your rates.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
  { Icon: ShieldCheck,   title: 'Insurance Coverage',         desc: 'All active professionals are covered by personal accident insurance while on the job. Work with peace of mind.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80' },
  { Icon: Smartphone,    title: 'Easy-to-Use App',            desc: 'Manage all bookings, earnings, reviews and schedule from one simple app. No paperwork, no fuss.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
]

const STEPS = [
  { n: '01', title: 'Apply Online',     desc: 'Fill the form or WhatsApp us your name, phone and service type.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80' },
  { n: '02', title: 'Verification',     desc: 'We check identity, references and experience within 24-48 hours.', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80' },
  { n: '03', title: 'Onboarding',       desc: 'Quick briefing on standards, app walkthrough and first job support.', img: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&q=80' },
  { n: '04', title: 'Start Earning',    desc: 'Accept jobs near you, complete them well and build your rating.', img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80' },
]

const TESTIMONIALS = [
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', name: 'Rajan Selvam',  role: 'Electrician — Subang Jaya',  text: 'Before iPROFIXER I was struggling to find clients. Now I get 3-5 jobs a day. My income doubled in 3 months. Terbaik!' },
  { img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', name: 'Hairul Bahari', role: 'House Cleaner — Cheras',      text: 'The app is easy to use. I accept jobs during school hours and am back before my kids come home. Perfect.' },
  { img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', name: 'Kamarul Azri',  role: 'AC Technician — PJ',          text: 'I was earning RM1,800/month on my own. Now on iPROFIXER I consistently earn above RM5,000. Payment is always on time.' },
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
                {[
                  { Icon: Banknote, text: 'Earn RM2K–RM6K/mo' },
                  { Icon: Calendar, text: 'Flexible Schedule' },
                  { Icon: MapPin, text: 'Work Near Home' },
                  { Icon: GraduationCap, text: 'Free Training' },
                ].map(({ Icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full">
                    <Icon size={12} /> {text}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-head font-black text-white text-xl uppercase tracking-wide mb-5 flex items-center gap-2">
                <Star size={18} className="text-gold" /> Quick Apply — Takes 2 Minutes
              </h2>
              <ApplyForm />
            </div>
          </div>
        </div>
      </div>

      {/* Perks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Why iPROFIXER</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Benefits of Joining</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto font-body">Everything you need to build a successful service career.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map(({ Icon, title, desc, img }) => (
              <div key={title} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-gold/20 backdrop-blur flex items-center justify-center">
                    <Icon size={18} className="text-gold" />
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-head font-black text-brand text-lg uppercase tracking-wide mb-2">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-body">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to register */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Registration Process</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">How to Join</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto font-body">Get approved in 48 hours. Start earning immediately.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="group relative text-center">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-5 shadow-lg">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-gold/20 backdrop-blur flex items-center justify-center">
                    <span className="font-head font-black text-gold text-sm">{s.n}</span>
                  </div>
                </div>
                <h4 className="font-head font-black text-brand text-base uppercase tracking-wide mb-1">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-body">{s.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-24 left-[60%] w-[80%] h-px border-t-2 border-dashed border-gold/30" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-4">Pro Stories</span>
            <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight">Hear From Our Professionals</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl transition-all duration-200">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FFB800" stroke="none" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic font-body">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-gold/30" />
                  <div>
                    <div className="font-head font-bold text-brand text-sm uppercase tracking-wide">{t.name}</div>
                    <div className="text-gray-400 text-xs font-body">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80" alt="Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gold/90" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight mb-4">Ready to Start Earning?</h2>
          <p className="text-brand/70 mb-8 font-body">Apply now and get your first job within 48 hours of approval.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/60162104127?text=Hi%20iPROFIXER!%20I'd%20like%20to%20join%20as%20a%20professional." target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all shadow-lg">
              <MessageCircle size={18} /> Apply on WhatsApp
            </a>
            <Link to="/how-it-works"
              className="inline-flex items-center gap-2 bg-white/40 hover:bg-white/60 text-brand font-head font-bold text-base uppercase tracking-wide px-8 py-4 rounded-xl transition-all">
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
