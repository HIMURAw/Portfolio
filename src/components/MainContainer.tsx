import { PropsWithChildren, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStack from "./TechStack";
import GithubStats from "./GithubStats";
import Certificates from "./Certificates";
import { setSmoother } from "./Navbar";
import setSplitText from "./utils/splitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const isDesktop = window.innerWidth > 1024;
    let smootherInstance: any = null;

    if (isDesktop) {
      // Initialize ScrollSmoother only for desktop screens
      smootherInstance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      smootherInstance.scrollTop(0);
      smootherInstance.paused(true);
      setSmoother(smootherInstance);
    } else {
      setSmoother(null as any);
    }

    setIsReady(true);

    // Setup resize listener
    const resizeHandler = () => {
      setSplitText();
      const currentIsDesktop = window.innerWidth > 1024;
      setIsDesktopView(currentIsDesktop);
      
      const activeSmoother = ScrollSmoother.get();
      if (activeSmoother) {
        ScrollSmoother.refresh(true);
      }
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            {isReady && (
              <>
                <Landing>{!isDesktopView && children}</Landing>
                <About />
                <WhatIDo />
                <Certificates />
                <Career />
                <Work />
                <TechStack />
                <GithubStats />
                <Contact />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
