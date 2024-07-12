/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(16,15,21,1) 0%, rgba(32,32,36,1) 46%, rgba(16,15,21,1) 100%)',
      },  
      boxShadow: {
        'outline-shadow': '0 0 10px rgba(191, 169, 217, 99)', // Adjust the values as needed
      },
    },
  },
  plugins: [],
};
