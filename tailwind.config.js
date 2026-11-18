/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        yahoo: {
          50: '#f6f1fd',
          100: '#ede3fb',
          200: '#dcc6f7',
          300: '#c59ff1',
          400: '#a76fe7',
          500: '#8a40db',
          600: '#6001d2', // Signature Yahoo Purple
          700: '#5200b3',
          800: '#430094',
          900: '#360076',
          950: '#23004d',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'yahoo': '0 4px 20px -2px rgba(96, 1, 210, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.06)',
        'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
        'floating': '0 10px 30px rgba(0,0,0,0.18)',
      }
    },
  },
  plugins: [],
}
