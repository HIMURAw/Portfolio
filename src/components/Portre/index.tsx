// Ana sayfadaki portre: 3D karakterin yerine Umut'un kesilmiş fotoğrafı.
// İmleci hafifçe takip eden perspektif eğimiyle 2.5D derinlik verir.
import { useEffect, useRef } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import { setPortreTimeline, setAllTimeline } from "../utils/GsapScroll";
import "./Portre.css";

const Portre = () => {
  const kutu = useRef<HTMLDivElement>(null);
  const resim = useRef<HTMLImageElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const progress = setProgress((v) => setLoading(v));
    const img = resim.current!;
    const bitti = () => {
      progress.loaded().then(() => {
        setTimeout(() => kutu.current?.classList.add("character-loaded"), 2500);
      });
      setPortreTimeline();
      setAllTimeline();
    };
    if (img.complete) bitti();
    else img.addEventListener("load", bitti, { once: true });

    let hedef = { x: 0, y: 0 }, su = { x: 0, y: 0 }, kare = 0;
    const hareket = (x: number, y: number) => {
      hedef = { x: (x / innerWidth) * 2 - 1, y: (y / innerHeight) * 2 - 1 };
    };
    const fare = (e: MouseEvent) => hareket(e.clientX, e.clientY);
    const dokun = (e: TouchEvent) => e.touches[0] && hareket(e.touches[0].clientX, e.touches[0].clientY);
    const dongu = () => {
      su.x += (hedef.x - su.x) * 0.06;
      su.y += (hedef.y - su.y) * 0.06;
      kutu.current?.style.setProperty("--rx", `${(-su.y * 5).toFixed(2)}deg`);
      kutu.current?.style.setProperty("--ry", `${(su.x * 8).toFixed(2)}deg`);
      kutu.current?.style.setProperty("--tx", `${(su.x * 14).toFixed(1)}px`);
      kare = requestAnimationFrame(dongu);
    };
    const azHareket = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!azHareket) {
      addEventListener("mousemove", fare);
      addEventListener("touchmove", dokun, { passive: true });
      kare = requestAnimationFrame(dongu);
    }
    return () => {
      progress.clear();
      cancelAnimationFrame(kare);
      removeEventListener("mousemove", fare);
      removeEventListener("touchmove", dokun);
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model portre" ref={kutu}>
        <div className="character-rim"></div>
        <div className="portre-sahne">
          <img ref={resim} src="/images/umut.webp" alt="Umut Öztürk" draggable={false} />
        </div>
      </div>
    </div>
  );
};

export default Portre;
