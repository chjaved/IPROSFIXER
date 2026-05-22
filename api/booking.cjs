const { sendEmail, emailTemplate } = require('./_mailer.cjs')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  const { service, area, date, name, phone } = req.body || {}

  if (!service || !area) {
    return res.status(400).json({ success: false, message: 'Service and area are required.' })
  }

  try {
    const html = emailTemplate('📅 New Booking / Quote Request', [
      ['Service',    service],
      ['Area',       area],
      ['Pref. Date', date || 'Flexible'],
      ['Name',       name || 'Not provided'],
      ['Phone',      phone || 'Not provided'],
      ['Received',   new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })],
    ])
    await sendEmail({ subject: `📅 New Booking — ${service} (${area})`, html })
    res.json({ success: true, message: 'Request received! We will contact you shortly.' })
  } catch (err) {
    console.error('booking error:', err)
    res.status(500).json({ success: false, message: 'Failed to send. Please try WhatsApp instead.' })
  }
}
