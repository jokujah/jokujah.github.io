const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        rose: colors.rose,
       'light-blue': colors.sky,
        cyan: colors.cyan,
        sky: colors.sky,
        themePrimary:  colors.orange[100],
        themeSecondary: colors.orange[200],
        themeTertiary:colors.orange[300]
     },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
