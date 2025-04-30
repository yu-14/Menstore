import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || "https://menstore-backend.onrender.com";

  useEffect(() => {
    if (!orderId || orderId.length !== 24) {
      setError("Invalid order ID format.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/order/track/${orderId}`, {
          withCredentials: true, // Ensure authentication
        });
        setOrder(response.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.response?.data?.message || "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold">Tracking Order #{order._id}</h2>
      <ul className="mt-4">
        {order.statusHistory.map((status, index) => (
          <li key={index} className="mb-4">
            <strong>{new Date(status.date).toLocaleString()}</strong>: {status.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackOrder;
