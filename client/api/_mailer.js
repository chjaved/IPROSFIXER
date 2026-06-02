const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const emailTemplate = (title, rows) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f2f2f7;margin:0;padding:24px}
    .card{background:#fff;border-radius:12px;max-width:560px;margin:0 auto;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.1)}
    .hd{background:#1a1a2e;padding:28px 32px}
    .hd h1{color:#FFB800;margin:0;font-size:1.4rem;font-style:italic}
    .hd p{color:rgba(255,255,255,.7);margin:6px 0 0;font-size:.9rem}
    .bd{padding:28px 32px}
    .bd h2{color:#1a1a2e;font-size:1.1rem;margin:0 0 20px}
    table{width:100%;border-collapse:collapse}
    td{padding:10px 14px;font-size:.9rem;vertical-align:top}
    tr:nth-child(odd) td{background:#f8f8fc}
    .lbl{font-weight:700;color:#5a5a7a;width:35%}
    .val{color:#1a1a2e}
    .ft{background:#f8f8fc;padding:16px 32px;font-size:.8rem;color:#9898b0;text-align:center;border-top:1px solid #e4e4ed}
  </style>
</head>
<body>
  <div class="card">
    <div class="hd"><h1>iPROFIXER</h1><p>${title}</p></div>
    <div class="bd">
      <h2>Submission Details</h2>
      <table>${rows.map(([l,v])=>`<tr><td class="lbl">${l}</td><td class="val">${v||'—'}</td></tr>`).join('')}</table>
    </div>
    <div class="ft">Sent from iPROFIXER website. © ${new Date().getFullYear()} iPROFIXER Sdn Bhd</div>
  </div>
</body>
</html>`

const sendEmail = ({ subject, html, replyTo }) =>
  transporter.sendMail({
    from: `"iPROFIXER Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    replyTo: replyTo || process.env.SMTP_USER,
    subject,
    html,
  })

module.exports = { sendEmail, emailTemplate }
