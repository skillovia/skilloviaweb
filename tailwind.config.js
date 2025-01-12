/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8FF15F',
        secondary: "#1A4D00",
        base: "#1A202C",
        dash:" #F3F4F6",
        text: "#171D14",
        gray:"#D0D5DD",
        off:"#F6FCEB",
        darkSec:"#0F150C",
        input:"#F0F6E6",
        book:"#FFEE87",
      },
    },
  },
  plugins: [],
}

