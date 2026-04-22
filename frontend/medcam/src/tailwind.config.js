/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#2C5F8D',
          dark: '#1E4870',
          light: '#EBF2FA',
        },
        success: '#27AE60',
      },
    },
  },
  plugins: [],
};
