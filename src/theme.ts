import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d3b66",
      dark: "#082845",
      light: "#3f6ca0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ef6c00",
      dark: "#b53d00",
      light: "#ff9d3f",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f6f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
