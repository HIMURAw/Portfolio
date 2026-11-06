/* Umut'un sitelerinin ziyaret sayacı (umutozturk.me/panel'e yazar). Çerez yok, kişisel veri saklanmaz:
   sunucu ziyaretçiyi yalnız o güne özel bir karma ile sayar, ertesi gün aynı kişi tanınamaz.
   Kullanım: <script defer src="https://umutozturk.me/a.js" data-site="ornek.com"></script> */
(function () {
  var d = document, n = navigator, s = d.currentScript;
  if (n.webdriver || /bot|crawl|spider|headless|lighthouse|preview/i.test(n.userAgent)) return;
  if (location.protocol !== "https:") return;
  var site = (s && s.getAttribute("data-site")) || location.hostname;
  var adres = "https://umutozturk.me/panel/a";
  var yol = "", sure = 0, son = Date.now(), gorunur = !d.hidden, enDerin = 0;
  function yolla(o) {
    o.s = site;
    var b = JSON.stringify(o);
    try { if (n.sendBeacon && n.sendBeacon(adres, b)) return; } catch (e) {}
    try { fetch(adres, { method: "POST", body: b, keepalive: true, mode: "no-cors" }); } catch (e) {}
  }
  function derinlik() {
    var h = d.documentElement.scrollHeight - innerHeight;
    var y = h > 0 ? Math.round((scrollY / h) * 100) : 100;
    if (y > enDerin) enDerin = Math.min(100, y);
  }
  function gosterim() {
    yol = location.pathname; sure = 0; son = Date.now(); enDerin = 0; derinlik();
    var r = d.referrer && d.referrer.indexOf(location.origin) !== 0 ? d.referrer : "";
    var q = new URLSearchParams(location.search);
    yolla({ t: "g", p: yol, r: r, w: innerWidth, l: n.language || "", u: q.get("utm_source") || q.get("ref") || "" });
  }
  function bitir() {
    if (gorunur) sure += Date.now() - son;
    son = Date.now();
    if (sure > 1500) yolla({ t: "s", p: yol, ms: Math.min(sure, 3600000), d: enDerin });
    sure = 0;
  }
  addEventListener("scroll", derinlik, { passive: true });
  d.addEventListener("visibilitychange", function () {
    if (d.hidden) { bitir(); gorunur = false; } else { gorunur = true; son = Date.now(); }
  });
  // tek sayfalık uygulamalarda (Next.js) adres değişince yeni gösterim
  var ps = history.pushState;
  history.pushState = function () { var r = ps.apply(this, arguments); if (location.pathname !== yol) { bitir(); gosterim(); } return r; };
  addEventListener("popstate", function () { if (location.pathname !== yol) { bitir(); gosterim(); } });
  gosterim();
})();
