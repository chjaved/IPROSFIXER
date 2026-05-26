import PageHero from '../components/PageHero.jsx'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

/* ─── All Unsplash images — copyright-free ──────────────────────────────────── */
const IMG = {
  /* Electrician */
  wiring:       'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
  switch:       'https://images.unsplash.com/photo-1558618047-f4e60ccd50b6?w=600&q=80',
  db:           'https://images.unsplash.com/photo-1544724107-6d5c4caaff30?w=600&q=80',
  /* AC */
  acClean:      'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=600&q=80',
  acGas:        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
  acRepair:     'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
  /* Appliances */
  washingMach:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  fridge:       'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80',
  oven:         'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  /* Caregiver */
  elderly:      'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80',
  postop:       'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  special:      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80',
  /* Cleaning */
  deepClean:    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  renoClean:    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80',
  sofa:         'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  /* Kitchen */
  kitchen:      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  /* Bathroom */
  bathroom:     'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=600&q=80',
  /* Laundry */
  laundry:      'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=600&q=80',
  ironing:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  subscription: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&q=80',
  /* Maid */
  parttime:     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  livein:       'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80',
  postEvent:    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80',
}

const CATEGORIES = [
  {
    id: 'deep-clean', tag: 'Deep Cleaning', title: 'Home Deep Clean',
    tagImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    cards: [
      { img: IMG.deepClean, name: 'Full Home Deep Clean',      desc: 'Top-to-bottom deep clean covering kitchen, bathrooms, bedrooms and living areas. Ideal for move-in/move-out.', feats: ['Eco-friendly products','3–8 hour packages','Satisfaction guaranteed'], wa: 'Full home deep clean' },
      { img: IMG.kitchen, name: 'Kitchen Deep Clean',        desc: 'Grease removal, cabinet wipe-down, appliance exterior clean and full floor scrub.', feats: ['Degreaser treatment','All surfaces covered','Odour elimination'], wa: 'Kitchen deep clean' },
      { img: IMG.bathroom,  name: 'Bathroom Deep Clean',       desc: 'Tile scrubbing, limescale removal, toilet sanitising and mirror polishing.', feats: ['Anti-bacterial treatment','Grout cleaning','Streak-free mirrors'], wa: 'Bathroom deep clean' },
    ],
  },
  {
    id: 'regular-maid', tag: 'Housekeeping', title: 'Regular Maid Service',
    tagImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    cards: [
      { img: IMG.parttime,  name: 'Part-Time Maid',           desc: 'Flexible 4–8 hour cleaning sessions — weekly, bi-weekly or one-off bookings for your home.', feats: ['Vetted & insured','Flexible scheduling','Cancel anytime'], wa: 'Part-time maid booking' },
      { img: IMG.livein,    name: 'Weekly Cleaning Plan',     desc: 'A dedicated cleaner on a fixed weekly schedule — same person, same standard every time.', feats: ['Same cleaner every visit','Fixed monthly pricing','Manage via app'], wa: 'Weekly cleaning plan' },
      { img: IMG.postEvent, name: 'Post-Event Cleanup',       desc: 'After your kenduri, birthday or gathering — restore your home to pristine condition fast.', feats: ['Same-day availability','Waste disposal included','2–4 hour rapid clean'], wa: 'Post-event cleanup' },
    ],
  },
  {
    id: 'specialised', tag: 'Specialised', title: 'Specialised Cleaning',
    tagImg: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80',
    cards: [
      { img: IMG.renoClean,    name: 'Post-Renovation Cleaning', desc: 'Industrial-grade clean to remove cement dust, paint splatters, debris and construction residue.', feats: ['Tile & glass polishing','Dust extraction equipment','Same-day available'], wa: 'Post-reno cleaning' },
      { img: IMG.sofa,         name: 'Sofa & Carpet Cleaning',   desc: 'Deep extraction cleaning for fabric sofas, leather treatment, carpet shampooing and deodorising.', feats: ['Dry & wet extraction','Quick-dry technology','Deodorising treatment'], wa: 'Sofa & carpet cleaning' },
      { img: IMG.subscription, name: 'Mattress & Upholstery',    desc: 'Steam and UV cleaning for mattresses, curtains and upholstered furniture to eliminate dust mites.', feats: ['UV sanitisation','Dust mite elimination','Allergen-friendly'], wa: 'Mattress cleaning' },
    ],
  },
]

function ServiceCard({ card }) {
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
        <a
          href="https://play.google.com/store/apps/details?id=com.iprofixer.app"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-white font-head font-bold text-sm uppercase tracking-wide py-3 rounded-xl transition-all duration-200"
        >
          Book in App
        </a>
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
            <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-brand font-bold px-6 py-3 rounded-xl transition-all shadow-lg">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
              <div className="text-left">
                <div className="text-[10px] leading-none uppercase tracking-wide">Get it on</div>
                <div className="text-sm font-head font-black leading-none">Google Play</div>
              </div>
            </a>
            <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-xl transition-all">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
              <div className="text-left">
                <div className="text-[10px] leading-none uppercase tracking-wide">Download on the</div>
                <div className="text-sm font-head font-black leading-none">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
