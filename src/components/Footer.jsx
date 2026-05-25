import { Link } from 'react-router-dom'

const WA_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const SERVICES = ['Electricians', 'AC Repair', 'Appliance Repair', 'Cleaning', 'Caregiver', 'Laundry', 'House Maid']
const COMPANY = [
  { label: 'About Us',          to: '/about' },
  { label: 'How It Works',      to: '/how-it-works' },
  { label: 'For Professionals', to: '/for-professionals' },
  { label: 'Blog',              to: '#' },
  { label: 'Contact Us',        to: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#04342C' }} className="text-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-0 mb-4" aria-label="iPROFIXER home">
              <span className="font-head font-extrabold text-xl text-teal-mid">iPRO</span>
              <span className="font-head font-extrabold text-xl text-orange">FIXER</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xs">
              Malaysia's trusted home services platform. Electricians, cleaners, AC repair, caregivers and more — serving KL, PJ and all of Klang Valley.
            </p>
            <p className="text-white/40 text-xs">
              Mon–Sat: 8am–9pm &nbsp;·&nbsp; Sun: 9am–6pm
            </p>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map(s => (
                <li key={s}>
                  <Link to="/services" className="text-white/55 hover:text-white text-sm transition-colors duration-200">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Company</h4>
            <ul className="space-y-3">
              {COMPANY.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/55 hover:text-white text-sm transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2 text-white/50">
                <span className="flex-shrink-0">📍</span>
                <span>Ara Damansara, Petaling Jaya, Selangor</span>
              </div>
              <div className="flex gap-2">
                <span className="flex-shrink-0">📞</span>
                <a href="tel:+60380805249" className="text-white/55 hover:text-white transition-colors">+03-8080 5249</a>
              </div>
              <div className="flex gap-2">
                <span className="flex-shrink-0">✉️</span>
                <a href="mailto:for_services@iprofixer.com.my" className="text-white/55 hover:text-white transition-colors break-all">
                  for_services@iprofixer.com.my
                </a>
              </div>
              <a
                href="https://wa.me/60162104127"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 bg-wa hover:bg-wa-dark text-white font-bold text-sm px-4 py-2.5 rounded-card transition-all duration-200"
              >
                {WA_SVG} Chat Now &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/privacy" className="text-white/35 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/35 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
