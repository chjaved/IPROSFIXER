const { getDb, generateId } = require('../_db.js')
const { createNotification } = require('./notifications.js')

module.exports = async function conversationsHandler(req, res) {
  const url = req.url || ''
  const sql = getDb()
  const userId = req.user.id
  const userType = req.user.type

  const messagesMatch = url.replace(/\?.*$/, '').match(/\/conversations\/([\w-]+)\/messages/)
  const isMessages = !!messagesMatch
  const targetConvId = messagesMatch ? messagesMatch[1] : null

  const convIdMatch = url.replace(/\?.*$/, '').match(/\/conversations\/([\w-]+)$/)
  const conversationId = convIdMatch ? convIdMatch[1] : null

  if (req.method === 'GET' && !conversationId && !isMessages) return await listConversations(req, res, sql, userId, userType)
  if (req.method === 'GET' && isMessages) return await getMessages(req, res, sql, targetConvId, userId)
  if (req.method === 'POST' && isMessages) return await sendMessage(req, res, sql, targetConvId, userId)
  if (req.method === 'POST' && !conversationId) return await createConversation(req, res, sql, userId, userType)

  return res.status(404).json({ success: false, message: 'Not found' })
}

async function listConversations(req, res, sql, userId, userType) {
  let conversations
  if (userType === 'consumer') {
    conversations = await sql`
      SELECT c.*, b.booking_number, s.name as service_name, s.icon,
             u.name as professional_name, u.phone as professional_phone,
             (SELECT message FROM messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) as last_message,
             (SELECT created_at FROM messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) as last_message_at,
             (SELECT COUNT(*) FROM messages m WHERE m.conversation_id=c.id AND m.sender_id!=${userId} AND m.read_at IS NULL) as unread_count
      FROM conversations c
      JOIN bookings b ON b.id=c.booking_id
      LEFT JOIN services s ON s.id=b.service_id
      LEFT JOIN users u ON u.id=c.professional_id
      WHERE c.customer_id=${userId}
      ORDER BY c.updated_at DESC`
  } else {
    conversations = await sql`
      SELECT c.*, b.booking_number, s.name as service_name, s.icon,
             u.name as customer_name, u.phone as customer_phone,
             (SELECT message FROM messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) as last_message,
             (SELECT created_at FROM messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) as last_message_at,
             (SELECT COUNT(*) FROM messages m WHERE m.conversation_id=c.id AND m.sender_id!=${userId} AND m.read_at IS NULL) as unread_count
      FROM conversations c
      JOIN bookings b ON b.id=c.booking_id
      LEFT JOIN services s ON s.id=b.service_id
      LEFT JOIN users u ON u.id=c.customer_id
      WHERE c.professional_id=${userId}
      ORDER BY c.updated_at DESC`
  }
  return res.json({ success: true, conversations })
}

async function getMessages(req, res, sql, conversationId, userId) {
  const conv = await sql`SELECT * FROM conversations WHERE id=${conversationId}`
  if (!conv.length) return res.status(404).json({ success: false, message: 'Conversation not found' })
  const c = conv[0]
  if (c.customer_id !== userId && c.professional_id !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
  await sql`UPDATE messages SET read_at=NOW() WHERE conversation_id=${conversationId} AND sender_id!=${userId} AND read_at IS NULL`
  const messages = await sql`SELECT m.*, u.name as sender_name FROM messages m LEFT JOIN users u ON u.id=m.sender_id WHERE m.conversation_id=${conversationId} ORDER BY m.created_at ASC`
  return res.json({ success: true, messages })
}

async function sendMessage(req, res, sql, conversationId, userId) {
  const { message } = req.body
  if (!message || typeof message !== 'string' || message.trim().length === 0)
    return res.status(400).json({ success: false, message: 'Message is required' })
  const conv = await sql`SELECT * FROM conversations WHERE id=${conversationId}`
  if (!conv.length) return res.status(404).json({ success: false, message: 'Conversation not found' })
  const c = conv[0]
  if (c.customer_id !== userId && c.professional_id !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
  const messageId = generateId()
  await sql`INSERT INTO messages (id, conversation_id, sender_id, message, message_type) VALUES (${messageId}, ${conversationId}, ${userId}, ${message.trim()}, 'text')`
  await sql`UPDATE conversations SET updated_at=NOW() WHERE id=${conversationId}`
  const receiverId = c.customer_id === userId ? c.professional_id : c.customer_id
  if (receiverId) {
    await createNotification({ user_id: receiverId, type: 'new_message', title: 'New Message', body: 'You have a new message in your conversation.', data: JSON.stringify({ conversation_id: conversationId }) })
  }
  return res.json({ success: true, message: 'Message sent' })
}

async function createConversation(req, res, sql, userId, userType) {
  const { booking_id } = req.body
  if (!booking_id) return res.status(400).json({ success: false, message: 'booking_id is required' })
  const booking = await sql`SELECT * FROM bookings WHERE id=${booking_id}`
  if (!booking.length) return res.status(404).json({ success: false, message: 'Booking not found' })
  const b = booking[0]
  if (userType === 'consumer' && b.consumer_id !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
  if (userType === 'professional' && b.professional_id !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
  if (!b.professional_id) return res.status(400).json({ success: false, message: 'Booking must be accepted first' })
  const existing = await sql`SELECT * FROM conversations WHERE booking_id=${booking_id}`
  if (existing.length) return res.json({ success: true, conversation: existing[0] })
  const conversationId = generateId()
  await sql`INSERT INTO conversations (id, booking_id, customer_id, professional_id) VALUES (${conversationId}, ${booking_id}, ${b.consumer_id}, ${b.professional_id})`
  const newConv = await sql`SELECT * FROM conversations WHERE id=${conversationId}`
  return res.status(201).json({ success: true, conversation: newConv[0] })
}
