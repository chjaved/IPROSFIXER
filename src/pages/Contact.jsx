import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { useApi } from '../hooks/useApi.js'

const AREAS = [
  'Kuala Lumpur','Petaling Jaya','Ara Damansara','Subang Jaya',
  'Shah Alam','Klang','Cheras','Ampang','Putrajaya / Cyberjaya',
]

export default function Contact() {
  const { post, loading, success, error } = useApi()
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    await post('contact', form)
  }

  return (
    <>
      <PageHero tag="Get In Touch" title="Contact Us" subtitle="We're here to help — reach out any way you prefer." breadcrumb="Contact" />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_520px] gap-14">

            {/* Info column */}
            <div className="space-y-6">
              <div>
                <span className="section-tag">We'd Love to Hear From You</span>
                <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2 mb-2">How Can We Help?</h2>
                <p className="text-gray-500 text-sm leading-relaxed">Whether you want to book a service, ask about our offerings or join as a professional — our team responds within 30 minutes.</p>
              </div>

              {[
                { icon: '📍', title: 'Our Office',        body: <>Ara Damansara, Petaling Jaya,<br />Selangor, Malaysia</> },
                { icon: '📞', title: 'Phone',             body: <a href="tel:+60380805249" className="text-gold-dark font-medium hover:underline">+03-8080 5249</a>, sub: 'Mon–Sat: 8am–9pm  |  Sun: 9am–6pm' },
                { icon: '✉️', title: 'Email',             body: <a href="mailto:for_services@iprofixer.com.my" className="text-gold-dark font-medium hover:underline break-all">for_services@iprofixer.com.my</a>, sub: 'We reply within 24 hours on weekdays' },
              ].map(info => (
                <div key={info.title} className="bg-white border border-gray-200 rounded-card p-5 flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center text-xl flex-shrink-0">{info.icon}</div>
                  <div>
                    <div className="font-bold text-brand text-sm mb-0.5">{info.title}</div>
                    <div className="text-gray-600 text-sm">{info.body}</div>
                    {info.sub && <div className="text-gray-400 text-xs mt-1">{info.sub}</div>}
                  </div>
                </div>
              ))}

              {/* WhatsApp card */}
              <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer"
                className="bg-wa/10 border border-wa/30 rounded-card p-5 flex gap-4 hover:bg-wa/20 transition-all duration-200 block">
                <div className="w-11 h-11 rounded-full bg-wa flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-brand text-sm mb-0.5">WhatsApp (Fastest)</div>
                  <div className="text-wa font-medium text-sm">+60162104127</div>
                  <div className="text-gray-400 text-xs mt-1">Average response: under 10 minutes</div>
                </div>
              </a>
            </div>

            {/* Form column */}
            <div className="bg-white rounded-lg2 border border-gray-200 p-8">
              <h2 className="font-head font-bold text-xl text-brand mb-1">Send Us a Message</h2>
              <p className="text-gray-400 text-sm mb-6">We reply via email within 30 minutes on business days.</p>

              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-card p-5 text-sm font-medium text-center">
                  ✅ {success}
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input name="name" value={form.name} onChange={handle} placeholder="Your full name" required className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handle} placeholder="+60 1X-XXXX" required className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@email.com" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handle} required className="form-input">
                      <option value="">— Select a subject —</option>
                      {['Book a Service','General Enquiry','Join as a Professional','Complaint / Feedback','Partnership / B2B','Other'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us what you need..." required rows={5} className="form-input resize-none" />
                  </div>
                  {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded p-2">{error} — try <a href="https://wa.me/60162104127" className="underline">WhatsApp</a> instead.</p>}
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 font-bold">
                    {loading ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}

              <div className="mt-6 pt-5 border-t border-gray-100 text-center">
                <p className="text-gray-400 text-xs mb-3">Prefer instant chat?</p>
                <a href="https://wa.me/60162104127" target="_blank" rel="noopener noreferrer" className="btn-wa w-full justify-center py-3 text-sm">
                  💬 Chat on WhatsApp — +60162104127
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="section-tag">Coverage</span>
          <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-brand mt-2 mb-8">Areas We Serve</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {AREAS.map((a, i) => (
              <span key={a} className={`px-5 py-2 rounded-full text-sm font-semibold ${i === 2 ? 'bg-gold/15 text-brand border border-gold/40' : 'bg-gray-100 text-gray-600'}`}>
                📍 {a}{i === 2 ? ' ⭐' : ''}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
