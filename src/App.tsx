// Tek sayfa: kapak, çalışmalar, neler yaparım, iletişim. Kâğıda yapıştırılmış etiketler ve kalem çizimleri.
import { useEffect, useState, type CSSProperties, type ReactElement } from "react";
import { EPOSTA, ISLER, METIN, PROJELER, type Dil, type Is, type Parca } from "./icerik";

const Gulen = () => (
  <svg className="gulen" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="16.5" />
    <path className="goz" d="M14.5 16v2M25.5 16v2" />
    <path d="M12.5 23.5c2.2 3.4 5 5 7.6 5s5.3-1.6 7.4-5" />
  </svg>
);

const Yildiz = () => (
  <svg className="yildiz" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" />
  </svg>
);

// Kalemle çizilmiş, bir kez kıvrılan ok; sayfa açılınca çiziliyormuş gibi belirir.
const Ok = () => (
  <svg className="ok" viewBox="0 0 200 110" aria-hidden="true">
    <path className="ok-govde" pathLength={1} d="M6 8c22 30 40 46 52 70 8 16-6 30-16 20-9-9 2-28 22-30 40-4 78 14 112 26" />
    <path className="ok-uc" pathLength={1} d="M160 80l18 14-22 6" />
  </svg>
);

const IKON: Record<Is["ikon"], ReactElement> = {
  web: (
    <svg viewBox="0 0 64 64"><path d="M14 14h36a3 3 0 0 1 3 3v24H11V17a3 3 0 0 1 3-3z" /><path d="M5 41h54l-4 8H9z" /><path className="ince" d="M17 20h30M17 26h30M17 32h30M22 20v12M28 20v12M34 20v12M40 20v12" /></svg>
  ),
  mobil: (
    <svg viewBox="0 0 64 64"><rect x="19" y="6" width="26" height="52" rx="5" /><path d="M28 11h8" /><circle cx="32" cy="51" r="2" /><path className="ince" d="M24 20h16M24 26h11M24 32h14" /></svg>
  ),
  masaustu: (
    <svg viewBox="0 0 64 64"><path className="arka" d="M5 22v-3a2 2 0 0 1 2-2h3M5 22v27a2 2 0 0 0 2 2h40a2 2 0 0 0 2-2v-3" /><rect x="10" y="12" width="44" height="34" rx="2" /><path d="M10 19h44M43 15.5h1.5M47 15.5h1.5M51 15.5h.5" /><path className="ince" d="M16 27h16M16 33h22M16 39h12" /></svg>
  ),
  otomasyon: (
    <svg viewBox="0 0 64 64"><circle cx="16" cy="16" r="7" /><circle cx="48" cy="32" r="7" /><circle cx="16" cy="48" r="7" /><path d="M22.5 19l19 10M22.5 45l19-10" /><path className="ince" d="M13 16h6M16 13v6M45 32h6" /></svg>
  ),
};

const egim = (d: number) => ({ "--egim": `${d}deg` }) as CSSProperties;

// Çerçeveli, eğik etiket: kalın ve ince kelimeler sırayla.
const Etiket = ({ parca, gulen, derece }: { parca: Parca; gulen?: boolean; derece: number }) => (
  <h2 className="etiket" style={egim(derece)}>
    <span className="etiket-ic">
      {parca.map(([y, kalin], i) => (kalin ? <b key={i}>{y}</b> : <span key={i}>{y}</span>))}
      {gulen && <Gulen />}
    </span>
  </h2>
);

function ilkDil(): Dil {
  const kayitli = localStorage.getItem("dil");
  if (kayitli === "tr" || kayitli === "en") return kayitli;
  return navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
}

export default function App() {
  const [dil, setDil] = useState<Dil>(ilkDil);
  const m = METIN[dil];

  useEffect(() => {
    document.documentElement.lang = dil;
    localStorage.setItem("dil", dil);
  }, [dil]);

  // Bölümler ekrana girdikçe etiketler kâğıda "yapıştırılır".
  useEffect(() => {
    const g = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("gorundu"); g.unobserve(e.target); } }),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".bolum").forEach(b => g.observe(b));
    return () => g.disconnect();
  }, []);

  return (
    <>
      <header className="ust">
        <p className="ust-yazi">{m.ust1}<br /><u>{m.ust2}</u></p>
        <button className="dil" onClick={() => setDil(dil === "tr" ? "en" : "tr")} aria-label={m.dilAciklama}>
          {m.dil}
        </button>
      </header>

      <main>
        <section className="bolum kapak">
          <h1 className="isim">
            <span className="etiket buyuk bir" style={egim(-9)}><span className="etiket-ic"><Gulen /><b>Umut</b></span></span>
            <Ok />
            <span className="etiket buyuk iki" style={egim(8)}><span className="etiket-ic"><span>Öztürk</span></span></span>
          </h1>
          <div className="kapak-alt">
            <p>{m.kisa}</p>
            <a href="#iletisim">{m.yazDugme}</a>
            <small>{m.yazNot}</small>
          </div>
          <figure className="foto kapak-foto">
            <img src="/foto/kapak.webp" alt={dil === "tr" ? "Umut Öztürk, gece, boynunda kulaklık" : "Umut Öztürk at night, headphones around his neck"} width={900} height={1200} />
          </figure>
        </section>

        <section className="bolum calisma" id="calismalar">
          <figure className="foto calisma-foto">
            <img src="/foto/prokayit.webp" alt={dil === "tr" ? "Prokayit ana sayfası" : "Prokayit home page"} width={760} height={905} loading="lazy" />
          </figure>
          <div className="calisma-sag">
            <Etiket parca={m.calismalar} gulen derece={-4} />
            <p className="ben">{m.ben}</p>
            <ul className="projeler">
              {PROJELER.map(p => (
                <li key={p.ad}>
                  <Yildiz />
                  <div>
                    <h3 lang="en">{p.ad}</h3>
                    <p>{p.kisa[dil]}</p>
                    <a href={p.url} target={p.url.startsWith("/") ? undefined : "_blank"} rel="noopener">{p.etiket} ↗</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bolum yaptiklarim">
          <Etiket parca={m.yaptiklarim} derece={0} />
          <ul className="isler">
            {ISLER.map(i => (
              <li key={i.ikon}>
                <span className="ikon" aria-hidden="true">{IKON[i.ikon]}</span>
                <div>
                  <h3>{i.baslik[dil]}</h3>
                  <p>{i.alt[dil]}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bolum iletisim" id="iletisim">
          <figure className="foto iletisim-foto">
            <img src="/foto/iletisim.webp" alt="" width={760} height={1013} loading="lazy" />
          </figure>
          <div className="iletisim-sag">
            <ul className="baglantilar">
              <li>
                <a href={`mailto:${EPOSTA}`}>{EPOSTA}</a>
                <small>{m.epostaNot}</small>
              </li>
              <li><a href="https://github.com/HIMURAw" target="_blank" rel="noopener">github.com/HIMURAw</a></li>
              <li><a href="https://www.youtube.com/@komedigozlugu" target="_blank" rel="noopener">{m.kanal}</a></li>
              <li><a href="/cv/CV.docx" download>{m.cv}</a></li>
            </ul>
            <Etiket parca={m.iletisim} derece={-5} />
          </div>
        </section>
      </main>

      <footer className="alt">
        <span>© {new Date().getFullYear()} Umut Öztürk</span>
        <span>{m.alt}</span>
      </footer>
    </>
  );
}
