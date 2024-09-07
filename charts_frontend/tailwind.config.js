/** @type {import('tailwindcss').Config} */
module.exports = {
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
        vibrantBlue: '#1D4ED8',
        vibrantGreen: '#10B981',
        vibrantRed: '#EF4444',
        vibrantOrange: '#F97316',
      },
    },
  },
  plugins: [],
};
