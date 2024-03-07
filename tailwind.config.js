/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        primary: '#fed4a', // Example primary color
        secondary: 'black-800', // Example secondary color
      },
    },
  },
  plugins: [],
}

