import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, MessageCircle, Shield, Award, Clock } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/iprofixer', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/iprofixer', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/iprofixer', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/iprofixer', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/iprofixer', label: 'YouTube' },
]

const FEATURES = [
  { icon: Shield, text: 'Verified Professionals' },
  { icon: Award, text: 'Quality Guaranteed' },
  { icon: Clock, text: 'On-Time Service' },
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
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-10">
        
        {/* Top Section - Logo & Social */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 mb-12 pb-10 border-b border-gray-200">
          {/* Logo Section - 3x bigger */}
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-block mb-4" aria-label="iPROFIXER home">
              <img src="/logo.png" alt="iPROFIXER" className="h-24 sm:h-28 w-auto" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Malaysia's trusted home services platform. Connecting you with verified professionals for all your home needs.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            <p className="text-sm font-medium text-gray-600">Follow Us</p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-teal hover:text-white hover:border-teal transition-all duration-200"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-white rounded-xl border border-gray-200">
          {FEATURES.map((feature) => (
            <div key={feature.text} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-light rounded-full flex items-center justify-center">
                <feature.icon size={20} className="text-teal" />
              </div>
              <span className="font-medium text-gray-800">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Services */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.name}>
                  <Link to={s.to} className="text-gray-500 hover:text-teal text-sm transition-colors duration-200">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-teal text-sm transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5">Support</h4>
            <ul className="space-y-2.5">
              {SUPPORT.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-teal text-sm transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+60380805249" className="flex items-center gap-2 text-gray-500 hover:text-teal text-sm transition-colors">
                <Phone size={16} className="text-gray-400" />
                +03-8080 5249
              </a>
              <a href="mailto:for_services@iprofixer.com.my" className="flex items-center gap-2 text-gray-500 hover:text-teal text-sm transition-colors break-all">
                <Mail size={16} className="text-gray-400 flex-shrink-0" />
                <span className="break-all">for_services@iprofixer.com.my</span>
              </a>
              <div className="flex items-start gap-2 text-gray-500 text-sm">
                <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <span>Ara Damansara, Petaling Jaya, Selangor</span>
              </div>
              <a
                href="https://wa.me/60162104127"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wa hover:bg-wa-dark text-white font-bold text-sm px-4 py-2.5 rounded-card transition-all duration-200 mt-2"
              >
                <MessageCircle size={16} /> WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-5">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-3">Get tips & exclusive offers</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-teal hover:bg-teal-dark text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-teal transition-colors">Privacy Policy</Link>
            <span className="text-gray-300">|</span>
            <Link to="/terms" className="text-gray-500 hover:text-teal transition-colors">Terms of Service</Link>
            <span className="text-gray-300">|</span>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-teal transition-colors">Cookies</Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Mon–Sat: 8am–9pm · Sun: 9am–6pm</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
