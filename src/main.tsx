import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.ts";
import { AppLanguageProvider } from "./i18n/AppLanguageProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AppLanguageProvider>
        <App />
      </AppLanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
