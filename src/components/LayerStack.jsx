import React from "react";
import { motion } from "framer-motion";
import "./LayerStack3D.css";

const LAYERS = [
  { id: "frontend", label: "FRONTEND", gradient: "linear-gradient(135deg,#00f2fe,#4facfe)", z: 80, glow: "rgba(0,242,254,0.25)" },
  { id: "backend",  label: "BACKEND",  gradient: "linear-gradient(135deg,#43e97b,#38f9d7)", z: 30, glow: "rgba(67,233,123,0.22)" },
  { id: "db",       label: "DATABASE", gradient: "linear-gradient(135deg,#ff0844,#ffb199)", z: -40, glow: "rgba(255,8,68,0.16)" },
];

const LayerStack = () => {
  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: (i) => ({
      opacity: 1,
      // only move first two layers up (visual top) — tweak amounts if you want stronger lift
      y: i < 2 ? -40 - i * 20 : 0,
      transition: { duration: 0.8, ease: "easeOut", delay: i * 0.12 },
    }),
  };

  return (
    <div className="ls-container">
      <div className="ls-scene">
        {LAYERS.map((layer, i) => (
          <div
            key={layer.id}
            className="layer-3d"
            style={{
              transform: `translateZ(${layer.z}px)`,
              zIndex: 1000 + layer.z, // keep stacking order reliable across browsers
            }}
          >
            <motion.div
              className="layer"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={variants}
              style={{
                background: layer.gradient,
                boxShadow: `0 18px 40px rgba(2,8,23,0.6), 0 0 40px ${layer.glow}`,
              }}
            >
              <div className="label">{layer.label}</div>
              <div className="glow" style={{ boxShadow: `0 0 40px ${layer.glow}` }} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerStack;
