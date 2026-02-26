import React, { useRef, useContext, useEffect } from "react";
import { Page } from "../../components/Page";
import { useLanguage, NavbarContext } from "../../context";
import { projects } from "../../data";
import { NextButton } from "./carasoulButton";
import { ProjectItem } from "./ProjectItem";
import { Carasoul, ProjectContainer } from "./Projects.styled";
import { useInView } from "react-intersection-observer";

export const Projects = () => {
  const { t } = useLanguage();
  const setPage = useContext(NavbarContext);
  const { ref: viewRef, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) setPage("projects");
  }, [inView]);

  const ref = useRef(null);

  // Localized projects mapping (overriding descriptions)
  const localizedProjects = [
    { ...projects[0], description: t("projects.items.pxguard.description") },
    { ...projects[1], description: t("projects.items.pixelLicense.description") },
    { ...projects[2], description: t("projects.items.backdoor.description") },
    { ...projects[3], description: t("projects.items.botbase.description") },
    { ...projects[4], description: t("projects.items.pxbotbasets.description") },
  ];

  const moveLeft = (e) => {
    console.log(ref.current.scrollLeft);
    document.querySelector(".wrapper").scrollLeft += 600;
  };
  const moveRight = (e) => {
    document.querySelector(".wrapper").scrollLeft -= 650;
  };

  return (
    <div ref={viewRef}>
      <Page header={t("projects.header")} id="projects">
        <ProjectContainer ref={ref}>
          <div className="wrapper">
            {localizedProjects.map((data, index) => (
              <ProjectItem data={data} key={index} index={index} />
            ))}
          </div>
        </ProjectContainer>
        <Carasoul>
          <NextButton flip onClick={moveRight} />
          <NextButton onClick={moveLeft} />
        </Carasoul>
      </Page>
    </div>
  );
};
