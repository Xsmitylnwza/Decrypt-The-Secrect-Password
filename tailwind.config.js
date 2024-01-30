/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'Saira': ['Saira Stencil One']
    },
    screens: {
      'mobile': '320px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
      fontFamily: {
        itim: "'Itim', cursive",
        istok: "'Istok Web', sans-serif"
      }
    },
  },
  plugins: [require("daisyui")],
}

