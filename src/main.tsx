import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import App from "./App.tsx";
import "./site.css";

// Sayfa derlemede önceden çizildi (scripts/onceden-ciz.mjs); burada sadece canlandırılıyor.
hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <App />
  </StrictMode>
);
