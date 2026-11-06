// Sitenin bütün metni, iki dilde. Rakamlar ve iddialar Brain'deki proje notlarından; uydurma yok.
export type Dil = "tr" | "en";
type Iki = Record<Dil, string>;

export const EPOSTA = "umutozturk.mee@gmail.com";

export type Proje = { ad: string; kisa: Iki; url: string; etiket: string };

export const PROJELER: Proje[] = [
  {
    ad: "Prokayit",
    kisa: {
      tr: "Bakım firmaları için saha kayıt sistemi: QR'lı muayene, imzalı rapor. ~110 sayfa, 143 API ucu, 60 tablo, 6 rol; stajda tek başıma.",
      en: "Field records for maintenance companies: QR inspections, signed reports. ~110 pages, 143 API endpoints, 60 tables, 6 roles; built solo at my internship.",
    },
    url: "https://prokayit.com",
    etiket: "prokayit.com",
  },
  {
    ad: "Kapabil",
    kisa: {
      tr: "Günde 5 dakikalık YKS oyunu. Lig, düello, seri ve maskotu bir kapibara. Kendi sınavıma çalışırken yazdım.",
      en: "A 5-minute-a-day game for Turkey's university exam, with leagues, duels, streaks and a capybara mascot.",
    },
    url: "/kapabil/",
    etiket: "umutozturk.me/kapabil",
  },
  {
    ad: "Cam masaüstü",
    kisa: {
      tr: "Kendi bilgisayarımın masaüstünü baştan yazdım: dinamik ada, dock, widget'lar, dosya yöneticisi ve NPU'da çalışan 'Hey Harvis'.",
      en: "I rewrote my own desktop: dynamic island, dock, widgets, a file manager and a 'Hey Harvis' assistant running on the NPU.",
    },
    url: "https://github.com/HIMURAw/himura-desktop",
    etiket: "github / himura-desktop",
  },
  {
    ad: "PIXEON",
    kisa: {
      tr: "Konsol ve oyun mağazası: arama, kupon, sipariş takibi, 3B ürün görüntüleyici ve arkasında gerçek bir yönetim paneli.",
      en: "A console and game store: search, coupons, order tracking, a 3D product viewer and a real admin panel behind it.",
    },
    url: "https://pixeon-mu.vercel.app",
    etiket: "pixeon-mu.vercel.app",
  },
];

export type Is = { ikon: "web" | "mobil" | "masaustu" | "otomasyon"; baslik: Iki; alt: Iki };

export const ISLER: Is[] = [
  { ikon: "web", baslik: { tr: "Web uygulaması", en: "Web apps" }, alt: { tr: "panel, mağaza, rezervasyon; Next.js ve MySQL", en: "dashboards, stores, bookings; Next.js and MySQL" } },
  { ikon: "mobil", baslik: { tr: "Mobil uygulama", en: "Mobile apps" }, alt: { tr: "Android ve iOS için tek kod, Expo ile", en: "one codebase for Android and iOS, with Expo" } },
  { ikon: "masaustu", baslik: { tr: "Masaüstü araçları", en: "Desktop tools" }, alt: { tr: "Linux eklentileri, küçük ve hızlı uygulamalar", en: "Linux extensions, small fast utilities" } },
  { ikon: "otomasyon", baslik: { tr: "Otomasyon", en: "Automation" }, alt: { tr: "botlar, raporlar, yerel yapay zekâ hatları", en: "bots, reports, local AI pipelines" } },
];

export type Parca = readonly (readonly [string, boolean])[];

export const METIN = {
  tr: {
    ust1: "Full-stack",
    ust2: "Geliştirici",
    dil: "EN",
    kisa: "Web, mobil ve masaüstü uygulamaları yazıyorum. Ankara'dayım, 17 yaşındayım.",
    yazDugme: "Bir işin mi var? Bana yaz ↓",
    yazNot: "Sayfanın sonundaki iletişim bölümüne iner.",
    dilAciklama: "Switch to English",
    calismalar: [["Çalışmalarım", true]],
    ben: "Umut Öztürk, Ankara'da yaşayan 17 yaşında bir geliştirici. Dikmen Meslek Lisesi'nde son sınıftayım, haftanın üç günü Sağlık Bank'ta stajdayım. Web ve mobil uygulama yazıyorum, evdeki bilgisayarımı yerel yapay zekâ çalıştıran küçük bir sunucuya çevirdim.",
    yaptiklarim: [["Neler", true], ["yaparım", false]],
    iletisim: [["Bana", true], ["yaz", false]],
    epostaNot: "Tıklayınca e-posta uygulaman açılır.",
    kanal: "YouTube: Komedi Gözlüğü",
    cv: "Özgeçmiş (.docx)",
    alt: "Ankara'da, kendi bilgisayarımda yapıldı.",
  },
  en: {
    ust1: "Full-stack",
    ust2: "Developer",
    dil: "TR",
    kisa: "I build web, mobile and desktop apps. I'm 17 and based in Ankara.",
    yazDugme: "Got a project? Write to me ↓",
    yazNot: "Jumps to the contact section at the bottom.",
    dilAciklama: "Türkçeye geç",
    calismalar: [["My", false], ["work", true]],
    ben: "Umut Öztürk, a 17-year-old developer in Ankara. I'm in my last year at a vocational high school and intern three days a week at Sağlık Bank. I build web and mobile apps, and I turned my home computer into a small server that runs local AI.",
    yaptiklarim: [["What", true], ["I build", false]],
    iletisim: [["Write", true], ["to me", false]],
    epostaNot: "Opens your e-mail app.",
    kanal: "YouTube: Komedi Gözlüğü",
    cv: "Résumé (.docx, Turkish)",
    alt: "Made in Ankara, on my own computer.",
  },
} as const;
