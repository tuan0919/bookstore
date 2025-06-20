import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "~/theme.ts";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./providers";
import { AuthProvider } from "./context/AuthContext";
import './i18n';
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Providers>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Providers>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
