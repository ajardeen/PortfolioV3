"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const ScrambleText = ({ children }) => {

  const intervalRef = useRef(null);
  const TARGET_TEXT = children;

  const [text, setText] = useState(TARGET_TEXT);

  // Animation controls for the background element
  const controls = useAnimationControls();

  // Scramble function
  const scramble = () => {
    clearInterval(intervalRef.current);
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setText(TARGET_TEXT);
  };

  const handleMouseEnter = () => {
    scramble();
    // Animate background to slide in from the left
    controls.start({
      x: "0%",
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const handleMouseLeave = () => {
    stopScramble();
    // Animate background to slide out to the right
    controls
      .start({
        x: "100%",
        transition: { duration: 0.3, ease: "easeInOut" },
      })
      .then(() => {
        // After the exit animation completes, instantly move the
        // background back to the left side, ready for the next hover.
        controls.set({ x: "-100%" });
      });
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer p-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-[99%] h-full social-link-bg z-0"
        // Set the initial position to be off-screen to the left
        initial={{ x: "-100%" }}
        // Connect the div to our animation controls
        animate={controls}
      />

      {/* Text */}
      <div className="relative z-10 ">
        <motion.span
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
          className="inline-block  social-link"
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default ScrambleText;
