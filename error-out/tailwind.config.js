/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'coder-dark': '#0f0f0f',
        'coder-green': '#00ff00',
        'coder-blue': '#00bfff',
        'coder-gray': '#333333',
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}