/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '400': '400px',
        '600': '600px',
        '800': '800px',
      },
      fontSize: {
        '12px': '12px',
        '14px': '14px',
        '18px': '18px',
        '20px': '20px',
        '22px': '22px',
        '24px': '24px',
        '36px': '36px',
        '48px': '48px',
        '72px': '72px',
      },
      height: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
