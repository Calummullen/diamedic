import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="relative bg-blue-400 text-white pt-6 clip-diagonal-right h-[250px]">
      <div className="flex flex-col items-center justify-center font-macondo">
        <div className="font-bold text-8xl flex items-center justify-center">
          Dia<span className="text-blue-700">medic</span>
        </div>
        <div className="text-xl">Emergency Info in Seconds</div>
      </div>
    </div>

    <App />
  </StrictMode>
);
