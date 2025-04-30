import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);

  const reviews = [
    {
      userId: "@john_doe",
      name: "John Doe",
      rating: 5,
      comment: "Great quality and fast delivery! Highly recommended.",
      date: "March 10, 2025",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      userId: "@michael_smith",
      name: "Michael Smith",
      rating: 4,
      comment: "The fabric is good, but delivery took a bit longer.",
      date: "March 8, 2025",
      photo: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      userId: "@david_lee",
      name: "David Lee",
      rating: 5,
      comment: "Amazing product! Will definitely buy again.",
      date: "March 5, 2025",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <div className={`p-6 md:p-12 min-h-screen transition-all duration-300 ${
      theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#E5E5E5] text-[#0D1321]"
    }`}>
      <h1 className="text-4xl font-bold text-center mb-8">Testimonials</h1>

      {/* Responsive Review Grid */}
      <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-300">No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                theme === "dark" ? "bg-[#1C1C1C] text-[#F0EBE3]" : "bg-white text-[#0D1321]"
              }`}
            >
              {/* Star Rating */}
              <p className="text-yellow-400 text-lg">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>

              {/* Review Message */}
              <p className="my-3">"{review.comment}"</p>

              {/* User Details */}
              <div className="flex items-center gap-4">
                <img
                  src={review.photo}
                  alt="User"
                  className="w-14 h-14 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <p className="text-lg font-semibold">{review.name}</p>
                  <p className="text-sm opacity-80">{review.userId}</p>
                  <p className="text-xs opacity-60">{review.date}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Testimonials;
