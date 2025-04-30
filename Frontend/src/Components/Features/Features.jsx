import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import Productreturn from "/public/assets/product_return.png";
import Discount from "/public/assets/discount.png";
import Eco from "/public/assets/eco-friendly.png";
import Calendar from "/public/assets/calendar.png";

const featuresData = [
  {
    image: Productreturn,
    title: "Free Returns",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    image: Discount,
    title: "All Year Discounts",
    description:
      'Use the code "ALLYEAR" at checkout and get discounts throughout the year!',
  },
  {
    image: Eco,
    title: "Eco-Friendly",
    description:
      "1% of sales go toward preserving and restoring the natural environment.",
  },
  {
    image: Calendar,
    title: "Same-Day Delivery",
    description:
      "Enjoy same-day delivery with our exclusive membership service.",
  },
];

const Features = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-10 md:p-14 transition-all duration-300 ${
        theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#E5E5E5] text-[#0D1321]"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="max-w-sm p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl 
            bg-[#F0EBE3] dark:bg-[#1E293B] text-[#4A4E69] dark:text-[#F0EBE3]"
          >
            <div className="flex justify-center mb-4">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-16 md:w-20 transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
