// Tek sayfa: kapak, çalışmalar, neler yaparım, iletişim. Kâğıda yapıştırılmış etiketler ve kalem çizimleri.
import { Fragment, useEffect, useState, type CSSProperties, type ReactElement } from "react";
import { ARACLAR, DILLER, EPOSTA, GITHUB, INSTAGRAM, LINKEDIN, ISLER, METIN, PROJELER, SERTIFIKALAR, SSS, YOL, type Dil, type Is, type Parca, type Proje } from "./icerik";

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
const Etiket = ({ parca, gulen, derece, id }: { parca: Parca; gulen?: boolean; derece: number; id?: string }) => (
  <h2 className="etiket" style={egim(derece)} id={id}>
    <span className="etiket-ic">
      {parca.map(([y, kalin], i) => (
        <Fragment key={i}>{i > 0 && " "}{kalin ? <b>{y}</b> : <span>{y}</span>}</Fragment>
      ))}
      {gulen && <Gulen />}
    </span>
  </h2>
);

// Afiş: duvara bantla yapıştırılmış basılı kâğıt. Ekran görüntüsü kâğıda mürekkeple basılmış gibi (gri + çarpma);
// üstüne gelince gerçek renkleri döner. Proje adı, harf sayısına göre afişin genişliğini tam doldurur.
const EGIM = [-1.6, 1.2, 0.9, -1.1];
const Afis = ({ p, i, dil }: { p: Proje; i: number; dil: Dil }) => {
  const dis = !p.url.startsWith("/");
  const a = p.afis;
  return (
    <li className="afis-kutu">
      <a className="afis" href={p.url} target={dis ? "_blank" : undefined} rel="noopener" style={{ ...egim(EGIM[i % 4]), ["--n" as string]: p.ad.length } as CSSProperties}
        aria-describedby={`afis-${i}`}>
        <span className="bant bant-sol" aria-hidden="true" />
        <span className="bant bant-sag" aria-hidden="true" />
        <span className="afis-ust"><span>{p.tur[dil]}</span><span>{p.durum[dil]}</span></span>
        <span className="afis-ad" lang="en">{p.ad}</span>
        <span className={`afis-gorsel ${a.tur}`}>
          {a.tur === "genis" && <img src={a.src} alt={p.alt[dil]} width={a.w} height={a.h} loading="lazy" />}
          {a.tur === "telefonlar" && a.srcler.map((s, k) => <img key={s} src={s} alt={k === 0 ? p.alt[dil] : ""} width={390} height={780} loading="lazy" />)}
          {a.tur === "masaustu" && <>
            <img src={a.pencere} alt={p.alt[dil]} width={1100} height={671} loading="lazy" />
            <img className="dock" src={a.dock} alt="" width={1100} height={162} loading="lazy" />
          </>}
        </span>
        <span className="afis-alt"><span>{p.teknik}</span><span className="afis-url">{p.etiket}</span></span>
      </a>
      <div className="afis-aciklama" id={`afis-${i}`}>
        <Yildiz />
        <div>
          <p>{p.kisa[dil]}</p>
          <small>{p.bagNot[dil]}</small>
        </div>
      </div>
    </li>
  );
};

// Dil adresten gelir: / Türkçe, /en/, /es/, /zh/, /hi/, /ar/. Her dil ayrı, önceden çizilmiş bir sayfa (arama
// motorları ve JavaScript çalıştırmayan yapay zekâ botları hepsini okur).
function adrestenDil(): Dil {
  if (typeof location === "undefined") return "tr";
  const k = location.pathname.split("/")[1];
  return (DILLER.find(d => d.kod === k && d.kod !== "tr")?.kod) ?? "tr";
}

// Dil menüsü: JavaScript'siz de çalışır (details/summary); her dil kendi adıyla ve kendi dilinde yazılı.
const DilMenusu = ({ dil, etiket }: { dil: Dil; etiket: string }) => (
  <details className="dil">
    <summary aria-label={etiket}>{dil.toUpperCase()}<span aria-hidden="true"> ▾</span></summary>
    <ul>
      {DILLER.map(d => (
        <li key={d.kod}>
          <a href={d.yol} hrefLang={d.hreflang} lang={d.hreflang} aria-current={d.kod === dil ? "page" : undefined}>{d.ad}</a>
        </li>
      ))}
    </ul>
  </details>
);

export default function App({ ilk }: { ilk?: Dil }) {
  const [dil] = useState<Dil>(() => ilk ?? adrestenDil());
  const m = METIN[dil];
  const [kopya, setKopya] = useState(false);
  const kopyala = () => {
    navigator.clipboard?.writeText(EPOSTA).then(() => { setKopya(true); setTimeout(() => setKopya(false), 2000); });
  };

  // Bölümler ekrana girdikçe etiketler kâğıda "yapıştırılır".
  useEffect(() => {
    const g = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("gorundu"); g.unobserve(e.target); } }),
      { threshold: 0, rootMargin: "0px 0px -25% 0px" }
    );
    document.querySelectorAll(".bolum").forEach(b => g.observe(b));
    return () => g.disconnect();
  }, []);

  return (
    <>
      <a className="atla" href="#icerik">{m.atla}</a>
      <header className="ust">
        <p className="ust-yazi">{m.ust1}<br /><u>{m.ust2}</u></p>
        <DilMenusu dil={dil} etiket={m.dilMenu} />
      </header>

      <main id="icerik">
        <section className="bolum kapak">
          <h1 className="isim">
            <span className="etiket buyuk bir" style={egim(-9)}><span className="etiket-ic"><Gulen /><b>Umut</b></span></span>{" "}
            <Ok />
            <span className="etiket buyuk iki" style={egim(8)}><span className="etiket-ic"><span>Öztürk</span></span></span>
          </h1>
          <div className="kapak-alt">
            <p>{m.kisa}</p>
            <a href="#iletisim">{m.yazDugme} ↓</a>
            <small>{m.yazNot}</small>
          </div>
          <figure className="foto kapak-foto">
            <img src="/foto/umut-ozturk.webp" alt={m.fotoAlt} width={900} height={1200} fetchPriority="high" />
          </figure>
        </section>

        <section className="bolum calisma" id="calismalar">
          <div className="calisma-bas">
            <Etiket parca={m.calismalar} gulen derece={-4} />
            <p className="ben">{m.ben}</p>
          </div>
          <ul className="duvar">
            {PROJELER.map((p, k) => <Afis key={p.ad} p={p} i={k} dil={dil} />)}
          </ul>
          <p className="duvar-ipucu">{m.afisIpucu}</p>
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

        <section className="bolum yol">
          <Etiket parca={m.yol} derece={3} />
          <ol className="yol-liste">
            {YOL.map(y => (
              <li key={y.baslik.tr}>
                <span className="yol-zaman">{y.zaman[dil]}</span>
                <div>
                  <h3>{y.baslik[dil]}</h3>
                  <p>{y.alt[dil]}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="yol-alt">
            <div>
              <h3>{m.sertifikaBaslik}</h3>
              <ul className="sertifikalar">
                {SERTIFIKALAR.map(c => <li key={c.dosya}><a href={encodeURI(c.dosya)} target="_blank" rel="noopener">{c.ad[dil]}</a></li>)}
              </ul>
              <small>{m.sertifikaNot}</small>
            </div>
            <div>
              <h3>{m.araclarBaslik}</h3>
              <p className="araclar">{ARACLAR}</p>
            </div>
          </div>
        </section>

        <section className="bolum sss" aria-labelledby="sss-baslik">
          <Etiket parca={m.sss} derece={-2} id="sss-baslik" />
          <dl className="sss-liste">
            {SSS.map(x => (
              <div key={x.s.tr}>
                <dt>{x.s[dil]}</dt>
                <dd>{x.c[dil]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bolum iletisim" id="iletisim">
          <figure className="foto iletisim-foto">
            <img src="/foto/umut-ozturk-portre.webp" alt="Umut Öztürk" width={760} height={1013} loading="lazy" />
          </figure>
          <div className="iletisim-sag">
            <p className="iletisim-metin">{m.iletisimMetin}</p>
            <ul className="baglantilar">
              <li>
                <a href={`mailto:${EPOSTA}`} lang="en">{EPOSTA}</a>
                <button type="button" className="kopyala" onClick={kopyala} aria-live="polite">{kopya ? m.kopyalandi : m.kopyala}</button>
                <small>{m.epostaNot}</small>
              </li>
              <li><a href={GITHUB} target="_blank" rel="me noopener" lang="en">github.com/HIMURAw</a></li>
              <li><a href={LINKEDIN} target="_blank" rel="me noopener" lang="en">linkedin.com/in/umutttt</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="me noopener" lang="en">instagram.com/umut.ozturk0_</a></li>
              <li><a href="/cv/CV.docx" download>{m.cv}</a></li>
            </ul>
            <Etiket parca={m.iletisim} derece={-5} />
          </div>
        </section>
      </main>

      <footer className="alt">
        <span>© {new Date().getFullYear()} Umut Öztürk</span>
        <span>{m.alt}</span>
        <a href="#">{m.yukari} ↑</a>
      </footer>
    </>
  );
}
