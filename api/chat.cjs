const OpenAI = require('openai')

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// iPROFIXER business context for the chatbot
const SYSTEM_PROMPT = `You are iPROFIXER Assistant, a helpful customer service chatbot for iPROFIXER, a home services marketplace in Malaysia.

ABOUT iPROFIXER:
- We connect homeowners with vetted professionals for home services
- Serving KL, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Klang, Cyberjaya, Putrajaya, Ampang, Bangsar, Mont Kiara, Damansara
- 500+ verified professionals, 9,000+ happy customers, 4.9/5 rating
- Book via WhatsApp (+60162104127), website, or app
- Pay after job completion - Cash, DuitNow, TnG, GrabPay

SERVICES OFFERED:
1. Electricians - Wiring faults, new points, circuit trips (RM80-200 per job)
2. AC Repair & Service - All brands, gas top-up, cleaning (RM80-250)
3. Appliance Repair - Washing machine, fridge, oven, dryer (RM100-300)
4. Cleaning Services - Deep clean, regular maid, post-reno (RM150-400)
5. Caregivers - Elderly care, hourly or full-day (RM25-35/hour)
6. Laundry - Wash, dry, fold, ironing, same-day (RM5-8/kg)
7. House Maid - Part-time, weekly, bi-weekly (RM80-120 per session)

HOW IT WORKS:
1. Tell us what you need (30 seconds)
2. We match you with a pro within 15 minutes via WhatsApp
3. Pro arrives and does the job
4. Pay after, rate your pro

KEY BENEFITS:
- Background checked professionals
- Insured on every job
- Fixed upfront pricing
- Same-day bookings available
- Free replacement if not satisfied
- 30-day repair warranty

FOR PROFESSIONALS:
- Free to join, no monthly fee
- Set your own rates and schedule
- Earn RM2,000-6,000/month
- 48-hour approval process

CONTACT:
- WhatsApp: +60162104127
- Phone: +60380805249
- Email: for_services@iprofixer.com.my
- Address: Unit C-3A-11, Centum@Oasis Corporate Park, No.2 Jalan PJU 1A/2, Ara Damansara, Petaling Jaya, Selangor 47301

IMPORTANT RULES:
- Be friendly, professional, and concise (max 3-4 sentences per response)
- If unsure about specific pricing, direct to WhatsApp for exact quote
- Always mention WhatsApp +60162104127 for immediate bookings
- For complex issues, suggest speaking to a human via WhatsApp
- Use Malaysian English style ("la", "lah", "can", "ok" naturally if appropriate)
- Never make up prices - give ranges or ask for details
- Never share personal customer data

CONVERSATION STYLE:
- Warm and helpful
- Short, direct answers
- Use bullet points for lists
- Always end with a helpful next step`

module.exports = async function handler(req, res) {
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
    return res.status(500).json({ 
      error: 'Chat service not configured',
      reply: 'Sorry, our AI assistant is temporarily unavailable. Please WhatsApp us at +60162104127 for immediate assistance.'
    })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 300,
      presence_penalty: 0.6,
      frequency_penalty: 0.5
    })

    const reply = completion.choices[0]?.message?.content || 
      'Sorry, I could not process your request. Please WhatsApp us at +60162104127 for assistance.'

    return res.status(200).json({ reply })

  } catch (error) {
    console.error('OpenAI API error:', error.message)
    
    // Handle specific OpenAI errors
    if (error.status === 429) {
      return res.status(200).json({
        reply: 'Our chat is very busy right now. Please WhatsApp us at +60162104127 for immediate assistance.'
      })
    }

    if (error.status === 401) {
      console.error('Invalid OpenAI API key')
    }

    return res.status(200).json({
      reply: 'Sorry, I\'m having trouble responding right now. Please WhatsApp us at +60162104127 for immediate assistance.'
    })
  }
}
