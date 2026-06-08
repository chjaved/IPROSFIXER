const { getDb, generateId } = require('../_db.js')

module.exports = async function notificationsHandler(req, res) {
  const url = req.url || ''
  const sql = getDb()
  const userId = req.user.id

  const notifIdMatch = url.replace(/\?.*$/, '').match(/\/notifications\/([\w-]+)/)
  const notificationId = notifIdMatch ? notifIdMatch[1] : null
  const isReadAll = url.includes('/read-all')

  if (req.method === 'GET' && !notificationId && !isReadAll) {
    const notifications = await sql`SELECT * FROM notifications WHERE user_id=${userId} ORDER BY created_at DESC LIMIT 50`
    const unreadCount = await sql`SELECT COUNT(*) as count FROM notifications WHERE user_id=${userId} AND is_read=FALSE`
    return res.json({ success: true, notifications, unread_count: unreadCount[0]?.count || 0 })
  }

  if (req.method === 'PUT' && isReadAll) {
    await sql`UPDATE notifications SET is_read=TRUE WHERE user_id=${userId} AND is_read=FALSE`
    return res.json({ success: true, message: 'All notifications marked as read' })
  }

  if (req.method === 'PUT' && notificationId && notificationId !== 'read-all') {
    const notification = await sql`SELECT * FROM notifications WHERE id=${notificationId}`
    if (!notification.length) return res.status(404).json({ success: false, message: 'Notification not found' })
    if (notification[0].user_id !== userId) return res.status(403).json({ success: false, message: 'Access denied' })
    await sql`UPDATE notifications SET is_read=TRUE WHERE id=${notificationId}`
    return res.json({ success: true, message: 'Notification marked as read' })
  }

  return res.status(404).json({ success: false, message: 'Not found' })
}

async function createNotification({ user_id, type, title, body, data }) {
  const sql = getDb()
  const notificationId = generateId()
  await sql`INSERT INTO notifications (id, user_id, type, title, body, data) VALUES (${notificationId}, ${user_id}, ${type}, ${title}, ${body}, ${data})`
  return notificationId
}

module.exports.createNotification = createNotification
