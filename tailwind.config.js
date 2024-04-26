/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'urbanist' : ['Urbanist', 'sans-serif']
      },
      colors: {
        'cardinal' : "#FF4A4E",
        'paper' : "#FDFDFD",
        'paper-2' : "#F0F1F7",
        'paper-3' : "#93979C",
        'paper-6' : "#1B1B1B",
      }
    },
  },
  plugins: [],
}