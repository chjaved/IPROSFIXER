import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'

const CUSTOMER_STEPS = [
  { n: 1, icon: '📄', title: 'Book Online or via WhatsApp', items: ['Select from 50+ home services','Choose your location in Klang Valley','Pick a date & time that works for you','Describe your issue (optional but helpful)'] },
  { n: 2, icon: '✅', title: 'Instant Confirmation',         items: ["Professional's name, photo and rating",'Estimated arrival time','Price estimate (no hidden charges)','Direct contact number for your pro'] },
  { n: 3, icon: '🔧', title: 'Work In Progress',             items: ['Professional arrives on time (or updates you)','Full assessment before work begins','Clean, professional work with minimal disruption','Any additional costs flagged before proceeding'] },
  { n: 4, icon: '🎉', title: 'Job Completed & Payment',      items: ['Accept via cash, DuitNow, TnG or GrabPay','Digital receipt sent to your WhatsApp','Rate your professional & leave a review','30-day warranty on all repair work'] },
]

const PRO_STEPS = [
  { n: 1, icon: '📄', title: 'Apply & Register',           items: ['Fill in name, phone and service type','Submit IC, trade certificate (if any)','Our team reviews within 24-48 hours'] },
  { n: 2, icon: '🎓', title: 'Onboarding & Verification',  items: ['Background check & identity verification','Free skills assessment (if needed)','App walkthrough & job-acceptance training'] },
  { n: 3, icon: '📱', title: 'Start Getting Jobs',          items: ['Instant job notifications near you','Accept or decline any booking','Set your available hours and areas'] },
  { n: 4, icon: '💰', title: 'Complete Job & Get Paid',     items: ['Instant payment upon job completion','Weekly earnings summary via app','Build your rating & get more bookings'] },
]

const GUARANTEES = [
  { icon: '🔒', title: 'Vetted Professionals',  desc: 'All pros are background-checked, identity-verified and reviewed by real customers before their first job.' },
  { icon: '🕐', title: 'On-Time Arrival',       desc: 'We monitor all jobs and follow up proactively if a professional is delayed. Your time is precious.' },
  { icon: '✅', title: 'Satisfaction Guarantee', desc: 'Not happy within 24 hours? We send someone back at zero cost. No arguments, no hassle.' },
]

function StepBlock({ step }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg2 p-7 flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand text-gold font-head font-black text-lg flex items-center justify-center">
        {step.n}
      </div>
      <div>
        <div className="text-2xl mb-2">{step.icon}</div>
        <h3 className="font-head font-bold text-brand text-base mb-3">{step.title}</h3>
        <ul className="space-y-1.5">
          {step.items.map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-4 h-4 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <>
      <PageHero tag="Simple Process" title="How iPROFIXER Works" subtitle="Book a professional in under 2 minutes — we handle everything else." breadcrumb="How It Works" />

      {/* For Customers */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">For Homeowners</span>
            <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2 mb-3">Booking a Service</h2>
            <p className="text-gray-500">From request to job done — here's what happens every step of the way.</p>
          </div>
          <div className="space-y-5">
            {CUSTOMER_STEPS.map(s => <StepBlock key={s.n} step={s} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary px-10 py-3.5">Book Your First Service →</Link>
          </div>
        </div>
      </section>

      {/* For Pros */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">For Professionals</span>
            <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2 mb-3">Getting Jobs on iPROFIXER</h2>
            <p className="text-gray-500">Join hundreds of professionals already earning more with iPROFIXER.</p>
          </div>
          <div className="space-y-5">
            {PRO_STEPS.map(s => <StepBlock key={s.n} step={s} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/for-professionals" className="btn-primary px-10 py-3.5">Join as a Professional →</Link>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-tag">Our Promise</span>
            <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2">The iPROFIXER Guarantee</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {GUARANTEES.map(g => (
              <div key={g.title} className="card text-center">
                <span className="text-4xl block mb-4">{g.icon}</span>
                <h4 className="font-head font-bold text-brand mb-2">{g.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand py-16 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-head font-extrabold text-3xl text-white mb-3">Ready to Get Started?</h2>
          <p className="text-white/60 mb-8">Book your first service today — free quote, no commitment.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="btn-gold px-8 py-3.5">💬 WhatsApp Us Now</a>
            <Link to="/services" className="btn-outline px-8 py-3.5">Browse Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
