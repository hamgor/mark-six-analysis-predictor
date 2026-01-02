/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			mono: ['VT323', 'monospace'],
        sans: ['Inter', 'sans-serif'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
        'matrix-green': '#00FF41',
        'matrix-dark': '#003B00',
        'matrix-dim': '#008F11',
        'console-bg': '#0D0208',
  			primary: {
  				DEFAULT: '#00FF41',
  				foreground: '#0D0208'
  			},
  			border: '#008F11',
  			card: {
  				DEFAULT: '#001A00',
  				foreground: '#00FF41'
  			},
  		},
      keyframes: {
        'phosphor-flicker': {
          '0%, 100%': { opacity: '1' },
          '33%': { opacity: '0.98' },
          '66%': { opacity: '0.99' },
          '77%': { opacity: '0.97' },
        },
        'screen-shake': {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-1px,-1px)' },
          '20%': { transform: 'translate(1px,0)' },
          '30%': { transform: 'translate(-1px,1px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'matrix-scroll': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 1000px' },
        },
        'radar-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'phosphor-flicker': 'phosphor-flicker 0.15s infinite',
        'screen-shake': 'screen-shake 0.5s infinite',
        scanline: 'scanline 6s linear infinite',
        'matrix-scroll': 'matrix-scroll 20s linear infinite',
        'radar-spin': 'radar-spin 4s linear infinite',
        marquee: 'marquee 30s linear infinite',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}