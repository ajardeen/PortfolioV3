import { useEffect, useRef, useState, useCallback, use } from "react";
import Layout from "./layouts/Layout";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  AnimatePresence,
  easeOut,
} from "framer-motion";
import "./App.css";
import "./ComponentStyles.css";
import Frame from "./layouts/Frame";
import CautionSign from "./components/Animated/CautionSign";
import FlickerBox from "./components/Animated/FlickerBox";
import { MapPin, Wifi } from "lucide-react";
import FuturisticCard from "./components/FuturisticCard";
import LayerStack from "./components/LayerStack";
import IntroSection from "./sections/IntroSection";
import Lenis from "@studio-freight/lenis";
import AboutSection from "./sections/AboutSection/AboutSection";
import FooterSection from "./sections/FooterSection/FooterSection";
import Card from "./sections/SkillSections/components/Card";
import SkillSections from "./sections/SkillSections/SkillSections";

function App() {
  const [countLimit] = useState(8);
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis with optimized settings
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    lenisRef.current = new Lenis({
      wrapper: scrollContainerRef.current,
      duration: 0.8, // Reduced from 1.2 for snappier response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      infinite: false,
      syncTouch: false, // Disable touch sync for better performance
    });

    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Optimized scroll tracking with springs for smoother animation
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: aboutSectionRef,
    offset: ["start end", "end start"],
  });

  // Use springs for smoother animations
  const profileHeight = useSpring(
    useTransform(scrollYProgress, [0.4, 0.5], [200, 500]),
    { stiffness: 300, damping: 30 },
  );

  const mediaPositionY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.7], [150, -150]),
    { stiffness: 300, damping: 30 },
  );



  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const textPositionY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [250, 30]),
    { stiffness: 300, damping: 30 },
  );
  const hrLineOpacity = useTransform(scrollYProgress, [0.4, 0.45], [0, 1]);

  // Skill Section Scroll - optimized
  const skillSectionRef = useRef(null);
  const { scrollYProgress: skillScrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: skillSectionRef,
    offset: ["end start", "end start"],
  });

  // Use springs for card animations
  const cardWidth = useSpring(
    useTransform(skillScrollYProgress, [0.3, 0.8], [100, 800]),
    { stiffness: 200, damping: 25 },
  );
  const cardHeight = useSpring(
    useTransform(skillScrollYProgress, [0.3, 0.8], [50, 450]),
    { stiffness: 200, damping: 25 },
  );
  const cardX = useSpring(
    useTransform(skillScrollYProgress, [0.3, 0.8], [200, 0]),
    { stiffness: 200, damping: 25 },
  );
  const cardY = useSpring(
    useTransform(skillScrollYProgress, [0.3, 0.8], [150, 0]),
    { stiffness: 200, damping: 25 },
  );

  const moveUp = useSpring(
    useTransform(skillScrollYProgress, [0, 1], [200, -100]),
    { stiffness: 200, damping: 25 },
  );
  const rotateBoxY = useSpring(
    useTransform(skillScrollYProgress, [0.2, 0.8], [-15, 0]),
    { stiffness: 200, damping: 25 },
  );

  // Audio refs
  const dexesActivatingSound = useRef(new Audio("FX_press_sheen.mp3"));
  const dexesAiSpeech = useRef(new Audio("dexesAISpeech.mp3"));
  const dexesAiCancelSound = useRef(new Audio("dexesAiCancelSound.mp3"));
  const [dexesAiSpeechPlaying, setDexesAiSpeechPlaying] = useState(false);

  // Memoized callbacks for better performance
  const onHold = useCallback(() => {
    dexesActivatingSound.current.currentTime = 300 / 1000;
    dexesActivatingSound.current.volume = 1;
    dexesActivatingSound.current.play();
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev < countLimit) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return prev;
          }
        });
      }, 50);
    }
  }, [countLimit]);

  const onRelease = useCallback(() => {
    dexesActivatingSound.current.pause();
    dexesActivatingSound.current.currentTime = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    if (count !== countLimit) setCount(0);
  }, [count, countLimit]);

  const stopDexesAiSpeech = useCallback(() => {
    if (dexesAiSpeechPlaying) {
      setCount(0);
      dexesAiSpeech.current.pause();
      dexesAiSpeech.current.currentTime = 0;
      setDexesAiSpeechPlaying(false);
      dexesAiCancelSound.current.currentTime = 30 / 1000;
      dexesAiCancelSound.current.play();
    }
  }, [dexesAiSpeechPlaying]);

  useEffect(() => {
    if (count === countLimit && !dexesAiSpeechPlaying) {
      dexesAiSpeech.current.play();
      setDexesAiSpeechPlaying(true);
    }
  }, [count, dexesAiSpeechPlaying, countLimit]);

  // Optimized keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!dexesAiSpeechPlaying) onHold();
      }
      if (e.code === "Escape") {
        e.preventDefault();
        if (dexesAiSpeechPlaying) stopDexesAiSpeech();
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        onRelease();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dexesAiSpeechPlaying, onHold, onRelease, stopDexesAiSpeech]);

  const progress = (count / countLimit) * 100;
  const progressValue = useMotionValue(progress);
  useEffect(() => {
    progressValue.set(progress);
  }, [progress, progressValue]);

  const bgColor = useTransform(progressValue, [0, 100], ["#fff", "#000"]);

  // Optimized parallax mouse movement with throttling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxBgX = useTransform(mouseX, [0, 1], ["0.5%", "-0.5%"]); // Reduced range
  const parallaxBgY = useTransform(mouseY, [0, 1], ["0.5%", "-0.5%"]);
  const parallaxFrontX = useTransform(mouseX, [0, 1], ["-0.5%", "0.5%"]);
  const parallaxFrontY = useTransform(mouseY, [0, 1], ["-0.5%", "0.5%"]);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = e.clientX / window.innerWidth;
          const y = e.clientY / window.innerHeight;
          mouseX.set(x);
          mouseY.set(y);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const introSectionRef = useRef(null);
  const { scrollYProgress: introScrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: introSectionRef,
    offset: ["start end", "end start"],
  });

  // Reduced parallax scroll effect for better performance
  const parallaxScrollBgY = useSpring(
    useTransform(introScrollYProgress, [0, 1], [0, -25]),
    { stiffness: 100, damping: 30 },
  );
  const parallaxScrollFrontY = useSpring(
    useTransform(introScrollYProgress, [0, 1], [0, -75]),
    { stiffness: 100, damping: 30 },
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  // Image preloading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src =
      "https://res.cloudinary.com/di2vg4ur3/image/upload/v1758180586/profileimage_jz3h8l.webp";
  }, []);

  return (
    <motion.div
      style={{ backgroundColor: dexesAiSpeechPlaying ? "#000" : bgColor }}
      id="app"
      className="App "
    >
      <div className="layout-inner-content line-inner">
        <div
          ref={scrollContainerRef}
          className="content-present-layer h-screen overflow-y-scroll"
          style={{
            // Force hardware acceleration
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
        >
          <div className="w-full h-[200vh]">
            <div className="sticky top-0 z-0">
              {/* INTRO SECTION */}
              <IntroSection
                introSectionRef={introSectionRef}
                parallaxFrontX={parallaxFrontX}
                parallaxScrollFrontY={parallaxScrollFrontY}
                parallaxScrollBgY={parallaxScrollBgY}
              />
            </div>
            <div className="z-auto ">
              <AboutSection
                aboutSectionRef={aboutSectionRef} // Scroll target ref
                textPositionY={textPositionY} // Motion value for text Y position
                textOpacity={textOpacity} // Motion value for text opacity
                hrLineOpacity={hrLineOpacity} // Motion value for HR line opacity
                profileHeight={profileHeight} // Motion value for profile height
                mediaPositionY={mediaPositionY} // Motion value for image Y position
                lenis={lenisRef.current}
              />
            </div>
          </div>

          <SkillSections skillSectionRef={skillSectionRef} />

          <div className="h-[200vh] bg-[#445454] ">
            <div className="h-[30vh]  flex items-center justify-center sticky top-0 z-10 bg-black"></div>
            <div className="h-[40vh] flex items-center justify-center sticky top-[30%] z-0 bg-black">
              <h1 className="font-anton tracking-widest text-9xl uppercase text-white">
                Experience
              </h1>
            </div>

            <section
              id="experience"
              className="h-[100vh] bg-[#000] border-white border text-white sticky bottom-0 z-10"
            >
              experience
            </section>
          </div>

          <section id="project" className="h-[100vh] bg-white">
            projects
          </section>
          <FooterSection lenis={lenisRef.current} />
        </div>
      </div>
    </motion.div>
  );
}

export default App;
