/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'light': 'rgb(255, 255, 255)',
        'dark': 'rgb(10, 10, 10)',
        'border-light': 'rgb(200, 200, 200)',
        'border-dark': 'rgb(100, 100, 100)',
        'navbar-light': 'rgba(255, 255, 255, 0.7)',
        'navbar-dark': 'rgba(10, 10, 10, 0.7)',
      },
      screens: {
        xs: '480px',
        xxs: '386px',
      },
    },
  },
  plugins: [],
};
