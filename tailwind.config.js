/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand:      '#1a1a2e',
        'brand-light': '#2d2d4e',
        'brand-dark':  '#0f0f1a',
        gold:       '#FFB800',
        'gold-dark': '#e0a200',
        'gold-light': '#ffd566',
        orange:     '#FF6B35',
        wa:         '#25D366',
        'wa-dark':  '#1aab52',
      },
      fontFamily: {
        head: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        lg2: '20px',
      },
    },
  },
  plugins: [],
}
