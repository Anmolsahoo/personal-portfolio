/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050608',
          900: '#0a0c10',
          850: '#0e1117',
          800: '#141822',
          700: '#1d2332',
          600: '#283044',
        },
        brand: {
          orange: {
            DEFAULT: '#ff5500',
            50: '#fff5ed',
            100: '#ffe8d5',
            200: '#ffd0aa',
            300: '#ffb074',
            400: '#ff863b',
            500: '#ff5500',
            600: '#e64400',
            700: '#b83200',
            800: '#942905',
            900: '#772408',
          },
          amber: '#ffaa00',
        }
      },
      backgroundImage: {
        'solar-radial': 'radial-gradient(circle at center, rgba(255, 85, 0, 0.4) 0%, rgba(255, 120, 0, 0.15) 35%, rgba(10, 12, 16, 0) 70%)',
        'solar-glow': 'radial-gradient(ellipse at 50% 0%, rgba(255, 85, 0, 0.35) 0%, rgba(255, 100, 0, 0.08) 50%, rgba(0, 0, 0, 0) 80%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'orange-gradient': 'linear-gradient(135deg, #ff6a00 0%, #ee3300 100%)',
      },
      boxShadow: {
        'solar': '0 0 50px -10px rgba(255, 85, 0, 0.5)',
        'solar-lg': '0 0 100px -15px rgba(255, 85, 0, 0.6)',
        'card-glow': '0 0 25px -5px rgba(255, 85, 0, 0.15)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
