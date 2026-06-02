const express = require('express');
const router = express.Router();
const { getDb } = require('../middleware/db.js');

const SYSTEM_PROMPT = `You are iPROFIXER Assistant, a helpful customer service chatbot for iPROFIXER, a home services marketplace in Malaysia.

SERVICES: Electricians (RM80-200), AC Repair (RM80-250), Appliance Repair (RM100-300), Cleaning (RM150-400), Caregivers (RM25-35/hour), Laundry (RM5-8/kg), House Maid (RM80-120/session).

AREAS: KL, PJ, Shah Alam, Subang, Cheras, Klang, Cyberjaya, Putrajaya, Ampang, Bangsar, Mont Kiara, Damansara.

BOOKING: Download iPROFIXER app for instant booking - Google Play: https://play.google.com/store/apps/details?id=com.iprofixer.app or App Store: https://apps.apple.com/app/iprofixer/id1234567890. Pay after job - Cash, DuitNow, TnG, GrabPay.

Be friendly, concise (2-3 sentences). Guide users to download the mobile app for fastest booking. If they need help, mention phone +60380805249 or email for_services@iprofixer.com.my.`;

// POST /api/chat - Chatbot endpoint
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.log('OPENAI_API_KEY not configured, using fallback response');
      return res.status(200).json({ 
        reply: 'Hi! I\'m iPROFIXER Assistant. I can help you book home services like cleaning, AC repair, electrical work, and more. Download our app for instant booking: https://play.google.com/store/apps/details?id=com.iprofixer.app'
      });
    }

    try {
      const { OpenAI } = await import('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 200
      });

      const reply = completion.choices[0]?.message?.content || 
        'I can help you book cleaning, AC repair, electrical services and more. Download our app for instant booking: https://play.google.com/store/apps/details?id=com.iprofixer.app';

      // Log chat to database (optional)
      try {
        const sql = getDb();
        await sql`
          INSERT INTO chat_messages (id, message, response, created_at)
          VALUES (gen_random_uuid()::text, ${message}, ${reply}, NOW())
        `;
      } catch (dbErr) {
        // Non-critical, just log
        console.log('Chat logging skipped:', dbErr.message);
      }

      return res.status(200).json({ reply });

    } catch (openaiErr) {
      console.error('OpenAI error:', openaiErr.message);
      return res.status(200).json({
        reply: 'I can help you with home services - cleaning, AC repair, electrical work, and more. Download our app for instant booking: https://play.google.com/store/apps/details?id=com.iprofixer.app'
      });
    }

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
