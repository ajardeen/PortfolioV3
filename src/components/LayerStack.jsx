import React from "react";
import { motion } from "framer-motion";
import "./LayerStack3D.css";

function LayerStack() {
  return (
    <div className="layer-stack-container">
      <div className="layer-card">
        {/* Layer 1 */}
        <motion.div
          className="layer layer1"
          initial={{ z: 0 }}
          whileInView={{ z: 50 }}
          transition={{ duration: 1,delay:2, ease: "easeOut" }}
        >
          <div className="dashboard-img"></div>
        </motion.div>

        {/* Layer 2 */}
        <motion.div
          className="layer layer2"
          initial={{ z: 0 }}
          whileInView={{ z: -40 }}
          transition={{ duration: 1.2,delay:2, ease: "easeOut" }}
        >
          <div className="api-img"></div>
        </motion.div>

        {/* Layer 3 */}
        <motion.div
          className="layer layer3"
          initial={{ z: 0 }}
          whileInView={{ z: -140 }}
          transition={{ duration: 1.4,delay:2, ease: "easeOut" }}
        >
          <div className="database-img"></div>
        </motion.div>
      </div>
    </div>
  );
}

export default LayerStack;
