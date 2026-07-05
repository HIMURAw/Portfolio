import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLanguage } from "../context/LanguageProvider";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;
export const setSmoother = (val: ScrollSmoother) => {
  smoother = val;
};

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024 && smoother) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
  }, []);
  return (
    <>
      <div className="header">
        <div className="navbar-language" data-cursor="disable">
          <button
            className={`lang-btn ${language === "tr" ? "active" : ""}`}
            onClick={() => setLanguage("tr")}
          >
            TR
          </button>
          <span className="lang-separator">/</span>
          <button
            className={`lang-btn ${language === "en" ? "active" : ""}`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
        <a
          href="mailto:zamtos79@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          zamtos79@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text={t.navbar.about} />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text={t.navbar.work} />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text={t.navbar.contact} />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
