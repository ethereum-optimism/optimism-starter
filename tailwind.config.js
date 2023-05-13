/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: "350px",
      tablet: "960px",
      desktop: "1248px",
    },
    extend: {
      colors:
      {
        primary: '#81D4BF',
      }
    },
    fontSize: {
      "4xs": "11px",
      "3xs": "12px",
      "2xs": "13px",
      xs: "14px",
      sm: "15px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "72px",
      "2xl": "24px",
      "3xl": "28.8px",
      "4xl": "28px",
      "5xl": "30px",
      "6xl": "34px",
      "7xl": "36px",
      "8xl": "38.4px",
      "9xl": "38px",
      "10xl": "48px",
    },

    boxShadow: {
      sm: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      lg: "4px 4px 10px rgba(0,0,0,0.24), 2px 2px 4px rgba(0, 0, 0, 0.12),1px 2px 2px rgba(0, 0, 0, 0.12)",
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),

    // Or with a custom prefix:
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
  corePlugins: { preflight: false },
}

