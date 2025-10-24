/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      spacing: {
        '14': '3.5rem', // 56px
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      height: {
        '14': '3.5rem', // 56px
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      width: {
        '14': '3.5rem', // 56px
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
