import { useRef } from "react";
import { useLanguage } from "../context/LanguageProvider";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaNodeJs,
  FaCode,
  FaJava,
  FaPython,
  FaGithub,
  FaBootstrap,
  FaFigma,
  FaSass,
  FaWordpress,
  FaUbuntu,
  FaWindows,
  FaBrain,
} from "react-icons/fa6";
import {
  SiSharp,
  SiTypescript,
  SiTailwindcss,
  SiLua,
  SiExpress,
  SiDiscord,
  SiElectron,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiNextdotjs,
  SiNestjs,
  SiNginx,
  SiVercel,
  SiBlender,
  SiAndroidstudio,
  SiPostman,
} from "react-icons/si";
import {
  TbBrandVscode,
  TbBrandVisualStudio,
  TbBrandAdobePremiere,
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
} from "react-icons/tb";

const categoriesData = [
  {
    titleTr: "PROGRAMLAMA DİLLERİ",
    titleEn: "PROGRAMMING LANGUAGES",
    items: [
      { name: "Java", icon: FaJava, color: "#f89820", alphaColor: "rgba(248, 152, 32, 0.15)" },
      { name: "C#", icon: SiSharp, color: "#854cc7", alphaColor: "rgba(133, 76, 199, 0.15)" },
      { name: "JavaScript", icon: FaJs, color: "#f7df1e", alphaColor: "rgba(247, 223, 30, 0.15)" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6", alphaColor: "rgba(49, 120, 198, 0.15)" },
      { name: "Lua", icon: SiLua, color: "#0255a3", alphaColor: "rgba(2, 85, 163, 0.15)" },
      { name: "Python", icon: FaPython, color: "#3776ab", alphaColor: "rgba(55, 118, 171, 0.15)" },
      { name: "HTML5", icon: FaHtml5, color: "#e34f26", alphaColor: "rgba(227, 79, 38, 0.15)" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572b6", alphaColor: "rgba(21, 114, 182, 0.15)" },
      { name: "Sass", icon: FaSass, color: "#cc6699", alphaColor: "rgba(204, 102, 153, 0.15)" },
      { name: "JSON", icon: FaCode, color: "#ffffff", alphaColor: "rgba(255, 255, 255, 0.15)" },
    ],
  },
  {
    titleTr: "ÖN YÜZ & MOBİL",
    titleEn: "FRONTEND & MOBILE",
    items: [
      { name: "React", icon: FaReact, color: "#61dafb", alphaColor: "rgba(97, 218, 251, 0.15)" },
      { name: "React Native", icon: FaReact, color: "#61dafb", alphaColor: "rgba(97, 218, 251, 0.15)" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", alphaColor: "rgba(255, 255, 255, 0.15)" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4", alphaColor: "rgba(6, 182, 212, 0.15)" },
      { name: "Bootstrap", icon: FaBootstrap, color: "#7952b3", alphaColor: "rgba(121, 82, 179, 0.15)" },
      { name: "Figma", icon: FaFigma, color: "#f24e1e", alphaColor: "rgba(242, 78, 30, 0.15)" },
      { name: "WordPress", icon: FaWordpress, color: "#21759b", alphaColor: "rgba(33, 117, 155, 0.15)" },
    ],
  },
  {
    titleTr: "ARKA YÜZ & VERİTABANI",
    titleEn: "BACKEND & DATABASE",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933", alphaColor: "rgba(51, 153, 81, 0.15)" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff", alphaColor: "rgba(255, 255, 255, 0.15)" },
      { name: "NestJS", icon: SiNestjs, color: "#e0234e", alphaColor: "rgba(224, 35, 78, 0.15)" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248", alphaColor: "rgba(71, 162, 72, 0.15)" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1", alphaColor: "rgba(65, 105, 225, 0.15)" },
      { name: "MySQL", icon: SiMysql, color: "#00758f", alphaColor: "rgba(0, 117, 143, 0.15)" },
      { name: "Discord.js", icon: SiDiscord, color: "#5865f2", alphaColor: "rgba(88, 101, 242, 0.15)" },
      { name: "Electron.js", icon: SiElectron, color: "#47848f", alphaColor: "rgba(71, 132, 143, 0.15)" },
    ],
  },
  {
    titleTr: "DEVOPS & SİSTEMLER",
    titleEn: "DEVOPS & SYSTEMS",
    items: [
      { name: "Git", icon: FaGitAlt, color: "#f05032", alphaColor: "rgba(240, 80, 50, 0.15)" },
      { name: "GitHub", icon: FaGithub, color: "#ffffff", alphaColor: "rgba(255, 255, 255, 0.15)" },
      { name: "Nginx", icon: SiNginx, color: "#009639", alphaColor: "rgba(0, 150, 57, 0.15)" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff", alphaColor: "rgba(255, 255, 255, 0.15)" },
      { name: "LLM", icon: FaBrain, color: "#c2a4ff", alphaColor: "rgba(194, 164, 255, 0.15)" },
      { name: "Ubuntu", icon: FaUbuntu, color: "#e95420", alphaColor: "rgba(233, 84, 32, 0.15)" },
      { name: "Windows", icon: FaWindows, color: "#0078d4", alphaColor: "rgba(0, 120, 212, 0.15)" },
    ],
  },
  {
    titleTr: "TASARIM & GELİŞTİRME ARAÇLARI",
    titleEn: "DESIGN & DEVELOPMENT TOOLS",
    items: [
      { name: "VS Code", icon: TbBrandVscode, color: "#007acc", alphaColor: "rgba(0, 122, 204, 0.15)" },
      { name: "Visual Studio", icon: TbBrandVisualStudio, color: "#5c2d91", alphaColor: "rgba(92, 45, 145, 0.15)" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3ddc84", alphaColor: "rgba(61, 220, 132, 0.15)" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37", alphaColor: "rgba(255, 108, 55, 0.15)" },
      { name: "Photoshop", icon: TbBrandAdobePhotoshop, color: "#31a8ff", alphaColor: "rgba(49, 168, 255, 0.15)" },
      { name: "Illustrator", icon: TbBrandAdobeIllustrator, color: "#ff9a00", alphaColor: "rgba(255, 154, 0, 0.15)" },
      { name: "Blender", icon: SiBlender, color: "#e87d0d", alphaColor: "rgba(232, 125, 13, 0.15)" },
      { name: "Premiere Pro", icon: TbBrandAdobePremiere, color: "#9999ff", alphaColor: "rgba(153, 153, 255, 0.15)" },
    ],
  },
];

const TechStack = () => {
  const { t, language } = useLanguage();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    catIndex: number,
    itemIndex: number
  ) => {
    const uniqueIndex = catIndex * 100 + itemIndex;
    const card = cardRefs.current[uniqueIndex];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="techstack" id="techstack">
      <h2>{t.techstack.title}</h2>

      <div className="tech-sections-container">
        {categoriesData.map((category, catIndex) => (
          <div className="tech-cat-section" key={catIndex}>
            <h3>
              {language === "tr" ? category.titleTr : category.titleEn}
            </h3>
            
            <div className="tech-grid">
              {category.items.map((tech, itemIndex) => {
                const IconComponent = tech.icon;
                const uniqueIndex = catIndex * 100 + itemIndex;
                return (
                  <div
                    key={tech.name}
                    ref={(el) => (cardRefs.current[uniqueIndex] = el)}
                    className="tech-card"
                    onMouseMove={(e) => handleMouseMove(e, catIndex, itemIndex)}
                    style={
                      {
                        "--tech-color": tech.color,
                        "--tech-color-alpha": tech.alphaColor,
                      } as React.CSSProperties
                    }
                  >
                    <div className="tech-icon-wrap">
                      <IconComponent />
                    </div>
                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
