import type { Config } from 'tailwindcss';
const daisyui = require('daisyui');

const config: Config = {
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
          "primary": "#B55D3B",
          "primary-content": "#ffffff",
          "secondary": "#7A7A59",
          "secondary-content": "#ffffff",
          "accent": "#3D261C",
          "accent-content": "#ffffff",
          "neutral": "#2D2A27",
          "neutral-content": "#ffffff",
          "base-100": "#F4F0EA",
          "base-content": "#2D2A27",
          "info": "#B6A799",
          "info-content": "#ffffff",
          "success": "#7A7A59",
          "success-content": "#ffffff",
          "warning": "#B6A799",
          "warning-content": "#2D2A27",
          "error": "#B55D3B",
          "error-content": "#ffffff",
        },
      },
    ],
  },
};

export default config;