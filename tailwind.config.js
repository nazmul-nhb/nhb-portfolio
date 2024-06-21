/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
      animation: {
        rotate: 'rotate360 1s linear',
        flip: 'flip 1s linear',
        progress: 'progress 1s linear',
      },
      backgroundImage: {
        nhbBG: 'linear-gradient(110deg, #0f2d79 0%, #171157 50%, #17186a 100%)',
        blueBG: 'url("/src/assets/blue-bg.svg")',
      },
      colors: {
        nhb: '#0f2166',
        whatsapp: '#24bb5d',
        google: '#ce3c30',
        facebook: '#0865fc',
        linkedin: '#0a63bc',
        stackOverflow: '#f48024',
        github: '#4a4a4a',
        telegram: '#2ba3df',
        reddit: '#ff4500',
        discord: '#5865f2',
        yahoo: '#6001d2',
      },
      fontFamily: {
        kreonSerif: '"Kreon", serif;',
        sourceSans: '"Source Sans 3", sans-serif;',
      },
    },
  },
  plugins: [],
}
