import { motion } from "framer-motion";

function FlickerBox() {
  return (
    <motion.div
      whileInView={{
        opacity: [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      }}
      transition={{ duration: 3, delay: 2, repeat: Infinity, repeatDelay: 5 }}
      className="size-1 bg-black"
    />
  );
}

export default FlickerBox;
