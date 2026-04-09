/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        'bg-deep':    '#05070F',
        'bg-mid':     '#05070F',
        'bg-raised':  '#08090F',
        // Panel colors
        'panel':      '#080C15',
        'panel-alt':  '#0A0C14',
        'panel-deep': '#0C1018',
        // Text
        'text-primary':   '#E6EEF8',
        'text-secondary': '#94A3B8',
        'text-muted':     '#64748B',
        'text-ghost':     '#4A5568',
        // Accents
        'accent-blue':   '#4F7CFF',
        'accent-cyan':   '#22D3EE',
        'accent-violet': '#8B5CF6',
        // Semantic
        'status-success':  '#10B981',
        'status-warning':  '#F59E0B',
        'status-critical': '#EF4444',
        // Borders
        'border-subtle': '#1E293B',
        'border-mid':    '#2D3748',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-subtle': `
          linear-gradient(rgba(79,124,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,124,255,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'glow-blue':  '0 0 20px rgba(79,124,255,0.25)',
        'glow-cyan':  '0 0 20px rgba(34,211,238,0.25)',
        'glow-sm-blue': '0 0 8px rgba(79,124,255,0.4)',
        'glow-sm-cyan': '0 0 8px rgba(34,211,238,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}