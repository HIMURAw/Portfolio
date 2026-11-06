// Derleme anında sayfayı HTML'e çizer (arama motorları ve JavaScript çalıştırmayan yapay zekâ botları için).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { DILLER, EPOSTA, GITHUB, PROFILLER, PROJELER, SITE, SSS, type Dil } from "./icerik";

export function render(dil: Dil) {
  return renderToString(
    <StrictMode>
      <App ilk={dil} />
    </StrictMode>
  );
}

export { DILLER, EPOSTA, GITHUB, PROFILLER, PROJELER, SITE, SSS };
