const { sendEmail, emailTemplate } = require('./_mailer.js')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  const { name, phone, email, subject, message, serviceType, experience, area, type } = req.body || {}

  // Handle professional join applications
  if (type === 'join' || serviceType) {
    if (!name || !phone || !serviceType) {
      return res.status(400).json({ success: false, message: 'Name, phone and service type are required.' })
    }
    try {
      const html = emailTemplate('🔧 New Professional Application', [
        ['Name',         name],
        ['Phone',        phone],
        ['Service Type', serviceType],
        ['Experience',   experience || 'Not specified'],
        ['Area',         area || 'Not specified'],
        ['Received',     new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })],
      ])
      await sendEmail({ subject: `🔧 Pro Application — ${serviceType} — ${name}`, html })
      return res.json({ success: true, message: 'Application received! Our team will contact you within 48 hours.' })
    } catch (err) {
      console.error('join error:', err)
      return res.status(500).json({ success: false, message: 'Failed to send. Please WhatsApp us instead.' })
    }
  }

  // Handle contact form submissions
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
