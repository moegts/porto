// @font-face {
//   font-family: 'Libre Baskerville';
//   src: url('/fonts/LibreBaskerville-Regular.ttf') format('truetype');
//   font-weight: 400;
//   font-style: normal;
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Libre Baskerville'],
      }
    }
  },
  plugins: [],
}