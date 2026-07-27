/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        surface: "#F9F9F9",
        charcoal: "#1F1F1F",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C564",
          dark: "#B38F23"
        },
        sage: {
          DEFAULT: "#9CAF88",
          light: "#B8C7A9",
          dark: "#7A8F67"
        },
        cream: "#F5F3EF",
        muted: "#71717A"
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(31, 31, 31, 0.05)',
        'elevated': '0 20px 40px -15px rgba(31, 31, 31, 0.1)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)'
      }
    },
  },
  plugins: [],
}
