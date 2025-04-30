import React from "react";
import topWearList from "/public/assets/topWearList.js";

const TopWearCategories = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col items-center gap-6 mt-6 px-5 w-full">
      <div className="flex items-center justify-center gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent w-full px-4">
        {topWearList.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
            className="flex flex-col items-center cursor-pointer rounded-full flex-shrink-0"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-cover rounded-full shadow-md transition-all duration-300 ${
                category === item.menu_name ? "border-4 border-orange-500 p-1" : ""
              }`}
            />
            <p className="mt-2 text-sm md:text-base font-medium">{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr className="border-gray-300 dark:border-gray-600 w-full" />
    </div>
  );
};

export default TopWearCategories;
