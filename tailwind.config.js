/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        md: "3rem",
        lg: "3rem",
        xl: "1rem",
        "2xl": "6rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
