import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'

function StickyAppBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border px-3 py-2.5 flex gap-2 shadow-lg">
      <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center bg-brand hover:bg-brand-light text-white font-semibold text-xs py-2.5 rounded-lg transition-colors">
        Google Play
      </a>
      <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center bg-gold hover:bg-gold-dark text-white font-semibold text-xs py-2.5 rounded-lg transition-colors">
        App Store
      </a>
      <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-xs py-2.5 rounded-lg transition-colors">
        WhatsApp
      </a>
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <StickyAppBar />
    </div>
  )
}
