import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import all_product from "/public/assets/ProductsList";
import star_icon from "/public/assets/star_icon.png";
import dull_star_icon from "/public/assets/star_dull_icon.png";
import { CartContext } from "../../Context/CartContext";
import { ThemeContext } from "../../Context/ThemeContext";

const ProductDisplay = () => {
  const { addToCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const product = all_product.find((p) => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "Black");
  const [reviews, setReviews] = useState([
    { name: "Risako M", rating: 4, comment: "Great product!" },
    { name: "Jackie H", rating: 3, comment: "Good but can be better." },
    { name: "Laura G", rating: 5, comment: "Absolutely loved it!" },
  ]);

  const [userReview, setUserReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  if (!product) {
    return <div className="text-center text-gray-600 dark:text-gray-300">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
  };
  

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (userReview.name.trim() && userReview.comment.trim()) {
      setReviews([...reviews, userReview]);
      setUserReview({ name: "", rating: 5, comment: "" });
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  return (
    <div className={`p-5 lg:p-10 transition-all ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`} id="product-display">
      {/* Product Details Section */}
      <div className="lg:flex justify-between items-start gap-10">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={product.image} alt={product.name} className="rounded-lg shadow-md w-full max-w-md" />
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <h1 className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</h1>
          <h1 className="font-semibold text-2xl mb-4">{product.name}</h1>
          <div className={`px-3 py-1 rounded-lg max-w-fit flex items-center mb-4 ${
            theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-blue-100 text-gray-800"
          }`}>
            {product.rating}
            <img src={star_icon} alt="rating" className="w-4 mx-2" />
            {product.comments} Ratings
          </div>

            <div className="mb-5">
              <h1 className="font-semibold mb-2">Description</h1>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>
              
          <div className="text-lg mb-5">
            <span className="text-orange-500 font-semibold text-3xl">&#8377; {product.new_price}</span>
            <span className="line-through text-gray-500 ml-3">&#8377; {product.old_price}</span>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Prices inclusive of all taxes</p>
            <p className="text-green-600 font-medium">Free Delivery Available</p>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-5">
              <h1 className="font-semibold mb-2">Select Size</h1>
              <div className="flex gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center border rounded-full text-lg font-semibold transition-all 
                      ${
                        selectedSize === size ? "bg-orange-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                    onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div className="mb-5">
              <h1 className="font-semibold mb-2">Select Color</h1>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-full border-2 
                      ${
                          selectedColor === color ? "border-orange-500" : "border-gray-400"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
          )}


          <div className="mb-5">
            <h1 className="text-green-600 font-semibold text-lg">In Stock</h1>
            <p className="text-gray-600 dark:text-gray-400">Ships from MenStore</p>
          </div>


          <div className="mb-6">
            <h1 className="font-semibold mb-2">Product Details</h1>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>Product Code: {product.id}</li>
              <li>Package contains: 1 Item</li>
              <li>Country of Origin: India</li>
            </ul>
          </div>

          <div className="mt-6">
            <Link to="/cart">
              <button 
                className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-medium px-6 py-3 rounded-lg w-full max-w-xs shadow-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>

       {/* Reviews Section */}
       <div className="mt-16">
        <h1 className="text-2xl font-semibold mb-6">Recent Reviews</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={index} className={`flex flex-col gap-2 p-6 rounded-lg shadow-lg transition-all ${
              theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
            }`}>
              <h4 className="font-semibold">{review.name}</h4>
              <div className="flex gap-2 items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img
                      key={i}
                      src={i < review.rating ? star_icon : dull_star_icon}
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{review.comment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Form */}
      <div className="mt-16">
        <h1 className="text-2xl font-semibold mb-4">Leave a Review</h1>
        <form onSubmit={handleReviewSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Name:</label>
            <input 
              type="text"
              value={userReview.name}
              onChange={(e) => setUserReview({ ...userReview, name: e.target.value })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Comment:</label>
            <textarea 
              value={userReview.comment}
              onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              required
            ></textarea>
          </div>

          <button type="submit" className="bg-orange-500 hover:bg-orange-600 transition-all text-white font-medium px-6 py-2 rounded-lg w-full">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
