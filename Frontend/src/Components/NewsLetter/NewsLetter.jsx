import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";


const NewsLetter = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#4A4E69] text-[#E5E5E5]"} m-6 lg:m-10 rounded-lg px-6 lg:px-10 py-16 flex flex-col lg:flex-row justify-between items-center transition-all duration-300`}>
      <div className="text-center lg:text-left mb-6 lg:mb-0">
        <h2 className="font-semibold text-2xl lg:text-4xl leading-tight">
          Want product news and updates?
          <br /> Sign up for our newsletter.
        </h2>
      </div>
      <div className="w-full max-w-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="p-3 w-full text-[#0D1321] rounded-md outline-none"
          />
          <button className="bg-[#F0EBE3] hover:bg-[#E5E5E5] text-[#0D1321] font-semibold p-3 rounded-lg transition-all duration-300">
            Subscribe
          </button>
        </div>
        <p className="opacity-75 mt-2 text-sm text-center lg:text-left">
          We care about your data.{" "}
          <a href="/privacy-policy" className="underline">
            Read our privacy policy.
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
