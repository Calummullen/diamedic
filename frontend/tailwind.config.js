/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
