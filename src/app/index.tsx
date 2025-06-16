import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import '@app/providers/i18n/i18n.ts'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
