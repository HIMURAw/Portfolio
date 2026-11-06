// Sitenin bütün metni, altı dilde: Türkçe (asıl) + dünyada en çok konuşulan beş dil (İngilizce, Çince, Hintçe,
// İspanyolca, Arapça). Rakamlar ve iddialar Brain'deki proje notlarından; uydurma yok. Yeni dil: DILLER'e ekle,
// her Coklu alana çeviriyi yaz; derleme (scripts/onceden-ciz.mjs) sayfayı, hreflang'ı ve sitemap'i kendisi üretir.
export type Dil = "tr" | "en" | "es" | "zh" | "hi" | "ar";
export type Coklu = Record<Dil, string>;

export const DILLER: { kod: Dil; ad: string; yol: string; hreflang: string; locale: string; yon: "ltr" | "rtl" }[] = [
  { kod: "tr", ad: "Türkçe", yol: "/", hreflang: "tr", locale: "tr_TR", yon: "ltr" },
  { kod: "en", ad: "English", yol: "/en/", hreflang: "en", locale: "en_US", yon: "ltr" },
  { kod: "es", ad: "Español", yol: "/es/", hreflang: "es", locale: "es_ES", yon: "ltr" },
  { kod: "zh", ad: "中文", yol: "/zh/", hreflang: "zh-Hans", locale: "zh_CN", yon: "ltr" },
  { kod: "hi", ad: "हिन्दी", yol: "/hi/", hreflang: "hi", locale: "hi_IN", yon: "ltr" },
  { kod: "ar", ad: "العربية", yol: "/ar/", hreflang: "ar", locale: "ar_AR", yon: "rtl" },
];

export const EPOSTA = "umutozturk.mee@gmail.com";
export const SITE = "https://umutozturk.me";
export const GITHUB = "https://github.com/HIMURAw";
export const LINKEDIN = "https://www.linkedin.com/in/umutttt";
export const INSTAGRAM = "https://www.instagram.com/umut.ozturk0_/";
// Arama motorlarına "bunlar aynı kişi" diyen profiller (Person.sameAs); site de bunlara rel="me" ile bağlanır.
export const PROFILLER = [GITHUB, LINKEDIN, INSTAGRAM];

export type Afis =
  | { tur: "genis"; src: string; w: number; h: number }
  | { tur: "telefonlar"; srcler: string[] }
  | { tur: "masaustu"; pencere: string; dock: string };

export type Proje = {
  ad: string; tur: Coklu; durum: Coklu; kisa: Coklu; teknik: string; url: string; etiket: string;
  bagNot: Coklu; afis: Afis; alt: Coklu; uygulama: "web" | "mobil" | "masaustu";
};

export const PROJELER: Proje[] = [
  {
    ad: "Prokayit", uygulama: "web",
    tur: { tr: "Saha kayıt sistemi", en: "Field records platform", es: "Plataforma de registros de campo", zh: "现场记录平台", hi: "फ़ील्ड रिकॉर्ड प्लेटफ़ॉर्म", ar: "منصة سجلات ميدانية" },
    durum: { tr: "Canlıda", en: "Live", es: "En producción", zh: "已上线", hi: "लाइव", ar: "يعمل الآن" },
    kisa: {
      tr: "Bakım firmaları için: teknisyen binada değilse iş başlamaz, cihazın etiketi okutulmadan muayene kapanmaz, iş bitince iki imzalı rapor müşteriye gider. Yaklaşık 110 sayfa, 143 API ucu, 60 tablo ve 6 rol; stajda tek başıma yazıyorum.",
      en: "For maintenance companies: work can't start unless the technician is on site, an inspection can't close until the device tag is scanned, and a report signed by both sides goes to the customer. Around 110 pages, 143 API endpoints, 60 tables and 6 roles, written solo at my internship.",
      es: "Para empresas de mantenimiento: el trabajo no empieza si el técnico no está en el edificio, una inspección no se cierra sin escanear la etiqueta del equipo y el cliente recibe un informe firmado por ambas partes. Unas 110 páginas, 143 endpoints de API, 60 tablas y 6 roles, escrito por mí solo durante mis prácticas.",
      zh: "为维保公司打造：技术人员不在现场就无法开工，不扫描设备标签就无法结束检查，完工后双方签字的报告会发送给客户。约 110 个页面、143 个 API 接口、60 张数据表、6 种角色，由我在实习期间独立开发。",
      hi: "मेंटेनेंस कंपनियों के लिए: तकनीशियन साइट पर न हो तो काम शुरू नहीं होता, डिवाइस का टैग स्कैन किए बिना जाँच बंद नहीं होती, और दोनों पक्षों के हस्ताक्षर वाली रिपोर्ट ग्राहक को जाती है। लगभग 110 पेज, 143 API एंडपॉइंट, 60 टेबल और 6 रोल — इंटर्नशिप के दौरान अकेले लिखा।",
      ar: "لشركات الصيانة: لا يبدأ العمل ما لم يكن الفني في الموقع، ولا يُغلق الفحص قبل مسح ملصق الجهاز، وعند الانتهاء يصل إلى العميل تقرير موقّع من الطرفين. نحو 110 صفحات و143 نقطة API و60 جدولًا و6 أدوار، كتبته وحدي خلال فترة تدريبي.",
    },
    teknik: "Next.js · MySQL · Prisma", url: "https://prokayit.com", etiket: "prokayit.com",
    bagNot: { tr: "Ürünün sitesi yeni sekmede açılır.", en: "Opens the product site in a new tab.", es: "Abre el sitio del producto en una pestaña nueva.", zh: "在新标签页中打开产品网站。", hi: "प्रोडक्ट की वेबसाइट नए टैब में खुलती है।", ar: "يفتح موقع المنتج في علامة تبويب جديدة." },
    afis: { tur: "genis", src: "/afis/prokayit.webp", w: 1100, h: 670 },
    alt: { tr: "Prokayit ana sayfası", en: "Prokayit home page", es: "Página de inicio de Prokayit", zh: "Prokayit 首页", hi: "Prokayit का होम पेज", ar: "الصفحة الرئيسية لـ Prokayit" },
  },
  {
    ad: "Kapabil", uygulama: "mobil",
    tur: { tr: "Mobil YKS oyunu", en: "Mobile exam-prep game", es: "Juego móvil de preparación de exámenes", zh: "手机备考游戏", hi: "मोबाइल परीक्षा-तैयारी गेम", ar: "لعبة جوال للتحضير للامتحانات" },
    durum: { tr: "Android sürümü hazırlanıyor", en: "Android release in progress", es: "Versión para Android en camino", zh: "Android 版即将发布", hi: "Android रिलीज़ की तैयारी", ar: "إصدار أندرويد قيد التحضير" },
    kisa: {
      tr: "Günde beş dakikalık YKS oyunu. Konular kısa bölümlere ayrılmış bir yolda; lig, düello ve seri her günü alışkanlığa çeviriyor. Maskotu bir kapibara. Kendi sınavıma çalışırken yazdım.",
      en: "A five-minute-a-day game for Turkey's university entrance exam. Topics sit on a path of short levels; leagues, duels and streaks turn each day into a habit. The mascot is a capybara. I wrote it while studying for the exam myself.",
      es: "Un juego de cinco minutos al día para el examen de acceso a la universidad de Turquía. Los temas forman un camino de niveles cortos; ligas, duelos y rachas convierten cada día en un hábito. La mascota es un capibara. Lo escribí mientras estudiaba para ese mismo examen.",
      zh: "每天五分钟的土耳其高考（YKS）备考游戏。知识点被拆成一条由短关卡组成的路线；联赛、对决和连续打卡让每天学习成为习惯。吉祥物是一只水豚。这是我在备考时写的。",
      hi: "तुर्की की विश्वविद्यालय प्रवेश परीक्षा (YKS) के लिए रोज़ पाँच मिनट का गेम। विषय छोटे-छोटे लेवल वाले रास्ते पर हैं; लीग, द्वंद्व और स्ट्रीक हर दिन को आदत बनाते हैं। इसका शुभंकर एक कैपीबारा है। मैंने इसे अपनी परीक्षा की तैयारी करते हुए लिखा।",
      ar: "لعبة خمس دقائق يوميًا لامتحان القبول الجامعي في تركيا (YKS). المواضيع مقسّمة على مسار من مراحل قصيرة، والدوريات والمبارزات والسلاسل اليومية تحوّل المذاكرة إلى عادة. التميمة حيوان كابيبارا. كتبتها وأنا أستعد للامتحان نفسه.",
    },
    teknik: "React Native · Expo · TypeScript", url: "/kapabil/", etiket: "umutozturk.me/kapabil",
    bagNot: { tr: "Uygulamanın tanıtım sayfası açılır, deneme sürümü orada.", en: "Opens the app's page (in Turkish); the test build is there.", es: "Abre la página de la app (en turco); ahí está la versión de prueba.", zh: "打开应用介绍页（土耳其语），测试版在那里。", hi: "ऐप का पेज (तुर्की में) खुलता है; टेस्ट बिल्ड वहीं है।", ar: "يفتح صفحة التطبيق (بالتركية)، والنسخة التجريبية هناك." },
    afis: { tur: "telefonlar", srcler: ["/afis/kapabil-yol.webp", "/afis/kapabil-sezon.webp", "/afis/kapabil-neden.webp"] },
    alt: { tr: "Kapabil'in üç ekranı: bölüm yolu, sezon ligi ve neden ekranı", en: "Three Kapabil screens: the level path, the season league and the why screen", es: "Tres pantallas de Kapabil: el camino de niveles, la liga de temporada y la pantalla de explicación", zh: "Kapabil 的三个界面：关卡路线、赛季联赛和解析页", hi: "Kapabil की तीन स्क्रीन: लेवल का रास्ता, सीज़न लीग और व्याख्या स्क्रीन", ar: "ثلاث شاشات من Kapabil: مسار المراحل ودوري الموسم وشاشة الشرح" },
  },
  {
    ad: "Cam masaüstü", uygulama: "masaustu",
    tur: { tr: "Linux masaüstü ortamı", en: "Linux desktop environment", es: "Entorno de escritorio para Linux", zh: "Linux 桌面环境", hi: "Linux डेस्कटॉप एनवायरनमेंट", ar: "بيئة سطح مكتب لنظام لينكس" },
    durum: { tr: "Her gün kullanıyorum, açık kaynak", en: "My daily driver, open source", es: "Lo uso a diario, código abierto", zh: "我每天都在用，开源", hi: "रोज़ इस्तेमाल करता हूँ, ओपन सोर्स", ar: "أستخدمه يوميًا، مفتوح المصدر" },
    kisa: {
      tr: "Kendi bilgisayarımın masaüstünü baştan yazdım: buzlu cam bir dock, ortada açılıp kapanan dinamik ada, widget'lar, pencere yaslama ve kendi dosya yöneticim. Üstüne Intel NPU'da çalışan bir 'Hey Harvis' asistanı.",
      en: "I rewrote my own desktop: a frosted-glass dock, a dynamic island that opens in the middle, widgets, window snapping and my own file manager. On top, a 'Hey Harvis' assistant running on the Intel NPU.",
      es: "Reescribí el escritorio de mi propio ordenador: un dock de cristal esmerilado, una isla dinámica en el centro, widgets, ajuste de ventanas y mi propio gestor de archivos. Además, un asistente «Hey Harvis» que funciona en la NPU de Intel.",
      zh: "我从头重写了自己电脑的桌面：毛玻璃风格的程序坞、居中展开的灵动岛、小组件、窗口贴靠和自己的文件管理器。另外还有一个运行在 Intel NPU 上的“Hey Harvis”语音助手。",
      hi: "मैंने अपने कंप्यूटर का डेस्कटॉप शुरू से लिखा: फ़्रॉस्टेड-ग्लास डॉक, बीच में खुलने वाला डायनेमिक आइलैंड, विजेट, विंडो स्नैपिंग और मेरा अपना फ़ाइल मैनेजर। साथ में Intel NPU पर चलने वाला 'Hey Harvis' असिस्टेंट।",
      ar: "أعدت كتابة سطح مكتب حاسوبي من الصفر: شريط تطبيقات من الزجاج المصنفر، و«جزيرة ديناميكية» تنفتح في المنتصف، وأدوات، وترتيب للنوافذ، ومدير ملفات خاص بي. وفوق ذلك مساعد صوتي «Hey Harvis» يعمل على وحدة NPU من إنتل.",
    },
    teknik: "GNOME Shell · JavaScript · Python", url: "https://github.com/HIMURAw/himura-desktop", etiket: "github / himura-desktop",
    bagNot: { tr: "Kaynak kodu GitHub'da açılır; kurulum tek komut.", en: "Opens the source on GitHub; install is one command.", es: "Abre el código en GitHub; se instala con un solo comando.", zh: "在 GitHub 上打开源码；一条命令即可安装。", hi: "GitHub पर सोर्स कोड खुलता है; इंस्टॉल एक कमांड में।", ar: "يفتح الشيفرة المصدرية على GitHub؛ التثبيت بأمر واحد." },
    afis: { tur: "masaustu", pencere: "/afis/cam-dosyalar.webp", dock: "/afis/cam-dock.webp" },
    alt: { tr: "Kendi dosya yöneticim ve altında cam dock", en: "My own file manager with the glass dock below it", es: "Mi propio gestor de archivos con el dock de cristal debajo", zh: "我自己的文件管理器和下方的玻璃程序坞", hi: "मेरा अपना फ़ाइल मैनेजर और नीचे ग्लास डॉक", ar: "مدير الملفات الخاص بي وتحته شريط التطبيقات الزجاجي" },
  },
  {
    ad: "PIXEON", uygulama: "web",
    tur: { tr: "Oyun ve konsol mağazası", en: "Game and console store", es: "Tienda de juegos y consolas", zh: "游戏与主机商城", hi: "गेम और कंसोल स्टोर", ar: "متجر ألعاب وأجهزة" },
    durum: { tr: "Kaynak kodu açık", en: "Source available", es: "Código disponible", zh: "源码公开", hi: "सोर्स कोड उपलब्ध", ar: "الشيفرة متاحة" },
    kisa: {
      tr: "Bir e-ticaret sitesinin görünmeyen tarafıyla birlikte: arama, kupon, sipariş takibi ve destek talepleri; konsollar için 3B ürün görüntüleyici; her yönetici işlemini kaydeden rol tabanlı bir yönetim paneli.",
      en: "An online store including the side nobody sees: search, coupons, order tracking and support tickets; a 3D viewer for consoles; and a role-based admin panel that logs every admin action.",
      es: "Una tienda online con la parte que nadie ve: búsqueda, cupones, seguimiento de pedidos y tickets de soporte; un visor 3D para consolas; y un panel de administración por roles que registra cada acción.",
      zh: "一个连同“看不见的后台”一起完成的电商网站：搜索、优惠券、订单跟踪和工单；游戏主机的 3D 展示；以及记录每一次管理操作的基于角色的后台。",
      hi: "एक ऑनलाइन स्टोर, उस हिस्से के साथ जो किसी को नहीं दिखता: सर्च, कूपन, ऑर्डर ट्रैकिंग और सपोर्ट टिकट; कंसोल के लिए 3D व्यूअर; और रोल-आधारित एडमिन पैनल जो हर एडमिन कार्रवाई दर्ज करता है।",
      ar: "متجر إلكتروني مع الجانب الذي لا يراه أحد: البحث والقسائم وتتبّع الطلبات وتذاكر الدعم، وعارض ثلاثي الأبعاد للأجهزة، ولوحة إدارة حسب الأدوار تسجّل كل إجراء إداري.",
    },
    teknik: "Next.js · Drizzle · MySQL · Three.js", url: "https://github.com/HIMURAw/PIXEON", etiket: "github / PIXEON",
    bagNot: { tr: "Kaynak kodu GitHub'da açılır.", en: "Opens the source on GitHub.", es: "Abre el código en GitHub.", zh: "在 GitHub 上打开源码。", hi: "GitHub पर सोर्स कोड खुलता है।", ar: "يفتح الشيفرة المصدرية على GitHub." },
    afis: { tur: "genis", src: "/afis/pixeon.webp", w: 1100, h: 773 },
    alt: { tr: "PIXEON ürün sayfası: PlayStation 5 Pro", en: "PIXEON product page: PlayStation 5 Pro", es: "Página de producto de PIXEON: PlayStation 5 Pro", zh: "PIXEON 商品页：PlayStation 5 Pro", hi: "PIXEON प्रोडक्ट पेज: PlayStation 5 Pro", ar: "صفحة منتج في PIXEON: PlayStation 5 Pro" },
  },
];

export type Is = { ikon: "web" | "mobil" | "masaustu" | "otomasyon"; baslik: Coklu; alt: Coklu };

export const ISLER: Is[] = [
  { ikon: "web",
    baslik: { tr: "Web uygulaması", en: "Web apps", es: "Aplicaciones web", zh: "Web 应用", hi: "वेब ऐप", ar: "تطبيقات الويب" },
    alt: { tr: "Panel, mağaza, rezervasyon; Next.js ve MySQL ile, yayına kadar.", en: "Dashboards, stores, bookings; Next.js and MySQL, all the way to launch.", es: "Paneles, tiendas, reservas; con Next.js y MySQL, hasta el lanzamiento.", zh: "后台、商城、预约系统；用 Next.js 和 MySQL，一直做到上线。", hi: "डैशबोर्ड, स्टोर, बुकिंग; Next.js और MySQL के साथ, लॉन्च तक।", ar: "لوحات تحكم ومتاجر وأنظمة حجز؛ بـ Next.js وMySQL حتى الإطلاق." } },
  { ikon: "mobil",
    baslik: { tr: "Mobil uygulama", en: "Mobile apps", es: "Apps móviles", zh: "移动应用", hi: "मोबाइल ऐप", ar: "تطبيقات الجوال" },
    alt: { tr: "Android ve iOS için tek kod, Expo ile.", en: "One codebase for Android and iOS, with Expo.", es: "Un solo código para Android e iOS, con Expo.", zh: "用 Expo，一套代码同时支持 Android 和 iOS。", hi: "Expo के साथ Android और iOS के लिए एक ही कोड।", ar: "شيفرة واحدة لأندرويد وiOS باستخدام Expo." } },
  { ikon: "masaustu",
    baslik: { tr: "Masaüstü araçları", en: "Desktop tools", es: "Herramientas de escritorio", zh: "桌面工具", hi: "डेस्कटॉप टूल", ar: "أدوات سطح المكتب" },
    alt: { tr: "Linux eklentileri, küçük ve hızlı uygulamalar.", en: "Linux extensions, small and fast utilities.", es: "Extensiones para Linux, utilidades pequeñas y rápidas.", zh: "Linux 扩展，小巧快速的实用工具。", hi: "Linux एक्सटेंशन, छोटे और तेज़ टूल।", ar: "إضافات لينكس وأدوات صغيرة وسريعة." } },
  { ikon: "otomasyon",
    baslik: { tr: "Otomasyon", en: "Automation", es: "Automatización", zh: "自动化", hi: "ऑटोमेशन", ar: "الأتمتة" },
    alt: { tr: "Botlar, otomatik raporlar, yerel yapay zekâ hatları.", en: "Bots, automatic reports, local AI pipelines.", es: "Bots, informes automáticos, flujos de IA local.", zh: "机器人、自动报告、本地 AI 流程。", hi: "बॉट, ऑटोमैटिक रिपोर्ट, लोकल AI पाइपलाइन।", ar: "بوتات وتقارير تلقائية وخطوط ذكاء اصطناعي محلية." } },
];

export const YOL: { zaman: Coklu; baslik: Coklu; alt: Coklu }[] = [
  {
    zaman: { tr: "Eylül 2026'dan beri", en: "Since Sept 2026", es: "Desde sept. de 2026", zh: "2026 年 9 月至今", hi: "सितंबर 2026 से", ar: "منذ سبتمبر 2026" },
    baslik: { tr: "Sağlık Bank, stajyer yazılım geliştirici", en: "Sağlık Bank, software intern", es: "Sağlık Bank, desarrollador de software en prácticas", zh: "Sağlık Bank，软件开发实习生", hi: "Sağlık Bank, सॉफ़्टवेयर इंटर्न", ar: "Sağlık Bank، متدرّب في تطوير البرمجيات" },
    alt: { tr: "Haftada üç gün. Prokayit'i burada, baştan sona tek başıma geliştiriyorum.", en: "Three days a week. I build Prokayit here, end to end, on my own.", es: "Tres días a la semana. Aquí desarrollo Prokayit de principio a fin, yo solo.", zh: "每周三天。我在这里独立完成 Prokayit 的全部开发。", hi: "हफ़्ते में तीन दिन। यहाँ मैं Prokayit को शुरू से आख़िर तक अकेले बना रहा हूँ।", ar: "ثلاثة أيام في الأسبوع. أطوّر هنا Prokayit من البداية إلى النهاية بمفردي." },
  },
  {
    zaman: { tr: "2023'ten beri", en: "Since 2023", es: "Desde 2023", zh: "2023 年至今", hi: "2023 से", ar: "منذ 2023" },
    baslik: { tr: "Dikmen Meslek Lisesi", en: "Dikmen Vocational High School", es: "Instituto de Formación Profesional Dikmen", zh: "Dikmen 职业高中", hi: "Dikmen व्यावसायिक हाई स्कूल", ar: "ثانوية ديكمن المهنية" },
    alt: { tr: "Son sınıftayım; 2027'de mezun oluyorum.", en: "Final year; graduating in 2027.", es: "Último curso; me gradúo en 2027.", zh: "高三在读，2027 年毕业。", hi: "आख़िरी साल; 2027 में ग्रेजुएट हो रहा हूँ।", ar: "في السنة الأخيرة؛ أتخرّج عام 2027." },
  },
];

export const SERTIFIKALAR: { ad: Coklu; dosya: string }[] = [
  { ad: { tr: "Büyük Dil Modelleri ile Sesli Asistan Atölyesi", en: "Voice Assistants with LLMs workshop", es: "Taller de asistentes de voz con LLM", zh: "大语言模型语音助手工作坊", hi: "LLM के साथ वॉइस असिस्टेंट वर्कशॉप", ar: "ورشة المساعدات الصوتية بالنماذج اللغوية الكبيرة" }, dosya: "/certificate/Büyük_Dil_Modelleri_(LLM)_ile_Sesli_Asistan_Atölyesi_Sertifika.pdf" },
  { ad: { tr: "Full-Stack Web Geliştirme (Udemy)", en: "Full-Stack Web Development (Udemy)", es: "Desarrollo web full-stack (Udemy)", zh: "全栈 Web 开发（Udemy）", hi: "फ़ुल-स्टैक वेब डेवलपमेंट (Udemy)", ar: "تطوير الويب الشامل (Udemy)" }, dosya: "/certificate/udemy-full-stack-certficete.pdf" },
  { ad: { tr: "Node.js", en: "Node.js", es: "Node.js", zh: "Node.js", hi: "Node.js", ar: "Node.js" }, dosya: "/certificate/nodejscertficete.pdf" },
  { ad: { tr: "İngilizce Seviye Belirleme", en: "English Placement Test", es: "Prueba de nivel de inglés", zh: "英语分级测试", hi: "अंग्रेज़ी प्लेसमेंट टेस्ट", ar: "اختبار تحديد مستوى الإنجليزية" }, dosya: "/certificate/English_Placement_Test_Certificate.pdf" },
];

export const ARACLAR = "TypeScript, React, Next.js, Node.js, MySQL, Prisma, Drizzle, React Native, Expo, Python, Linux";

// Sık sorulanlar: hem ziyaretçi hem arama motorları ve yapay zekâ asistanları için "Umut Öztürk kim?" sorusunun net cevabı.
export const SSS: { s: Coklu; c: Coklu }[] = [
  {
    s: { tr: "Umut Öztürk kim?", en: "Who is Umut Öztürk?", es: "¿Quién es Umut Öztürk?", zh: "Umut Öztürk 是谁？", hi: "Umut Öztürk कौन है?", ar: "من هو Umut Öztürk؟" },
    c: {
      tr: "Umut Öztürk, 2009 doğumlu, Ankara'da yaşayan bir full-stack yazılım geliştirici. Dikmen Meslek Lisesi'nde son sınıfta, Eylül 2026'dan beri Sağlık Bank'ta stajyer. Bakım firmaları için saha kayıt sistemi Prokayit'i ve YKS oyunu Kapabil'i geliştiriyor.",
      en: "Umut Öztürk, born in 2009, is a full-stack software developer based in Ankara, Turkey. He is in his final year at Dikmen Vocational High School and has interned at Sağlık Bank since September 2026. He builds Prokayit, a field records platform for maintenance companies, and Kapabil, an exam-prep game.",
      es: "Umut Öztürk, nacido en 2009, es un desarrollador de software full-stack que vive en Ankara (Turquía). Cursa el último año en el Instituto de Formación Profesional Dikmen y hace prácticas en Sağlık Bank desde septiembre de 2026. Desarrolla Prokayit, una plataforma de registros de campo para empresas de mantenimiento, y Kapabil, un juego para preparar exámenes.",
      zh: "Umut Öztürk，2009 年出生，是一名居住在土耳其安卡拉的全栈软件开发者。他目前是 Dikmen 职业高中的高三学生，自 2026 年 9 月起在 Sağlık Bank 实习。他开发了面向维保公司的现场记录平台 Prokayit 和备考游戏 Kapabil。",
      hi: "Umut Öztürk (जन्म 2009) अंकारा, तुर्की में रहने वाले फ़ुल-स्टैक सॉफ़्टवेयर डेवलपर हैं। वे Dikmen व्यावसायिक हाई स्कूल के आख़िरी साल में हैं और सितंबर 2026 से Sağlık Bank में इंटर्न हैं। वे मेंटेनेंस कंपनियों के लिए फ़ील्ड रिकॉर्ड प्लेटफ़ॉर्म Prokayit और परीक्षा-तैयारी गेम Kapabil बना रहे हैं।",
      ar: "Umut Öztürk، من مواليد 2009، مطوّر برمجيات شامل (Full-stack) يعيش في أنقرة بتركيا. يدرس في السنة الأخيرة بثانوية ديكمن المهنية، ومتدرّب في Sağlık Bank منذ سبتمبر 2026. يطوّر Prokayit، منصة السجلات الميدانية لشركات الصيانة، وKapabil، لعبة التحضير للامتحانات.",
    },
  },
  {
    s: { tr: "Hangi teknolojileri kullanıyor?", en: "What technologies does he use?", es: "¿Qué tecnologías usa?", zh: "他使用哪些技术？", hi: "वे कौन-सी तकनीकें इस्तेमाल करते हैं?", ar: "ما التقنيات التي يستخدمها؟" },
    c: {
      tr: "Web için Next.js, React, TypeScript, Node.js ve MySQL (Prisma, Drizzle); mobil için React Native ve Expo; masaüstü ve otomasyon için Python ve Linux (GNOME Shell).",
      en: "Next.js, React, TypeScript, Node.js and MySQL (Prisma, Drizzle) for the web; React Native and Expo for mobile; Python and Linux (GNOME Shell) for desktop and automation.",
      es: "Next.js, React, TypeScript, Node.js y MySQL (Prisma, Drizzle) para la web; React Native y Expo para móvil; Python y Linux (GNOME Shell) para escritorio y automatización.",
      zh: "Web 端使用 Next.js、React、TypeScript、Node.js 和 MySQL（Prisma、Drizzle）；移动端使用 React Native 和 Expo；桌面与自动化使用 Python 和 Linux（GNOME Shell）。",
      hi: "वेब के लिए Next.js, React, TypeScript, Node.js और MySQL (Prisma, Drizzle); मोबाइल के लिए React Native और Expo; डेस्कटॉप और ऑटोमेशन के लिए Python और Linux (GNOME Shell)।",
      ar: "للويب: Next.js وReact وTypeScript وNode.js وMySQL (Prisma وDrizzle)؛ وللجوال: React Native وExpo؛ ولسطح المكتب والأتمتة: Python ولينكس (GNOME Shell).",
    },
  },
  {
    s: { tr: "Umut Öztürk'e nasıl ulaşılır?", en: "How can I contact Umut Öztürk?", es: "¿Cómo contactar con Umut Öztürk?", zh: "如何联系 Umut Öztürk？", hi: "Umut Öztürk से कैसे संपर्क करें?", ar: "كيف أتواصل مع Umut Öztürk؟" },
    c: {
      tr: "E-posta: umutozturk.mee@gmail.com. Kodları GitHub'da: github.com/HIMURAw. Web sitesi, mobil uygulama ve otomasyon işleri için yazabilirsin; genelde aynı gün döner.",
      en: "Email umutozturk.mee@gmail.com. His code is on GitHub at github.com/HIMURAw. Write to him about websites, mobile apps or automation; he usually replies the same day.",
      es: "Correo: umutozturk.mee@gmail.com. Su código está en GitHub: github.com/HIMURAw. Puedes escribirle sobre sitios web, apps móviles o automatización; suele responder el mismo día.",
      zh: "邮箱：umutozturk.mee@gmail.com。代码在 GitHub：github.com/HIMURAw。网站、移动应用或自动化项目都可以联系他，通常当天回复。",
      hi: "ईमेल: umutozturk.mee@gmail.com। उनका कोड GitHub पर है: github.com/HIMURAw। वेबसाइट, मोबाइल ऐप या ऑटोमेशन के लिए लिख सकते हैं; आम तौर पर उसी दिन जवाब मिलता है।",
      ar: "البريد الإلكتروني: umutozturk.mee@gmail.com. شيفرته على GitHub: github.com/HIMURAw. يمكنك مراسلته بشأن المواقع وتطبيقات الجوال والأتمتة؛ وعادةً ما يرد في اليوم نفسه.",
    },
  },
];

export type Parca = readonly (readonly [string, boolean])[];

type Metin = {
  ust1: string; ust2: string; dilMenu: string; atla: string; kisa: string; yazDugme: string; yazNot: string;
  calismalar: Parca; ben: string; afisIpucu: string; yaptiklarim: Parca; yol: Parca; sertifikaBaslik: string;
  sertifikaNot: string; araclarBaslik: string; sss: Parca; iletisim: Parca; iletisimMetin: string; epostaNot: string;
  kopyala: string; kopyalandi: string; cv: string; alt: string; yukari: string; fotoAlt: string;
};

export const METIN: Record<Dil, Metin> = {
  tr: {
    ust1: "Full-stack", ust2: "Geliştirici", dilMenu: "Dil seç", atla: "İçeriğe geç",
    kisa: "Fikri, insanların her gün kullandığı bir ürüne çeviriyorum: web, mobil ve masaüstü. Ankara'dayım, 17 yaşındayım.",
    yazDugme: "Bir işin mi var? Bana yaz", yazNot: "Sayfanın sonundaki iletişim bölümüne iner.",
    calismalar: [["Çalışmalarım", true]],
    ben: "Dikmen Meslek Lisesi'nde son sınıftayım, haftanın üç günü Sağlık Bank'ta stajdayım. Yaptığım her şeyi yayına kadar götürürüm; aşağıdakilerin hepsi çalışıyor.",
    afisIpucu: "Afişin üstüne gel, renkleri geri gelsin.",
    yaptiklarim: [["Neler", true], ["yaparım", false]], yol: [["Yol", true]],
    sertifikaBaslik: "Sertifikalar", sertifikaNot: "Her biri PDF olarak yeni sekmede açılır.", araclarBaslik: "Kullandıklarım",
    sss: [["Sık", false], ["sorulanlar", true]],
    iletisim: [["Bana", true], ["yaz", false]],
    iletisimMetin: "Bir web sitesi, mobil uygulama ya da otomasyon için yaz. Genelde aynı gün dönerim.",
    epostaNot: "Tıklayınca e-posta uygulaman açılır.", kopyala: "Adresi kopyala", kopyalandi: "Kopyalandı",
    cv: "Özgeçmişimi indir (.docx)", alt: "Ankara'da, kendi bilgisayarımda yapıldı.", yukari: "Başa dön",
    fotoAlt: "Umut Öztürk, gece, boynunda kulaklık",
  },
  en: {
    ust1: "Full-stack", ust2: "Developer", dilMenu: "Choose language", atla: "Skip to content",
    kisa: "I turn ideas into products people use every day: web, mobile and desktop. I'm 17 and based in Ankara.",
    yazDugme: "Got a project? Write to me", yazNot: "Jumps to the contact section at the bottom.",
    calismalar: [["My", false], ["work", true]],
    ben: "I'm in my final year at a vocational high school and intern three days a week at Sağlık Bank. I take everything I make all the way to release; everything below works.",
    afisIpucu: "Hover a poster to bring its colours back.",
    yaptiklarim: [["What", true], ["I build", false]], yol: [["So", false], ["far", true]],
    sertifikaBaslik: "Certificates", sertifikaNot: "Each opens as a PDF in a new tab.", araclarBaslik: "Tools I use",
    sss: [["Good to", false], ["know", true]],
    iletisim: [["Write", true], ["to me", false]],
    iletisimMetin: "Write to me about a website, a mobile app or an automation. I usually reply the same day.",
    epostaNot: "Opens your e-mail app.", kopyala: "Copy address", kopyalandi: "Copied",
    cv: "Download my résumé (.docx, Turkish)", alt: "Made in Ankara, on my own computer.", yukari: "Back to top",
    fotoAlt: "Umut Öztürk at night, headphones around his neck",
  },
  es: {
    ust1: "Full-stack", ust2: "Desarrollador", dilMenu: "Elegir idioma", atla: "Ir al contenido",
    kisa: "Convierto ideas en productos que la gente usa a diario: web, móvil y escritorio. Tengo 17 años y vivo en Ankara.",
    yazDugme: "¿Tienes un proyecto? Escríbeme", yazNot: "Baja a la sección de contacto al final de la página.",
    calismalar: [["Mis", false], ["trabajos", true]],
    ben: "Estoy en el último curso de un instituto de formación profesional y hago prácticas tres días a la semana en Sağlık Bank. Llevo todo lo que hago hasta su lanzamiento; todo lo de abajo funciona.",
    afisIpucu: "Pasa el cursor por un cartel para devolverle sus colores.",
    yaptiklarim: [["Lo que", false], ["hago", true]], yol: [["Mi", false], ["camino", true]],
    sertifikaBaslik: "Certificados", sertifikaNot: "Cada uno se abre como PDF en una pestaña nueva.", araclarBaslik: "Herramientas",
    sss: [["Preguntas", true], ["frecuentes", false]],
    iletisim: [["Escríbeme", true]],
    iletisimMetin: "Escríbeme sobre un sitio web, una app móvil o una automatización. Suelo responder el mismo día.",
    epostaNot: "Abre tu aplicación de correo.", kopyala: "Copiar dirección", kopyalandi: "Copiada",
    cv: "Descargar mi currículum (.docx, en turco)", alt: "Hecho en Ankara, en mi propio ordenador.", yukari: "Volver arriba",
    fotoAlt: "Umut Öztürk de noche, con auriculares al cuello",
  },
  zh: {
    ust1: "全栈", ust2: "开发者", dilMenu: "选择语言", atla: "跳到正文",
    kisa: "我把想法变成人们每天都在用的产品：Web、移动端和桌面端。我今年 17 岁，住在安卡拉。",
    yazDugme: "有项目？给我写信", yazNot: "跳到页面底部的联系方式。",
    calismalar: [["我的", false], ["作品", true]],
    ben: "我是一名职业高中的高三学生，每周在 Sağlık Bank 实习三天。我做的每样东西都会一直做到上线；下面这些全都能用。",
    afisIpucu: "把鼠标移到海报上，颜色就会回来。",
    yaptiklarim: [["我能", false], ["做什么", true]], yol: [["经历", true]],
    sertifikaBaslik: "证书", sertifikaNot: "每个都会在新标签页中以 PDF 打开。", araclarBaslik: "常用工具",
    sss: [["常见", false], ["问题", true]],
    iletisim: [["联系", true], ["我", false]],
    iletisimMetin: "网站、移动应用或自动化项目，都可以写信给我。我通常当天回复。",
    epostaNot: "会打开你的邮件应用。", kopyala: "复制地址", kopyalandi: "已复制",
    cv: "下载我的简历（.docx，土耳其语）", alt: "在安卡拉，用我自己的电脑做成。", yukari: "回到顶部",
    fotoAlt: "夜晚的 Umut Öztürk，脖子上挂着耳机",
  },
  hi: {
    ust1: "फ़ुल-स्टैक", ust2: "डेवलपर", dilMenu: "भाषा चुनें", atla: "सामग्री पर जाएँ",
    kisa: "मैं विचारों को ऐसे प्रोडक्ट में बदलता हूँ जिन्हें लोग रोज़ इस्तेमाल करते हैं: वेब, मोबाइल और डेस्कटॉप। मैं 17 साल का हूँ और अंकारा में रहता हूँ।",
    yazDugme: "कोई प्रोजेक्ट है? मुझे लिखें", yazNot: "पेज के नीचे संपर्क वाले हिस्से पर ले जाता है।",
    calismalar: [["मेरा", false], ["काम", true]],
    ben: "मैं एक व्यावसायिक हाई स्कूल के आख़िरी साल में हूँ और हफ़्ते में तीन दिन Sağlık Bank में इंटर्नशिप करता हूँ। मैं जो भी बनाता हूँ उसे रिलीज़ तक ले जाता हूँ; नीचे की हर चीज़ काम करती है।",
    afisIpucu: "पोस्टर पर माउस ले जाएँ, उसके रंग लौट आएँगे।",
    yaptiklarim: [["मैं क्या", false], ["बनाता हूँ", true]], yol: [["अब तक", true]],
    sertifikaBaslik: "सर्टिफ़िकेट", sertifikaNot: "हर एक नए टैब में PDF के रूप में खुलता है।", araclarBaslik: "मेरे टूल",
    sss: [["अक्सर पूछे", false], ["सवाल", true]],
    iletisim: [["मुझे", false], ["लिखें", true]],
    iletisimMetin: "वेबसाइट, मोबाइल ऐप या ऑटोमेशन के लिए मुझे लिखें। मैं आम तौर पर उसी दिन जवाब देता हूँ।",
    epostaNot: "आपका ईमेल ऐप खुलता है।", kopyala: "पता कॉपी करें", kopyalandi: "कॉपी हो गया",
    cv: "मेरा रिज़्यूमे डाउनलोड करें (.docx, तुर्की में)", alt: "अंकारा में, मेरे अपने कंप्यूटर पर बना।", yukari: "ऊपर जाएँ",
    fotoAlt: "रात में Umut Öztürk, गले में हेडफ़ोन",
  },
  ar: {
    ust1: "Full-stack", ust2: "مطوّر", dilMenu: "اختر اللغة", atla: "انتقل إلى المحتوى",
    kisa: "أحوّل الأفكار إلى منتجات يستخدمها الناس كل يوم: للويب والجوال وسطح المكتب. عمري 17 عامًا وأعيش في أنقرة.",
    yazDugme: "لديك مشروع؟ راسلني", yazNot: "ينقلك إلى قسم التواصل أسفل الصفحة.",
    calismalar: [["أعمالي", true]],
    ben: "أدرس في السنة الأخيرة بثانوية مهنية، وأتدرّب ثلاثة أيام أسبوعيًا في Sağlık Bank. أصل بكل ما أصنعه حتى الإطلاق؛ كل ما في الأسفل يعمل فعلًا.",
    afisIpucu: "مرّر المؤشر فوق الملصق لتعود ألوانه.",
    yaptiklarim: [["ماذا", false], ["أصنع", true]], yol: [["مسيرتي", true]],
    sertifikaBaslik: "الشهادات", sertifikaNot: "يُفتح كل منها كملف PDF في علامة تبويب جديدة.", araclarBaslik: "أدواتي",
    sss: [["أسئلة", true], ["شائعة", false]],
    iletisim: [["راسلني", true]],
    iletisimMetin: "راسلني بشأن موقع ويب أو تطبيق جوال أو أتمتة. عادةً أرد في اليوم نفسه.",
    epostaNot: "يفتح تطبيق البريد لديك.", kopyala: "انسخ العنوان", kopyalandi: "تم النسخ",
    cv: "نزّل سيرتي الذاتية (.docx، بالتركية)", alt: "صُنع في أنقرة، على حاسوبي الخاص.", yukari: "العودة إلى الأعلى",
    fotoAlt: "Umut Öztürk ليلًا، وسماعات الرأس حول عنقه",
  },
};
