import PageHero from '../components/PageHero.jsx'
import { Link } from 'react-router-dom'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-head font-black text-2xl text-brand uppercase tracking-wide mb-3">{title}</h2>
      <div className="text-gray-600 text-base leading-relaxed font-body space-y-3">{children}</div>
    </div>
  )
}

export default function CookiePolicy() {
  return (
    <>
      <PageHero tag="Legal" title="Cookie Policy" subtitle="Last updated: 23 May 2025" breadcrumb="Cookie Policy" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <Section title="1. What Are Cookies">
            <p>Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, keep you logged in and collect analytics data to improve the experience.</p>
          </Section>

          <Section title="2. Cookies We Use">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-brand text-white">
                    <th className="text-left px-4 py-3 font-head font-bold uppercase tracking-wide">Cookie Name</th>
                    <th className="text-left px-4 py-3 font-head font-bold uppercase tracking-wide">Type</th>
                    <th className="text-left px-4 py-3 font-head font-bold uppercase tracking-wide">Purpose</th>
                    <th className="text-left px-4 py-3 font-head font-bold uppercase tracking-wide">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['session_id',       'Essential',   'Keeps you logged in during your visit', 'Session'],
                    ['booking_data',     'Functional',  'Remembers your booking form progress', '1 hour'],
                    ['_ga',              'Analytics',   'Google Analytics — tracks page visits and usage', '2 years'],
                    ['_gid',             'Analytics',   'Google Analytics — distinguishes users', '24 hours'],
                    ['cookie_consent',   'Essential',   'Remembers your cookie consent choice', '1 year'],
                    ['preferred_area',   'Functional',  'Remembers your selected service area', '30 days'],
                  ].map(([name, type, purpose, duration]) => (
                    <tr key={name} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-brand">{name}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-head font-bold uppercase px-2 py-0.5 rounded ${type === 'Essential' ? 'bg-blue-100 text-blue-700' : type === 'Analytics' ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{purpose}</td>
                      <td className="px-4 py-3 text-gray-500">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="3. Third-Party Cookies">
            <p>We use the following third-party services that may set their own cookies:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Analytics</strong> — website traffic and user behaviour analytics</li>
              <li><strong>Google Maps</strong> — embedded maps on our Contact page</li>
              <li><strong>Facebook Pixel</strong> — advertising and retargeting (if applicable)</li>
            </ul>
            <p>These services have their own privacy and cookie policies which we encourage you to review.</p>
          </Section>

          <Section title="4. Managing Cookies">
            <p>You can control and delete cookies through your browser settings:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            </ul>
            <p>Note: Disabling essential cookies may affect the functionality of our website and booking system.</p>
          </Section>

          <Section title="5. Contact">
            <p>If you have questions about our use of cookies, contact us at <a href="mailto:for_services@iprofixer.com.my" className="text-gold hover:underline">for_services@iprofixer.com.my</a>.</p>
          </Section>

          <div className="border-t border-gray-200 pt-8 mt-8 flex flex-wrap gap-4">
            <Link to="/privacy" className="text-gold hover:underline text-sm font-body">Privacy Policy</Link>
            <Link to="/terms" className="text-gold hover:underline text-sm font-body">Terms of Service</Link>
            <Link to="/contact" className="text-gold hover:underline text-sm font-body">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
