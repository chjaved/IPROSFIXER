import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/iprofixer', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/iprofixer', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/iprofixer', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/iprofixer', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/iprofixer', label: 'YouTube' },
]

const SERVICES = [
  { name: 'Electricians', to: '/services' },
  { name: 'AC Repair', to: '/services' },
  { name: 'Appliance Repair', to: '/services' },
  { name: 'Deep Cleaning', to: '/services' },
  { name: 'Regular Maid', to: '/services' },
  { name: 'Post-Reno Clean', to: '/services' },
  { name: 'Sofa Cleaning', to: '/services' },
  { name: 'Caregiver', to: '/services' },
  { name: 'Laundry', to: '/services' },
]

const COMPANY = [
  { label: 'About Us', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'For Professionals', to: '/for-professionals' },
  { label: 'Careers', to: '#' },
  { label: 'Blog', to: '#' },
  { label: 'Contact Us', to: '/contact' },
]

const SUPPORT = [
  { label: 'Help Center', to: '/faq' },
  { label: 'Safety Guidelines', to: '#' },
  { label: 'Cancellation Policy', to: '#' },
  { label: 'Refund Policy', to: '#' },
  { label: 'Service Guarantee', to: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-200">
      {/* Main Footer Content - Full Width */}
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 pt-10 pb-6">
        
        {/* Top Section - Logo, Newsletter & Social */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 mb-8 pb-6 border-b border-gray-200">
          {/* Logo Section */}
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-block mb-2" aria-label="iPROFIXER home">
              <img src="/logo.png" alt="iPROFIXER" className="h-16 sm:h-20 w-auto" />
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              Malaysia's trusted home services platform.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">Newsletter</h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-teal hover:bg-teal-dark text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center lg:items-end gap-2">
            <p className="text-xs font-medium text-gray-600">Follow Us</p>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal hover:text-white hover:border-teal transition-all duration-200"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          
          {/* Services */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Services</h4>
            <ul className="space-y-1.5">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.name}>
                  <Link to={s.to} className="text-gray-500 hover:text-teal text-xs transition-colors duration-200">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Company</h4>
            <ul className="space-y-1.5">
              {COMPANY.slice(0, 4).map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-teal text-xs transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Support</h4>
            <ul className="space-y-1.5">
              {SUPPORT.slice(0, 4).map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-teal text-xs transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Contact</h4>
            <div className="space-y-1.5">
              <a href="tel:+60380805249" className="flex items-center gap-1.5 text-gray-500 hover:text-teal text-xs transition-colors">
                <Phone size={12} className="text-gray-400" />
                +03-8080 5249
              </a>
              <a href="mailto:for_services@iprofixer.com.my" className="flex items-center gap-1.5 text-gray-500 hover:text-teal text-xs transition-colors">
                <Mail size={12} className="text-gray-400" />
                <span className="break-all">Email Us</span>
              </a>
              <a
                href="https://wa.me/60162104127"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-wa hover:bg-wa-dark text-white font-bold text-xs px-3 py-1.5 rounded-card transition-all duration-200 mt-1"
              >
                <MessageCircle size={12} /> WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} iPROFIXER — All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link to="/privacy" className="text-gray-500 hover:text-teal transition-colors">Privacy</Link>
            <span className="text-gray-300">|</span>
            <Link to="/terms" className="text-gray-500 hover:text-teal transition-colors">Terms</Link>
            <span className="text-gray-300">|</span>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-teal transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
