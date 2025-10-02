import React from "react";
import { motion } from "framer-motion";

function Card({ title, footerText, skillsIcons = [], netWorkConnected }) {
  // Card slide from right when in view
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    show: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren:index+1* 0.05 },
    }),
  };

  // Normal icons: slide from right with small delay
  const iconVariants = {
    hidden: { opacity: 0, x: 20 },
    show: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.05, // small delay
      },
    }),
  };

  // Glitch Lost Signal animation: 300ms per item
  const glitchVariants = {
    initial: { opacity: 0, x: 0, y: 0 },
    animate: (index) => ({
      opacity: [0, 1, 0.8, 1],
      x: [0, -4, 4, -2, 2, 0],
      y: [0, 2, -2, 1, -1, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: index * 0.3,
      },
    }),
  };

  return (
    <div
      className="flex flex-col items-start justify-between text-white rounded-sm 
      shadow-lg w-[28rem] max-w-md h-fit border-6 border-t-12 border-[#272727] bg-[#272727] outline-1 outline-black"
    >
      {/* Title */}
      <div className="bg-[#0f0f0f] p-4 w-full rounded-md cardHeaderBgAnimated">
        <div className="flex items-center font-oswald uppercase min-h-10 gap-2 text-gray-300 text-2xl font-medium">
          {title}
        </div>
        <h2 className="text-xs text-[#515151] uppercase leading-3 tracking-widest font-bold">
          {footerText}
        </h2>
      </div>

      {/* Content */}
      <div className="h-[180px] p-3 overflow-hidden grid grid-cols-4 gap-3 place-content-between w-full">
        {skillsIcons.map((skill, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            // viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center rounded-md border-2 border-black hover:border-[#F48B3F] overflow-hidden"
          >
            {netWorkConnected ? (
              // Normal icon (faster appear)
              <motion.span
                custom={index}
                variants={iconVariants}
                initial="hidden"
                animate="show"
                className="p-2 w-fit h-fit"
              >
                {skill.icon}
              </motion.span>
            ) : (
              // Glitch Lost Signal (slower stagger)
              <div className="bg-[#1a1a1a] w-full flex justify-center items-center static-tv-glitch-bg">
                <motion.div
                  custom={index}
                  variants={glitchVariants}
                  initial="initial"
                  animate="animate"
                  className="font-anton tracking-widest uppercase text-sm text-red-500 w-full text-center"
                >
                  Lost <br /> Signal
                </motion.div>
              </div>
            )}

            {/* Bottom Text */}
            <div className="font-oswald text-sm uppercase py-1 px-2 h-10 bg-black w-full text-nowrap text-center">
              {skill.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Card;
