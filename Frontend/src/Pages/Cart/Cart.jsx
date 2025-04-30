import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

const Cart = () => {
  const { cartItems, removeFromCart, changeQuantity, clearCart } =
    useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const { user } = useClerk();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.new_price * item.quantity,
    0
  );
  const gst = subtotal > 2000 ? subtotal * 0.05 : subtotal * 0.02;
  let total = subtotal + gst;

  const discount = discountApplied ? 50 : 0;
  total = subtotal > 2000 ? total - discount : total;
  const deliveryCharges = subtotal > 2000 ? 50 : 0;
  total = subtotal > 2000 ? total + deliveryCharges : total;

  const applyCoupon = () => {
    if (coupon === "SAVE50") {
      setDiscountApplied(true);
    }
  };

  const handleProceed = () => {
    if (!user) {
      clearCart();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`p-4 md:p-8 text-center min-h-screen flex flex-col items-center ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="w-full max-w-6xl flex flex-col gap-6 items-center">
        {cartItems.length === 0 ? (
          <p className="text-lg font-semibold text-red-500">
            Your cart is empty. Start adding items to continue shopping!
          </p>
        ) : (
          <div className="overflow-x-auto w-full">
            <table
              className={`w-full shadow-lg rounded-lg overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <thead
                className={`${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <tr>
                  <th className="py-3 px-2 md:px-4">S.no</th>
                  <th className="py-3 px-2 md:px-4">Product</th>
                  <th className="py-3 px-2 md:px-4">Size</th>
                  <th className="py-3 px-2 md:px-4">Color</th>
                  <th className="py-3 px-2 md:px-4">Price</th>
                  <th className="py-3 px-2 md:px-4">Quantity</th>
                  <th className="py-3 px-2 md:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="text-center border-b"
                  >
                    <td className="py-3 px-2 md:px-4">{index + 1}</td>
                    <td className="py-3 px-2 md:px-4 font-medium">
                      {item.name}
                    </td>
                    <td className="py-3 px-2 md:px-4">{item.size}</td>
                    <td className="py-3 px-2 md:px-4">{item.color}</td>
                    <td className="py-3 px-2 md:px-4 text-green-600">
                      ₹ {item.new_price}
                    </td>
                    <td className="py-3 px-2 md:px-4 flex items-center justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        onClick={() =>
                          changeQuantity(item.id, item.size, item.color, 1)
                        }
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        onClick={() =>
                          changeQuantity(item.id, item.size, item.color, -1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                    </td>
                    <td className="py-3 px-2 md:px-4">
                      <button
                        className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                        onClick={() =>
                          removeFromCart(item.id, item.size, item.color)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order Summary & Coupon Section */}
        <div className="w-full flex flex-col lg:flex-row gap-6 justify-between">
          <div
            className={`w-full p-6 rounded-lg shadow-md ${
              theme === "dark"
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <p className="flex justify-between text-lg">
                <span>Subtotal:</span>{" "}
                <span>₹ {subtotal.toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-lg">
                <span>GST:</span> <span>+ ₹ {gst.toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-lg">
                <span>Discount:</span>{" "}
                <span>- ₹ {discount.toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-lg">
                <span>Delivery Charges:</span>{" "}
                <span>+ ₹ {deliveryCharges.toLocaleString()}</span>
              </p>
              <hr className="border-gray-300" />
              <p className="flex justify-between text-xl font-bold">
                <span>Final Total:</span>{" "}
                <span>₹ {total.toLocaleString()}</span>
              </p>
            </div>
            {cartItems.length > 0 && (
              <SignedIn>
                <Link
                  to="/placeOrder"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
                >
                  Proceed to Checkout
                </Link>
              </SignedIn>
            )}
            <SignedOut>
              <button
                onClick={handleProceed}
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                Proceed to Checkout
              </button>
              <p className="text-red-500 text-lg text-center mt-5">
                Please sign in to proceed to checkout.
              </p>
            </SignedOut>
          </div>

          {/* Coupon Section */}
          <div className="w-full flex flex-col lg:flex-row gap-6 justify-center items-center">
            <div
              className={`w-full max-w-md p-6 rounded-lg shadow-md text-center ${
                theme === "dark" ? "border text-gray-200" : "text-gray-800"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">Apply Coupon</h3>
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full p-2 text-black border rounded-md mb-2"
              />
              <button
                onClick={applyCoupon}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition"
              >
                Apply
              </button>
              {discountApplied && (
                <p className="text-green-500 mt-2">
                  Coupon applied successfully! ₹50 discount added.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
