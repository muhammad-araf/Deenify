    // tailwind.config.js
    module.exports = {
      content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
      ],
      plugins: [
        require('tailwind-scrollbar-hide'),
      ],
    };