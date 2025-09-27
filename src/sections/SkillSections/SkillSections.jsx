import LayerStack from "../../components/LayerStack";
import Card from "./components/Card";
// skillIcons.js
import {
  MongoDB,
  MySQL,
  GitHub,
  React,
  Redux,
  JavaScript,
  TailwindCSS,
  Nodejs,
  CSS,
  HTML5,
  Vite,
  VisualStudioCode,
  Motion,
  Expressjs,
} from "../../components/icons/SvgIcons";

export const frontendIcons = [
  { icon: <React width="40" height="40" />, name: "React" },
  { icon: <Redux width="40" height="40" />, name: "Redux" },
  { icon: <JavaScript width="40" height="40" />, name: "JavaScript" },
  { icon: <TailwindCSS width="40" height="40" />, name: "TailwindCSS" },
  { icon: <HTML5 width="40" height="40" />, name: "HTML5" },
  { icon: <CSS width="40" height="40" />, name: "CSS" },
  { icon: <Vite width="40" height="40" />, name: "Vite" },
  { icon: <Motion width="40" height="40" />, name: "Motion" },
];

export const backendIcons = [
  { icon: <Nodejs width="40" height="40" />, name: "Node.js" },
  { icon: <Expressjs width="40" height="40" />, name: "Express.js" },
  { icon: <GitHub width="40" height="40" />, name: "GitHub" },
  { icon: <VisualStudioCode width="40" height="40" />, name: "VSCode" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
];

export const databaseIcons = [
  { icon: <MongoDB width="40" height="40" />, name: "MongoDB" },
  { icon: <MySQL width="40" height="40" />, name: "MySQL" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" }, 
];
export const toolsIcons = [
  { icon: <GitHub width="40" height="40" />, name: "GitHub" },
  { icon: <VisualStudioCode width="40" height="40" />, name: "VSCode" },
  { icon: <Vite width="40" height="40" />, name: "Vite" },
  { icon: <Motion width="40" height="40" />, name: "Motion" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
];

function SkillSections({ skillSectionRef }) {
  return (
    <section
      ref={skillSectionRef}
      className="full h-[120vh] z-10 relative w-full flex px-10  introaibg"
    >
      {/* <div
              className="card-mask border border-black w-full z-10 h-96 shadow-lg rounded-2xl"
              style={{
                position: "sticky",
                top: 0,
                maskImage: `url(./image/cardSvg.svg)`,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: 250,
                willChange: "transform",
              }}
            >
              <img
                src="/image/your-background-content-image.jpg"
                alt="Revealed content"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div> */}

      <div className="z-0">
        <LayerStack />
      </div>
      <div className="flex flex-wrap justify-end h-[100vh] gap-5 p-10 w-fit">
        <Card
          title="FrontEND"
          footerText="UI/UX & Animation"
          skillsIcons={frontendIcons}
        />
        <Card
          title="BackEND"
          footerText="Server & Logic"
          skillsIcons={backendIcons}
        />
        <Card
          title="Database"
          footerText="Storage & Queries"
          skillsIcons={databaseIcons}
        />
         <Card
    title="Tools"
    footerText="Dev & Productivity"
    skillsIcons={toolsIcons}
  />

      </div>
    </section>
  );
}

export default SkillSections;
