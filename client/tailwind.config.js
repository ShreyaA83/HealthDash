/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(90deg, rgba(16,15,21,1) 0%, rgba(32,32,36,1) 46%, rgba(16,15,21,1) 100%)',
        // 'custom-gradient': ' linear-gradient(90deg, rgba(251,255,239,1) 14%, rgba(239,248,255,1) 40%, rgba(237,252,255,1) 60%, rgba(253,255,255,1) 77%)',

      }),
      boxShadow: theme => ({
        'outline-shadow': '0 0 10px rgba(191, 169, 217, 0.99)', // Adjust the values as needed
      }),
      spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'primary': {
          light: '#E0E0E0',
          DEFAULT: '#BDBDBD',
          dark: '#616161',
        },
        'secondary': {
          light: '#FFECB3',
          DEFAULT: '#FFC107',
          dark: '#FFA000',
        },
      },
    },
  },
  plugins: [],
}
