import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import dyp from "../../assets/images/dyp.png";
import highschool from "../../assets/images/highschool.jpeg";
import sos from "../../assets/images/sos.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
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
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            I'm a 17-year-old full-stack developer from Turkey, focused on
            building clean, scalable systems that power real communities and
            servers. I love designing interactive experiences, from FiveM game
            systems and Discord bots to modern web apps.
            <br />
            I care about writing maintainable code, experimenting with new
            technologies and constantly pushing myself to the next level. When
            I'm not coding, I explore new ideas, learn, and improve my craft.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "Dikmen Meslek Lisesi",
                p: "Self-taught Full-Stack Developer • 17 years old",
                image: dyp,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Game & FiveM Development",
                p: "Advanced FiveM systems, Lua, JavaScript and server architecture",
                image: highschool,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: "Web & Community Projects",
                p: "React, Next.js, Node.js, databases and Discord bot ecosystems",
                image: sos,
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
