import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tv': '1920px',
      '4k': '3840px',
    },
    extend: {
      spacing: {
        'fluid-margin': 'clamp(1rem, 5vw, 4rem)',
        'fluid-padding': 'clamp(2rem, 8vw, 6rem)',
      },
      colors: {
        primary: "#00f0ff",
        secondary: "#a000ff",
        accent: "#ffd700",
        dark: "#000000",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)"],
        exo2: ["var(--font-exo2)"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
export default config;
