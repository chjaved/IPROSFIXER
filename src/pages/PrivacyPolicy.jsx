import PageHero from '../components/PageHero.jsx'
import { Link } from 'react-router-dom'

const LAST_UPDATED = '23 May 2025'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-head font-black text-2xl text-brand uppercase tracking-wide mb-3">{title}</h2>
      <div className="text-gray-600 text-base leading-relaxed font-body space-y-3">{children}</div>
    </div>
  )
}

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero tag="Legal" title="Privacy Policy" subtitle={`Last updated: ${LAST_UPDATED}`} breadcrumb="Privacy Policy" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 mb-10 font-body text-sm text-gray-600">
            <strong className="text-brand font-head uppercase">Summary:</strong> iPROFIXER collects only the information needed to provide our home services platform. We do not sell your data. You can request deletion of your data at any time by contacting us at <a href="mailto:for_services@iprofixer.com.my" className="text-gold hover:underline">for_services@iprofixer.com.my</a>.
          </div>

          <Section title="1. Who We Are">
            <p>iPROFIXER Sdn Bhd ("iPROFIXER", "we", "us" or "our") operates the iPROFIXER website and mobile application located at iprofixer.com.my. We are a home services marketplace based in Ara Damansara, Petaling Jaya, Selangor, Malaysia.</p>
            <p>For questions about this Privacy Policy, contact us at <a href="mailto:for_services@iprofixer.com.my" className="text-gold hover:underline">for_services@iprofixer.com.my</a> or WhatsApp <a href="https://wa.me/60162104127" className="text-gold hover:underline">+60162104127</a>.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following types of personal information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Contact Information:</strong> Name, phone number, email address and home address when you make a booking or register an account.</li>
              <li><strong>Booking Data:</strong> Service type, location, date, time and special instructions for each job.</li>
              <li><strong>Payment Information:</strong> Transaction reference numbers. We do not store full card numbers — payments are processed by third-party providers.</li>
              <li><strong>Device & Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and app usage patterns collected via cookies and analytics.</li>
              <li><strong>Professional Data:</strong> For service providers — IC number, trade certificates, skills, service areas and availability.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and manage your service bookings</li>
              <li>To match you with available professionals in your area</li>
              <li>To send booking confirmations, updates and receipts via WhatsApp or email</li>
              <li>To improve our platform, services and user experience</li>
              <li>To comply with legal obligations under Malaysian law</li>
              <li>To send promotional messages (only with your consent — you can opt out anytime)</li>
            </ul>
          </Section>

          <Section title="4. Sharing of Information">
            <p>We share your personal data only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>With Service Professionals:</strong> We share your name, contact and booking details with the assigned professional to fulfil your booking.</li>
              <li><strong>With Payment Processors:</strong> Transaction data is shared with DuitNow, Touch 'n Go eWallet, GrabPay and other payment partners.</li>
              <li><strong>With Legal Authorities:</strong> Where required by Malaysian law or court order.</li>
            </ul>
            <p>We do not sell, rent or trade your personal information to third parties for marketing purposes.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Booking records are retained for 7 years in accordance with Malaysian tax and commerce law. You may request deletion of your account and associated data by contacting us.</p>
          </Section>

          <Section title="6. Cookies">
            <p>Our website uses cookies to improve your browsing experience. You can control cookies through your browser settings. For more detail, see our <Link to="/cookie-policy" className="text-gold hover:underline">Cookie Policy</Link>.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Under the Personal Data Protection Act 2010 (PDPA) of Malaysia, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Withdraw consent to data processing</li>
              <li>Request deletion of your data</li>
            </ul>
            <p>To exercise any of these rights, email us at <a href="mailto:for_services@iprofixer.com.my" className="text-gold hover:underline">for_services@iprofixer.com.my</a>.</p>
          </Section>

          <Section title="8. Security">
            <p>We implement reasonable technical and organisational measures to protect your personal data from unauthorised access, disclosure, alteration or destruction. However, no internet transmission is 100% secure.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <div className="border-t border-gray-200 pt-8 mt-8 flex flex-wrap gap-4">
            <Link to="/terms" className="text-gold hover:underline text-sm font-body">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gold hover:underline text-sm font-body">Cookie Policy</Link>
            <Link to="/contact" className="text-gold hover:underline text-sm font-body">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
