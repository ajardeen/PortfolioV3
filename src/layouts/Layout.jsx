import { MenuIconSvg } from "../assets/SVGImage";
import SidebarMenu from "./SidebarMenu";
const menuItems = ["About", "Skills", "Projects", "Contact"];
import { useState, useRef } from "react";
import "./Layout.css";
function Layout({ children, scrollRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const hoverSound = useRef(new Audio("/sounds/UI_menu_rollover.mp3"));
  const playHoverSOund = () => {
    hoverSound.current.currentTime = 50 / 1000;
    hoverSound.current.play();
  };
  return (
    <div
      ref={scrollRef}
      className="layout  h-screen  overflow-hidden "
    >
      {/* <div className="top fixed top-5 left-5 w-[97.5%] h-[100vh]  ">
        <div className="flex nav-container ">
          <div
            className="menu-icon"
            onMouseEnter={playHoverSOund}
            onClick={() => setIsOpen(true)}
          >
            <MenuIconSvg />
          </div>
          <div className="menu-container">text</div>
        </div>
      </div> */}
      <>
        {/* <SidebarMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          menuItems={menuItems}
        /> */}
        {children}
      </>
    </div>
  );
}

export default Layout;
