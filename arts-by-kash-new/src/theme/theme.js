import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.softBrown,
    },

    secondary: {
      main: colors.gold,
    },

    background: {
      default: colors.ivory,
    },

    text: {
      primary: colors.charcoal,
    },
  },

  typography: {
    fontFamily: `"Poppins", sans-serif`,

    h1: {
      fontSize: "4rem",
      fontWeight: 600,
    },

    h2: {
      fontSize: "3rem",
      fontWeight: 600,
    },

    h3: {
      fontSize: "2rem",
      fontWeight: 500,
    },

    body1: {
      fontSize: "1rem",
      lineHeight: 1.8,
    },
  },
});

export default theme;