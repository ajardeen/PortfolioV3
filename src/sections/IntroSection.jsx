import { motion, useTransform } from "framer-motion";
import IntroScreenHeroBgPattern from "../components/Animated/IntroScreenHeroBgPattern";
import "./IntroSection.css";
import TvGlitch from "./TvGlitch";
function IntroSection({
  introSectionRef,
  parallaxFrontX,
  parallaxScrollFrontY,
  parallaxScrollBgY,
}) {
  return (
    <section
      ref={introSectionRef}
      className=" h-[100vh] p-1    relative overflow-hidden select-none introaibg snap-start"
    >
      {/* animated pattern goes here  */}
      {/* left side  */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="rotate-75 w-screen h-screen  absolute top-[10%] -left-[20%] 2xl:-left-[40%]   z-10"
      >
        <IntroScreenHeroBgPattern />
      </motion.div>

      <div className="w-full  flex justify-center items-center relative min-h-[90vh]">
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{
            backgroundColor: [
              "#fff",
              "#000",
              "#fff",
              "#fff",
              "#fff",
              "#000",
              "#000",

              "#000",
              "#fff",
              "#000",
              "none",
            ],
          }}
          transition={{ delay: 1.5, duration: 0.2 }}
          className="  w-full flex flex-col items-center justify-center"
        >
          <motion.h1
            whileInView={{ x: 250 }}
            transition={{ delay: 1.8, duration: 0.3 }}
            className="text-[200px] italic font-anton font-bold tracking-wider pr-10 gradient-text relative"
          >
            AZARDEV
          </motion.h1>
          <motion.p
            whileInView={{ x: 250 }}
            transition={{ delay: 1.8, duration: 0.3 }}
            className="font-anton gradient-text"
          >
            Your ideas, my code — let’s build something real.
          </motion.p>
        </motion.div>

        {/* character image  */}
        <motion.span
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 0.9, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.2 }}
          className="absolute -bottom-[75%] left-[15%] z-50"
        >
          <motion.img
            whileInView={{ x: -250 }}
            transition={{ delay: 2, duration: 0.3 }}
            src="https://res.cloudinary.com/di2vg4ur3/image/upload/v1758480679/ChatGPT_Image_Sep_22_2025_12_20_56_AM_vmuk9l.png"
            alt="img"
            className="w-[80%]"
          />
        </motion.span>
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:2,duration:1}}
        className="absolute -bottom-5 right-10 w-60 h-35 z-60  rounded-4xl overflow-hidden bg-amber-50">
          <TvGlitch
            frameImg="/image/tvimg.png"
            screenImg="/image/profileimage.jpg"
          />
        </motion.div>
      </div>
      <div className="bottom-overlay-image absolute bottom-0 z-50 h-96 w-full">

      </div>
    </section>
  );
}

export default IntroSection;
