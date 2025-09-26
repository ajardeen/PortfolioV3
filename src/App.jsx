import { useEffect, useRef, useState, useCallback } from "react";
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
    { stiffness: 300, damping: 30 }
  );

  const mediaPositionY = useSpring(
    useTransform(scrollYProgress, [0.2, 0.7], [150, -150]),
    { stiffness: 300, damping: 30 }
  );

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const textPositionY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [250, 30]),
    { stiffness: 300, damping: 30 }
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
    { stiffness: 200, damping: 25 }
  );
  const cardHeight = useSpring(
    useTransform(skillScrollYProgress, [0.3, 0.8], [50, 450]),
    { stiffness: 200, damping: 25 }
  );
  const cardX = useSpring(
    useTransform(skillScrollYProgress, [0.3, 0.8], [200, 0]),
    { stiffness: 200, damping: 25 }
  );
  const cardY = useSpring(
    useTransform(skillScrollYProgress, [0.3, 0.8], [150, 0]),
    { stiffness: 200, damping: 25 }
  );

  const moveUp = useSpring(
    useTransform(skillScrollYProgress, [0, 1], [200, -100]),
    { stiffness: 200, damping: 25 }
  );
  const rotateBoxY = useSpring(
    useTransform(skillScrollYProgress, [0.2, 0.8], [-15, 0]),
    { stiffness: 200, damping: 25 }
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
    { stiffness: 100, damping: 30 }
  );
  const parallaxScrollFrontY = useSpring(
    useTransform(introScrollYProgress, [0, 1], [0, -75]),
    { stiffness: 100, damping: 30 }
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
          {/* INTRO SECTION */}
          <IntroSection
            introSectionRef={introSectionRef}
            parallaxFrontX={parallaxFrontX}
            parallaxScrollFrontY={parallaxScrollFrontY}
            parallaxScrollBgY={parallaxScrollBgY}
          />

          <AboutSection
            aboutSectionRef={aboutSectionRef} // Scroll target ref
            textPositionY={textPositionY} // Motion value for text Y position
            textOpacity={textOpacity} // Motion value for text opacity
            hrLineOpacity={hrLineOpacity} // Motion value for HR line opacity
            profileHeight={profileHeight} // Motion value for profile height
            mediaPositionY={mediaPositionY} // Motion value for image Y position
            lenis={lenisRef.current} 
          />

          <section
            ref={skillSectionRef}
            className="full h-[200vh] z-10 relative p-1 w-full bg-white"
          >
            <div
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
            </div>

            <div className="bg-blue-500 z-0">
              <LayerStack />
            </div>
          </section>

          <section id="project" className="h-[100vh] bg-amber-50">projects</section>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
