/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        law: {
          navy: "#002147",
          gold: "#C5A028",
          goldLight: "#E5C158",
          dark: "#0F172A",
          slate: "#1E293B",
          anthracite: "#2D2E2E",
          silver: "#E2E8F0"
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C5A028 0%, #E5C158 100%)',
      }
    },
  },
  plugins: [],
}
