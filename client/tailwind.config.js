/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '400': '400px',
        '600': '600px',
        '800': '800px',
      },
      fontSize: {
        '24px': '24px',
        '48px': '48px',
      },
      height: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
