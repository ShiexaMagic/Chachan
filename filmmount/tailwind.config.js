/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#14212B', 700: '#1C2D3A', 600: '#253949' },
        paper: '#F4F1EA',
        mist: '#E8EEF0',
        amber: { DEFAULT: '#E2A15F', deep: '#C9772F' },
        ink: '#2B3740',
        muted: '#6B7680',
        moss: '#2F7D5B',
      },
      fontFamily: {
        serif: ['"Noto Serif Georgian"', 'Georgia', 'serif'],
        sans: ['"Noto Sans Georgian"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '18px' },
      boxShadow: {
        soft: '0 1px 2px rgba(20,33,43,.05), 0 8px 24px -12px rgba(20,33,43,.18)',
      },
    },
  },
  plugins: [],
};
