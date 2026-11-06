// Sitenin bütün metni, iki dilde. Rakamlar ve iddialar Brain'deki proje notlarından; uydurma yok.
export type Dil = "tr" | "en";
type Iki = Record<Dil, string>;

export const EPOSTA = "umutozturk.mee@gmail.com";
export const SITE = "https://umutozturk.me";

// Afiş düzeni: her projenin görseli kendi biçiminde (geniş ekran, üç telefon, pencere + dock).
export type Afis =
  | { tur: "genis"; src: string; w: number; h: number }
  | { tur: "telefonlar"; srcler: string[] }
  | { tur: "masaustu"; pencere: string; dock: string };

export type Proje = {
  ad: string;
  tur: Iki; // ne olduğu, tek satır
  durum: Iki; // şu an nerede
  kisa: Iki;
  teknik: string;
  url: string;
  etiket: string;
  bagNot: Iki; // bağlantıya basınca ne olur
  afis: Afis;
  alt: Iki;
};

export const PROJELER: Proje[] = [
  {
    ad: "Prokayit",
    tur: { tr: "Saha kayıt sistemi", en: "Field records platform" },
    durum: { tr: "Canlıda", en: "Live" },
    kisa: {
      tr: "Bakım firmaları için: teknisyen binada değilse iş başlamaz, cihazın etiketi okutulmadan muayene kapanmaz, iş bitince iki imzalı rapor müşteriye gider. Yaklaşık 110 sayfa, 143 API ucu, 60 tablo ve 6 rol; stajda tek başıma yazıyorum.",
      en: "For maintenance companies: work can't start unless the technician is on site, an inspection can't close until the device tag is scanned, and a report signed by both sides goes to the customer. Around 110 pages, 143 API endpoints, 60 tables and 6 roles, written solo at my internship.",
    },
    teknik: "Next.js · MySQL · Prisma",
    url: "https://prokayit.com",
    etiket: "prokayit.com",
    bagNot: { tr: "Ürünün sitesi yeni sekmede açılır.", en: "Opens the product site in a new tab." },
    afis: { tur: "genis", src: "/afis/prokayit.webp", w: 1100, h: 670 },
    alt: { tr: "Prokayit ana sayfası: yırtık kâğıt kolajı ortasında iş güvenliği için kayıt başlığı", en: "Prokayit home page with a torn-paper collage around its headline" },
  },
  {
    ad: "Kapabil",
    tur: { tr: "Mobil YKS oyunu", en: "Mobile exam-prep game" },
    durum: { tr: "Android sürümü hazırlanıyor", en: "Android release in progress" },
    kisa: {
      tr: "Günde beş dakikalık YKS oyunu. Konular kısa bölümlere ayrılmış bir yolda; lig, düello ve seri her günü alışkanlığa çeviriyor. Maskotu bir kapibara. Kendi sınavıma çalışırken yazdım.",
      en: "A five-minute-a-day game for Turkey's university entrance exam. Topics sit on a path of short levels; leagues, duels and streaks turn each day into a habit. The mascot is a capybara. I wrote it while studying for the exam myself.",
    },
    teknik: "React Native · Expo · TypeScript",
    url: "/kapabil/",
    etiket: "umutozturk.me/kapabil",
    bagNot: { tr: "Uygulamanın tanıtım sayfası açılır, deneme sürümü orada.", en: "Opens the app's page; the test build is there." },
    afis: { tur: "telefonlar", srcler: ["/afis/kapabil-yol.webp", "/afis/kapabil-sezon.webp", "/afis/kapabil-neden.webp"] },
    alt: { tr: "Kapabil'in üç ekranı: bölüm yolu, sezon ligi ve neden ekranı", en: "Three Kapabil screens: the level path, the season league and the why screen" },
  },
  {
    ad: "Cam masaüstü",
    tur: { tr: "Linux masaüstü ortamı", en: "Linux desktop environment" },
    durum: { tr: "Her gün kullanıyorum, açık kaynak", en: "My daily driver, open source" },
    kisa: {
      tr: "Kendi bilgisayarımın masaüstünü baştan yazdım: buzlu cam bir dock, ortada açılıp kapanan dinamik ada, widget'lar, pencere yaslama ve kendi dosya yöneticim. Üstüne Intel NPU'da çalışan bir 'Hey Harvis' asistanı.",
      en: "I rewrote my own desktop: a frosted-glass dock, a dynamic island that opens in the middle, widgets, window snapping and my own file manager. On top, a 'Hey Harvis' assistant running on the Intel NPU.",
    },
    teknik: "GNOME Shell · JavaScript · Python",
    url: "https://github.com/HIMURAw/himura-desktop",
    etiket: "github / himura-desktop",
    bagNot: { tr: "Kaynak kodu GitHub'da açılır; kurulum tek komut.", en: "Opens the source on GitHub; install is one command." },
    afis: { tur: "masaustu", pencere: "/afis/cam-dosyalar.webp", dock: "/afis/cam-dock.webp" },
    alt: { tr: "Kendi dosya yöneticim ve altında cam dock", en: "My own file manager with the glass dock below it" },
  },
  {
    ad: "PIXEON",
    tur: { tr: "Oyun ve konsol mağazası", en: "Game and console store" },
    durum: { tr: "Kaynak kodu açık", en: "Source available" },
    kisa: {
      tr: "Bir e-ticaret sitesinin görünmeyen tarafıyla birlikte: arama, kupon, sipariş takibi ve destek talepleri; konsollar için 3B ürün görüntüleyici; her yönetici işlemini kaydeden rol tabanlı bir yönetim paneli.",
      en: "An online store including the side nobody sees: search, coupons, order tracking and support tickets; a 3D viewer for consoles; and a role-based admin panel that logs every admin action.",
    },
    teknik: "Next.js · Drizzle · MySQL · Three.js",
    url: "https://github.com/HIMURAw/PIXEON",
    etiket: "github / PIXEON",
    bagNot: { tr: "Kaynak kodu GitHub'da açılır.", en: "Opens the source on GitHub." },
    afis: { tur: "genis", src: "/afis/pixeon.webp", w: 1100, h: 773 },
    alt: { tr: "PIXEON ürün sayfası: PlayStation 5 Pro, fiyat ve sepete ekle", en: "PIXEON product page: PlayStation 5 Pro with price and add to cart" },
  },
];

export type Is = { ikon: "web" | "mobil" | "masaustu" | "otomasyon"; baslik: Iki; alt: Iki };

export const ISLER: Is[] = [
  { ikon: "web", baslik: { tr: "Web uygulaması", en: "Web apps" }, alt: { tr: "Panel, mağaza, rezervasyon; Next.js ve MySQL ile, yayına kadar.", en: "Dashboards, stores, bookings; Next.js and MySQL, all the way to launch." } },
  { ikon: "mobil", baslik: { tr: "Mobil uygulama", en: "Mobile apps" }, alt: { tr: "Android ve iOS için tek kod, Expo ile.", en: "One codebase for Android and iOS, with Expo." } },
  { ikon: "masaustu", baslik: { tr: "Masaüstü araçları", en: "Desktop tools" }, alt: { tr: "Linux eklentileri, küçük ve hızlı uygulamalar.", en: "Linux extensions, small and fast utilities." } },
  { ikon: "otomasyon", baslik: { tr: "Otomasyon", en: "Automation" }, alt: { tr: "Botlar, otomatik raporlar, yerel yapay zekâ hatları.", en: "Bots, automatic reports, local AI pipelines." } },
];

// Yol: gerçekten zaman sırası olduğu için numaralı.
export const YOL: { zaman: Iki; baslik: Iki; alt: Iki }[] = [
  {
    zaman: { tr: "Eylül 2026'dan beri", en: "Since Sept 2026" },
    baslik: { tr: "Sağlık Bank, stajyer yazılım geliştirici", en: "Sağlık Bank, software intern" },
    alt: { tr: "Haftada üç gün. Prokayit'i burada, baştan sona tek başıma geliştiriyorum.", en: "Three days a week. I build Prokayit here, end to end, on my own." },
  },
  {
    zaman: { tr: "2023'ten beri", en: "Since 2023" },
    baslik: { tr: "Dikmen Meslek Lisesi", en: "Dikmen Vocational High School" },
    alt: { tr: "Son sınıftayım; 2027'de mezun oluyorum.", en: "Final year; graduating in 2027." },
  },
];

export const SERTIFIKALAR: { ad: Iki; dosya: string }[] = [
  { ad: { tr: "Büyük Dil Modelleri ile Sesli Asistan Atölyesi", en: "Voice Assistants with LLMs workshop" }, dosya: "/certificate/Büyük_Dil_Modelleri_(LLM)_ile_Sesli_Asistan_Atölyesi_Sertifika.pdf" },
  { ad: { tr: "Full-Stack Web Geliştirme (Udemy)", en: "Full-Stack Web Development (Udemy)" }, dosya: "/certificate/udemy-full-stack-certficete.pdf" },
  { ad: { tr: "Node.js", en: "Node.js" }, dosya: "/certificate/nodejscertficete.pdf" },
  { ad: { tr: "İngilizce Seviye Belirleme", en: "English Placement Test" }, dosya: "/certificate/English_Placement_Test_Certificate.pdf" },
];

export const ARACLAR = "TypeScript, React, Next.js, Node.js, MySQL, Prisma, Drizzle, React Native, Expo, Python, Linux";

export type Parca = readonly (readonly [string, boolean])[];

export const METIN = {
  tr: {
    ust1: "Full-stack",
    ust2: "Geliştirici",
    dil: "EN",
    dilAciklama: "Switch to English",
    atla: "İçeriğe geç",
    kisa: "Fikri, insanların her gün kullandığı bir ürüne çeviriyorum: web, mobil ve masaüstü. Ankara'dayım, 17 yaşındayım.",
    yazDugme: "Bir işin mi var? Bana yaz",
    yazNot: "Sayfanın sonundaki iletişim bölümüne iner.",
    calismalar: [["Çalışmalarım", true]],
    ben: "Dikmen Meslek Lisesi'nde son sınıftayım, haftanın üç günü Sağlık Bank'ta stajdayım. Yaptığım her şeyi yayına kadar götürürüm; aşağıdakilerin hepsi çalışıyor.",
    afisIpucu: "Afişin üstüne gel, renkleri geri gelsin.",
    yaptiklarim: [["Neler", true], ["yaparım", false]],
    yol: [["Yol", true]],
    sertifikaBaslik: "Sertifikalar",
    sertifikaNot: "Her biri PDF olarak yeni sekmede açılır.",
    araclarBaslik: "Kullandıklarım",
    iletisim: [["Bana", true], ["yaz", false]],
    iletisimMetin: "Bir web sitesi, mobil uygulama ya da otomasyon için yaz. Genelde aynı gün dönerim.",
    epostaNot: "Tıklayınca e-posta uygulaman açılır.",
    kopyala: "Adresi kopyala",
    kopyalandi: "Kopyalandı",
    cv: "Özgeçmişimi indir (.docx)",
    alt: "Ankara'da, kendi bilgisayarımda yapıldı.",
    yukari: "Başa dön",
  },
  en: {
    ust1: "Full-stack",
    ust2: "Developer",
    dil: "TR",
    dilAciklama: "Türkçeye geç",
    atla: "Skip to content",
    kisa: "I turn ideas into products people use every day: web, mobile and desktop. I'm 17 and based in Ankara.",
    yazDugme: "Got a project? Write to me",
    yazNot: "Jumps to the contact section at the bottom.",
    calismalar: [["My", false], ["work", true]],
    ben: "I'm in my final year at a vocational high school and intern three days a week at Sağlık Bank. I take everything I make all the way to release; everything below works.",
    afisIpucu: "Hover a poster to bring its colours back.",
    yaptiklarim: [["What", true], ["I build", false]],
    yol: [["So", false], ["far", true]],
    sertifikaBaslik: "Certificates",
    sertifikaNot: "Each opens as a PDF in a new tab.",
    araclarBaslik: "Tools I use",
    iletisim: [["Write", true], ["to me", false]],
    iletisimMetin: "Write to me about a website, a mobile app or an automation. I usually reply the same day.",
    epostaNot: "Opens your e-mail app.",
    kopyala: "Copy address",
    kopyalandi: "Copied",
    cv: "Download my résumé (.docx, Turkish)",
    alt: "Made in Ankara, on my own computer.",
    yukari: "Back to top",
  },
} as const;
