import PageHero from '../components/PageHero.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

/* ─── All Unsplash images — copyright-free ──────────────────────────────────── */
const IMG = {
  /* Cleaning */
  deepClean:    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  renoClean:    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80',
  sofa:         'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  /* Kitchen */
  kitchen:      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  /* Bathroom */
  bathroom:     'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
  /* Laundry */
  laundry:      'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=600&q=80',
  ironing:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  subscription: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&q=80',
  /* Maid */
  parttime:     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  postEvent:    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
}

const CATEGORIES = [
  {
    id: 'deep-clean', tag: 'Deep Cleaning', title: 'Deep Cleaning',
    tagImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    cards: [
      { img: IMG.deepClean, name: 'Home Deep Cleaning',       desc: 'Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas.', feats: ['Eco-friendly products','3–8 hour packages','Satisfaction guaranteed'], wa: 'Home deep cleaning' },
      { img: IMG.kitchen, name: 'Kitchen Deep Clean',        desc: 'Complete kitchen transformation with grease removal, cabinet wipe-down and full sanitisation.', feats: ['Degreaser treatment','All surfaces covered','Odour elimination'], wa: 'Kitchen deep clean' },
      { img: IMG.bathroom,  name: 'Bathroom Deep Clean',       desc: 'Complete bathroom sanitisation with tile scrubbing, limescale removal and mirror polishing.', feats: ['Anti-bacterial treatment','Grout cleaning','Streak-free mirrors'], wa: 'Bathroom deep clean' },
    ],
  },
  {
    id: 'regular-maid', tag: 'Maid Service', title: 'Regular Maid Service',
    tagImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    cards: [
      { img: IMG.parttime,  name: 'Regular Maid Service',     desc: 'Flexible 4–8 hour cleaning sessions — weekly, bi-weekly or one-off bookings.', feats: ['Vetted & insured','Flexible scheduling','Cancel anytime'], wa: 'Regular maid service' },
      { img: IMG.parttime,    name: 'Part-Time Maid',     desc: '4-hour or 8-hour daily cleaning and household help by vetted maids.', feats: ['Same cleaner every visit','Regular or one-time','All household chores'], wa: 'Part-time maid' },
      { img: IMG.postEvent, name: 'Post-Event Cleanup',       desc: 'After your kenduri, birthday or gathering — restore your home fast.', feats: ['Same-day availability','Waste disposal included','2–4 hour rapid clean'], wa: 'Post-event cleanup' },
    ],
  },
  {
    id: 'specialised', tag: 'Specialised', title: 'Specialised Cleaning',
    tagImg: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80',
    cards: [
      { img: IMG.renoClean,    name: 'Post-Renovation Cleaning', desc: 'Industrial-grade clean to remove cement dust, paint splatters and construction residue.', feats: ['Tile & glass polishing','Dust extraction equipment','Same-day available'], wa: 'Post-renovation cleaning' },
      { img: IMG.sofa,         name: 'Sofa & Carpet Cleaning',   desc: 'Deep extraction cleaning for fabric sofas, mattresses, carpets and rugs.', feats: ['Steam extraction','Stain & odour removal','Quick dry technology'], wa: 'Sofa and carpet cleaning' },
      { img: IMG.sofa, name: 'Mattress & Upholstery',    desc: 'Steam and UV cleaning for mattresses and upholstered furniture to eliminate dust mites.', feats: ['UV sanitisation','Dust mite elimination','Allergen-friendly'], wa: 'Mattress cleaning' },
    ],
  },
  {
    id: 'laundry', tag: 'Laundry', title: 'Laundry & Ironing',
    tagImg: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=1200&q=80',
    cards: [
      { img: IMG.laundry,      name: 'Wash & Fold Service',      desc: 'Professional washing, drying and folding for everyday clothes, bedsheets and towels.', feats: ['Free pickup & delivery','48-hour turnaround','Eco-friendly detergent'], wa: 'Wash and fold service' },
      { img: IMG.ironing,     name: 'Ironing & Pressing',        desc: 'Crisp, wrinkle-free ironing for office wear, traditional attire and delicate fabrics.', feats: ['Steam pressing available','Garment protection','Same-day service'], wa: 'Ironing service' },
      { img: IMG.laundry, name: 'Laundry & Ironing',      desc: 'Complete laundry solution with wash, dry, fold and iron. Free pickup and delivery.', feats: ['Free pickup & delivery','48-hour turnaround','Steam ironing available'], wa: 'Laundry and ironing' },
    ],
  },
]

function ServiceCard({ card }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleBook = () => {
    if (user) {
      navigate(`/dashboard/bookings?service=${encodeURIComponent(card.name)}`)
    } else {
      navigate(`/signup?service=${encodeURIComponent(card.name)}`)
    }
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
      {/* Real photo header */}
      <div className="relative overflow-hidden h-44">
        <img
          src={card.img}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="font-head font-black text-gray-900 text-xl uppercase tracking-wide mb-2">{card.name}</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 font-body">{card.desc}</p>
        <div className="space-y-1.5 mb-5">
          {card.feats.map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-gray-800 font-body font-medium">
              <CheckCircle size={13} className="text-gold flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
        <button
          onClick={handleBook}
          className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-white font-head font-bold text-sm uppercase tracking-wide py-3 rounded-xl transition-all duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <PageHero tag="Marketplace" title="Cleaning Services" subtitle="Browse independently listed cleaning vendors across 12 major Malaysian cities. Compare, choose and book — all on the app." breadcrumb="Services" />

      {/* Sticky quick-nav pills */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(c => (
            <a key={c.id} href={`#${c.id}`}
              className="flex-shrink-0 text-xs font-head font-bold uppercase tracking-wide bg-gray-50 border border-gray-200 hover:border-gold hover:text-gold hover:bg-gold/5 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
              {c.title}
            </a>
          ))}
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {CATEGORIES.map(cat => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28">

              {/* Category header with background photo */}
              <div className="relative rounded-2xl overflow-hidden mb-8 h-36 sm:h-44">
                <img src={cat.tagImg} alt={cat.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand/90 via-brand/60 to-transparent" />
                <div className="absolute inset-0 flex items-center px-8">
                  <div>
                    <span className="text-xs font-head font-black uppercase tracking-[0.2em] text-gold/80 mb-1 block">{cat.tag}</span>
                    <h2 className="font-head font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">{cat.title}</h2>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.cards.map(card => <ServiceCard key={card.name} card={card} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1621905252507-b35492db74fd?w=1400&q=80" alt="Southeast Asian professional team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand/90" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-5">Download Now</span>
          <h2 className="font-head font-black text-4xl sm:text-5xl text-white uppercase tracking-tight mb-4">Client or Vendor? Join the Marketplace.</h2>
          <p className="text-white/60 mb-8 font-body">Clients — download the app and book a vetted cleaning pro in minutes. Vendors — list your services, set your rates, and grow your business on iPROFIXER.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-brand font-bold px-6 py-3 rounded-xl transition-all shadow-lg">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-3H9V7h2v6z"/></svg>
              <div className="text-left">
                <div className="text-[10px] leading-none uppercase tracking-wide">New Customer?</div>
                <div className="text-sm font-head font-black leading-none">Sign Up Now</div>
              </div>
            </Link>
            <Link to="/pro-signup"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-xl transition-all">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <div className="text-left">
                <div className="text-[10px] leading-none uppercase tracking-wide">Professional?</div>
                <div className="text-sm font-head font-black leading-none">Join as Pro</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
