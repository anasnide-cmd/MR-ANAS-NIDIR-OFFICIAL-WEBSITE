/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
  plugins: [],
}
