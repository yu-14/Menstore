import React, { useContext, useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard";
import saleProducts from "/public/assets/Reccomanded";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";

const Sale = () => {
  const { theme } = useContext(ThemeContext);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  return (
    <div
      className={`p-5 lg:p-10 transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Sale Banner */}
      <div className="relative w-full text-center mb-10 bg-orange-600 text-white py-10 rounded-lg shadow-lg hover:bg-orange-500">
        <h1 className="text-4xl font-bold">Mega Sale is Live! 🔥</h1>
        <p className="text-lg mt-2">
          Up to 50% off on selected items. Limited Time Offer!
        </p>
        <p className="mt-2 text-2xl font-semibold">
          Hurry! Offer ends in {formatTime(timeLeft)}
        </p>
      </div>

      {/* Discount Coupon */}
      <div className="bg-yellow-200 text-black p-5 rounded-lg mb-10 text-center">
        <h2 className="text-2xl font-semibold">Extra 10% Off! 🎉</h2>
        <p className="mt-1">
          Use coupon code: <span className="font-bold text-lg">SALE50</span>
        </p>
        <p className="text-sm mt-1">Valid for orders above ₹. 50</p>
      </div>

      {/* Product Grid */}
      {saleProducts.length === 0 ? (
        <p className="text-center text-orange-500 text-lg mt-4">
          No products found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {saleProducts.slice(10,19).map((product) => (
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

      {/* Flash Sale Section */}
      <div className="mt-12 text-center bg-red-500 text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold">🔥 Flash Sale - Limited Time Only!</h2>
        <p className="text-lg mt-2">Exclusive deals with up to 70% off!</p>
      </div>

      {/* Trending Deals */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-6">🔥 Trending Deals</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {saleProducts.slice(1, 10).map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sale;
