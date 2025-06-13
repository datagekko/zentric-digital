/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from branding.mdc
        'iris-purple': '#635BFF',
        'iris-purple-light': '#7A6CFF',
        'mint-green': '#53DD6C',
        'mint-green-dark': '#38C958',
        'nordic-ivory': '#F5F0EA',
        'ivory-background': '#e8e8e6',
        'onyx': '#262627',
        'deep-navy': '#0A2540',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sf-mono': ['SF Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['96px', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h2': ['56px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h3': ['32px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0' }],
        'kpi': ['20px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.08em', textTransform: 'uppercase' }],
        'body': ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'micro': ['14px', { lineHeight: '1.4', fontWeight: '500', textTransform: 'uppercase' }],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #635BFF, #7A6CFF)',
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0,0,0,0.18)',
        'text': '0 1px 3px rgba(0,0,0,0.65)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      spacing: {
        'section': '10vh',
      },
    },
  },
  plugins: [],
} 