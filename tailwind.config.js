/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        100: "#ffdb0d",
        200: "#e8b10c",
        300: "#ffa500",
        400: "#e8810c",
        500: "#ff6b0d",
      },

      secondary: {
        100: "#a6a6a6",
        200: "#8c8c8c",
        300: "#737373",
        400: "#595959",
        500: "#404040",
      },

      background: "#404040",

      white: "#FFFFFF",
      black: "#000000",
    },
  },
  plugins: [],
};
