/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#313942',
        ghost: '#528cce',
        heading: '#e7ebf2',
      },
      animation: {
        'bounce-slow': 'bounce-up-down 0.7s ease-in-out infinite',
        spooky: 'spooky 2s alternate infinite linear',
      },
      keyframes: {
        'bounce-up-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        spooky: {
          from: {
            transform: 'translateY(0.15em) scaleY(0.95)',
          },
          to: {
            transform: 'translateY(-0.15em)',
          },
        },
      },
    },
  },
  plugins: [],
};
