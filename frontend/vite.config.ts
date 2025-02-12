import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap({
    hostname: "https://www.diamedic.co.uk",
    dynamicRoutes: ["/:id"],
  }), sentryVitePlugin({
    org: "diamedic",
    project: "diamedic-frontend"
  })],

  build: {
    sourcemap: true
  }
});