import PageHero from '../components/PageHero.jsx'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Smartphone } from 'lucide-react'

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
  renoClean:    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  sofa:         'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  /* Laundry */
  laundry:      'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=600&q=80',
  ironing:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  subscription: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&q=80',
  /* Maid */
  parttime:     'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=600&q=80',
  livein:       'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=600&q=80',
  postEvent:    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80',
}

const CATEGORIES = [
  {
    id: 'electrician', tag: 'Electrical', title: 'Electricians',
    tagImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80',
    cards: [
      { img: IMG.wiring,  name: 'Wiring & Rewiring',    desc: 'Full home wiring, partial rewiring, conduit installation and cable management.', feats: ['New wiring installation','Faulty wire tracing & repair','Safety certification available'], wa: 'Wiring service' },
      { img: IMG.switch,  name: 'Switch & Socket Repair', desc: 'Replace broken switches, power points, USB sockets and smart switches. Fast turnaround.', feats: ['All brands & types','Same-day service available','Child-safe socket options'], wa: 'Switch repair' },
      { img: IMG.db,      name: 'DB Box & MCB',          desc: 'Distribution board upgrade, MCB replacement, ELCB installation and TNB compliance checks.', feats: ['TNB compliant work','ELCB / RCD installation','Full board replacement'], wa: 'DB Box service' },
    ],
  },
  {
    id: 'ac', tag: 'Cooling', title: 'AC Repair & Service',
    tagImg: 'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=1200&q=80',
    cards: [
      { img: IMG.acClean, name: 'AC Deep Cleaning',   desc: 'Chemical wash, filter cleaning, drainage flush and coil cleaning for all AC brands.', feats: ['All brands supported','Removes mould & bacteria','Improves cooling efficiency'], wa: 'AC cleaning' },
      { img: IMG.acGas,   name: 'Gas Top-Up',         desc: 'Refrigerant top-up with leak detection. Restore your AC cooling power.', feats: ['All refrigerant types','Leak detection included','Transparent pricing'], wa: 'AC gas top-up' },
      { img: IMG.acRepair,name: 'Compressor & Parts', desc: 'Diagnose and repair AC compressors, PCB boards, fan motors from all major brands.', feats: ['Daikin, Panasonic, Midea & more','Genuine spare parts','90-day repair warranty'], wa: 'AC repair' },
    ],
  },
  {
    id: 'appliances', tag: 'Appliances', title: 'Appliance Repair',
    tagImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    cards: [
      { img: IMG.washingMach, name: 'Washing Machine',  desc: 'Diagnose and fix drum issues, water leaks, pump failure and spin problems.', feats: ['Front & top loader','All major brands','Spare parts available'], wa: 'Washing machine repair' },
      { img: IMG.fridge,      name: 'Fridge & Freezer', desc: 'Compressor repair, gas recharge, thermostat and door seal replacement.', feats: ['1-door to multi-door','Commercial fridges too','Same-day diagnosis'], wa: 'Fridge repair' },
      { img: IMG.oven,        name: 'Oven & Microwave', desc: 'Heating element, magnetron, control panel and door latch repair for all oven types.', feats: ['Built-in & freestanding','Microwave & combi ovens','Safety inspection included'], wa: 'Oven repair' },
    ],
  },
  {
    id: 'caregiver', tag: 'Care Services', title: 'Caregiver',
    tagImg: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200&q=80',
    cards: [
      { img: IMG.elderly, name: 'Elderly Care',       desc: 'Compassionate, trained caregivers for daily assistance, mobility support and companionship.', feats: ['Part-time or live-in','Background-checked staff','First aid certified'], wa: 'Elderly care' },
      { img: IMG.postop,  name: 'Post-Op Care',        desc: 'Professional care after surgery — wound care, physiotherapy support and medication management.', feats: ['Coordinated with doctors','Daily & overnight options','Progress reporting'], wa: 'Post-op care' },
      { img: IMG.special, name: 'Special Needs Care',  desc: 'Dedicated caregivers trained to support individuals with physical or learning disabilities.', feats: ['OKU-friendly support','Sensory-aware caregivers','Family coordination'], wa: 'Special needs care' },
    ],
  },
  {
    id: 'cleaning', tag: 'Cleaning', title: 'Cleaning Services',
    tagImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    cards: [
      { img: IMG.deepClean, name: 'Home Deep Clean',          desc: 'Full top-to-bottom deep cleaning including kitchen, bathrooms, bedrooms and living areas.', feats: ['Eco-friendly products','3-8 hour packages','Satisfaction guaranteed'], wa: 'Home deep cleaning' },
      { img: IMG.renoClean, name: 'Post-Renovation Cleaning', desc: 'Remove dust, debris, cement stains and construction residue after renovation work.', feats: ['Tile & glass polishing','Dust extraction equipment','Industrial-grade cleaning'], wa: 'Post-reno cleaning' },
      { img: IMG.sofa,      name: 'Sofa & Carpet Cleaning',   desc: 'Deep extraction cleaning for fabric sofas, leather treatment and carpet shampooing.', feats: ['Dry & wet extraction','Deodorising treatment','Quick-dry technology'], wa: 'Sofa cleaning' },
    ],
  },
  {
    id: 'laundry', tag: 'Laundry', title: 'Laundry Service',
    tagImg: 'https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?w=1200&q=80',
    cards: [
      { img: IMG.laundry,      name: 'Wash, Dry & Fold',   desc: 'Regular laundry washed, dried and neatly folded — pickup & delivery within 24-48 hours.', feats: ['Premium detergents','Colour separation','Delicate fabric care'], wa: 'Laundry service' },
      { img: IMG.ironing,      name: 'Ironing Service',     desc: 'Professional steam ironing for shirts, pants, uniforms, curtains and bed linen.', feats: ['Steam press quality','Hanger or fold options','Next-day turnaround'], wa: 'Ironing service' },
      { img: IMG.subscription, name: 'Weekly Subscription', desc: 'Weekly or bi-weekly laundry pickup subscription — fixed schedule, fixed price.', feats: ['Fixed weekly pricing','Dedicated laundry handler','Track via WhatsApp'], wa: 'Laundry subscription' },
    ],
  },
  {
    id: 'maid', tag: 'Housekeeping', title: 'House Maid',
    tagImg: 'https://images.unsplash.com/photo-1527515637462-cff94edd56f9?w=1200&q=80',
    cards: [
      { img: IMG.parttime,  name: 'Part-Time Maid',        desc: 'Flexible 4-8 hour cleaning sessions — weekly, bi-weekly or one-off bookings.', feats: ['Vetted & insured','Flexible scheduling','Cancel anytime'], wa: 'Part-time maid' },
      { img: IMG.livein,    name: 'Full-Time Live-In Maid', desc: 'Dedicated full-time live-in housekeeping — cooking, cleaning, childcare and errands.', feats: ['FOMEMA certified','Replacement guarantee','6-month trial period'], wa: 'Full-time maid enquiry' },
      { img: IMG.postEvent, name: 'Post-Event Cleanup',    desc: 'After your kenduri, birthday or gathering — restore your home to pristine condition.', feats: ['Same-day availability','Waste disposal included','2-4 hour rapid clean'], wa: 'Post-event cleanup' },
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
        <h3 className="font-head font-black text-brand text-xl uppercase tracking-wide mb-2">{card.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 font-body">{card.desc}</p>
        <div className="space-y-1.5 mb-5">
          {card.feats.map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-gray-600 font-body">
              <CheckCircle size={13} className="text-gold flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.iprofixer.app"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-brand font-head font-bold text-sm uppercase tracking-wide py-3 rounded-xl transition-all duration-200"
        >
          <Smartphone size={16} /> Book in App
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <PageHero tag="What We Offer" title="All Home Services" subtitle="Professional, vetted experts for every corner of your home." breadcrumb="Services" />

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
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80" alt="Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand/90" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center px-4">
          <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-5">Download Now</span>
          <h2 className="font-head font-black text-4xl sm:text-5xl text-white uppercase tracking-tight mb-4">Book Services On The Go</h2>
          <p className="text-white/60 mb-8 font-body">Download the iPROFIXER app for instant booking, real-time tracking and exclusive app-only deals.</p>
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
