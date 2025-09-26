import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { MapPin, Wifi } from "lucide-react";
import CautionSign from "../../components/Animated/CautionSign";
import FlickerBox from "../../components/Animated/FlickerBox";
import "./AboutSection.css";

// Memoized image component for better performance
const OptimizedImage = memo(
  ({ src, alt, className, loading = "lazy", ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleLoad = useCallback(() => setLoaded(true), []);
    const handleError = useCallback(() => setError(true), []);

    if (error) return null;

    return (
      <div className="relative">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
        <img
          src={src}
          alt={alt}
          className={`${className} ${
            loaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            willChange: "opacity",
            backfaceVisibility: "hidden",
            transform: "translate3d(0, 0, 0)",
          }}
          {...props}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

// Memoized profile image component
const ProfileImage = memo(
  ({ profileHeight, mediaPositionY, textOpacity, isInView }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
      if (isInView) {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src =
          "https://res.cloudinary.com/di2vg4ur3/image/upload/v1758180586/profileimage_jz3h8l.webp";
      }
    }, [isInView]);

    return (
      <motion.div
        style={{
          height: profileHeight,
          y: mediaPositionY,
          willChange: "transform, height",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)",
          containIntrinsicSize: "400px 450px",
          contentVisibility: isInView ? "visible" : "auto",
        }}
        className="overflow-hidden pt-1 pl-1 rounded-md max-w-[400px] profile-clipPath"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Conditionally render CautionSign */}
        {isInView && (
          <motion.div
            className="w-screen absolute -left-50 rotate-[-45deg] z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              willChange: "transform",
              contain: "layout style paint",
            }}
          >
            <CautionSign />
          </motion.div>
        )}

        {/* Custom box */}
        <motion.div
          className="custom-box-optimized"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          style={{
            willChange: "transform, opacity",
            contain: "layout style paint",
          }}
        >
          {isInView && <FlickerBox />} A Z A R
        </motion.div>

        {/* Profile image with loading state */}
        <div className="relative w-full h-[450px]">
          {!imageLoaded && isInView && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
          )}

          {imageLoaded && (
            <motion.img
              src="https://res.cloudinary.com/di2vg4ur3/image/upload/v1758180586/profileimage_jz3h8l.webp"
              alt="Profile"
              className="w-full h-full object-cover cursor-not-allowed rounded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translate3d(0, 0, 0)",
                imageRendering: "optimizeQuality",
                contain: "layout style paint",
              }}
              onError={(e) => {
                console.warn("Profile image failed to load");
                e.target.style.opacity = "0";
              }}
            />
          )}
        </div>
      </motion.div>
    );
  }
);

ProfileImage.displayName = "ProfileImage";

// Animated scrolling text component
const InfiniteScrollingText = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 200,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            willChange: "transform",
          }}
        >
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
        </motion.div>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 200,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            willChange: "transform",
          }}
        >
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
          <span className="text-8xl font-anton text-outline italic pr-20">
            DEVELOPER
          </span>
        </motion.div>
      </div>
    </div>
  );
});

InfiniteScrollingText.displayName = "InfiniteScrollingText";

// Main AboutSection component
const AboutSection = memo(
  ({
    aboutSectionRef,
    textPositionY,
    textOpacity,
    hrLineOpacity,
    profileHeight,
    mediaPositionY,
    lenis,
  }) => {
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);

    // Intersection Observer for performance
    useEffect(() => {
      if (!containerRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        {
          threshold: 0.1,
          rootMargin: "50px 0px",
        }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, []);

    // Memoized animation variants
    const nameAnimationVariants = {
      visible: {
        color: [
          "#000",
          "#fff",
          "#000",
          "#000",
          "#fff",
          "#fff",
          "#000",
          "#000",
          "#fff",
          "#fff",
          "#000",
          "#000",
          "#fff",
          "#fff",
          "#FFD93D",
        ],
        transition: {
          duration: 1.5,
          delay: 3,
          ease: "easeInOut",
        },
      },
    };

    const outlineAnimationVariants = {
      hidden: { x: -100, opacity: 0 },
      visible: {
        webkitTextStrokeColor: [
          "#000",
          "#fff",
          "#000",
          "#000",
          "#FFD93D",
          "#fff",
          "#FFD93D",
          "#000",
          "#fff",
          "#fff",
          "#FFD93D",
          "#000",
          "#fff",
          "#fff",
          "#fff",
        ],
        x: [1, 10, 20, 15, 20, 30],
        opacity: 1,
        transition: {
          duration: 1.5,
          delay: 3,
          ease: "easeInOut",
        },
      },
    };
    const handleActionClick = (button) => {
      if (button === "Resume") {
        window.open(
          "https://drive.google.com/file/d/129BCxe3WNPqH2f56psCGFgHITHSNvvRy/view?usp=sharing",
          "_blank" // opens in new tab
        );
      }
      if (button === "Work") {
        const projectSection = document.getElementById("project");
        if (projectSection && lenis) {
          lenis.scrollTo(projectSection); // 👈 use the same instance from App
        }
      }
    };

    return (
      <section
        className="full min-h-[100vh] overflow-hidden flex flex-col justify-between relative"
        ref={aboutSectionRef}
        style={{
          contain: "layout style paint",
          willChange: "transform",
        }}
      >
        {/* content wrapper  */}
        <div className="flex relative">
          {/* Left Content Section */}
          <motion.div
            initial={{ width: "60%" }}
            animate={{ width: "70%" }}
            transition={{
              // delay: 10,
              duration: 0.8,
              repeat: Infinity, // repeat forever
              repeatType: "reverse", // smoothly goes back and forth
              repeatDelay:10,
              ease: "easeInOut",
            }}
            layout
            className="relative "
          >
            <div className="relative flex items-start justify-start py-10 px-10 overflow-hidden">
              <div className="flex gap-2 justify-center items-center">
                <FlickerBox />
                <motion.span className="text-xs font-bold border-b-2">
                  001
                </motion.span>
              </div>

              <span>
                <motion.p
                  style={{ y: textPositionY, opacity: textOpacity }}
                  className="w-[40rem] h-24 text-center bigger-fontStyle z-10"
                >
                  <motion.span
                    initial="hidden"
                    whileInView="visible"
                    variants={nameAnimationVariants}
                    viewport={{ once: true }}
                  >
                    M
                  </motion.span>
                  ohamed &nbsp;
                  <motion.span
                    className="z-10"
                    initial="hidden"
                    whileInView="visible"
                    variants={nameAnimationVariants}
                    viewport={{ once: true }}
                  >
                    A
                  </motion.span>
                  jardeen
                </motion.p>

                {/* <motion.p
                style={{ y: textPositionY, opacity: textOpacity }}
                className="text-outline w-[40rem] h-24 text-center bigger-fontStyle text-[20px] absolute top-0 left-[8%] z-0"
                initial="hidden"
                whileInView="visible"
                variants={outlineAnimationVariants}
                viewport={{ once: true }}
              >
                MOHAMED AJARDEEN
              </motion.p> */}
              </span>

              <hr style={{ opacity: hrLineOpacity }} className="line-bottom" />
              <hr style={{ opacity: hrLineOpacity }} className="line-right" />
            </div>

            {/* Description Section */}
            <div className="small-fontStyle relative min-h-[75%] py-7 px-10">
              {/* Main Content */}
              <div className="relative h-96 flex justify-center pb-5">
                <div className="h-full z-20 flex flex-col justify-center gap-2 rounded-2xl p-5">
                  <h2 className="text-black font-oswald text-3xl font-bold uppercase animated-gradient-text">
                    Certified Full-Stack Developer
                  </h2>
                  <div className="flex items-center justify-center">
                    <motion.p
                      className="text-black font-oswald text-2xl leading-10"
                      style={{ opacity: textOpacity }}
                    >
                      from GUVI with hands-on experience in building dynamic and
                      scalable web applications. I specialize in React.js,
                      Express.js, Node.js, and MongoDB, crafting seamless user
                      experiences with clean code and modern development
                      practices.
                    </motion.p>
                  </div>
                </div>
              </div>

              <hr style={{ opacity: hrLineOpacity }} className="line-bottom" />
              <hr style={{ opacity: hrLineOpacity }} className="line-right" />
            </div>
          </motion.div>

          {/* Right Image Container */}
          <motion.div
            initial={{ width: "40%" }}
            animate={{ width: "30%" }}
            transition={{
              // delay: 10,
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay:10,
              ease: "easeInOut",
            }}
            className="h-inherit "
            ref={containerRef}
          >
            <div className="px-4 h-20 w-full relative flex justify-end p-4 items-start gap-2">
              <div className="absolute bottom-0 left-10 w-32">
                <OptimizedImage
                  src="/assets/sciarrow1.png"
                  alt="Arrow decoration"
                  className="bg-cover w-full h-auto"
                />
              </div>
              <Wifi />
              <MapPin />
              <hr className="line-bottom" />
            </div>

            {/* Optimized Profile Image Section */}
            <div
              className="relative px-4 w-full max-h-[100%] pt-10 h-full overflow-hidden flex flex-col justify-center items-center"
              style={{
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                perspective: 1000,
                contain: "layout style paint",
              }}
            >
              <ProfileImage
                profileHeight={profileHeight}
                mediaPositionY={mediaPositionY}
                textOpacity={textOpacity}
                isInView={isInView}
              />
              <hr style={{ opacity: hrLineOpacity }} className="line-bottom" />
            </div>

            <hr className="line-top" />
          </motion.div>
        </div>
        {/* Action Buttons */}
        <div className="h-fit z-10 w-[90%] flex items-center justify-end px-15 gap-10 action-button-style min-h-22 min-w-full relative">
          {/* Infinite scrolling text in background */}
          <InfiniteScrollingText />

          <motion.button
            className="cartoon-button-style"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              handleActionClick("Resume");
            }}
          >
            Resume
          </motion.button>
          <motion.button
            className="cartoon-button-style"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              handleActionClick("Work");
            }}
          >
            Work
          </motion.button>
        </div>
      </section>
    );
  }
);

AboutSection.displayName = "AboutSection";

export default AboutSection;
