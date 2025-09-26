import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FuturisticCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex justify-center items-center">
      <div
        ref={ref}
        className="relative w-[350px] h-[180px] shadow-xl"
        style={{
          clipPath: `
            polygon(
              0% 10px, 
              10px 0%, 
              calc(100% - 10px) 0%, 
              100% 10px, 
              100% calc(100% - 20px), 
              60% calc(100% - 20px), 
              55% 100%, 
              45% 100%, 
              40% calc(100% - 20px), 
              0% calc(100% - 20px)
            )
          `,
          borderRadius: "12px",
        }}
      >
        {/* Grey Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400 border border-gray-500/30"></div>

        {/* Green Bottom Slide */}
        <motion.div
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full h-[70px] bg-green-500/90 shadow-[0_0_40px_rgba(34,197,94,0.7)]"
        ></motion.div>
      </div>
    </div>
  );
}
