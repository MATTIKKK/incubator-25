/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0088cc',
          light: '#54a9eb',
          dark: '#006bb3',
        },
        bg: {
          light: '#ffffff',
          dark: '#212121',
          secondary: {
            light: '#f4f4f5',
            dark: '#2c2c2c',
          }
        },
        text: {
          light: {
            primary: '#000000',
            secondary: '#707579',
          },
          dark: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
          }
        },
        border: {
          light: '#e4e4e7',
          dark: '#393939',
        },
        message: {
          out: {
            light: '#effdde',
            dark: '#2B5278',
          },
          in: {
            light: '#ffffff',
            dark: '#333333',
          }
        }
      },
      boxShadow: {
        'message': '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'typing': 'typing 1.5s infinite',
      },
      keyframes: {
        typing: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.9 },
        }
      }
    },
  },
  plugins: [],
};