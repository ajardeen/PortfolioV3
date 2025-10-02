import LayerStack from "../../components/LayerStack";
import Card from "./components/Card";
import "./SkillSection.css";
import { motion } from "framer-motion";

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
import { useEffect, useState } from "react";

export const frontendIcons = [
  { icon: <React width="28" height="28" />, name: "React" },
  { icon: <Redux width="28" height="28" />, name: "Redux" },
  { icon: <JavaScript width="28" height="28" />, name: "JavaScript" },
  { icon: <TailwindCSS width="28" height="28" />, name: "TailwindCSS" },
  { icon: <HTML5 width="28" height="28" />, name: "HTML5" },
  { icon: <CSS width="28" height="28" />, name: "CSS" },
  { icon: <Vite width="28" height="28" />, name: "Vite" },
  { icon: <Motion width="28" height="28" />, name: "Motion" },
];

export const backendIcons = [
  { icon: <Nodejs width="28" height="28" />, name: "Node.js" },
  { icon: <Expressjs width="28" height="28" />, name: "Express.js" },
  { icon: <GitHub width="28" height="28" />, name: "GitHub" },
  { icon: <VisualStudioCode width="28" height="28" />, name: "VSCode" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
];

export const databaseIcons = [
  { icon: <MongoDB width="28" height="28" />, name: "MongoDB" },
  { icon: <MySQL width="28" height="28" />, name: "MySQL" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
];
export const toolsIcons = [
  { icon: <GitHub width="28" height="28" />, name: "GitHub" },
  { icon: <VisualStudioCode width="28" height="28" />, name: "VSCode" },
  { icon: <Vite width="28" height="28" />, name: "Vite" },
  { icon: <Motion width="28" height="28" />, name: "Motion" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
  { icon: "x", name: "x" },
];

function SkillSections({ skillSectionRef }) {
  const [loading, setLoading] = useState(false);
  const [netWorkConnected, setNetWorkConnected] = useState(true);

  const handleTvPowerButton = () => {
    setLoading(true); // turn loading on
    const timer = setTimeout(() => {
      setLoading(false);
      setNetWorkConnected(!netWorkConnected);
    }, 3000); // turn it off after 3s
    return () => clearTimeout(timer); // cleanup
  };

  return (
    <motion.section
      // whileInView={() => setNetWorkConnected(true)}
      ref={skillSectionRef}
      className="full h-[100vh] z-10 relative w-full flex justify-center items-end p-10  introaibg "
    >
      <div
        className={`p-20 relative flex justify-center items-center h-full w-full ${
          !netWorkConnected ? "bg-black/80" : ""
        } `}
      >
        <span className=" justify-center items-center">
          <LayerStack
            handleTvPowerButton={handleTvPowerButton}
            netWorkConnected={netWorkConnected}
            loading={loading}
          />
        </span>
        <motion.span className="absolute top-0 left-0">
          <Card
            title="FrontEND"
            footerText="UI/UX & Animation"
            skillsIcons={frontendIcons}
            netWorkConnected={netWorkConnected}
          />
        </motion.span>
        <span className="absolute top-0 right-0">
          <Card
            title="BackEND"
            footerText="Server & Logic"
            skillsIcons={backendIcons}
            netWorkConnected={netWorkConnected}
          />
        </span>
        <span className="absolute bottom-0 left-0">
          <Card
            title="Database"
            footerText="Storage & Queries"
            skillsIcons={databaseIcons}
            netWorkConnected={netWorkConnected}
          />
        </span>
        <span className="absolute bottom-0 right-0">
          <Card
            title="Tools"
            footerText="Dev & Productivity"
            skillsIcons={toolsIcons}
            netWorkConnected={netWorkConnected}
          />
        </span>
      </div>

      {/* <div className=" absolute flex flex-wrap justify-end h-[100vh] gap-5 p-5 w-fit"> */}

      {/* </div> */}
    </motion.section>
  );
}

export default SkillSections;
