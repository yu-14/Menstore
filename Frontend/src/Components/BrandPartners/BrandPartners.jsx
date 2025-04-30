import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import nike from "/public/assets/nike.png";
import adidas from "/public/assets/Adidas_logo.png";
import puma from "/public/assets/puma.png";
import superdry from "/public/assets/superdry.png";
import gap from "/public/assets/gap.png";
import uspollo from "/public/assets/uspolo.png";
import allensolly from "/public/assets/allensolly.png";
import reebok from "/public/assets/reebok.png";
import ax from "/public/assets/ax.png";
import tommy from "/public/assets/tommy.svg";

const brands = [
  { name: "Nike", logo: nike },
  { name: "Adidas", logo: adidas },
  { name: "Puma", logo: puma },
  { name: "GAP", logo: gap },
  { name: "Super Dry", logo: superdry },
  { name: "US Polo Assn", logo: uspollo },
  { name: "Reebok", logo: reebok },
  { name: "Allen Solly", logo: allensolly },
  { name: "Armani Exchange", logo: ax },
  { name: "Tommy Hilfiger", logo: tommy },
];

const BrandPartners = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 md:p-12 transition-all duration-300 ${
        theme === "dark" ? "bg-[#E5E5E5] text-[#0D1321]" : "bg-[#E5E5E5] text-[#0D1321]"
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-12">Our Brand Partners</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center items-center">
        {brands.map((brand, index) => (
          <div key={index} className="flex justify-center items-center group">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-32 md:w-40 h-24 md:h-32 object-contain transition-transform transform group-hover:scale-110 duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPartners;
