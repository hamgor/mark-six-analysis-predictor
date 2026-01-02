/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			mono: ['VT323', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
        'cyber-navy': '#0A0F2B',
        'cyber-neon': '#00D4FF',
        'cyber-sapphire': '#1E3A8A',
        'cyber-ice': '#A5F3FC',
        'cyber-accent': '#7000FF',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  		},
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)', opacity: '1' },
          '25%': { transform: 'translate(-1px, 1px)', opacity: '0.8' },
          '50%': { transform: 'translate(1px, -1px)', opacity: '1' },
          '75%': { transform: 'translate(-1px, -1px)', opacity: '0.9' },
          '100%': { transform: 'translate(0)', opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      animation: {
        glitch: 'glitch 0.5s ease-in-out infinite',
        scanline: 'scanline 4s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}