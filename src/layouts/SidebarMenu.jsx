import { motion, AnimatePresence } from "framer-motion";
import "./SidebarMenu.css";
import SlideInText from "../components/SlideInText";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import ScrambleText from "../components/ScrambleText";

export default function SidebarMenu({ isOpen, setIsOpen, menuItems }) {
  const [activeLink, setActiveLink] = useState(menuItems[0]);

  const hoverSound = useRef(new Audio("/sounds/UI_menu_text_rollover.mp3"));
  const menuOpenSound = useRef(new Audio("/sounds/UI_menu_OPEN.mp3"));
  const menuCloseSound = useRef(new Audio("/sounds/UI_menu_CLOSE.mp3"));
  const hoverLinkSound = useRef(new Audio("/sounds/UI_menu_rollover.mp3"));
  const playHoverSound = () => {
    hoverLinkSound.current.currentTime = 50 / 1000;
    hoverLinkSound.current.play();
  };

  const handleMouseOverSound = () => {
    hoverSound.current.currentTime = 0;
    hoverSound.current.play();
  };

  const playOpenSound = () => {
    menuOpenSound.current.currentTime = 300 / 1000;
    menuOpenSound.current.play();
  };
  const playCloseSound = () => {
    menuCloseSound.current.currentTime = 0;
    menuCloseSound.current.play();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            onViewportEnter={playOpenSound}
            exit={{ opacity: 0 }}
            onClick={() => {
              playCloseSound();
              setIsOpen(false);
            }}
            style={{ pointerEvents: "all" }}
           
          />

          {/* Sidebar */}
          <motion.div
            className="custom-sidebar-drawer"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: 1,
              opacity: 1,
              transition: {
                scaleX: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
                opacity: { duration: 0.5, ease: "easeOut" },
              },
            }}
            exit={{
              scaleX: 0,
              opacity: 0,
              transition: {
                scaleX: { duration: 0.1, ease: "easeIn" },
                opacity: { duration: 0.1 },
              },
            }}
            style={{ transformOrigin: "left center" }}
          >
            <motion.div className="drawer-content-wrapper">
              <div className="drawer-wrapper-with-bar">
                <div className="drawer-content-left-wrapper">
                  <div className="drawer-content">
                    {/* Left label */}
                    <div className="drawer-content-left">DISCOVER</div>

                    {/* Main nav */}
                    <div className="drawer-content-right">
                      <nav className="drawer-nav">
                        {menuItems.map((item, index) => (
                          <SlideInText
                            key={index}
                            text={item}
                            activeLink={activeLink}
                            setActiveLink={setActiveLink}
                            delay={index * 0.06}
                          />
                        ))}
                      </nav>
                    </div>
                  </div>
                  {/* Footer sections */}
                  <div className="drawer-footer">
                    {/* <div className="footer-section">
                      <span className="footer-heading">CONNECT</span>
                      <div className="drawer-social-links-container">
                        <span>Github</span>
                        <span>LinkdIn</span>
                      </div>
                    </div> */}
                    <div className="footer-section">
                      <span className="footer-heading">CONNECT</span>
                      <div className="drawer-social-links-container">
                        {["Github", "LinkdIn"].map((text, index) => (
                          <span key={index} onMouseEnter={playHoverSound}>
                            <ScrambleText>{text}</ScrambleText>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <div className="drawer-corner-bar">
                  <span
                    className="icon-wrapper"
                    onMouseOver={handleMouseOverSound}
                    onClick={() => {
                      playCloseSound();
                      setIsOpen(false);
                    }}
                  >
                    <motion.span
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        damping: 10,
                      }}
                    >
                      <X color="#fff" size={24} />
                    </motion.span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
