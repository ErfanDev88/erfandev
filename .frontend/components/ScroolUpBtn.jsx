"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

function ScroolUpBtn() {
  const [showButton, setShowButton] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    function handleScroll() {
      const { scrollTop } = document.documentElement || document.body;
      const shouldShowButton = scrollTop > 100;
      setShowButton(shouldShowButton);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    controls.start({ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 });
  }, [showButton, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <motion.div
      className="p-3 rounded-full bg-[#c7a754] fixed bottom-7 md:right-8 right-12 flex cursor-pointer"
      style={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.62 8.77912L7.81667 4.97579C7.3675 4.52662 6.6325 4.52662 6.18334 4.97579L2.38 8.77912"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default ScroolUpBtn;
