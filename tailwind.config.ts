import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brandCream: '#F4F0EA',
        brandTerracotta: '#B55D3B',
        brandSage: '#7A7A59',
        brandCharcoal: '#2D2A27',
        brandTaupe: '#B6A799',
        brandChocolate: '#3D261C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        porchside: {
          "primary": "#B55D3B",       // Maps brandTerracotta to main buttons
          "secondary": "#7A7A59",     // Maps brandSage
          "accent": "#3D261C",        // Maps brandChocolate
          "neutral": "#2D2A27",       // Maps brandCharcoal
          "base-100": "#F4F0EA",      // Maps brandCream as global page background
          "info": "#B6A799",          // Maps brandTaupe
        },
      },
    ],
  },
} satisfies Config;