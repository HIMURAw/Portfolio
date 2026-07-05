import { useEffect } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

const About = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Refresh ScrollTrigger after the DOM updates with the new text to recalculate heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{t.about.title}</h3>
        <p className="para" dangerouslySetInnerHTML={{ __html: t.about.para }} />
      </div>
    </div>
  );
};

export default About;

