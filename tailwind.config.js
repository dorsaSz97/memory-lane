/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gaiaDisplay: 'var(--font-gaiaDisplay)',
      },
      gridTemplateColumns: {
        fluid: 'repeat(4, 1fr)',
      },
      colors: {
        primary: '#efeee9',
        dark: '#1f1e1a',
      },
      backgroundImage: {
        blob: "url('/blob.svg')",
      },
    },
  },
  plugins: [],
};
