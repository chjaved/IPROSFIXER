import PageHero from '../components/PageHero.jsx'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  {
    id: 'electrician', icon: '⚡', tag: 'Electrical', title: 'Electricians',
    cards: [
      { icon: '⚡', name: 'Wiring & Rewiring',    desc: 'Full home wiring, partial rewiring, conduit installation and cable management.', feats: ['New wiring installation','Faulty wire tracing & repair','Safety certification available'], wa: 'Wiring service' },
      { icon: '💡', name: 'Switch & Socket Repair', desc: 'Replace broken switches, power points, USB sockets and smart switches. Fast turnaround.', feats: ['All brands & types','Same-day service available','Child-safe socket options'], wa: 'Switch repair' },
      { icon: '🔌', name: 'DB Box & MCB',          desc: 'Distribution board upgrade, MCB replacement, ELCB installation and TNB compliance checks.', feats: ['TNB compliant work','ELCB / RCD installation','Full board replacement'], wa: 'DB Box service' },
    ],
  },
  {
    id: 'ac', icon: '❄️', tag: 'Cooling', title: 'AC Repair & Service',
    cards: [
      { icon: '❄️', name: 'AC Deep Cleaning',   desc: 'Chemical wash, filter cleaning, drainage flush and coil cleaning for all AC brands.', feats: ['All brands supported','Removes mould & bacteria','Improves cooling efficiency'], wa: 'AC cleaning' },
      { icon: '🌡️', name: 'Gas Top-Up',         desc: 'Refrigerant top-up with leak detection. Restore your AC cooling power.', feats: ['All refrigerant types','Leak detection included','Transparent pricing'], wa: 'AC gas top-up' },
      { icon: '🔧', name: 'Compressor & Parts', desc: 'Diagnose and repair AC compressors, PCB boards, fan motors from all major brands.', feats: ['Daikin, Panasonic, Midea & more','Genuine spare parts','90-day repair warranty'], wa: 'AC repair' },
    ],
  },
  {
    id: 'appliances', icon: '🔌', tag: 'Appliances', title: 'Appliance Repair',
    cards: [
      { icon: '👕', name: 'Washing Machine', desc: 'Diagnose and fix drum issues, water leaks, pump failure and spin problems.', feats: ['Front & top loader','All major brands','Spare parts available'], wa: 'Washing machine repair' },
      { icon: '❄️', name: 'Fridge & Freezer', desc: 'Compressor repair, gas recharge, thermostat and door seal replacement.', feats: ['1-door to multi-door','Commercial fridges too','Same-day diagnosis'], wa: 'Fridge repair' },
      { icon: '🍽️', name: 'Oven & Microwave', desc: 'Heating element, magnetron, control panel and door latch repair for all oven types.', feats: ['Built-in & freestanding','Microwave & combi ovens','Safety inspection included'], wa: 'Oven repair' },
    ],
  },
  {
    id: 'caregiver', icon: '❤️', tag: 'Care Services', title: 'Caregiver',
    cards: [
      { icon: '❤️', name: 'Elderly Care',       desc: 'Compassionate, trained caregivers for daily assistance, mobility support and companionship.', feats: ['Part-time or live-in','Background-checked staff','First aid certified'], wa: 'Elderly care' },
      { icon: '🏥', name: 'Post-Op Care',        desc: 'Professional care after surgery — wound care, physiotherapy support and medication management.', feats: ['Coordinated with doctors','Daily & overnight options','Progress reporting'], wa: 'Post-op care' },
      { icon: '💙', name: 'Special Needs Care',  desc: 'Dedicated caregivers trained to support individuals with physical or learning disabilities.', feats: ['OKU-friendly support','Sensory-aware caregivers','Family coordination'], wa: 'Special needs care' },
    ],
  },
  {
    id: 'cleaning', icon: '✨', tag: 'Cleaning', title: 'Cleaning Services',
    cards: [
      { icon: '✨', name: 'Home Deep Clean',         desc: 'Full top-to-bottom deep cleaning including kitchen, bathrooms, bedrooms and living areas.', feats: ['Eco-friendly products','3-8 hour packages','Satisfaction guaranteed'], wa: 'Home deep cleaning' },
      { icon: '🏠', name: 'Post-Renovation Cleaning', desc: 'Remove dust, debris, cement stains and construction residue after renovation work.', feats: ['Tile & glass polishing','Dust extraction equipment','Industrial-grade cleaning'], wa: 'Post-reno cleaning' },
      { icon: '🛋️', name: 'Sofa & Carpet Cleaning',  desc: 'Deep extraction cleaning for fabric sofas, leather treatment and carpet shampooing.', feats: ['Dry & wet extraction','Deodorising treatment','Quick-dry technology'], wa: 'Sofa cleaning' },
    ],
  },
  {
    id: 'laundry', icon: '👕', tag: 'Laundry', title: 'Laundry Service',
    cards: [
      { icon: '💙', name: 'Wash, Dry & Fold',       desc: 'Regular laundry washed, dried and neatly folded — pickup & delivery within 24-48 hours.', feats: ['Premium detergents','Colour separation','Delicate fabric care'], wa: 'Laundry service' },
      { icon: '👔', name: 'Ironing Service',         desc: 'Professional steam ironing for shirts, pants, uniforms, curtains and bed linen.', feats: ['Steam press quality','Hanger or fold options','Next-day turnaround'], wa: 'Ironing service' },
      { icon: '📱', name: 'Weekly Subscription',    desc: 'Weekly or bi-weekly laundry pickup subscription — fixed schedule, fixed price.', feats: ['Fixed weekly pricing','Dedicated laundry handler','Track via WhatsApp'], wa: 'Laundry subscription' },
    ],
  },
  {
    id: 'maid', icon: '🧹', tag: 'Housekeeping', title: 'House Maid',
    cards: [
      { icon: '🧹', name: 'Part-Time Maid',       desc: 'Flexible 4-8 hour cleaning sessions — weekly, bi-weekly or one-off bookings.', feats: ['Vetted & insured','Flexible scheduling','Cancel anytime'], wa: 'Part-time maid' },
      { icon: '🏠', name: 'Full-Time Live-In Maid', desc: 'Dedicated full-time live-in housekeeping — cooking, cleaning, childcare and errands.', feats: ['FOMEMA certified','Replacement guarantee','6-month trial period'], wa: 'Full-time maid enquiry' },
      { icon: '🎉', name: 'Post-Event Cleanup',   desc: 'After your kenduri, birthday or gathering — restore your home to pristine condition.', feats: ['Same-day availability','Waste disposal included','2-4 hour rapid clean'], wa: 'Post-event cleanup' },
    ],
  },
]

function ServiceCard({ card }) {
  const waMsg = `Hi iPROFIXER! I'd like to book ${card.wa}.`
  return (
    <div className="bg-white rounded-lg2 border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      <div className="bg-brand/5 flex items-center justify-center text-5xl h-28">{card.icon}</div>
      <div className="p-6">
        <h3 className="font-head font-bold text-brand text-lg mb-2">{card.name}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{card.desc}</p>
        <div className="space-y-1.5 mb-5">
          {card.feats.map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-4 h-4 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
              {f}
            </div>
          ))}
        </div>
        <a
          href={`https://wa.me/60162104127?text=${encodeURIComponent(waMsg)}`}
          target="_blank" rel="noopener noreferrer"
          className="btn-primary w-full justify-center text-sm py-2.5"
        >
          Book Now →
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <PageHero tag="What We Offer" title="All Home Services" subtitle="Professional, vetted experts for every corner of your home." breadcrumb="Services" />

      {/* Quick Nav Pills */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(c => (
            <a key={c.id} href={`#${c.id}`}
              className="flex-shrink-0 text-xs font-semibold bg-white border border-gray-200 hover:border-gold hover:text-gold px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap">
              {c.icon} {c.title}
            </a>
          ))}
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {CATEGORIES.map(cat => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{cat.icon}</span>
                <span className="section-tag mb-0">{cat.tag}</span>
              </div>
              <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mb-8">{cat.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.cards.map(card => <ServiceCard key={card.name} card={card} />)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-brand py-16 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-head font-extrabold text-3xl text-white mb-3">Can't Find What You Need?</h2>
          <p className="text-white/60 mb-8">Chat with us on WhatsApp and we'll match you with the right professional.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="btn-gold px-8 py-3.5">
              💬 Chat on WhatsApp
            </a>
            <Link to="/contact" className="btn-outline px-8 py-3.5">Send a Message</Link>
          </div>
        </div>
      </section>
    </>
  )
}
