/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#26A4DE",
        secondary: "#EAE8E8",
      },
    },
  },
  plugins: [],
};
