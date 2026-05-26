export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' })
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY not configured')
    return res.status(200).json({ 
      reply: 'Hi! I\'m iPROFIXER Assistant. I can help you book home services like cleaning, AC repair, electrical work, and more. What service do you need today?'
    })
  }

  const SYSTEM_PROMPT = `You are iPROFIXER Assistant, a helpful customer service chatbot for iPROFIXER, a home services marketplace in Malaysia.

SERVICES: Electricians (RM80-200), AC Repair (RM80-250), Appliance Repair (RM100-300), Cleaning (RM150-400), Caregivers (RM25-35/hour), Laundry (RM5-8/kg), House Maid (RM80-120/session).

AREAS: KL, PJ, Shah Alam, Subang, Cheras, Klang, Cyberjaya, Putrajaya, Ampang, Bangsar, Mont Kiara, Damansara.

BOOKING: WhatsApp +60162104127, website, or app. Pay after job - Cash, DuitNow, TnG, GrabPay.

Be friendly, concise (2-3 sentences). Always mention WhatsApp +60162104127 for bookings.`

  try {
    const { OpenAI } = await import('openai')
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 200
    })

    const reply = completion.choices[0]?.message?.content || 
      'I can help you book cleaning, AC repair, electrical services and more. WhatsApp us at +60162104127 for quick booking!'

    return res.status(200).json({ reply })

  } catch (error) {
    console.error('OpenAI error:', error.message)
    return res.status(200).json({
      reply: 'I can help you with home services - cleaning, AC repair, electrical work, and more. For immediate booking, WhatsApp us at +60162104127!'
    })
  }
}
