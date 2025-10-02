import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaThreads, FaEnvelope } from "react-icons/fa6";

function FooterSection({ lenis }) {
  return (
    <section className="h-[600px] relative  bg-[#000] flex flex-col">

      {/* top covering content  */}
      <div className="z-10  pb-0  sticky -top-40 w-full flex flex-col">
        <div className="bg-white h-50" />

       
        <div className="bg-gray-500 flex justify-between items-center px-10 relative h-20 z-10 introaibg bg-blend-overlay">
          {/* Back to Top Button */}
          <motion.span
            initial={{ height: "120px" }}
            whileHover={{ height: "140px" }}
            onClick={() => {
              setTimeout(() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection && lenis) {
                  lenis.scrollTo(aboutSection);
                }
              }, 200);
            }}
            className="absolute top-0 left-10 overflow-hidden flex flex-col justify-center items-center gap-5 text-3xl font-anton bg-white px-3 py-5 pt-10 rounded-b-2xl cursor-pointer"
          >
            TOP
            <img
              src="/image/uparrow.svg"
              alt="arrow img"
              className="w-15 h-15 relative -rotate-90"
            />
          </motion.span>

          {/* Social Icons */}
          <div className="flex gap-6 px-10 justify-end w-full text-white text-2xl">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaGithub color="gray" size={35} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaLinkedin color="gray" size={35} />
            </a>
            <a
              href="https://www.threads.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaThreads color="gray" size={35} />
            </a>
            <a
              href="mailto:example@email.com"
              className="hover:text-gray-300 transition"
            >
              <FaEnvelope color="gray" size={35} />
            </a>
          </div>
        </div>
        
      </div>
      {/* Top bar with back-to-top and icons */}

      {/* Footer */}
      <div className="sticky bottom-0 h-[100%]  z-0   bg-[#000] text-[#fff] flex flex-col justify-center items-center py-10 text-center text-sm">
        <div className="flex items-center justify-center gap-4 text-white text-sm font-light ">
          <p>About</p>
          <p>Skills</p>
          <p>Experience</p>
          <p>Projects</p>
          <p>Contact</p>
        </div>
        <img
          src="/image/logo.png"
          alt="logo"
          className="w-80 h-20 object-contain mb-4"
        />
        <p>Copyright © COGNOSPHERE. All Rights Reserved.</p>
        <p className="mt-2">
          All assets and designs are inspired by Hoyoverse games and belong to
          their respective owners.
        </p>
      </div>
     
    </section>
  );
}

export default FooterSection;
