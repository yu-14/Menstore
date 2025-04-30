import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../Context/ThemeContext";
import { FaEye, FaRedo, FaTimesCircle } from "react-icons/fa";

const trackingStatusList = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const getRandomTrackingStatus = () => {
  return trackingStatusList[
    Math.floor(Math.random() * trackingStatusList.length)
  ];
};

const MyOrders = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [trackingStatus, setTrackingStatus] = useState({});
  const url = "https://menstore-backend.onrender.com";

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${url}/api/order/myOrders/${user.id}`
        );
        setOrders(response.data);
        const statusObj = {};
        response.data.forEach((order) => {
          statusObj[order._id] = getRandomTrackingStatus();
        });
        setTrackingStatus(statusObj);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user?.id]);

  return (
    <div
      className={`min-h-screen px-4 py-6 md:px-8 lg:px-15 transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-lg ">
          <thead>
            <tr
              className={`${
                theme === "dark" ? " text-white" : "text-gray-700"
              }`}
            >
              <th className="py-5">Order ID</th>
              <th className="py-5">Date</th>
              <th className="py-5">Total Price</th>
              <th className="py-5">Status</th>
              <th className="py-5">Products</th>
              <th className="py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-3 font-medium text-blue-600 dark:text-blue-300">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          theme === "dark" ? " text-white" : "text-gray-700"
                        }`}
                      >
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 font-semibold">₹{order.amount}.00</td>
                  <td
                    className={`py-3 font-semibold ${
                      trackingStatus[order._id] === "Delivered"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {trackingStatus[order._id]}
                  </td>
                  <td className="py-3 flex gap-2 flex-wrap">
                    <button className="px-3 py-3 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all flex items-center gap-1">
                      <FaEye /> View Order
                    </button>
                    {trackingStatus[order._id] === "Delivered" ? (
                      <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-all flex items-center gap-1">
                        <FaRedo /> Order Again
                      </button>
                    ) : (
                      <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-all flex items-center gap-1">
                        <FaTimesCircle /> Cancel Order
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
