/** @type {import('tailwindcss').Config} */
module.exports = {
  
  prefix: 'tw-',
  content: ["./pages/**/*.{tsx,js}",
            "./styles/**/*.{tsx,js}",
            "./components/**/*.{tsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { preflight: false}
}

