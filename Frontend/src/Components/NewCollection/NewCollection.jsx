import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import Clothing from "/public/assets/product_2.png";
import Footware from "/public/assets/product_25.avif";
import Watches from "/public/assets/product_31.avif";
import Caps from "/public/assets/product_37.webp";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";

const NewCollection = () => {
  const { theme } = useContext(ThemeContext);

  const favoritesData = [
    {
      image: Clothing,
      title: "PUMA Melo Iridescent Zip-Front Biker Jacket",
      price: "5999",
    },
    {
      image: Footware,
      title: "ADIDAS Adilaska Lace-Up Running Shoes",
      price: "5999",
    },
    {
      image: Watches,
      title: "UNIQUEST Black Dial Analogue Fashion Watch",
      price: "5999",
    },
    {
      image: Caps,
      title: "ARMANI EXCHANGE Men Baseball Cap",
      price: "5999",
    },
  ];

  return (
    <div
      className={`p-6 md:p-10 transition-all duration-300 ${
        theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#E5E5E5] text-[#0D1321]"
      }`}
    >
      <h1 className="font-bold text-3xl text-center">MenStore. Exclusives</h1>
      <div className="flex justify-end">
        <span className="flex items-center font-semibold gap-1 transition-all 
          text-right 
          {theme === 'dark' ? 'text-[#F0EBE3] hover:text-[#4A4E69]' : 'text-[#4A4E69] hover:text-[#0D1321]'}">
          <Link to="/NewArrivals" className="flex items-center gap-1">
            Browse all Favorites <IoIosArrowDropright size={20} />
          </Link>
        </span>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
        {favoritesData.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
              theme === "dark" ? "bg-[#1C1C1C] hover:bg-[#4A4E69]" : "bg-[#F0EBE3] hover:bg-[#4A4E69]"
            }`}
          >
            <div className="overflow-hidden">
              <img
                className="w-full h-1/2 object-cover transition-transform transform hover:scale-110 duration-300"
                src={item.image}
                alt={item.title}
              />
            </div>
            <div className="px-6 py-4">
              <div
                className={`font-semibold text-lg text-center transition-all ${
                  theme === "dark" ? "text-[#F0EBE3] hover:text-[#4A4E69]" : "text-[#0D1321] hover:text-[#F0EBE3]"
                }`}
              >
                {item.title}
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-center">
                <span className="bg-[#0D1321] text-[#F0EBE3] rounded-full px-3 py-1 text-sm font-semibold mr-2">
                  ₹{item.price}
                </span>
                <span className="bg-[#4A4E69] text-[#F0EBE3] rounded-full px-3 py-1 text-sm font-semibold line-through">
                  ₹7999
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollection;
