import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: { fontFamily: `"Montserrat", sans-serif` },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <div className="relative bg-main-blue text-white pt-6 clip-diagonal-right-mobile h-[250px]">
        <div className="flex flex-col items-center justify-center font-macondo">
          <div className="font-bold text-8xl flex items-center justify-center">
            Dia<span className="text-blue-300">medic</span>
          </div>
          <div className="text-xl">Emergency Info in Seconds</div>
        </div>
      </div>

      <App />
    </StrictMode>
  </ThemeProvider>
);
