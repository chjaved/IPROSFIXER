/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand:       '#0B6B52',
        'brand-dark':'#084D3C',
        gold:        '#F47B20',
        'gold-dark': '#D9690F',
        teal:        '#0B6B52',
        'teal-dark': '#084D3C',
        'teal-deep': '#04342C',
        'teal-mid':  '#1D9E75',
        'teal-light':'#E0F4EE',
        orange:      '#F47B20',
        'orange-dark':'#D9690F',
        text:        '#111827',
        muted:       '#6B7280',
        border:      '#E5E7EB',
        'bg-soft':   '#F8FAF9',
        wa:          '#25D366',
        'wa-dark':   '#1aab52',
      },
      fontFamily: {
        head: ['Sora', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        xl2: '20px',
      },
      maxWidth: {
        content: '1180px',
      },
      spacing: {
        section: '80px',
        'section-mobile': '48px',
      },
    },
  },
  safelist: [
    { pattern: /^from-/ },
    { pattern: /^to-/ },
    { pattern: /^via-/ },
  ],
  plugins: [],
}
