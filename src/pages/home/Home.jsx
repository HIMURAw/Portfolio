import { Canvas } from "@react-three/fiber";
import React, { useContext, useEffect } from "react";
import { useLanguage } from "../../context";
import { useInView } from "react-intersection-observer";
import { NavbarContext } from "../../context";
import Dog from "./Dog";
import {
  AnimatedSpan,
  DogContainer,
  HomeWrapper,
  Name,
  Position,
  TextContainer,
} from "./Home.styled";

export const Home = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const setPage = useContext(NavbarContext);

  useEffect(() => {
    if (inView) {
      setPage("home");
    }
  }, [inView]);

  const produceSpans = (name) => {
    return name.split("").map((letter, index) => (
      <AnimatedSpan
        index={index}
        letter={letter}
        aria-hidden="true"
        key={index}
      >
        {letter}
      </AnimatedSpan>
    ));
  };
  return (
    <HomeWrapper ref={ref} id="home-page">
      <TextContainer>
        <Name>Umut Öztürk</Name>
        <Position>
          <div className="text first" aria-label={t("home.role1")}>
            {produceSpans(t("home.role1"))}
          </div>
          <div className="text second" aria-label={t("home.role2")}>
            {produceSpans(t("home.role2"))}
          </div>
        </Position>
      </TextContainer>
      <DogContainer>
        <Canvas camera={{ position: [0, 2, 5] }}>
          <Dog />
        </Canvas>
      </DogContainer>
    </HomeWrapper>
  );
};
