import { PropsWithChildren, useEffect } from "react";
import { useLanguage } from "../context/LanguageProvider";
import { reinitLandingFX } from "./utils/initialFX";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    reinitLandingFX();
  }, [language]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container" key={language}>
          <div className="landing-intro">
            <h2>{t.landing.hello}</h2>
            <h1>
              UMUT
              <br />
              <span>ÖZTÜRK</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{t.landing.creative}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{t.landing.designer}</div>
              <div className="landing-h2-2">{t.landing.developer}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{t.landing.developer}</div>
              <div className="landing-h2-info-1">{t.landing.designer}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

