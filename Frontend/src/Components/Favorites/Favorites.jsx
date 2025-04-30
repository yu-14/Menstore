import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { ThemeContext } from "../../Context/ThemeContext"; 
import ProductCard from "../../Components/ProductCard";
import saleProducts from "/public/assets/Reccomanded";

const Favorites = () => {
  const { theme } = useContext(ThemeContext); 

  return (
    <div className={`p-6 md:p-10 transition-all ${theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#E5E5E5] text-[#0D1321]"}`}>
      
      {/* Section Title */}
      <h1 className="font-bold text-2xl md:text-3xl text-center mb-4">Top Trends</h1>

      {/* Browse All Favorites Link */}
      <div className="flex justify-end mb-6">
        <Link 
          to="/Sale" 
          className={`flex items-center font-semibold gap-1 transition-all ${
            theme === "dark" ? "text-[#F0EBE3] hover:text-[#4A4E69]" : "text-[#4A4E69] hover:text-[#0D1321]"
          }`}
        >
          Browse all Favorites <IoIosArrowDropright size={20} />
        </Link>
      </div>

      {/* Product Grid */}
      {saleProducts.length === 0 ? (
        <p className="text-center text-orange-500 text-lg mt-4">
          No products found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {saleProducts.slice(0, 8).map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
