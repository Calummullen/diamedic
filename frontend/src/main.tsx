import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Footer } from "./components/landing-page/footer.tsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://42231ab544fde6e083d1a7698e6edea0@o4508803230269440.ingest.de.sentry.io/4508805836046416",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of transactions
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% session sampling
  replaysOnErrorSampleRate: 1.0, // 100% sampling on error
});

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <div className="flex flex-col min-h-screen">
    <ThemeProvider theme={theme}>
      <StrictMode>
        <Analytics />
        <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
          <App />
        </Sentry.ErrorBoundary>
        <Footer />
      </StrictMode>
    </ThemeProvider>
  </div>
);
