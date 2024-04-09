/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

