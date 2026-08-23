import { createTheme } from "@mui/material/styles";

export function createAppTheme(mode: "light" | "dark") {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? "#0d3b66" : "#4d8fd1",
        dark: isLight ? "#082845" : "#2c5f94",
        light: isLight ? "#3f6ca0" : "#79b0e6",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#ef6c00",
        dark: "#b53d00",
        light: "#ff9d3f",
        contrastText: "#ffffff",
      },
      background: isLight
        ? { default: "#f4f6f9", paper: "#ffffff" }
        : { default: "#0e1726", paper: "#16223a" },
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
}
