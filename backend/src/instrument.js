// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import { init, profiler, startSpan } from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

init({
  dsn: "https://98a96c7fed3a0fefc7123c0e48ab744e@o4508803230269440.ingest.de.sentry.io/4508803232694352",
  integrations: [nodeProfilingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
// Manually call startProfiler and stopProfiler
// to profile the code in between
profiler.startProfiler();

// Starts a transaction that will also be profiled
startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // the code executing inside the transaction will be wrapped in a span and profiled
  }
);

// Calls to stopProfiling are optional - if you don't stop the profiler, it will keep profiling
// your application until the process exits or stopProfiling is called.
profiler.stopProfiler();
