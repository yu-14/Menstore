import React, { useContext } from "react";
import HeroImage from "/public/assets/model.png"; 
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const Hero = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full h-auto flex flex-col lg:flex-row items-center p-6 lg:p-12 transition-all 
        ${theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#F0EBE3] text-[#0D1321]"}
      `}
    >
      {/* Text Section */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
          Upgrade Your Style
        </h1>
        <h3 className={`text-xl opacity-80 ${theme === "dark" ? "text-[#F0EBE3]" : "text-[#0D1321]"}`}>
        Don’t miss out on exclusive deals.
        Don't Miss Out - Limited Stock at Rock-Bottom Prices!
        </h3>
        <div className="flex justify-center lg:justify-start">
          <Link to="/Sale" onClick={() => window.scrollTo({ top: 0})}>
            <button
              className={`px-6 py-3 flex items-center gap-2 rounded-lg text-lg transition-all shadow-lg 
                ${theme === "dark" 
                  ? "bg-[#4A4E69] text-white hover:bg-[#F0EBE3] hover:text-[#0D1321]" 
                  : "bg-[#0D1321] text-[#F0EBE3] hover:bg-[#4A4E69] hover:text-white"}
              `}
            >
              Shop Now <IoMdArrowForward />
            </button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
        <img
          src={HeroImage}
          alt="Trendy Fashion"
          className="w-[80%] md:w-[60%] lg:w-[90%] xl:w-[70%] max-w-sm lg:max-w-md rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default Hero;
