/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'florlima-green': '#3d9970',
        'florlima-dark': '#0d0d0c',
        'florlima-text': '#6b7066',
        'florlima-border': '#e5e5e0',
      },
      boxShadow: {
        'florlima': '0 8px 24px rgba(61, 153, 112, 0.1)',
        'florlima-hover': '0 16px 48px rgba(61, 153, 112, 0.2)',
      }
    },
  },
  plugins: [],
}
