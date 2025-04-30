import React, { useState, useEffect,useContext } from "react";
import { FaArrowUp } from "react-icons/fa";
import { ThemeContext } from "../../Context/ThemeContext";

const MoveTopBtn = () => {
  const { theme } = useContext(ThemeContext);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-5 right-5 p-3 ${
        theme === "dark"
          ? "bg-orange-500 text-white"
          : "bg-gray-800 text-white"
      }  rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <FaArrowUp size={24} />
    </button>
  );
};

export default MoveTopBtn;
