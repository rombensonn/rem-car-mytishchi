/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#162033',
        graphite: '#314052',
        muted: '#66758a',
        line: '#d9e1ea',
        milk: '#f7f4ee',
        porcelain: '#fbfcfe',
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          600: '#0f5fba',
          700: '#0a4f9c',
          900: '#123050'
        },
        amber: {
          400: '#f7b733',
          500: '#f59e0b',
          600: '#d97706'
        }
      },
      boxShadow: {
        soft: '0 18px 55px rgba(17, 38, 62, 0.10)',
        card: '0 12px 34px rgba(20, 39, 67, 0.08)'
      }
    }
  },
  plugins: []
};
