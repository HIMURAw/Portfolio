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
    const cards = document.querySelectorAll(".experience-item");

    const eventType = width < 720 ? "click" : "mouseenter";

    const handleInteraction = (e) => {
      const card = e.currentTarget;
      if (card.classList.contains("active")) return;

      const state = Flip.getState(cards);

      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      Flip.from(state, {
        duration: 0.5,
        ease: "elastic.out(1,0.9)",
        absolute: true,
      });
    };

    cards.forEach((card, i) => {
      if (i === 0 && !document.querySelector(".experience-item.active")) {
        card.classList.add("active");
      }
      card.addEventListener(eventType, handleInteraction);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener(eventType, handleInteraction);
      });
    };
  }, [width, localizedExperiences]);
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
