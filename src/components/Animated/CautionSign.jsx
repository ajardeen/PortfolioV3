import { motion } from "framer-motion";

const warnings = [
  "Caution!",
  "KeeOut!",
  "Caution!",
  "KeeOut!",
  "Caution!",
  "KeepOut!",
  "Caution!",
  "KeepOut!",
  "Caution!",
  "KeepOut!",
  "Caution!",
  "KeepOut!",
];

function CautionSign() {
  const patternWidth = 1300; // Adjust as per your layout

  // Animation for continuous sliding
  const marqueeAnimation = (duration) => ({
    x: [0, -patternWidth], // move from 0 → -patternWidth
    transition: {
      duration,
      ease: "linear",
      repeat: Infinity,
    },
  });

  return (
    <div className="w-full overflow-hidden bg-[#FFEA0B]">
      {/* Top hazard stripes */}
      <div className="relative flex">
        <motion.div
          className="hazard-background flex-shrink-0"
          style={{ width: patternWidth }}
          animate={marqueeAnimation(20)}
        />
        <motion.div
          className="hazard-background flex-shrink-0"
          style={{ width: patternWidth }}
          animate={marqueeAnimation(20)}
        />
      </div>

      {/* Warning text loop */}
      <div className="relative flex border-t-2 border-b-2 bg-[#FFEA0B]">
        <motion.div
          className="flex gap-4 w-[1300px] justify-around font-oswald"
          animate={marqueeAnimation(30)} // slower than hazard stripes
        >
          {warnings.map((text, index) => (
            <div
              key={index}
              className="font-extrabold text-2xl uppercase text-black"
            >
              {text}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex gap-4 w-[1300px] justify-around font-oswald"
          animate={marqueeAnimation(30)} // same animation, synced
        >
          {warnings.map((text, index) => (
            <div
              key={`second-${index}`}
              className="font-extrabold text-2xl uppercase text-black"
            >
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom hazard stripes */}
      <div className="relative flex">
        <motion.div
          className="hazard-background flex-shrink-0"
          style={{ width: patternWidth }}
          animate={marqueeAnimation(20)}
        />
        <motion.div
          className="hazard-background flex-shrink-0"
          style={{ width: patternWidth }}
          animate={marqueeAnimation(20)}
        />
      </div>
    </div>
  );
}

export default CautionSign