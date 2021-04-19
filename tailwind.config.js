module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gumroad: {
          teal: '#36a9ae',
        },
      },
    },
  },
  corePlugins: {
    // If tailwind conflicts with your existing styles, try set `preflight`
    // to false to disable tailwind css reset.
    // See: https://tailwindcss.com/docs/preflight#disabling-preflight
    preflight: true,
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
