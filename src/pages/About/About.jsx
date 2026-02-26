import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect, useContext } from "react";
import { Page } from "../../components/Page";
import { useLanguage, NavbarContext } from "../../context";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import meb from "../../assets/images/meb-logo.png";
import pxdev from "../../assets/images/pxdev.png";
import web from "../../assets/images/web.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { t } = useLanguage();
  const setPage = useContext(NavbarContext);
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);

  useEffect(() => {
    if (inView) {
      setPage("about");
    }
  }, [inView]);

  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    const cards = document.querySelectorAll(".about-item");

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
      if (i === 0 && !document.querySelector(".about-item.active")) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", handleInteraction);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleInteraction);
      });
    };
  }, []);
  return (
    <div ref={ref}>
      <Page header={t("about.header")} id="about">
        <Text>
          <Paragraph>
            {t("about.bio1")}
            <br />
            {t("about.bio2")}
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: t("about.items.dikmen.title"),
                p: t("about.items.dikmen.p"),
                image: meb,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: t("about.items.gameDev.title"),
                p: t("about.items.gameDev.p"),
                image: pxdev,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: t("about.items.webDev.title"),
                p: t("about.items.webDev.p"),
                image: web,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
