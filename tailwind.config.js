const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
//const x = require('./src/app/')


module.exports = {
  content: [
    './src/app/pages/**/*.{html,js,ts,scss}',
    './src/app/shared/**/*.{html,js,ts,scss}',
    './src/app/layouts/**/*.{html,js,ts,scss}',
    './src/index.html',
    './src/styles.scss'
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
        // themePrimary:  colors.orange[100],
        // themeSecondary: colors.orange[200],
        // themeTertiary:colors.orange[300]

        "primary": {
          "50": "#3384cf",
          "100": "#297ac5",
          "200": "#1f70bb",
          "300": "#1566b1",
          "400": "#0b5ca7",
          "500": "#01529d",
          "600": "#004893",
          "700": "#003e89",
          "800": "#00347f",
          "900": "#002a75"
        }
      },

    },
  },
  mode: 'aot',
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
