import { Outlet, useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MessageCircle, UserPlus, LogIn } from 'lucide-react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ChatBot from './ChatBot.jsx'

function StickyAppBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand border-t border-white/10 px-3 py-2 flex gap-2 shadow-2xl">
      <Link to="/signup"
        className="flex-1 flex items-center justify-center gap-1.5 bg-white text-brand font-head font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition-all">
        <UserPlus size={14} />
        Sign Up
      </Link>
      <Link to="/login"
        className="flex-1 flex items-center justify-center gap-1.5 bg-gold text-brand font-head font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition-all">
        <LogIn size={14} />
        Login
      </Link>
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
