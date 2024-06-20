/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        nhbBG: 'linear-gradient(110deg, #0f2d79 0%, #171157 50%, #17186a 100%)',
        blueBG: 'url("/src/assets/blue-bg.svg")',
      },
      colors: {
        nhb:'#0f2166',
      },
      fontFamily: {
        kreonSerif: '"Kreon", serif;',
        sourceSans: '"Source Sans 3", sans-serif;',
      },
    },
  },
  plugins: [],
}
