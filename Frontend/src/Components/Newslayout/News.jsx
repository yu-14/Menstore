import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";

const News = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 lg:p-10 flex justify-center transition-all duration-300 ${
        theme === "dark" ? "bg-[#0D1321]" : "bg-[#E5E5E5]"
      }`}
    >
      <div
        className={`${
          theme === "dark"
            ? "bg-[#1C1C1C] text-[#F0EBE3]"
            : "bg-[#0D1321] text-[#E5E5E5]"
        } p-6 lg:p-10 text-center rounded-lg shadow-lg w-full max-w-full`}
      >
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Get 25% Off During Our One-Time Sale!
        </h1>
        <p className="text-lg lg:text-2xl opacity-80 mb-6">
          Most of our products are{" "}
          <span className="font-semibold">limited releases</span> that won't
          come back. Get your favorite items while they're in stock!
        </p>
        <Link
          to="/Sale"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={ `bg-[#4A4E69] hover:bg-[#F0EBE3] hover:text-[#0D1321] text-[#F0EBE3] px-6 py-3 rounded-xl font-semibold transition-all duration-300`}
        >
          Get Access to the Sale
        </Link>
      </div>
    </div>
  );
};

export default News;
