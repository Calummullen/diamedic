import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Footer } from "./components/landing-page/footer.tsx";

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <div className="flex flex-col min-h-screen">
    <ThemeProvider theme={theme}>
      <StrictMode>
        <Analytics />
        <App />
        <Footer />
      </StrictMode>
    </ThemeProvider>
  </div>
);
