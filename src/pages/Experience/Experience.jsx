import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect, useContext } from "react";
import { Page } from "../../components/Page";
import { useLanguage, NavbarContext } from "../../context";
import { experiences } from "../../data";
import { useScreenWidth } from "../../hooks";
import { ExperienceItem } from "./ExperienceItem";
import { StyledExperienceLayout } from "./ExperienceLayout.styled";

import { useInView } from "react-intersection-observer";

export const Experience = () => {
  const { t } = useLanguage();
  const setPage = useContext(NavbarContext);
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) setPage("experience");
  }, [inView]);

  const { width } = useScreenWidth();

  // Localized experiences mapping
  const localizedExperiences = [
    { ...experiences[0], ...t("experience.items.pxdev") },
    { ...experiences[1], ...t("experience.items.fivem") },
    { ...experiences[2], ...t("experience.items.webapi") },
    { ...experiences[3], ...t("experience.items.discord") },
  ];

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".experience-item");
    cards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener(width < 720 ? "click" : "mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, [width]);
  return (
    <div ref={ref}>
      <Page header={t("experience.header")} id="experience">
        <StyledExperienceLayout>
          {localizedExperiences.map((exp, index) => (
            <ExperienceItem key={index} data={exp} />
          ))}
        </StyledExperienceLayout>
      </Page>
    </div>
  );
};
