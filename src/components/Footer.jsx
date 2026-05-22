import { Link } from 'react-router-dom'

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-[#0d0d1f] text-white">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand col — wider */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-head font-black text-2xl italic block mb-4">
              <span className="text-white">iPRO</span>
              <span className="text-gold">FIXER</span>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Malaysia's trusted home services platform — connecting homeowners with certified professionals across Klang Valley.
            </p>

            {/* App Store badges */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="#" className="flex items-center gap-3 bg-white/8 hover:bg-white/15 border border-white/15 px-4 py-2.5 rounded-xl transition-all duration-200 group">
                <span className="text-xl">🍎</span>
                <div className="text-left">
                  <div className="text-white/40 text-[10px] leading-none mb-0.5">Download on the</div>
                  <div className="text-white font-bold text-sm">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-white/8 hover:bg-white/15 border border-white/15 px-4 py-2.5 rounded-xl transition-all duration-200 group">
                <span className="text-xl">▶️</span>
                <div className="text-left">
                  <div className="text-white/40 text-[10px] leading-none mb-0.5">Get it on</div>
                  <div className="text-white font-bold text-sm">Google Play</div>
                </div>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { label: 'Facebook',  icon: 'f',   href: '#' },
                { label: 'Instagram', icon: 'ig',  href: '#' },
                { label: 'WhatsApp',  icon: WA_ICON, href: 'https://wa.me/60162104127' },
              ].map(s => (
                <a key={s.label} href={s.href}
                  target={s.href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-gold/20 hover:text-gold flex items-center justify-center text-xs font-black text-white/50 uppercase transition-all duration-200 border border-white/10">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-white/40 mb-5">Services</h4>
            <ul className="space-y-3">
              {['Electricians','AC Repair','Appliance Repair','Caregiver','Cleaning','Laundry','House Maid'].map(s => (
                <li key={s}>
                  <Link to="/services" className="text-white/55 hover:text-gold text-sm transition-colors duration-200">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-white/40 mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us',          to: '/about' },
                { label: 'How It Works',      to: '/how-it-works' },
                { label: 'For Professionals', to: '/for-professionals' },
                { label: 'FAQ',               to: '/faq' },
                { label: 'Contact',           to: '/contact' },
                { label: 'Privacy Policy',    to: '#' },
                { label: 'Terms of Service',  to: '#' },
              ].map(l => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="text-white/55 hover:text-gold text-sm transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.15em] text-white/40 mb-5">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3 text-white/50">
                <span className="flex-shrink-0">📍</span>
                <span>Ara Damansara, Petaling Jaya,<br />Selangor, Malaysia</span>
              </div>
              <div className="flex gap-3">
                <span>📞</span>
                <a href="tel:+60380805249" className="text-white/55 hover:text-gold transition-colors">+03-8080 5249</a>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0">✉️</span>
                <a href="mailto:for_services@iprofixer.com.my" className="text-white/55 hover:text-gold transition-colors break-all">
                  for_services@iprofixer.com.my
                </a>
              </div>
              <div className="flex gap-3 text-white/50">
                <span>🕐</span>
                <span>Mon–Sat: 8am–9pm<br />Sun: 9am–6pm</span>
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 bg-wa/90 hover:bg-wa text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 w-fit">
                {WA_ICON} Chat Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} iPROFIXER Sdn Bhd. All rights reserved. Ara Damansara, Petaling Jaya, Selangor.
          </p>
          <div className="flex items-center gap-2">
            {/* Rating badge */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <span className="text-gold text-xs">★★★★★</span>
              <span className="text-white/40 text-xs">4.8 · 50K+ downloads</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
