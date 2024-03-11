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
        blackrgba: "rgba(0, 0, 0, 0.5)",
        textColor: {
          white: "#ffffff",
        },
      },
      boxShadow: {
        custom: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
