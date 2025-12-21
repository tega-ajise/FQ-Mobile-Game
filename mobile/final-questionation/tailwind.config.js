/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,ts,tsx}',
    './src/components/**/*.{js,ts,tsx}',
    'src/app/**/*.{js,jsx,ts,tsx}',
  ],

  // extend allows you to add more properties to tailwind classes (e.g. text-green-700 --> text-txt)
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        btnprimary: '#339933',
        btnsecondary: '#FF6633',
        accent: '#FFCC00',
        background: '#1C0F04',
        primary: '#FFF',
        secondary: '#7D4318',
        outline: '#9F9898',
      },
    },
  },
  plugins: [],
};
