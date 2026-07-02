/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          navy: '#0A192F',      // Deep timeless navy used for hero buttons/headers
          cream: '#FDFBF7',     // Soft editorial canvas page background
          gold: '#D4AF37',      // Subtle accents for high-end tags
          charcoal: '#1A1A1A'   // Premium text color for clean contrast
        }
      },
      fontFamily: {
        serif: ['Didot', 'Bodoni MT', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',       // Used to achieve widely tracked minimal hero text
      }
    },
  },
  plugins: [],
}
