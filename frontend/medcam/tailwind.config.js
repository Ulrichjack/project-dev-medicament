/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C5F8D',
        secondary: '#27AE60',
        danger: '#E74C3C',
        warning: '#F39C12',
        'bg-alt': '#F5F7FA',
      }
    },
  },
  plugins: [],
}