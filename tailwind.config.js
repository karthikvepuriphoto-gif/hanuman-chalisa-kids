/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF6EA',
        paper: '#FFFBF5',
        saffron: '#E07A3D',
        deep: '#C8482A',
        maroon: '#8C3A2F',
        ink: '#4A2C24',
        sky: '#8ECAE6',
        leaf: '#6E9A62',
        gold: '#F2C14E',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 32px rgba(140, 58, 47, 0.1)',
      },
    },
  },
  plugins: [],
}
