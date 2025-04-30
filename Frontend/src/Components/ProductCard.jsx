import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import star_icon from "../../public/assets/star_icon.png";

const ProductCard = ({ product }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div
        className={`max-w-sm rounded-lg overflow-hidden shadow-lg
          ${theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="overflow-hidden">
          <img
            className="w-full h-1/2 object-cover transition-transform ease-in-out duration-500 transform hover:scale-105"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="px-6 py-4">
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {product.brand}
          </div>
          <div className="font-semibold text-base md:text-lg mb-2">{product.name}</div>
          <div
            className={`max-w-fit text-xs p-1 my-2 rounded-lg flex items-center ${
              theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-blue-100 text-gray-800"
            }`}
          >
            {product.rating}
            <img src={star_icon} className="w-4 h-4 mx-2" alt="rating" />
            {product.comments}
          </div>
          <p className="text-sm md:text-base font-semibold">
            <span className="mr-2 text-green-500">&#8377; {product.new_price}</span>
            <span className="line-through text-gray-500">&#8377; {product.old_price}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
