const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-themer")({
      defaultTheme: {
        extend: {
          fontFamily: {
            OpenSans: ["Open Sans", ...defaultTheme.fontFamily.sans],
            Lemon: ["Lemon", ...defaultTheme.fontFamily.sans],
          },
          backgroundColor: {
            primary: colors.white,
            secondary: colors.gray[100],
          },
          colors: {
            primary: colors.slate[900],
            secondary: colors.gray[400],
            tertiary: colors.gray[200],
            accent1: colors.purple[500],
            accent2: colors.indigo[500],
            accent3: colors.fuchsia[500],
          },
        },
      },
      themes: [
        {
          name: "darkTheme",
          extend: {
            fontFamily: {
              OpenSans: ["Open Sans", ...defaultTheme.fontFamily.sans],
              Lemon: ["Lemon", ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: {
              primary: colors.gray[800],
              secondary: colors.gray[900],
            },
            colors: {
              primary: colors.white,
              secondary: colors.gray[200],
              tertiary: colors.gray[900],
              accent1: colors.purple[500],
              accent2: colors.indigo[500],
              accent3: colors.fuchsia[500],
            },
          },
        },
      ],
    }),
  ],
};
