import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LayerStack3D.css";
import { FaPowerOff } from "react-icons/fa6";
import { ImSpinner } from "react-icons/im";


const cards = [
  {
    id: 1,
    className: "dashboard-img",
    label: "Frontend Development",
    description:
      "We craft interactive and responsive user interfaces using modern frameworks like React, ensuring a seamless experience across devices.",
  },
  {
    id: 2,
    className: "api-img",
    label: "Backend & APIs",
    description:
      "We build powerful, scalable APIs and backend services to handle business logic, authentication, and secure data processing.",
  },
  {
    id: 3,
    className: "database-img",
    label: "Database Management",
    description:
      "We design and optimize databases to ensure efficient storage, fast queries, and reliable data handling for any application.",
  },
];

function Card({ className, label, glitching, onClick }) {
  return (
    <motion.div
      className={`single-card   ${className} ${glitching ? "glitching" : ""}`}
      onClick={onClick}
    >
      
      {/* <div className="card-label">{label}</div> */}
    </motion.div>
  );
}

function LayerStack({ handleTvPowerButton, netWorkConnected, loading }) {
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(triggerChange, 10000);
    return () => clearInterval(interval);
  }, []);

  const triggerChange = () => {
    setGlitching(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % cards.length);
      setGlitching(false);
    }, 500);
  };

  return (
    <div className="layer-stack-container">
      <div className="layer-card">
        <div className="tv-wrapper ">
          { loading && <ImSpinner color="white" className="animate-spin absolute top-[40%] left-[45%] scale-250"/>}
          <div
            onClick={() => {
              handleTvPowerButton();
            }}
            className={`${
              netWorkConnected ? "bg-red-600 " : "bg-gray-600 "
            } size-3 absolute z-5 rounded-full bottom-[23px] right-[40px] flex justify-center items-center p-0.3`}
          >
            <FaPowerOff size={9} />
          </div>
        </div>
        <AnimatePresence mode="wait">
          {netWorkConnected && (
            <Card
              key={cards[index].id}
              className={cards[index].className}
              label={cards[index].label}
              glitching={glitching}
              onClick={triggerChange}
              loading={loading}
            />
          )}
        </AnimatePresence>
      </div>
      {/* 
      <AnimatePresence mode="wait">
        <motion.p
          key={cards[index].id}
          className="card-description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {cards[index].description}
        </motion.p>
      </AnimatePresence> */}
    </div>
  );
}

export default LayerStack;
