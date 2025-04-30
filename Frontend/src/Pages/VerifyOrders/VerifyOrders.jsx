import React, { useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const session_id = searchParams.get("session_id");  // Ensure session_id is captured
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const url = import.meta.env.VITE_API_URL || "https://menstore-backend.onrender.com"; // Use environment variable

  const verifyPayment = useCallback(async () => {
    if (!success || !session_id || !userId) {
      navigate("/"); // Redirect if params are missing
      return;
    }

    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, session_id, userId });

      if (response.data.success) {
        clearCart();
        navigate("/MyOrders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate("/");
    }
  }, [success, session_id, userId, navigate, clearCart, url]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-24 h-24 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default VerifyOrder;
