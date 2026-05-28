const { sendEmail, emailTemplate } = require('./_mailer.js')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  const { name, phone, email, subject, message } = req.body || {}

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Name, phone and message are required.' })
  }

  try {
    const html = emailTemplate('📬 New Contact Form Submission', [
      ['Name',     name],
      ['Phone',    phone],
      ['Email',    email || 'Not provided'],
      ['Subject',  subject || 'General Enquiry'],
      ['Message',  message.replace(/\n/g, '<br/>')],
      ['Received', new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })],
    ])
    await sendEmail({
      subject: `📬 Contact: ${subject || 'General Enquiry'} — ${name}`,
      html,
      replyTo: email || null,
    })
    res.json({ success: true, message: 'Message sent! We will reply within 30 minutes.' })
  } catch (err) {
    console.error('contact error:', err)
    res.status(500).json({ success: false, message: 'Failed to send. Please try WhatsApp instead.' })
  }
}
