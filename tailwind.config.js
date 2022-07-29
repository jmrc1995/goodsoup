/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors:{
      transparent: 'transparent',
      navyBlue: '#282c34',
      white: "#FFF",
    },
    extend: {
        fontFamily:{
          'montserrat': ['DM Serif Display', 'serif'],
        }
    },
  },
  plugins: [],
}
