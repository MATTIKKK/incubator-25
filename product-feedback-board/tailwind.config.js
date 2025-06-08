/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Category colors
    'bg-blue-100', 'text-blue-800', 'ring-blue-300', 'dark:bg-blue-900/30', 'dark:text-blue-300', 'dark:ring-blue-600',
    'bg-green-100', 'text-green-800', 'ring-green-300', 'dark:bg-green-900/30', 'dark:text-green-300', 'dark:ring-green-600',
    'bg-purple-100', 'text-purple-800', 'ring-purple-300', 'dark:bg-purple-900/30', 'dark:text-purple-300', 'dark:ring-purple-600',
    'bg-orange-100', 'text-orange-800', 'ring-orange-300', 'dark:bg-orange-900/30', 'dark:text-orange-300', 'dark:ring-orange-600',
    'bg-gray-100', 'text-gray-800', 'ring-gray-300', 'dark:bg-gray-900/30', 'dark:text-gray-300', 'dark:ring-gray-600',
  ],
};