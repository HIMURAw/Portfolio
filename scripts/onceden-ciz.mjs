// Derlemeden sonra: her dil için (/, /en/, /es/, /zh/, /hi/, /ar/) sayfayı HTML olarak çizer; her birine kendi
// başlığını, açıklamasını, canonical'ını, hreflang'ını, Open Graph etiketlerini ve yapılandırılmış verisini (JSON-LD:
// WebSite, ProfilePage, Person, projeler, sık sorulanlar) yazar; sitemap.xml'i dillerden üretir; SSR klasörünü siler.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const kok = resolve(import.meta.dirname, "..");
const { render, PROJELER, EPOSTA, SITE, DILLER, SSS, PROFILLER } = await import(pathToFileURL(resolve(kok, "dist-ssr/entry-server.js")).href);
const sablon = readFileSync(resolve(kok, "dist/index.html"), "utf8");
const kac = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const bugun = new Date().toISOString().slice(0, 10);
const ADI = "Umut Öztürk";

// Başlık ve açıklama: adı en başta, ne yaptığı ve nerede olduğu net (arama sonucunda görünen iki satır).
const META = {
  tr: { baslik: "Umut Öztürk — Full-stack geliştirici, Ankara", is: "Full-stack yazılım geliştirici", okul: "Dikmen Meslek Lisesi",
    aciklama: "Umut Öztürk, Ankara'da 17 yaşında full-stack yazılım geliştirici. Prokayit (bakım firmaları için saha kayıt sistemi), Kapabil (YKS oyunu), kendi Linux masaüstü ortamı ve PIXEON: web, mobil ve masaüstü uygulamaları, yayına kadar." },
  en: { baslik: "Umut Öztürk — Full-stack developer in Ankara, Turkey", is: "Full-stack software developer", okul: "Dikmen Vocational High School",
    aciklama: "Umut Öztürk is a 17-year-old full-stack software developer in Ankara, Turkey. Prokayit (field records for maintenance companies), Kapabil (an exam-prep game), his own Linux desktop and PIXEON: web, mobile and desktop apps, shipped." },
  es: { baslik: "Umut Öztürk — Desarrollador full-stack en Ankara, Turquía", is: "Desarrollador de software full-stack", okul: "Instituto de Formación Profesional Dikmen",
    aciklama: "Umut Öztürk es un desarrollador de software full-stack de 17 años en Ankara (Turquía). Prokayit (registros de campo para empresas de mantenimiento), Kapabil (juego para preparar exámenes), su propio escritorio Linux y PIXEON." },
  zh: { baslik: "Umut Öztürk — 全栈开发者，土耳其安卡拉", is: "全栈软件开发者", okul: "Dikmen 职业高中",
    aciklama: "Umut Öztürk，17 岁，土耳其安卡拉的全栈软件开发者。作品包括 Prokayit（维保公司现场记录平台）、Kapabil（备考游戏）、自制 Linux 桌面环境和 PIXEON：Web、移动与桌面应用，全部上线。" },
  hi: { baslik: "Umut Öztürk — फ़ुल-स्टैक डेवलपर, अंकारा, तुर्की", is: "फ़ुल-स्टैक सॉफ़्टवेयर डेवलपर", okul: "Dikmen व्यावसायिक हाई स्कूल",
    aciklama: "Umut Öztürk अंकारा, तुर्की के 17 वर्षीय फ़ुल-स्टैक सॉफ़्टवेयर डेवलपर हैं। Prokayit (मेंटेनेंस कंपनियों के लिए फ़ील्ड रिकॉर्ड), Kapabil (परीक्षा-तैयारी गेम), अपना Linux डेस्कटॉप और PIXEON।" },
  ar: { baslik: "Umut Öztürk — مطوّر Full-stack في أنقرة، تركيا", is: "مطوّر برمجيات شامل (Full-stack)", okul: "ثانوية ديكمن المهنية",
    aciklama: "Umut Öztürk مطوّر برمجيات شامل يبلغ 17 عامًا في أنقرة بتركيا. من أعماله Prokayit (سجلات ميدانية لشركات الصيانة) وKapabil (لعبة للتحضير للامتحانات) وسطح مكتب لينكس خاص به وPIXEON." },
};

const kisi = dil => ({
  "@type": "Person", "@id": SITE + "/#umut", name: ADI, alternateName: ["Umut Ozturk", "HIMURAw"],
  givenName: "Umut", familyName: "Öztürk", url: SITE + "/",
  image: { "@type": "ImageObject", url: SITE + "/foto/umut-ozturk.webp", width: 900, height: 1200, caption: ADI },
  description: META[dil].aciklama, jobTitle: META[dil].is, email: "mailto:" + EPOSTA, birthDate: "2009-07-26", gender: "Male",
  nationality: { "@type": "Country", name: "Türkiye" },
  homeLocation: { "@type": "Place", name: "Ankara", address: { "@type": "PostalAddress", addressLocality: "Ankara", addressCountry: "TR" } },
  address: { "@type": "PostalAddress", addressLocality: "Ankara", addressCountry: "TR" },
  alumniOf: { "@type": "EducationalOrganization", name: META[dil].okul, address: { "@type": "PostalAddress", addressLocality: "Ankara", addressCountry: "TR" } },
  affiliation: { "@type": "Organization", name: "Sağlık Bank" },
  hasOccupation: { "@type": "Occupation", name: META[dil].is, occupationLocation: { "@type": "City", name: "Ankara" },
    skills: "Next.js, React, TypeScript, Node.js, MySQL, React Native, Expo, Python, Linux" },
  sameAs: PROFILLER,
  knowsAbout: ["Full-stack development", "Next.js", "React", "TypeScript", "Node.js", "MySQL", "Prisma", "React Native", "Expo", "Python", "Linux", "GNOME Shell"],
  knowsLanguage: ["tr", "en"],
});

function jsonld(d) {
  const url = SITE + d.yol, dil = d.kod;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": SITE + "/#site", url: SITE + "/", name: ADI, alternateName: "umutozturk.me",
        inLanguage: DILLER.map(x => x.hreflang), publisher: { "@id": SITE + "/#umut" }, author: { "@id": SITE + "/#umut" } },
      { "@type": "ProfilePage", "@id": url + "#sayfa", url, name: META[dil].baslik, description: META[dil].aciklama, inLanguage: d.hreflang,
        isPartOf: { "@id": SITE + "/#site" }, mainEntity: { "@id": SITE + "/#umut" }, about: { "@id": SITE + "/#umut" },
        primaryImageOfPage: { "@type": "ImageObject", url: SITE + "/foto/umut-ozturk.webp" }, dateModified: bugun },
      kisi(dil),
      { "@type": "ItemList", "@id": url + "#projeler", itemListElement: PROJELER.map((p, i) => ({
        "@type": "ListItem", position: i + 1,
        item: {
          "@type": p.uygulama === "mobil" ? "MobileApplication" : "SoftwareApplication",
          name: p.ad, description: p.kisa[dil], url: p.url.startsWith("/") ? SITE + p.url : p.url,
          applicationCategory: p.uygulama === "mobil" ? "EducationalApplication" : p.uygulama === "masaustu" ? "DesktopEnhancementApplication" : "BusinessApplication",
          operatingSystem: p.uygulama === "mobil" ? "Android" : p.uygulama === "masaustu" ? "Linux" : "Web",
          author: { "@id": SITE + "/#umut" }, creator: { "@id": SITE + "/#umut" },
        },
      })) },
      { "@type": "FAQPage", "@id": url + "#sss", inLanguage: d.hreflang, mainEntity: SSS.map(x => ({
        "@type": "Question", name: x.s[dil], acceptedAnswer: { "@type": "Answer", text: x.c[dil] } })) },
    ],
  };
}

function bas(d) {
  const m = META[d.kod], url = SITE + d.yol;
  return [
    `<title>${kac(m.baslik)}</title>`,
    `<meta name="description" content="${kac(m.aciklama)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...DILLER.map(x => `<link rel="alternate" hreflang="${x.hreflang}" href="${SITE}${x.yol}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/en/" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${ADI}" />`,
    `<meta property="og:title" content="${kac(m.baslik)}" />`,
    `<meta property="og:description" content="${kac(m.aciklama)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE}/og.jpg" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`, `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${ADI}" />`,
    `<meta property="og:locale" content="${d.locale}" />`,
    ...DILLER.filter(x => x.kod !== d.kod).map(x => `<meta property="og:locale:alternate" content="${x.locale}" />`),
    `<meta property="profile:first_name" content="Umut" />`, `<meta property="profile:last_name" content="Öztürk" />`,
    `<meta property="profile:username" content="HIMURAw" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${kac(m.baslik)}" />`,
    `<meta name="twitter:description" content="${kac(m.aciklama)}" />`,
    `<meta name="twitter:image" content="${SITE}/og.jpg" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonld(d)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

for (const d of DILLER) {
  const html = sablon
    .replace('<html lang="tr">', `<html lang="${d.hreflang}" dir="${d.yon}">`)
    .replace("<!--BAS-->", bas(d))
    .replace("<!--GOVDE-->", render(d.kod));
  const hedef = resolve(kok, "dist", d.yol.slice(1), "index.html");
  mkdirSync(resolve(hedef, ".."), { recursive: true });
  writeFileSync(hedef, html);
  console.log(`çizildi: ${d.yol} (${(html.length / 1024).toFixed(1)} KB)`);
}

// sitemap: her dil sayfası, hepsinin hreflang eşleri ve sayfadaki fotoğraf
const alternatifler = [...DILLER.map(x => `    <xhtml:link rel="alternate" hreflang="${x.hreflang}" href="${SITE}${x.yol}"/>`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/en/"/>`].join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${DILLER.map(d => `  <url>
    <loc>${SITE}${d.yol}</loc>
    <lastmod>${bugun}</lastmod>
${alternatifler}
    <image:image><image:loc>${SITE}/foto/umut-ozturk.webp</image:loc></image:image>
  </url>`).join("\n")}
  <url><loc>${SITE}/kapabil/</loc></url>
</urlset>
`;
writeFileSync(resolve(kok, "dist/sitemap.xml"), sitemap);
console.log("sitemap.xml yazıldı");
rmSync(resolve(kok, "dist-ssr"), { recursive: true, force: true });
