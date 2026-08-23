import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppLanguageProvider } from "./i18n/AppLanguageProvider.tsx";
import { AppThemeProvider } from "./theme/AppThemeProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppLanguageProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </AppLanguageProvider>
  </StrictMode>,
);
