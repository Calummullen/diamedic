import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <Analytics />
      {/* <div className="relative bg-main-blue text-white lg:pt-6 clip-diagonal-right-mobile h-[450px] lg:h-[250px] ">
        <div className="flex flex-col items-center justify-center font-macondo ">
          <div className="font-bold text-[10rem] lg:text-8xl flex items-center justify-center">
            Dia<span className="text-blue-300">medic</span>
          </div>
          <div className="text-4xl lg:text-xl">Emergency Info in Seconds</div>
        </div>
      </div> */}
      <App />
    </StrictMode>
  </ThemeProvider>
);
