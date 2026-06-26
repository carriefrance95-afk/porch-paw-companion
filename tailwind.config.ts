import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: '#B55D3B',
        indigo: '#2D2A27',
        blue: '#7A7A59',
        brandCream: '#F4F0EA',
        brandTerracotta: '#B55D3B',
        brandSage: '#7A7A59',
        brandCharcoal: '#2D2A27',
        brandTaupe: '#B6A799',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
} satisfies Config;