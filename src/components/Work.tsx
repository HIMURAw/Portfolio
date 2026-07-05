import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "../context/LanguageProvider";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "PIXEON",
    categoryKey: "pixeon",
    tools: "TypeScript, React, Tailwind CSS, Vercel",
    image: "/images/pixeon_cover.png",
    githubUrl: "https://github.com/HIMURAw/PIXEON"
  },
  {
    title: "PX-Guard",
    categoryKey: "pxguard",
    tools: "JavaScript, Node.js, Discord.js (Anti-Raid, Anti-Spam)",
    image: "/images/px_guard_cover.png",
    githubUrl: "https://github.com/HIMURAw/PX-Guard"
  },
  {
    title: "Pixel-License",
    categoryKey: "pixellicense",
    tools: "JavaScript, Discord.js, Node.js (FiveM licensing)",
    image: "/images/pixel_license_cover.png",
    githubUrl: "https://github.com/HIMURAw/Pixel-License"
  },
  {
    title: "Backdoor-scanner",
    categoryKey: "backdoorscanner",
    tools: "Batchfile, Windows Scripting (FiveM scanner)",
    image: "/images/backdoor_scanner_cover.png",
    githubUrl: "https://github.com/HIMURAw/Backdoor-scanner"
  },
  {
    title: "Kay-IT",
    categoryKey: "kayit",
    tools: "C#, WinForms / WPF, SQL Server (Fire Detector)",
    image: "/images/kay_it_cover.png",
    githubUrl: "https://github.com/HIMURAw"
  }
];

const Work = () => {
  const { t } = useLanguage();

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const getTranslateX = () => {
        const box = document.getElementsByClassName("work-box");
        if (!box || !box.length) return 0;
        const container = document.querySelector(".work-container");
        if (!container) return 0;

        const rectLeft = container.getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
        let padding: number =
          parseInt(window.getComputedStyle(box[0]).padding) / 2;
        return rect.width * box.length - (rectLeft + parentWidth) + padding;
      };

      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: true,
          pin: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: () => -getTranslateX(),
        ease: "none",
      });

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          {t.work.title.split(" ")[0]} <span>{t.work.title.split(" ").slice(1).join(" ")}</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="work-box" 
              key={index}
              data-cursor="disable"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{t.work.categories[project.categoryKey as keyof typeof t.work.categories]}</p>
                  </div>
                </div>
                <h4>{t.work.tools_title}</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
