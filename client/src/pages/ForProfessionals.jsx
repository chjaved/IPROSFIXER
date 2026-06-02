import { Link } from 'react-router-dom'
import { Banknote, Calendar, MapPin, GraduationCap, ShieldCheck, Smartphone, MessageCircle, ArrowRight, Star } from 'lucide-react'

const PERKS = [
  { Icon: Banknote,      title: 'Earn More, Keep More',       desc: 'Set your own rates. iPROFIXER takes a small platform fee — you keep the majority. Top cleaners earn RM3,000–RM5,000/month.', img: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=80' },
  { Icon: Calendar,      title: '100% Flexible Schedule',     desc: 'Work full-time or part-time. Accept cleaning jobs when you want, turn them down when you do not. Perfect for stay-home parents.', img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80' },
  { Icon: MapPin,        title: 'Jobs Near You',              desc: 'Our smart matching sends you cleaning requests close to your home — minimise travel time and fuel costs. Work in your neighbourhood.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { Icon: GraduationCap, title: 'Free Training & Upskilling',  desc: 'Access free cleaning workshops, learn professional techniques, eco-friendly products, and equipment handling. Grow your skills.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
  { Icon: ShieldCheck,   title: 'Insurance Coverage',         desc: 'All active cleaners are covered by personal accident insurance while on the job. Work with peace of mind in any home.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80' },
  { Icon: Smartphone,    title: 'Easy-to-Use App',            desc: 'Manage all cleaning bookings, earnings, reviews and schedule from one simple app. No paperwork, no fuss — even for beginners.', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
]

const STEPS = [
  { n: '01', title: 'Apply Online',     desc: 'Fill the form or WhatsApp us your name, phone and service type.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80' },
  { n: '02', title: 'Verification',     desc: 'We check identity, references and experience within 24-48 hours.', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80' },
  { n: '03', title: 'Onboarding',       desc: 'Quick briefing on standards, app walkthrough and first job support.', img: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&q=80' },
  { n: '04', title: 'Start Earning',    desc: 'Accept jobs near you, complete them well and build your rating.', img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80' },
]

const TESTIMONIALS = [
  { img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', name: 'Kavita Devi',   role: 'Part-Time Maid — PJ',         text: 'As a stay-home mom, I work 4 hours daily while kids are at school. I earn RM2,400/month with flexible hours. Very grateful!' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', name: 'Hairul Bahari', role: 'Deep Cleaner — Cheras',       text: 'The app is easy to use. I accept jobs during school hours and am back before my kids come home. Perfect for parents.' },
  { img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', name: 'Aisyah Tan',    role: 'Post-Natal Helper — KL',     text: 'I help new mothers with confinement care. The platform helps me find regular clients. Income is stable and growing.' },
  { img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&q=80', name: 'Muthu Rajan',  role: 'Post-Reno Cleaner — Subang',  text: 'Specialising in post-renovation cleaning. I get 4-5 big jobs weekly. Earn more than my previous office job!' },
  { img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', name: 'Farid Ahmad',  role: 'Carpet Cleaner — Shah Alam',  text: 'Started with just basic equipment. Now I have regular clients and earn steady income every month. Highly recommend!' },
  { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80', name: 'Lisa Wong',    role: 'Full-Time Maid — Mont Kiara', text: 'Found a long-term placement through iPROFIXER. The family treats me well and I have stable income plus benefits.' },
]

export default function ForProfessionals() {
  return (
    <>
      {/* Hero split */}
      <div className="bg-teal-light pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-teal/20 text-teal px-4 py-1.5 rounded-full mb-5">
                Join Our Team
              </span>
              <h1 className="font-head font-extrabold text-4xl sm:text-5xl text-gray-900 leading-tight mb-5">
                Be Your Own Boss.<br />Earn <span className="text-gold">More Income.</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Join 500+ cleaners and maids already earning on iPROFIXER. Set your own hours, work near home, and get paid fast.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { num: '500+', label: 'Active Cleaners & Maids' },
                  { num: 'RM5K', label: 'Top Monthly Earn' },
                  { num: '48hrs', label: 'Approval Time' },
                  { num: 'Free', label: 'Training & Support' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-card p-4 text-center shadow-sm">
                    <div className="font-head font-extrabold text-teal text-xl">{s.num}</div>
                    <div className="text-gray-500 text-xs mt-1">{s.label}</div>
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
                  <span key={text} className="flex items-center gap-1.5 bg-white text-gray-600 text-xs px-3 py-1.5 rounded-full shadow-sm">
                    <Icon size={12} className="text-teal" /> {text}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-head font-black text-gray-900 text-2xl uppercase tracking-wide mb-3 flex items-center gap-2">
                <Star size={20} className="text-gold" /> Ready to Join?
              </h2>
              <p className="text-gray-600 mb-6">Create your professional account and start earning today. It only takes 2 minutes to get started.</p>
              <Link to="/pro-signup"
                className="inline-flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-white font-head font-bold text-lg uppercase tracking-wide px-8 py-4 rounded-xl transition-all shadow-lg">
                Register as Professional <ArrowRight size={20} />
              </Link>
              <div className="mt-4 text-center">
                <span className="text-gray-400 text-sm">or</span>
              </div>
              <a href="https://wa.me/60162104127?text=Hi%20iPROFIXER!%20I'd%20like%20to%20join%20as%20a%20professional." target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full mt-4 bg-wa hover:bg-wa-dark text-white font-head font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-xl transition-all">
                <MessageCircle size={18} /> Apply via WhatsApp
              </a>
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
          <img src="https://images.unsplash.com/photo-1621905252507-b35492db74fd?w=1400&q=80" alt="Southeast Asian professional team" className="w-full h-full object-cover" />
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
