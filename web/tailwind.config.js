/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        zkml: '1100px'
      },
      colors: {
          dark_111: "#14202B",
          dark_222: "#1C2733",
          dark_333: "#283340",
          dark_444: "#3A444C",
          dark_555: "#5B7083",
          dark_666: "#8899A6",
          dark_777: "#EBEEF0",
          dark_888: "#F7F9FA",
          blue: "#1DA1F2",
          white: "#FFFFFF",
          black: "#0F1419",
      }
    },
  },
  plugins: [],
}