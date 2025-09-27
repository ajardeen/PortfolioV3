import React from "react";
import { motion } from "framer-motion";

function Card({ title, footerText, skillsIcons = [] }) {
  // Variants for container (staggering children)
  const containerVariants = {
    hidden: { opacity: 1 }, // keep container visible
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay between each child
      },
    },
  };

  // Variants for children
  const childVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      className="flex flex-col items-start justify-between text-white rounded-sm 
      shadow-lg w-[28rem] max-w-md h-fit border-6 border-t-12 border-[#272727] bg-[#272727] outline-1 outline-black"
    >
      {/* Title Content */}
      <div className="bg-[#0f0f0f] p-4 w-full rounded-md cardHeaderBgAnimated">
        <div className="flex items-center font-oswald uppercase min-h-10 gap-2 text-gray-300 text-2xl font-medium">
          {title}
        </div>
        <h2 className="text-xs text-[#515151] uppercase leading-3 tracking-widest font-bold">
          {footerText}
        </h2>
      </div>

      {/* Content with staggered children */}
      <motion.div
        className="h-[220px] p-3 overflow-hidden grid grid-cols-4 gap-3 place-content-between w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
      >
        {skillsIcons.map((skill, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            className="flex flex-col items-center rounded-md border-2 border-black hover:border-[#F48B3F] overflow-hidden"
          >
            {skill.icon === "x" ? (
              <div className="font-light uppercase text-7xl py-2 text-[#00000042] bg-[#272727] h-fit w-full text-nowrap text-center">
                X
              </div>
            ) : (
              <>
                <span className="p-2 w-fit h-fit">{skill.icon}</span>
                <div className="font-oswald uppercase py-1 px-2 bg-black w-full text-nowrap text-center">
                  {skill.name}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Card;
