/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#131313',
        primary: '#ffffff',
        'on-background': '#e2e2e2',
        surface: '#131313',
        'surface-container': '#1f1f1f',
        'surface-container-low': '#1b1b1b',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353535',
        outline: '#8e9192',
        'outline-variant': '#444748',
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
      spacing: {
        gutter: '0px',
        'stroke-width': '1px',
        'grid-unit': '8px',
        'margin-edge': '40px',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['120px', { lineHeight: '100px', letterSpacing: '-0.05em', fontWeight: '800' }],
        'display-lg': ['64px', { lineHeight: '60px', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg-mobile': ['48px', { lineHeight: '44px', letterSpacing: '-0.04em', fontWeight: '700' }],
        'headline-md': ['32px', { lineHeight: '36px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'system-mono': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '500' }],
        'label-mono-sm': ['10px', { lineHeight: '12px', letterSpacing: '0.1em', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
