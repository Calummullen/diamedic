/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        macondo: ["Macondo", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "main-blue": "#005EB8",
      },
    },
  },
  plugins: [],
};
