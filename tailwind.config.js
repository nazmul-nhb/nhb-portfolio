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
        move: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        growShrink: {
          '0%, 100%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.05)' },
        },
        glowing: {
          '0%': {
            boxShadow: '0 0 5px rgba(15, 170, 250, 0.5), 0 0 10px rgba(15, 170, 250, 0.5), 0 0 15px rgba(15, 170, 250, 0.5), 0 0 20px rgba(15, 170, 250, 0.5), 0 0 30px rgba(15, 170, 250, 0.5), 0 0 40px rgba(15, 170, 250, 0.5), 0 0 50px rgba(15, 170, 250, 0.5), 0 0 75px rgba(15, 170, 250, 0.5)',
          },
          '100%': {
            boxShadow: '0 0 20px rgba(15, 170, 250, 0.5), 0 0 30px rgba(15, 170, 250, 0.5), 0 0 40px rgba(15, 170, 250, 0.5), 0 0 50px rgba(15, 170, 250, 0.5), 0 0 60px rgba(15, 170, 250, 0.5), 0 0 70px rgba(15, 170, 250, 0.5), 0 0 80px rgba(15, 170, 250, 0.5), 0 0 100px rgba(15, 170, 250, 0.5)',
          },
        },
        glowingBorder: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(15, 170, 250, 0.5), 0 0 12px rgba(15, 170, 250, 0.5)' },
          '50%': { boxShadow: '0 0 5px rgba(15, 170, 250, 0.5), 0 0 12px rgba(15, 170, 250, 0.5), 0 0 20px rgba(15, 170, 250, 0.5), 0 0 24px rgba(15, 170, 250, 0.5)' },
        },
        // glowingAll: {
        //   '0%': {
        //     backgroundColor: 'rgba(15, 170, 250, 0.9)',
        //     boxShadow: '0 0 5px rgba(15, 170, 250, 0.5), 0 0 10px rgba(15, 170, 250, 0.5), 0 0 15px rgba(15, 170, 250, 0.5), 0 0 20px rgba(15, 170, 250, 0.5), 0 0 30px rgba(15, 170, 250, 0.5), 0 0 40px rgba(15, 170, 250, 0.5), 0 0 50px rgba(15, 170, 250, 0.5), 0 0 75px rgba(15, 170, 250, 0.5)',
        //   },
        //   '100%': {
        //     backgroundColor: 'rgba(15, 170, 250, 0.99)',
        //     boxShadow: '0 0 20px rgba(15, 170, 250, 0.5), 0 0 30px rgba(15, 170, 250, 0.5), 0 0 40px rgba(15, 170, 250, 0.5), 0 0 50px rgba(15, 170, 250, 0.5), 0 0 60px rgba(15, 170, 250, 0.5), 0 0 70px rgba(15, 170, 250, 0.5), 0 0 80px rgba(15, 170, 250, 0.5), 0 0 100px rgba(15, 170, 250, 0.5)',
        //   },
        // }
      },
      animation: {
        rotate: 'rotate360 1s linear',
        flip: 'flip 1s linear',
        progress: 'progress 1s linear',
        horizontal: 'move 1s ease-in-out infinite',
        growShrink: 'growShrink 3s ease-in-out infinite',
        glow: 'glowing 1.5s infinite alternate',
        glowBorder: 'glowingBorder 3s linear infinite',
        // glowAll: 'glowingAll 2s ease-in-out infinite alternate',
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
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        '.scrollbar-hide': {
          'scrollbar-width': 'none', /* For Firefox */
          '-ms-overflow-style': 'none',  /* For Internet Explorer and Edge */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none', /* For Chrome, Safari, and Opera */
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin', /* For Firefox */
        },
        '.portfolio-scrollbar': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#fff transparent',
        },
        '.portfolio-scrollbar::-webkit-scrollbar': {
          'width': '8px',
        },
        '.portfolio-scrollbar::-webkit-scrollbar-track': {
          'background': 'transparent',
        },
        '.portfolio-scrollbar::-webkit-scrollbar-thumb': {
          'background-color': '#fff',
          'border-radius': '10px',
          'border': '3px solid transparent',
          'background-clip': 'padding-box',
        },
        '.portfolio-scrollbar::-webkit-scrollbar-button': {
          'display': 'none',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}
