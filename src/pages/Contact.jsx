import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { useApi } from '../hooks/useApi.js'

const CONTACT_INFO = [
  { Icon: Phone,         label: 'Phone',           value: '+03-8080 5249',                  href: 'tel:+60380805249' },
  { Icon: MessageCircle, label: 'WhatsApp',         value: '+60 162 104 127',                href: 'https://wa.me/60162104127' },
  { Icon: Mail,          label: 'Email',            value: 'for_services@iprofixer.com.my',  href: 'mailto:for_services@iprofixer.com.my' },
  { Icon: MapPin,        label: 'Address',          value: 'Ara Damansara, Petaling Jaya, Selangor, Malaysia', href: 'https://maps.google.com/?q=Ara+Damansara+Petaling+Jaya' },
  { Icon: Clock,         label: 'Operating Hours',  value: 'Mon–Sat: 8am–9pm  |  Sun: 9am–6pm', href: null },
]

export default function Contact() {
  const { post, loading, success, error } = useApi()
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Book a Service', message: '' })
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => { e.preventDefault(); await post('contact', form) }

  return (
    <>
      <PageHero tag="Get In Touch" title="Contact Us" subtitle="We respond within 30 minutes on WhatsApp — or fill the form below and we will get back to you shortly." breadcrumb="Contact" />

      {/* Contact info + form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Left — info */}
            <div>
              <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-5">Reach Us</span>
              <h2 className="font-head font-black text-4xl sm:text-5xl text-brand uppercase tracking-tight mb-6 leading-tight">
                We Are Here<br />To Help
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-10 font-body max-w-md">
                Whether you want to book a service, have a question or need urgent help — our team is available 7 days a week. WhatsApp is the fastest way to reach us.
              </p>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-wa hover:bg-wa-dark text-white font-head font-bold text-base uppercase tracking-wide px-7 py-4 rounded-xl transition-all shadow-lg shadow-wa/25 mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp Now
              </a>

              <div className="space-y-5">
                {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-xs font-head font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</div>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            className="text-brand font-body text-sm hover:text-gold transition-colors">{value}</a>
                        : <span className="text-brand font-body text-sm">{value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div>
              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className="font-head font-black text-2xl text-green-800 uppercase mb-2">Message Sent!</h3>
                  <p className="text-green-700 font-body">{success}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 space-y-5">
                  <h3 className="font-head font-black text-2xl text-brand uppercase tracking-wide mb-1">Send a Message</h3>
                  <p className="text-gray-400 text-sm font-body mb-4">We reply within 30 minutes during operating hours.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input name="name" value={form.name} onChange={handle} required placeholder="Your name" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handle} required placeholder="+60 1X-XXXX XXXX" className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@email.com" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Subject</label>
                    <select name="subject" value={form.subject} onChange={handle} className="form-input">
                      {['Book a Service','General Enquiry','Technical Support','Partnership / B2B','Join as a Professional','Other'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea name="message" value={form.message} onChange={handle} required rows={5}
                      placeholder="Tell us how we can help you..." className="form-input resize-none" />
                  </div>
                  {error && <p className="text-red-500 text-xs bg-red-50 border border-red-200 p-3 rounded-xl">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full bg-gold hover:bg-gold-dark text-brand font-head font-bold text-base uppercase tracking-wide py-4 rounded-xl transition-all shadow-lg shadow-gold/20">
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps embed — Ara Damansara, Petaling Jaya */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-3">Our Location</span>
            <h2 className="font-head font-black text-3xl sm:text-4xl text-brand uppercase tracking-tight">Find Us in Ara Damansara</h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200" style={{ height: '450px' }}>
            <iframe
              title="iPROFIXER Location — Ara Damansara, Petaling Jaya"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0151766219!2d101.5718!3d3.1178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4e3dbf2e8e8b%3A0x4e2c8e44a2c0f6f!2sAra%20Damansara%2C%20Petaling%20Jaya%2C%20Selangor!5e0!3m2!1sen!2smy!4v1700000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-body text-gray-500">
            <span className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> Ara Damansara, Petaling Jaya, Selangor</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-gold" /> Mon–Sat 8am–9pm, Sun 9am–6pm</span>
            <span className="flex items-center gap-2"><Phone size={14} className="text-gold" /> +03-8080 5249</span>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-head font-black uppercase tracking-[0.2em] text-gold bg-gold/10 border border-gold/25 px-4 py-1.5 rounded-full mb-5">Where We Operate</span>
          <h2 className="font-head font-black text-3xl sm:text-4xl text-brand uppercase tracking-tight mb-8">Service Areas — Klang Valley</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Kuala Lumpur','Petaling Jaya','Ara Damansara','Subang Jaya','Shah Alam','Klang','Cheras','Ampang','Puchong','Damansara','Bangsar','Mont Kiara','Putrajaya','Cyberjaya','Selayang'].map(area => (
              <span key={area}
                className="bg-gray-50 border border-gray-200 hover:border-gold hover:bg-gold/5 hover:text-gold text-gray-600 font-head font-bold text-sm uppercase tracking-wide px-4 py-2 rounded-xl transition-all duration-200 cursor-default">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
