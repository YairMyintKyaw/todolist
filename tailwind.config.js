/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: "Rubik",
      },
      colors: {
        primary: "#1d3557",
        secondary: "#f1faee",
        blueColor: "#91121d",
        redColor: "#e63946",
      },
    },
  },
  plugins: [],
};
