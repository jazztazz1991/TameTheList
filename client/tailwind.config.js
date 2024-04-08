/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#6e57a5',
        'blue-light': '#92daf1',
      }
    },
  },
  plugins: [],
}

