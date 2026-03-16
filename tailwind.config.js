/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        romantic: ["Playfair Display", "serif"],
        ui: ["Inter", "sans-serif"],
        terminal: ["JetBrains Mono", "monospace"],
        beau: ["Beau Rivage"],
      },
    },
  },
  plugins: [],
}