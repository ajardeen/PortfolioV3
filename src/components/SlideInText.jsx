import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DecryptedText from "../components/DecryptedText";

const SlideInText = ({
  text,
  delay = 0,
  direction = "left",
  activeLink,
  setActiveLink,
}) => {
  const variants = {
    hidden: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -50 : direction === "bottom" ? 50 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, delay, ease: "easeOut" },
    },
  };
  const hoverSound = useRef(new Audio("/sounds/UI_menu_text_rollover.mp3"));

  const playHoverSOund = () => {
    hoverSound.current.currentTime = 0;
    hoverSound.current.play();
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <p
        onClick={() => setActiveLink(text)}
        className={activeLink === text ? "highlight" : ""}
        onMouseEnter={playHoverSOund}
      >
        <DecryptedText
          text={text}
          animateOn="view"
          speed={60}
          maxIterations={10}
          sequential={true}
        />
      </p>
    </motion.div>
  );
};

export default SlideInText;
