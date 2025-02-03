import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray40: '#666666',
        silver: {
          light: '#d8d8d8'
        },
        gray: {
          light: '#C3C3C3',
          dark: '#222222',
          pastel: '#B6C1CE'
        },
        red: { 
          coral: '#F94C4A'
        },
        azureBlue: '#1F5FAD',
        notActive: '#CBDEF6',
        brightBlue: '#2F7CDA',
        mediumGray: '#6F6F6F',
        txt: {
          primary: ' #4D4D4D',
          secondary: '#123968',
          error: '#F00000'
        }
      },
      spacing: {
        formShort: 'calc(50% + 110px)',
      }
    },
  },
  plugins: [],
} satisfies Config;
