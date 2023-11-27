/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}",
],
mode: "jit",
  theme: {
    extend: {
      colors: {
        lime1:"#B5CC22",
        lime2:"#677510",
        boxcolor:"#F6F6F6",
        linecolor:"#EBEBEB",
       
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

