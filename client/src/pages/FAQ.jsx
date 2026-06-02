import { useState } from 'react'
import { ChevronDown, FileText, Wallet, MapPin, ShieldCheck, Wrench, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'

const CATEGORIES = [
  { id: 'all',       label: 'All Questions',       Icon: HelpCircle },
  { id: 'booking',   label: 'Booking',           Icon: FileText },
  { id: 'payment',   label: 'Payment',           Icon: Wallet },
  { id: 'coverage',  label: 'Coverage',          Icon: MapPin },
  { id: 'guarantee', label: 'Guarantee',         Icon: ShieldCheck },
  { id: 'pros',      label: 'For Professionals', Icon: Wrench },
]

const FAQS = [
  { cat: 'booking',  q: 'How do I book a service?',                   a: 'You can book in 3 ways: (1) Use the quote form on our homepage, (2) Visit the Services page and click "Book Now", or (3) WhatsApp us at +60162104127. We confirm within 30 minutes on business days.' },
  { cat: 'booking',  q: 'Do I need an account to book?',              a: 'No account needed to request a quote or book via WhatsApp. Our mobile app offers account-based booking for easier tracking and repeat bookings.' },
  { cat: 'booking',  q: 'How quickly can I get a professional?',      a: 'For same-day bookings we can usually match you within 2-4 hours (subject to availability). For scheduled bookings, choose any date convenient for you.' },
  { cat: 'booking',  q: 'Can I reschedule or cancel?',                a: 'Yes. Reschedule or cancel up to 4 hours before the scheduled time at no charge. Simply WhatsApp us with your booking reference and new preferred time.' },
  { cat: 'booking',  q: 'What information do I need when booking?',   a: 'We need: your name, phone, service required, area/address and preferred date. A brief description of the issue helps us match you faster.' },
  { cat: 'payment',  q: 'How is payment handled?',                    a: "Payment is made directly to the professional after the job is completed to your satisfaction. We accept cash, bank transfer (DuitNow / IBG) and e-wallets (Touch'n Go, GrabPay). No upfront deposit required." },
  { cat: 'payment',  q: 'Are there any hidden charges?',              a: 'No hidden charges. We provide a price estimate before the job begins. If additional work is required, the professional will inform you and get your approval first.' },
  { cat: 'payment',  q: 'Do I pay if not satisfied?',                 a: 'You only pay when the job is done to your satisfaction. If there are issues, contact us at +60162104127 and we will make it right before you pay.' },
  { cat: 'payment',  q: 'Will I receive a receipt?',                  a: 'Yes. A digital receipt is sent to your WhatsApp after every completed job. You can also request an official tax invoice by emailing for_services@iprofixer.com.my.' },
  { cat: 'coverage', q: 'What areas do you currently cover?',         a: 'We currently serve: Kuala Lumpur, Petaling Jaya, Ara Damansara, Subang Jaya, Shah Alam, Klang, Cheras, Ampang and Putrajaya/Cyberjaya. Expanding rapidly.' },
  { cat: 'coverage', q: 'Are you expanding to other states?',        a: 'Yes! We plan to expand to Penang, Johor Bahru and Kota Kinabalu in 2025. Follow our social media for updates.' },
  { cat: 'coverage', q: 'Do you serve condominiums and apartments?', a: 'Yes, we serve all property types including landed homes, condominiums, apartments, serviced residences and commercial offices within our coverage area.' },
  { cat: 'guarantee',q: 'Is there a satisfaction guarantee?',        a: 'Yes! All services come with a 24-hour satisfaction guarantee. If not happy, contact us within 24 hours and we will send a professional back at no extra cost.' },
  { cat: 'guarantee',q: 'Are professionals verified and insured?',   a: 'All professionals undergo identity verification, background checks and a skills assessment. Active professionals are covered by personal accident insurance while on the job.' },
  { cat: 'guarantee',q: 'What if the professional damages something?', a: 'In the rare event of accidental damage, contact us immediately at +60162104127. We handle all disputes professionally and have a claims process in place.' },
  { cat: 'guarantee',q: 'Is there a warranty on repair work?',       a: 'Yes. All repair work (electrical, AC, appliances) comes with a minimum 30-day workmanship warranty. Same issue within 30 days is fixed at no charge.' },
  { cat: 'pros',     q: 'How do I join as a professional?',          a: 'Visit our For Professionals page and fill the quick apply form, or WhatsApp us at +60162104127. We review all applications within 24-48 hours.' },
  { cat: 'pros',     q: 'Do I need formal qualifications?',          a: 'Formal certifications are preferred for trades like electrical work (Wireman license), but not mandatory for all services. Experience and professionalism matter most. Free training is provided.' },
  { cat: 'pros',     q: 'How much can I earn?',                      a: 'Part-time pros typically earn RM1,500-RM3,000/month. Full-time pros with good ratings earn RM4,000-RM6,000+/month. You set your own rates.' },
  { cat: 'pros',     q: 'When and how do I get paid?',               a: 'You collect payment from the customer directly upon job completion. iPROFIXER deducts a small platform fee from your listed rate.' },
  { cat: 'pros',     q: 'Can I work part-time?',                     a: 'Absolutely. Many professionals work part-time around other commitments. Set your available days and hours in the app and only accept jobs that fit your schedule.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-gold/40 bg-gold/5' : 'border-gray-200 bg-white hover:border-gold/20'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-head font-bold text-brand text-base hover:bg-gold/5 transition-colors"
      >
        <span className="pr-4">{q}</span>
        <ChevronDown size={18} className={`flex-shrink-0 text-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gold/10 pt-4 font-body">{a}</div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? FAQS : FAQS.filter(f => f.cat === active)

  return (
    <>
      <PageHero tag="Help Centre" title="Frequently Asked Questions" subtitle="Find quick answers to the most common questions about iPROFIXER." breadcrumb="FAQ" />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 text-xs font-head font-bold uppercase tracking-wide px-5 py-2.5 rounded-full transition-all duration-200 border ${
                  active === id
                    ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gold hover:text-gold'
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          {/* FAQ count */}
          <div className="text-center mb-6">
            <span className="text-sm text-gray-400 font-body">
              Showing {filtered.length} of {FAQS.length} questions
            </span>
          </div>

          {/* FAQ list */}
          <div className="space-y-4">
            {filtered.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>

          {/* CTA */}
          <div className="mt-16 relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&q=80" alt="Support" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand/90" />
            </div>
            <div className="relative p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-5">
                <MessageCircle size={28} className="text-gold" />
              </div>
              <h3 className="font-head font-black text-white text-2xl uppercase tracking-wide mb-3">Still Have Questions?</h3>
              <p className="text-white/60 mb-8 max-w-md mx-auto font-body">Our team typically responds within 10 minutes on WhatsApp during operating hours.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-wa hover:bg-wa-dark text-white font-head font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-xl transition-all">
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-head font-bold text-sm uppercase tracking-wide px-8 py-3.5 rounded-xl transition-all">
                  Send a Message <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
