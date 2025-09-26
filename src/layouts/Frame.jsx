import React, { useRef, useState } from "react";
import "./Frame.css";
import { MenuIconSvg } from "../assets/SVGImage";
import SidebarMenu from "./SidebarMenu";


function Frame() {
  const [isOpen, setIsOpen] = useState(false);
  const hoverSound = useRef(new Audio("/sounds/UI_menu_rollover.mp3"));
  const playHoverSOund = () => {
    hoverSound.current.currentTime = 50 / 1000;
    hoverSound.current.play();
  };
  return (
    <>
      <div className="frame light-bg">
       

        
      
      </div>
    </>
  );
}

export default Frame;
