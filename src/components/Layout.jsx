import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
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
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('toggleChatbot'))}
        className="flex-1 flex items-center justify-center gap-1.5 bg-teal text-white font-head font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition-all">
        <MessageCircle size={14} />
        Chat
      </button>
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
      <ChatBot />
      <StickyAppBar />
    </div>
  )
}
