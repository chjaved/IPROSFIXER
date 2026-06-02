require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'https://iprofixer.com.my',
  'https://www.iprofixer.com.my',
  'http://localhost:5173',
  'http://localhost:4173',
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ─── Rate Limiting ─────────────────────────────────────────────────────────────
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many submissions. Please try again later.' },
});

// ─── Nodemailer Transporter ────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── Email Helper ──────────────────────────────────────────────────────────────
const sendEmail = async ({ subject, html, replyTo }) => {
  return transporter.sendMail({
    from: `"iPROFIXER Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    replyTo: replyTo || process.env.SMTP_USER,
    subject,
    html,
  });
};

const emailTemplate = (title, rows) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f2f2f7; margin: 0; padding: 24px; }
    .card { background: #ffffff; border-radius: 12px; max-width: 560px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
    .header { background: #1a1a2e; padding: 28px 32px; }
    .header h1 { color: #FFB800; margin: 0; font-size: 1.4rem; font-style: italic; }
    .header p { color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 0.9rem; }
    .body { padding: 28px 32px; }
    .body h2 { color: #1a1a2e; font-size: 1.1rem; margin: 0 0 20px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 10px 14px; font-size: 0.9rem; vertical-align: top; }
    tr:nth-child(odd) td { background: #f8f8fc; }
    .label { font-weight: 700; color: #5a5a7a; width: 35%; }
    .value { color: #1a1a2e; }
    .footer { background: #f8f8fc; padding: 16px 32px; font-size: 0.8rem; color: #9898b0; text-align: center; border-top: 1px solid #e4e4ed; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>iPROFIXER</h1>
      <p>${title}</p>
    </div>
    <div class="body">
      <h2>Submission Details</h2>
      <table>
        ${rows.map(([label, value]) => `
          <tr>
            <td class="label">${label}</td>
            <td class="value">${value || '—'}</td>
          </tr>
        `).join('')}
      </table>
    </div>
    <div class="footer">
      This email was sent automatically from the iPROFIXER website contact form.<br/>
      © ${new Date().getFullYear()} iPROFIXER Sdn Bhd · Ara Damansara, Petaling Jaya, Selangor
    </div>
  </div>
</body>
</html>
`;

// ─── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/services', require('./routes/services'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/seed', require('./routes/seed'));
app.use('/api/seed-data', require('./routes/seed-data'));

/* Health check */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* Booking / Quote form */
app.post('/api/booking', formLimiter, async (req, res) => {
  try {
    const { service, area, date, name, phone } = req.body;

    if (!service || !area) {
      return res.status(400).json({ success: false, message: 'Service and area are required.' });
    }

    const html = emailTemplate('📅 New Booking / Quote Request', [
      ['Service',   service],
      ['Area',      area],
      ['Pref. Date', date || 'Flexible'],
      ['Name',      name || 'Not provided'],
      ['Phone',     phone || 'Not provided'],
      ['Received',  new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })],
    ]);

    await sendEmail({
      subject: `📅 New Booking Request — ${service} (${area})`,
      html,
      replyTo: null,
    });

    res.json({ success: true, message: 'Your request has been received. We will contact you shortly!' });
  } catch (err) {
    console.error('Booking email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send. Please try WhatsApp instead.' });
  }
});

/* Contact form */
app.post('/api/contact', formLimiter, async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone and message are required.' });
    }

    const html = emailTemplate('📬 New Contact Form Submission', [
      ['Name',     name],
      ['Phone',    phone],
      ['Email',    email || 'Not provided'],
      ['Subject',  subject || 'General Enquiry'],
      ['Message',  message.replace(/\n/g, '<br/>')],
      ['Received', new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })],
    ]);

    await sendEmail({
      subject: `📬 Contact: ${subject || 'General Enquiry'} — ${name}`,
      html,
      replyTo: email || null,
    });

    res.json({ success: true, message: 'Message sent! We will reply within 30 minutes.' });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send. Please try WhatsApp instead.' });
  }
});

/* Professional join form */
app.post('/api/join', formLimiter, async (req, res) => {
  try {
    const { name, phone, serviceType, experience, area } = req.body;

    if (!name || !phone || !serviceType) {
      return res.status(400).json({ success: false, message: 'Name, phone and service type are required.' });
    }

    const html = emailTemplate('🔧 New Professional Application', [
      ['Name',         name],
      ['Phone',        phone],
      ['Service Type', serviceType],
      ['Experience',   experience || 'Not specified'],
      ['Area',         area || 'Not specified'],
      ['Received',     new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })],
    ]);

    await sendEmail({
      subject: `🔧 Pro Application — ${serviceType} — ${name}`,
      html,
    });

    res.json({ success: true, message: 'Application received! Our team will contact you within 48 hours.' });
  } catch (err) {
    console.error('Join email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send. Please WhatsApp us instead.' });
  }
});

// ─── Serve React build in production ──────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ iPROFIXER server running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});
