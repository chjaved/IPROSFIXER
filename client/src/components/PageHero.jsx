import { Link } from 'react-router-dom'

export default function PageHero({ tag, title, subtitle, breadcrumb }) {
  return (
    <section className="relative bg-brand pt-28 pb-16 text-white text-center px-4 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,184,0,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,184,0,0.5) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {breadcrumb && (
          <nav className="flex items-center justify-center gap-2 text-xs text-white/40 mb-5" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/60">{breadcrumb}</span>
          </nav>
        )}
        {tag && (
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-gold/15 text-gold border border-gold/25 px-4 py-1.5 rounded-full mb-5">
            {tag}
          </span>
        )}
        <h1 className="font-head font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 leading-tight">{title}</h1>
        {subtitle && <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  )
}
