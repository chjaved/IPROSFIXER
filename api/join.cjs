const { sendEmail, emailTemplate } = require('./_mailer.cjs')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  const { name, phone, serviceType, experience, area } = req.body || {}

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
    res.json({ success: true, message: 'Application received! Our team will contact you within 48 hours.' })
  } catch (err) {
    console.error('join error:', err)
    res.status(500).json({ success: false, message: 'Failed to send. Please WhatsApp us instead.' })
  }
}
