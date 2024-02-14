/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'mobile': '320px',
      'laptop': '1024px',
      'labtop-L': '1440px',
    },
    extend: {
      fontFamily: {
        itim: "'Itim', cursive",
        istok: "'Istok Web', sans-serif",
        Saira: "'Saira Stencil One'",
      },
    },
    backgroundBoxColors: {
      'correct-color': '#62EC70',
      'incorrect-color': '#FC6C6C',
      'white-color': '#FAEDE5',
    },
    animation: {
      'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
    },
    keyframes: {
      'shake': {
        '10%, 90%': {
          transform: 'translate3d(-1px, 0, 0)',
        },
        '20%, 80%': {
          transform: 'translate3d(2px, 0, 0)',
        },
        '30%, 50%, 70%': {
          transform: 'translate3d(-4px, 0, 0)',
        },
        '40%, 60%': {
          transform: 'translate3d(4px, 0, 0)',
        },
      },
    },
  },
  // tailwind.config.js
  plugins: [require('daisyui'), require('tailwindcss-animated')],
}
