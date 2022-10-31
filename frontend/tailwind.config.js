/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        osuc: {
          bluegreen: '#96e6d7',
          munsell: '#3f90a9',
          navyblue: '#0073de',
          bluedark: '#272e91',
          black: {
            1: '#2e3440',
            2: '#3b4252',
            3: '#434c5e',
            4: '#4c566a',
          },
          white: {
            DEFAULT: '#fdfbf7',
            1: '#f2f4f8',
            2: '#e5e9f0',
            3: '#d8dee9',
            4: '#c1c8d7',
          },
          blue: '#5e81ac',
          yellow: '#ebcb8b',
          red: '#bf616a',
          header: '#3b4252',
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/typography'),
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
  ],
};
