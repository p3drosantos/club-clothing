/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#212529",
        primaryLight: "#f8f9fa",
        primaryGray: "#6C757D",
        primaryInput: "#E9ECEF",
        textColor: {
          white: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
