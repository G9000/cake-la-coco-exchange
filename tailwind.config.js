module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Exo 2"', "sans-serif"],
      mono: ['"Share Tech Mono"', "monospace"],
    },
    extend: {
      backgroundImage: {
        "grid-tile-light": "url('/grid-tiles-light.svg')",
        "grid-tile": "url('/grid-tiles.svg')",
      },
    },
  },
  plugins: [],
};
