# iPROFIXER — cPanel Deployment Guide

## Architecture
```
iprofixer-app/
├── server/          ← Node.js/Express API (runs via cPanel Node.js App)
│   ├── index.js     ← Entry point
│   ├── package.json
│   └── .env         ← Your real credentials (never commit this!)
└── client/          ← React/Vite app
    ├── src/
    ├── dist/        ← Built output (upload this to public_html)
    └── package.json
```

---

## Step 1 — Build the React Client (on your local machine)

```bash
cd iprofixer-app
npm run install:all      # Install all dependencies
npm run build            # Builds client/dist/
```

---

## Step 2 — Upload to cPanel

### React Frontend (static files)
1. Upload everything inside `client/dist/` to your **`public_html`** folder
2. This includes `index.html`, `assets/` folder, etc.

### Node.js Express Server
1. Upload the **`server/`** folder to your hosting (e.g. `/home/yourusername/iprofixer-server/`)
2. Do NOT put it inside `public_html`

---

## Step 3 — Set Up cPanel Node.js App

1. In cPanel, go to **"Setup Node.js App"**
2. Click **"Create Application"**
3. Fill in:
   - **Node.js version**: 18 or 20
   - **Application mode**: Production
   - **Application root**: `iprofixer-server` (the folder you uploaded)
   - **Application URL**: `api.yourdomain.com` OR `yourdomain.com/api`
   - **Application startup file**: `index.js`
4. Click **Save** — cPanel will install npm dependencies automatically
5. Click **Run NPM Install**

---

## Step 4 — Configure Environment Variables

In the Node.js App panel, add these environment variables (or create a `.env` file in the server folder):

```
SMTP_HOST=mail.iprofixer.com.my
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=for_services@iprofixer.com.my
SMTP_PASS=your_email_password
NOTIFY_EMAIL=for_services@iprofixer.com.my
PORT=3001
CLIENT_URL=https://yourdomain.com
NODE_ENV=production
```

---

## Step 5 — Configure Reverse Proxy (`.htaccess`)

Create or update `public_html/.htaccess` to proxy `/api` requests to your Node.js app:

```apache
RewriteEngine On

# Proxy /api/* to Node.js server
RewriteCond %{REQUEST_URI} ^/api [NC]
RewriteRule ^api/(.*) http://localhost:3001/api/$1 [P,L]

# React SPA — all other routes serve index.html
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

> **Note:** The ProxyPass module (`mod_proxy`) must be enabled on your host.
> Some shared hosts don't support it — in that case, use a subdomain for the API
> (e.g. `api.yourdomain.com`) and update `CORS` and `CLIENT_URL` accordingly.

---

## Step 6 — Test

1. Visit `https://yourdomain.com` — React app should load
2. Visit `https://yourdomain.com/api/health` — should return `{"status":"ok"}`
3. Submit a contact form — you should receive an email at `for_services@iprofixer.com.my`

---

## SMTP Options

| Provider | SMTP Host | Port | Notes |
|---|---|---|---|
| cPanel Email | `mail.yourdomain.com` | 465 | Recommended — use your cPanel email |
| Gmail | `smtp.gmail.com` | 587 | Need App Password, not account password |
| Brevo (free) | `smtp-relay.brevo.com` | 587 | 300 emails/day free |

---

## Local Development

```bash
# Terminal 1 — start Express
cd iprofixer-app/server
cp .env.example .env    # fill in your SMTP details
npm install
npm run dev             # runs on port 3001

# Terminal 2 — start React
cd iprofixer-app/client
npm install
npm run dev             # runs on port 5173, proxies /api → 3001
```

Open `http://localhost:5173`
