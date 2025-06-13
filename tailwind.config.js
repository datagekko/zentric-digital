/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			'iris-purple': '#635BFF',
  			'iris-purple-light': '#7A6CFF',
  			'mint-green': '#53DD6C',
  			'mint-green-dark': '#38C958',
  			'nordic-ivory': '#F5F0EA',
  			'ivory-background': '#e8e8e6',
  			onyx: '#262627',
  			'deep-navy': '#0A2540',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			],
  			'sf-mono': [
  				'SF Mono',
  				'monospace'
  			]
  		},
  		fontSize: {
  			hero: [
  				'96px',
  				{
  					lineHeight: '1',
  					fontWeight: '800',
  					letterSpacing: '-0.02em'
  				}
  			],
  			h2: [
  				'56px',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700',
  					letterSpacing: '-0.01em'
  				}
  			],
  			h3: [
  				'32px',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600',
  					letterSpacing: '0'
  				}
  			],
  			kpi: [
  				'20px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '500',
  					letterSpacing: '0.08em',
  					textTransform: 'uppercase'
  				}
  			],
  			body: [
  				'18px',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			micro: [
  				'14px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '500',
  					textTransform: 'uppercase'
  				}
  			]
  		},
  		backgroundImage: {
  			'gradient-primary': 'linear-gradient(to right, #635BFF, #7A6CFF)'
  		},
  		boxShadow: {
  			glass: '0 4px 24px rgba(0,0,0,0.18)',
  			text: '0 1px 3px rgba(0,0,0,0.65)'
  		},
  		backdropBlur: {
  			glass: '16px'
  		},
  		spacing: {
  			section: '10vh'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} 