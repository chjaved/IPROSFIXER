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

export default function Terms() {
  return (
    <>
      <PageHero tag="Legal" title="Terms of Service" subtitle={`Last updated: ${LAST_UPDATED}`} breadcrumb="Terms of Service" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="bg-gold/5 border border-gold/20 rounded-2xl p-6 mb-10 font-body text-sm text-gray-600">
            <strong className="text-brand font-head uppercase">Important:</strong> By using iPROFIXER's website, app or services, you agree to these Terms of Service. Please read them carefully. If you do not agree, please do not use our platform.
          </div>

          <Section title="1. Acceptance of Terms">
            <p>These Terms of Service ("Terms") constitute a legally binding agreement between you and iPROFIXER Sdn Bhd. By accessing or using our platform, you confirm you are at least 18 years old and agree to be bound by these Terms.</p>
          </Section>

          <Section title="2. Description of Service">
            <p>iPROFIXER is a marketplace platform that connects homeowners ("Customers") with independent service providers ("Professionals") for home services including but not limited to electrical work, AC repair, cleaning, appliance repair, caregiver services and housekeeping.</p>
            <p>iPROFIXER is a technology platform. We are not the employer of Professionals and do not directly provide home services ourselves, unless expressly stated otherwise.</p>
          </Section>

          <Section title="3. Bookings and Payments">
            <ul className="list-disc pl-6 space-y-1">
              <li>All bookings are confirmed only after you receive a booking confirmation from iPROFIXER via WhatsApp or email.</li>
              <li>Prices quoted are estimates. Final charges depend on the scope of work agreed between you and the Professional on-site.</li>
              <li>Payment is due on job completion. Accepted methods: cash, DuitNow, Touch 'n Go eWallet, GrabPay.</li>
              <li>iPROFIXER charges a platform service fee which is included in the quoted price.</li>
            </ul>
          </Section>

          <Section title="4. Cancellations and Rescheduling">
            <ul className="list-disc pl-6 space-y-1">
              <li>You may cancel or reschedule a booking up to 4 hours before the scheduled time at no charge.</li>
              <li>Cancellations within 4 hours of the booking may incur a cancellation fee equivalent to the platform service fee.</li>
              <li>Repeated no-shows may result in suspension of your account.</li>
            </ul>
          </Section>

          <Section title="5. Satisfaction Guarantee">
            <p>If you are not satisfied with a completed job, you must notify iPROFIXER within 24 hours of job completion. We will investigate and, at our discretion, arrange a re-service at no additional cost. This guarantee covers workmanship issues and does not apply to change of mind or new issues unrelated to the original job.</p>
          </Section>

          <Section title="6. Professional Conduct">
            <p>All Professionals on the iPROFIXER platform are required to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Arrive on time or notify the Customer and iPROFIXER of delays</li>
              <li>Behave professionally and respectfully at all times</li>
              <li>Not solicit direct business from Customers outside the platform for 12 months after introduction</li>
              <li>Not misrepresent their qualifications or experience</li>
            </ul>
          </Section>

          <Section title="7. Customer Responsibilities">
            <ul className="list-disc pl-6 space-y-1">
              <li>Ensure someone aged 18+ is present at the property during the service</li>
              <li>Provide accurate information about the issue or work required</li>
              <li>Ensure safe and adequate access to the work area</li>
              <li>Treat Professionals with respect</li>
            </ul>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>To the maximum extent permitted by Malaysian law, iPROFIXER's total liability for any claim arising from use of the platform is limited to the amount paid by you for the specific booking giving rise to the claim.</p>
            <p>iPROFIXER is not liable for any indirect, incidental, special or consequential damages, including loss of profit, data or goodwill.</p>
          </Section>

          <Section title="9. Intellectual Property">
            <p>All content on the iPROFIXER platform — including logos, text, images, software and trademarks — is owned by iPROFIXER Sdn Bhd and may not be reproduced, distributed or used without our written permission.</p>
          </Section>

          <Section title="10. Governing Law">
            <p>These Terms are governed by the laws of Malaysia. Any disputes will be subject to the exclusive jurisdiction of the courts of Malaysia.</p>
          </Section>

          <Section title="11. Changes to Terms">
            <p>We reserve the right to modify these Terms at any time. We will notify users of material changes via email or a notice on the platform. Continued use of the platform after changes constitutes acceptance.</p>
          </Section>

          <Section title="12. Contact">
            <p>For questions about these Terms, contact us at <a href="mailto:for_services@iprofixer.com.my" className="text-gold hover:underline">for_services@iprofixer.com.my</a> or WhatsApp <a href="https://wa.me/60162104127" className="text-gold hover:underline">+60162104127</a>.</p>
          </Section>

          <div className="border-t border-gray-200 pt-8 mt-8 flex flex-wrap gap-4">
            <Link to="/privacy" className="text-gold hover:underline text-sm font-body">Privacy Policy</Link>
            <Link to="/cookie-policy" className="text-gold hover:underline text-sm font-body">Cookie Policy</Link>
            <Link to="/contact" className="text-gold hover:underline text-sm font-body">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
