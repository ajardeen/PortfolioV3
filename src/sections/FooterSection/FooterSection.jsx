import { ArrowBigUp, GitBranch, Github } from "lucide-react";
import { motion } from "framer-motion";

function FooterSection({ lenis }) {
  return (
    <section className="h-[50vh] bg-[#000] ">
      <div className="bg-gray-500 flex justify-end items-center px-10 relative h-20 introaibg bg-blend-overlay">
        <motion.span
        initial={{height:"120px"}}
        whileHover={{height:"140px"}}
          onClick={() => {
            setTimeout(() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection && lenis) {
                lenis.scrollTo(aboutSection);
              }
            }, 200);
          }}
          className="absolute top-0 left-10 overflow-hidden flex flex-col  justify-center items-center gap-5 text-3xl font-anton bg-white  px-3 py-5 pt-10 rounded-b-2xl cursor-pointer"
        >
          TOP

         <img src="/image/uparrow.svg" alt="arrow img" className="w-15 h-15 relative -rotate-90" />
        </motion.span>
        <div className="">
            
        </div>
      </div>
      <div className="bg-[#000] h-60 text-[#fff]">@COPYRIGHTS</div>
    </section>
  );
}

export default FooterSection;
