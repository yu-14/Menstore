import React, { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeContext";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { theme } = useContext(ThemeContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useUser();
  const navigate = useNavigate();
  const url = "https://menstore-backend.onrender.com";

  // Calculate order details
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.new_price * item.quantity,
    0
  );
  const gst = subtotal > 2000 ? subtotal * 0.05 : subtotal * 0.02;
  const discount = subtotal * 0.02;
  const deliveryCharges = subtotal > 2000 ? 50 : 0;
  const total = subtotal + gst - discount + deliveryCharges;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    paymentMethod: "cod",
  });

  // Handle input change
  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form submission handler
  const placeOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to place an order.");
      return;
    }

    for (let key in data) {
      if (!data[key].trim()) {
        toast.error(`Please fill in the ${key} field.`);
        return;
      }
    }

    const orderData = {
      userId: user.id,
      items: cartItems, // ✅ Rename cartItems to items
      address: data, // ✅ Rename shippingAddress to address
      paymentMethod: data.paymentMethod,
      amount: total, // ✅ Rename total to amount
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData);
      const resData = response.data;

      if (data.paymentMethod === "online" && resData.url) {
        window.location.href = resData.url;
      } else {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/MyOrders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error placing order.");
      console.error("Order Error:", error);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        className={`p-6 rounded-lg shadow-lg w-full max-w-2xl ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "border border-gray-300 bg-white text-black"
        }`}
        onSubmit={placeOrder}
      >
        <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={onChangeHandler}
            value={data.firstName}
            className="p-2 rounded border text-black"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={onChangeHandler}
            value={data.lastName}
            className="p-2 rounded border text-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            value={data.email}
            className="p-2 rounded border text-black"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={onChangeHandler}
            value={data.phone}
            className="p-2 rounded border text-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            onChange={onChangeHandler}
            value={data.street}
            className="p-2 rounded border text-black"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={onChangeHandler}
            value={data.city}
            className="p-2 rounded border text-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={onChangeHandler}
            value={data.state}
            className="p-2 rounded border text-black"
            required
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zip Code"
            onChange={onChangeHandler}
            value={data.zipcode}
            className="p-2 rounded border text-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={onChangeHandler}
            value={data.country}
            className="p-2 rounded border text-black"
            required
          />
        </div>

        <h2 className="mt-6 text-lg font-semibold">Payment Method:</h2>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={data.paymentMethod === "cod"}
              onChange={onChangeHandler}
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={data.paymentMethod === "online"}
              onChange={onChangeHandler}
            />
            Pay Online
          </label>
        </div>

        <h2 className="mt-6 text-lg font-semibold">Order Summary:</h2>
        <div className="bg-gray-800 text-white p-4 rounded-lg mt-2">
          <table className="w-full">
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="flex justify-between">
                  <td>
                    {item.name} x {item.quantity}
                  </td>
                  <td className="text-right">
                    ₹{(item.new_price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="my-2 border-gray-600" />
          <table className="w-full">
            <tbody>
              <tr className="flex justify-between">
                <td>Subtotal:</td>
                <td className="text-right">₹{subtotal.toFixed(2)}</td>
              </tr>
              <tr className="flex justify-between">
                <td>GST:</td>
                <td className="text-right">₹{gst.toFixed(2)}</td>
              </tr>
              <tr className="flex justify-between">
                <td>Discount:</td>
                <td className="text-right text-red-400">
                  - ₹{discount.toFixed(2)}
                </td>
              </tr>
              <tr className="flex justify-between">
                <td>Delivery Charges:</td>
                <td className="text-right">+ ₹{deliveryCharges}</td>
              </tr>
            </tbody>
          </table>
          <hr className="my-2 border-gray-600" />
          <table className="w-full">
            <tbody>
              <tr className="flex justify-between font-bold text-lg">
                <td>Total:</td>
                <td className="text-right">₹{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          {data.paymentMethod === "online"
            ? "Proceed to Payment"
            : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
