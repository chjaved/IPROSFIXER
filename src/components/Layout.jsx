import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'
import ChatBot from './ChatBot.jsx'

function StickyAppBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand border-t border-white/10 px-3 py-2 flex gap-2 shadow-2xl">
      <a href="https://play.google.com/store/apps/details?id=com.iprofixer.app" target="_blank" rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 bg-white text-brand font-head font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition-all">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
        Google Play
      </a>
      <a href="https://apps.apple.com/app/iprofixer/id1234567890" target="_blank" rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 bg-gold text-brand font-head font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition-all">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.22-1.96 1.08-3.11-1.05.05-2.31.72-3.06 1.63-.67.81-1.26 2.11-1.1 3.12 1.19.09 2.4-.6 3.08-1.64z"/></svg>
        App Store
      </a>
      <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-head font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
      <ChatBot />
      <StickyAppBar />
    </div>
  )
}
