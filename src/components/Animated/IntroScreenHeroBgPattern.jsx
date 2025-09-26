import React from "react";
import { motion } from "framer-motion";
import { IoDisc } from "react-icons/io5";
import { FaCompactDisc } from "react-icons/fa";
import { RiCodeAiLine } from "react-icons/ri";
import { VscVscodeInsiders } from "react-icons/vsc";
import { Shape1, Shape3, Shape4 } from "../../assets/SVGImage";

/* ------- Component Generators (Defined First) -------- */

const BoxShape = React.memo(() => (
  <div className="box-shape-1 w-full p-1 flex flex-col justify-between">
    <div className="flex justify-between gap-1">
      <Shape1 />
      <p className="font-anton italic mr-3 text-[#E9E9E9] tracking-widest text-3xl">
        AZAR
      </p>
      <RiCodeAiLine color="#E9E9E9" />
    </div>
    <div className="flex flex-col self-end text-[#E9E9E9]">
      <span className="text-[10px]">CODE : 5463</span>
    </div>
  </div>
));

const BoxShape2 = React.memo(() => (
  <div className="box-shape-1 w-full p-1 flex flex-col justify-between">
    <div className="flex justify-between items-center gap-1">
      <Shape3 />
      <p className="font-bold italic text-gray-200 tracking-widest text-2xl">
        FUTURE
      </p>
    </div>
    <div className="flex flex-col self-end text-gray-200">
      <span className="text-xs">CODE : 5463</span>
    </div>
  </div>
));

const DevShapeDesign = React.memo(() => (
  <div className="box-shape-2 flex flex-col items-center justify-center">
    <div>
      <p className="font-bold flex items-center text-4xl text-[#6f6f6f]">
        <VscVscodeInsiders color="#6f6f6f" size={32} />
        EV
      </p>
    </div>
    <div className="flex rotate-180">
      <p className="font-bold flex items-center text-4xl text-gray-600">
        <VscVscodeInsiders color="#6f6f6f" size={32} />
        EV
      </p>
    </div>
  </div>
));

const DiscCard = React.memo(() => (
  <div className="box-shape-3  overflow-hidden flex flex-col justify-between items-center w-[170px] h-[170px]  gap-1">
    <span>
      <IoDisc size={80} />
    </span>
    <span>
      <FaCompactDisc size={70} className="animate-spin" />
    </span>

    <span>
      <p className="text-[5px]">Hold on Grid</p>
      <p className="text-[5px]">Since -1999</p>
    </span>
  </div>
));

const TextElement = React.memo(() => (
  <div className="text-6xl font-anton text-[#6f6f6f] flex items-center justify-center w-full">
    <p>PORTFOLIO</p>
  </div>
));

const SvgShape = React.memo(() => (
  <div className="flex items-center justify-center w-full">
    <Shape4 />
  </div>
));

// Now define the warnings array AFTER all components are defined
const warnings = [
  { component: <TextElement />, key: "text-1" },
  { component: <DiscCard />, key: "disc-1" },
  { component: <SvgShape />, key: "svg-1" },
  { component: <BoxShape />, key: "box-1" },
  { component: <DevShapeDesign />, key: "dev-1" },
  { component: <BoxShape />, key: "box-2" },
  { component: <DiscCard />, key: "disc-2" },
  { component: <DevShapeDesign />, key: "dev-2" },
  { component: <TextElement />, key: "text-2" },
  { component: <BoxShape2 />, key: "box2-1" },
  { component: <DiscCard />, key: "disc-3" },
  { component: <TextElement />, key: "text-3" },
  { component: <BoxShape />, key: "box-3" },
  { component: <DevShapeDesign />, key: "dev-3" },
  { component: <BoxShape />, key: "box-4" },
  { component: <DiscCard />, key: "disc-4" },
  { component: <DevShapeDesign />, key: "dev-4" },
  { component: <TextElement />, key: "text-4" },
  { component: <BoxShape2 />, key: "box2-2" },
];

function IntroScreenHeroBgPattern() {
  // Calculate total width of all items with consistent gap
  const itemWidth = 170;
  const gap = 16; // gap-4 = 16px for proper spacing
  const totalItems = warnings.length;
  const singleSetWidth = itemWidth * totalItems + gap * (totalItems - 1);

  // Perfect loop animation - moves exactly one set width
  const marqueeVariants = {
    animate: {
      x: [0, -singleSetWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  // Staggered animation for second row (opposite direction)
  const marqueeVariantsReverse = {
    animate: {
      x: [-singleSetWidth, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 35, // Slightly different duration for visual interest
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="w-full overflow-hidden">
      <style jsx>{`
        .box-shape-1 {
          background-color: #6f6f6f;
          width: 170px;
          height: 70px;
          border-radius: 4px;
        }
        .box-shape-2 {
          background-color: transparent;
          border-radius: 4px;
          transform: rotate(90deg);
          color: #6f6f6f !important;
          width: 100px;
          height: 70px;
        }
        .box-shape-3 {
          border-radius: 4px;
          transform: rotate(90deg);
          color: #6f6f6f !important;
          width: 190px;

          height: 180px;
        }
        .marquee-item {
          flex-shrink: 0;
          width: fit-content;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
      `}</style>

      <div className="flex flex-col gap-10">
        {/* First Row - Left to Right */}
        <div className="relative border-t-2 border-b-2 bg-gray-200 h-24 overflow-hidden">
          <motion.div
            className="flex items-center gap-10 will-change-transform absolute top-0 left-0 h-full"
            variants={marqueeVariants}
            animate="animate"
          >
            {/* First set */}
            {warnings.map((item, index) => (
              <div key={`first-${item.key}-${index}`} className="marquee-item">
                {item.component}
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {warnings.map((item, index) => (
              <div key={`second-${item.key}-${index}`} className="marquee-item">
                {item.component}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative border-t-2 border-b-2 bg-gray-200 h-24 overflow-hidden">
          <motion.div
            className="flex items-center gap-10 will-change-transform absolute top-0 left-0 h-full"
            variants={marqueeVariantsReverse}
            animate="animate"
          >
            {/* First set */}
            {warnings
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  key={`reverse-first-${item.key}-${index}`}
                  className="marquee-item"
                >
                  {item.component}
                </div>
              ))}
            {/* Duplicate set for seamless loop */}
            {warnings
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  key={`reverse-second-${item.key}-${index}`}
                  className="marquee-item"
                >
                  {item.component}
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default IntroScreenHeroBgPattern;
