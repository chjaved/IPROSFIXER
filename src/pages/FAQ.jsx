import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'

const CATEGORIES = [
  { id: 'all',      label: 'All Questions' },
  { id: 'booking',  label: '📄 Booking' },
  { id: 'payment',  label: '💰 Payment' },
  { id: 'coverage', label: '📍 Coverage' },
  { id: 'guarantee',label: '✅ Guarantee' },
  { id: 'pros',     label: '🔧 For Professionals' },
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
    <div className="border border-gray-200 rounded-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-brand text-sm hover:bg-gray-50 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown size={18} className={`flex-shrink-0 ml-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{a}</div>
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

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 border ${
                  active === c.id
                    ? 'bg-brand text-white border-brand'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gold hover:text-gold'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-3">
            {filtered.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg2 p-8 text-center">
            <span className="text-4xl block mb-4">💬</span>
            <h3 className="font-head font-bold text-brand text-lg mb-2">Still Have Questions?</h3>
            <p className="text-gray-500 text-sm mb-6">Our team typically responds within 10 minutes on WhatsApp.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="btn-wa px-6 py-2.5 text-sm">💬 Chat on WhatsApp</a>
              <Link to="/contact" className="btn-dark px-6 py-2.5 text-sm">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
