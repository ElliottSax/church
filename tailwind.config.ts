import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Anchored on the real Community of Christ world-church brand
        // (pulled directly from cofchrist.org's live CSS).
        primary: {
          50: '#e6f2fa',
          100: '#cce5f5',
          200: '#99cbeb',
          300: '#66b1e0',
          400: '#3397d6',
          500: '#0075C9',
          600: '#0068b3',
          700: '#004D71',
          800: '#003a56',
          900: '#0B2D3F',
          950: '#061a25',
        },
        secondary: {
          50: '#f7f7f7',
          100: '#EDEDED',
          200: '#EBEBEB',
          300: '#c7ccd3',
          400: '#a3aab5',
          500: '#728197',
          600: '#4A5464',
          700: '#3a424e',
          800: '#4B4B4B',
          900: '#2a2e33',
          950: '#0B2D3F',
        },
        accent: {
          50: '#FFF4D8',
          100: '#f7ecc9',
          200: '#eaddaf',
          300: '#dcc98f',
          400: '#D6C399',
          500: '#C5A96E',
          600: '#9C7A3C',
          700: '#7d6230',
          800: '#5f4a24',
          900: '#413218',
        },
      },
    },
  },
  plugins: [],
};

export default config;
