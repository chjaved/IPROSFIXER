/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand:         '#1c1c1e',
        'brand-light': '#3a3a3c',
        'brand-dark':  '#000000',
        gold:          '#0ea5e9',
        'gold-dark':   '#0284c7',
        'gold-light':  '#bae6fd',
        accent:        '#0ea5e9',
        orange:        '#f97316',
        wa:            '#25D366',
        'wa-dark':     '#1aab52',
        surface:       '#f8f8f7',
        border:        '#e5e5e3',
      },
      fontFamily: {
        head:    ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        lg2:  '12px',
      },
    },
  },
  plugins: [],
}
