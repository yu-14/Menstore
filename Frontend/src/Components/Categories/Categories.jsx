import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import Clothing from "/public/assets/product_2.png";
import Footwear from "/public/assets/product_25.avif";
import Watches from "/public/assets/product_31.avif";
import Ethnic_Wear from "/public/assets/product_50.avif";
import Sportswear from "/public/assets/sportswear.jpg";
import Grooming from "/public/assets/grooming.jpg";
import seasonalWear from "/public/assets/seasonalwear.avif"

const Categories = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`p-6 md:p-10 transition-all ${theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#E5E5E5] text-[#0D1321]"}`}>
      <h1 className="font-bold text-3xl text-center">Shop by Category</h1>
      <div className="flex flex-wrap justify-center gap-6 py-8">
        <div className={`w-full sm:w-1/2 md:w-1/3 h-1/2 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"}`}>
          <Link to="/shop/Topwear" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="w-full h-1/2 object-cover transition-transform transform hover:scale-105 duration-300" src={Clothing} alt="Clothing" />
            <div className="px-6 py-4 text-center font-semibold text-lg md:text-xl transition-all duration-300">Clothing</div>
          </Link>
        </div>
        
        <div className={`w-full sm:w-1/2 md:w-1/3 h-1/2 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"}`}>
          <Link to="/shop/footwear" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="w-full h-1/2 object-cover transition-transform transform hover:scale-105 duration-300" src={Footwear} alt="Footwear" />
            <div className="px-6 py-4 text-center font-semibold text-lg md:text-xl transition-all duration-300">Footwear</div>
          </Link>
        </div>
        
        <div className={`w-full sm:w-1/2 md:w-1/3 h-1/2 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"}`}>
          <Link to="/shop/Accessories" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="w-full h-1/2 object-cover transition-transform transform hover:scale-105 duration-300" src={Watches} alt="Watches" />
            <div className="px-6 py-4 text-center font-semibold text-lg md:text-xl transition-all duration-300">Accessories</div>
          </Link>
        </div>
        
        <div className={`w-full sm:w-1/2 md:w-1/3 h-1/2 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"}`}>
          <Link to="/shop/Topwear" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="w-full h-1/2 object-cover transition-transform transform hover:scale-105 duration-300" src={Sportswear} alt="sportswear" />
            <div className="px-6 py-4 text-center font-semibold text-lg md:text-xl transition-all duration-300">Sports Wear</div>
          </Link>
        </div>

        <div className={`w-full sm:w-1/2 md:w-1/3 h-1/2 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"}`}>
          <Link to="/shop/grooming" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="w-full h-1/2 object-cover transition-transform transform hover:scale-105 duration-300" src={Grooming} alt="sportswear" />
            <div className="px-6 py-4 text-center font-semibold text-lg md:text-xl transition-all duration-300">Grooming & Personal Care</div>
          </Link>
        </div>

        <div className={`w-full sm:w-1/2 md:w-1/3 h-1/2 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"}`}>
          <Link to="/shop/ethnic wear" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="w-full h-1/2 object-cover transition-transform transform hover:scale-105 duration-300" src={Ethnic_Wear} alt="sportswear" />
            <div className="px-6 py-4 text-center font-semibold text-lg md:text-xl transition-all duration-300">Traditional Wear</div>
          </Link>
        </div>

        <div className={`w-full sm:w-1/2 md:w-1/3 h-1/2 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"}`}>
          <Link to="/shop/seasonal wear" onClick={() => window.scrollTo({ top: 0 })}>
            <img className="w-full h-1/2 object-cover transition-transform transform hover:scale-105 duration-300" src={seasonalWear} alt="sportswear" />
            <div className="px-6 py-4 text-center font-semibold text-lg md:text-xl transition-all duration-300">Seasonal Wear</div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Categories;
