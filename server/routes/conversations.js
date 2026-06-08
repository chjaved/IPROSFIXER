const express = require('express');
const router = express.Router();
const { getDb, generateId } = require('../middleware/db.js');
const { authMiddleware } = require('../middleware/auth.js');

// GET /api/conversations - List user's conversations
router.get('/', async (req, res) => {
  try {
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const userType = req.user.type;
    const sql = getDb();

    let conversations;
    if (userType === 'consumer') {
      conversations = await sql`
        SELECT c.*, b.booking_number, s.name as service_name, s.icon,
               u.name as professional_name, u.phone as professional_phone,
               (SELECT message FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message,
               (SELECT created_at FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message_at,
               (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id AND m.sender_id != ${userId} AND m.read_at IS NULL) as unread_count
        FROM conversations c
        JOIN bookings b ON b.id = c.booking_id
        LEFT JOIN services s ON s.id = b.service_id
        LEFT JOIN users u ON u.id = c.professional_id
        WHERE c.customer_id = ${userId}
        ORDER BY c.updated_at DESC
      `;
    } else {
      conversations = await sql`
        SELECT c.*, b.booking_number, s.name as service_name, s.icon,
               u.name as customer_name, u.phone as customer_phone,
               (SELECT message FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message,
               (SELECT created_at FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message_at,
               (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id AND m.sender_id != ${userId} AND m.read_at IS NULL) as unread_count
        FROM conversations c
        JOIN bookings b ON b.id = c.booking_id
        LEFT JOIN services s ON s.id = b.service_id
        LEFT JOIN users u ON u.id = c.customer_id
        WHERE c.professional_id = ${userId}
        ORDER BY c.updated_at DESC
      `;
    }

    return res.json({ success: true, conversations });
  } catch (err) {
    console.error('Get conversations error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// GET /api/conversations/:id/messages - Fetch messages for a conversation
router.get('/:id/messages', async (req, res) => {
  try {
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const conversationId = req.params.id;
    const sql = getDb();

    // Verify user owns this conversation
    const conv = await sql`SELECT * FROM conversations WHERE id = ${conversationId}`;
    if (!conv.length) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    const c = conv[0];
    if (c.customer_id !== userId && c.professional_id !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Mark messages as read
    await sql`UPDATE messages SET read_at = NOW() WHERE conversation_id = ${conversationId} AND sender_id != ${userId} AND read_at IS NULL`;

    // Fetch messages
    const messages = await sql`
      SELECT m.*, u.name as sender_name
      FROM messages m
      LEFT JOIN users u ON u.id = m.sender_id
      WHERE m.conversation_id = ${conversationId}
      ORDER BY m.created_at ASC
    `;

    return res.json({ success: true, messages });
  } catch (err) {
    console.error('Get messages error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// POST /api/conversations/:id/messages - Send message
router.post('/:id/messages', async (req, res) => {
  try {
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const conversationId = req.params.id;
    const { message } = req.body;
    const sql = getDb();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Verify user owns this conversation
    const conv = await sql`SELECT * FROM conversations WHERE id = ${conversationId}`;
    if (!conv.length) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    const c = conv[0];
    if (c.customer_id !== userId && c.professional_id !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Create message
    const messageId = generateId();
    await sql`
      INSERT INTO messages (id, conversation_id, sender_id, message, message_type)
      VALUES (${messageId}, ${conversationId}, ${userId}, ${message.trim()}, 'text')
    `;

    // Update conversation updated_at
    await sql`UPDATE conversations SET updated_at = NOW() WHERE id = ${conversationId}`;

    return res.json({ success: true, message: 'Message sent' });
  } catch (err) {
    console.error('Send message error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

// POST /api/conversations - Create conversation from booking
router.post('/', async (req, res) => {
  try {
    const ok = await authMiddleware(req, res);
    if (!ok) return;

    const userId = req.user.id;
    const userType = req.user.type;
    const { booking_id } = req.body;
    const sql = getDb();

    if (!booking_id) {
      return res.status(400).json({ success: false, message: 'booking_id is required' });
    }

    // Get booking
    const booking = await sql`SELECT * FROM bookings WHERE id = ${booking_id}`;
    if (!booking.length) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const b = booking[0];

    // Verify user is part of this booking
    if (userType === 'consumer' && b.consumer_id !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    if (userType === 'professional' && b.professional_id !== userId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (!b.professional_id) {
      return res.status(400).json({ success: false, message: 'Booking must be accepted first' });
    }

    // Check if conversation already exists
    const existing = await sql`SELECT * FROM conversations WHERE booking_id = ${booking_id}`;
    if (existing.length) {
      return res.json({ success: true, conversation: existing[0] });
    }

    // Create conversation
    const conversationId = generateId();
    await sql`
      INSERT INTO conversations (id, booking_id, customer_id, professional_id)
      VALUES (${conversationId}, ${booking_id}, ${b.consumer_id}, ${b.professional_id})
    `;

    const newConv = await sql`SELECT * FROM conversations WHERE id = ${conversationId}`;
    return res.status(201).json({ success: true, conversation: newConv[0] });
  } catch (err) {
    console.error('Create conversation error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
});

module.exports = router;
