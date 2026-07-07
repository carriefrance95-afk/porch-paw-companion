import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandCream: '#F4F0EA',
        brandChocolate: '#2D2A27',
        brandCharcoal: '#2D2A27',
        brandTerracotta: '#B55D3B',
        brandSage: '#7A7A59',
        brandTaupe: '#B6A799',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#B55D3B",
          "secondary": "#7A7A59",
          "accent": "#B6A799",
          "neutral": "#2D2A27",
          "base-100": "#FDFBF7",
          "info": "#7A7A59",
          "success": "#7A7A59",
          "warning": "#B6A799",
          "error": "#B55D3B",
        },
      },
    ],
  },
} satisfies any;

export default config;
