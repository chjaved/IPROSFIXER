import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin, MessageCircle, ArrowUp, CreditCard, Shield, Award, Clock, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/iprofixer', label: 'Facebook', color: 'hover:bg-[#1877F2]' },
  { icon: Instagram, href: 'https://instagram.com/iprofixer', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
  { icon: Linkedin, href: 'https://linkedin.com/company/iprofixer', label: 'LinkedIn', color: 'hover:bg-[#0A66C2]' },
  { icon: Twitter, href: 'https://twitter.com/iprofixer', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
  { icon: Youtube, href: 'https://youtube.com/iprofixer', label: 'YouTube', color: 'hover:bg-[#FF0000]' },
]

const SERVICES = [
  { name: 'Deep Cleaning', to: '/services' },
  { name: 'AC Repair & Service', to: '/services' },
  { name: 'Electrical Works', to: '/services' },
  { name: 'Plumbing', to: '/services' },
  { name: 'Home Maid Service', to: '/services' },
  { name: 'Sofa & Carpet Clean', to: '/services' },
]

const COMPANY = [
  { label: 'About iPROFIXER', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Join as Professional', to: '/for-professionals' },
  { label: 'Careers', to: '#' },
  { label: 'Blog & Tips', to: '#' },
]

const SUPPORT = [
  { label: 'Help Center / FAQ', to: '/faq' },
  { label: 'Safety Guidelines', to: '#' },
  { label: 'Cancellation Policy', to: '#' },
  { label: 'Refund Policy', to: '#' },
  { label: 'Service Guarantee', to: '#' },
]

const TRUST_BADGES = [
  { icon: Shield, text: 'Verified Pros' },
  { icon: Award, text: 'Quality Assured' },
  { icon: Clock, text: 'On-Time Service' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-50 text-gray-800 relative border-t border-gray-200">
      {/* Trust Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="grid grid-cols-3 gap-4">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.text} className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                  <badge.icon size={20} className="text-teal" />
                </div>
                <span className="text-sm font-medium hidden sm:block text-gray-700">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="iPROFIXER" className="h-24 w-auto" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Malaysia's most trusted home services platform. Connecting homeowners with verified professionals for cleaning, repairs, and maintenance.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+60380805249" className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors group">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center group-hover:bg-teal transition-colors">
                  <Phone size={14} className="text-teal group-hover:text-white" />
                </div>
                <span className="text-sm">+03-8080 5249</span>
              </a>
              <a href="mailto:for_services@iprofixer.com.my" className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors group">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center group-hover:bg-teal transition-colors">
                  <Mail size={14} className="text-teal group-hover:text-white" />
                </div>
                <span className="text-sm break-all">for_services@iprofixer.com.my</span>
              </a>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin size={14} className="text-teal" />
                </div>
                <span className="text-sm">Ara Damansara, Petaling Jaya</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Services</h4>
              <ul className="space-y-2.5">
                {SERVICES.map((s) => (
                  <li key={s.name}>
                    <Link to={s.to} className="text-gray-600 hover:text-teal text-sm transition-colors flex items-center gap-1 group">
                      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2.5">
                {COMPANY.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-gray-600 hover:text-teal text-sm transition-colors flex items-center gap-1 group">
                      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-900">Support</h4>
              <ul className="space-y-2.5">
                {SUPPORT.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-gray-600 hover:text-teal text-sm transition-colors flex items-center gap-1 group">
                      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold mb-4 text-gray-900">Stay Updated</h4>
            <p className="text-gray-600 text-sm mb-4">
              Get home maintenance tips and exclusive offers.
            </p>
            
            {subscribed ? (
              <div className="bg-teal/10 border border-teal/20 rounded-lg p-4 text-center">
                <p className="text-teal text-sm font-medium">Thanks for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal hover:bg-teal-dark text-white font-semibold text-sm py-3 rounded-lg transition-colors"
                >
                  Subscribe Now
                </button>
              </form>
            )}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/60162104127"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-sm px-4 py-3 rounded-lg transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Social & Payment Bar */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">Follow us:</span>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-teal hover:border-teal transition-all duration-200"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">We accept:</span>
              <div className="flex items-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5 w-auto object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 w-auto object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-6 w-auto object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-5 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} iPROFIXER — IPROS EDUCTECH SDN BHD. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-teal transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-teal transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-gray-600 hover:text-teal transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-teal hover:bg-teal-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}
