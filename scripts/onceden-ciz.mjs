// Derlemeden sonra: / (Türkçe) ve /en/ (İngilizce) sayfalarını HTML olarak çizer, her birine kendi başlık,
// açıklama, canonical, hreflang ve yapılandırılmış verisini (JSON-LD) yazar. Sonra SSR klasörünü siler.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const kok = resolve(import.meta.dirname, "..");
const { render, PROJELER, EPOSTA, SITE } = await import(pathToFileURL(resolve(kok, "dist-ssr/entry-server.js")).href);
const sablon = readFileSync(resolve(kok, "dist/index.html"), "utf8");
const kac = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const META = {
  tr: {
    yol: "/", locale: "tr_TR", diger: "en_US",
    baslik: "Umut Öztürk — Full-stack geliştirici, Ankara",
    aciklama: "Umut Öztürk, Ankara'da 17 yaşında bir full-stack geliştirici. Prokayit (bakım firmaları için saha kayıt sistemi), Kapabil (YKS oyunu), kendi Linux masaüstü ortamı ve PIXEON: web, mobil ve masaüstü uygulamaları, yayına kadar.",
    is: "Full-stack geliştirici", okul: "Dikmen Meslek Lisesi",
    ogAlt: "Umut Öztürk: kâğıt zeminde eğik UMUT ve ÖZTÜRK etiketleri, yanında siyah-beyaz fotoğrafı",
  },
  en: {
    yol: "/en/", locale: "en_US", diger: "tr_TR",
    baslik: "Umut Öztürk — Full-stack developer, Ankara",
    aciklama: "Umut Öztürk is a 17-year-old full-stack developer in Ankara, Turkey. Prokayit (field records for maintenance companies), Kapabil (an exam-prep game), his own Linux desktop environment and PIXEON: web, mobile and desktop apps, shipped.",
    is: "Full-stack developer", okul: "Dikmen Vocational High School",
    ogAlt: "Umut Öztürk: tilted UMUT and ÖZTÜRK labels on paper next to a black-and-white photo",
  },
};

function jsonld(dil) {
  const m = META[dil], url = SITE + m.yol;
  const kisi = {
    "@type": "Person", "@id": SITE + "/#umut", name: "Umut Öztürk", url, image: SITE + "/foto/kapak.webp",
    jobTitle: m.is, email: "mailto:" + EPOSTA, birthDate: "2009-07-26",
    address: { "@type": "PostalAddress", addressLocality: "Ankara", addressCountry: "TR" },
    alumniOf: { "@type": "EducationalOrganization", name: m.okul, address: { "@type": "PostalAddress", addressLocality: "Ankara", addressCountry: "TR" } },
    affiliation: { "@type": "Organization", name: "Sağlık Bank" },
    sameAs: ["https://github.com/HIMURAw"],
    knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "MySQL", "Prisma", "React Native", "Expo", "Python", "Linux", "GNOME Shell"],
    knowsLanguage: ["tr", "en"],
  };
  const isler = PROJELER.map((p, i) => ({
    "@type": "ListItem", position: i + 1,
    item: {
      "@type": p.ad === "Kapabil" ? "MobileApplication" : "SoftwareApplication",
      name: p.ad, description: p.kisa[dil], url: p.url.startsWith("/") ? SITE + p.url : p.url,
      applicationCategory: p.ad === "Kapabil" ? "EducationalApplication" : p.ad === "Cam masaüstü" ? "DesktopEnhancementApplication" : "BusinessApplication",
      operatingSystem: p.ad === "Kapabil" ? "Android" : p.ad === "Cam masaüstü" ? "Linux" : "Web",
      author: { "@id": SITE + "/#umut" }, creator: { "@id": SITE + "/#umut" },
    },
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": SITE + "/#site", url: SITE + "/", name: "Umut Öztürk", inLanguage: ["tr", "en"], publisher: { "@id": SITE + "/#umut" } },
      { "@type": "ProfilePage", "@id": url + "#sayfa", url, name: m.baslik, description: m.aciklama, inLanguage: dil,
        isPartOf: { "@id": SITE + "/#site" }, mainEntity: { "@id": SITE + "/#umut" }, dateModified: new Date().toISOString().slice(0, 10) },
      kisi,
      { "@type": "ItemList", name: dil === "tr" ? "Projeler" : "Projects", itemListElement: isler },
    ],
  };
}

function bas(dil) {
  const m = META[dil], url = SITE + m.yol;
  return [
    `<title>${kac(m.baslik)}</title>`,
    `<meta name="description" content="${kac(m.aciklama)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="tr" href="${SITE}/" />`,
    `<link rel="alternate" hreflang="en" href="${SITE}/en/" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="Umut Öztürk" />`,
    `<meta property="og:title" content="${kac(m.baslik)}" />`,
    `<meta property="og:description" content="${kac(m.aciklama)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/og.jpg" />`,
    `<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${kac(m.ogAlt)}" />`,
    `<meta property="og:locale" content="${m.locale}" />`, `<meta property="og:locale:alternate" content="${m.diger}" />`,
    `<meta property="profile:first_name" content="Umut" />`, `<meta property="profile:last_name" content="Öztürk" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${kac(m.baslik)}" />`,
    `<meta name="twitter:description" content="${kac(m.aciklama)}" />`,
    `<meta name="twitter:image" content="${SITE}/og.jpg" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonld(dil)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

for (const dil of ["tr", "en"]) {
  const html = sablon
    .replace('<html lang="tr">', `<html lang="${dil}">`)
    .replace("<!--BAS-->", bas(dil))
    .replace("<!--GOVDE-->", render(dil));
  const hedef = resolve(kok, "dist", META[dil].yol.slice(1), "index.html");
  mkdirSync(resolve(hedef, ".."), { recursive: true });
  writeFileSync(hedef, html);
  console.log(`çizildi: ${META[dil].yol} (${(html.length / 1024).toFixed(1)} KB)`);
}
rmSync(resolve(kok, "dist-ssr"), { recursive: true, force: true });
