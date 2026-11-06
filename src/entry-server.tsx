// Derleme anında sayfayı HTML'e çizer (arama motorları ve JavaScript çalıştırmayan yapay zekâ botları için).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { EPOSTA, PROJELER, SITE, type Dil } from "./icerik";

export function render(dil: Dil) {
  return renderToString(
    <StrictMode>
      <App ilk={dil} />
    </StrictMode>
  );
}

export { EPOSTA, PROJELER, SITE };
