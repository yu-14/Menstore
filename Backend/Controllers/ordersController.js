import Order from "../Models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL || "https://menstore-frontend.onrender.com";

// Function to place an order
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    console.log("Received order data:", { userId, items, amount, address, paymentMethod });

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const validatedItems = items.map((item) => {
      const itemPrice = item.new_price; // Use new_price

      if (!itemPrice || isNaN(itemPrice) || itemPrice <= 0) {
        throw new Error(`Invalid price for item: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: "inr",
          product_data: { 
            name: item.name, 
            images: [`${frontend_url}${item.image}`] // Ensure images show on Stripe checkout
          },
          unit_amount: Math.round(parseFloat(itemPrice) * 100), // Convert to paisa
        },
        quantity: item.quantity,
      };
    });

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid order amount" });
    }

    // Save order as "Pending" before Stripe checkout
    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      status: "Pending", // Pending until payment verification
    });

    await newOrder.save();

    if (paymentMethod === "online") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: validatedItems, // Show items in Stripe checkout
        mode: "payment",
        success_url: `${frontend_url}/verifyOrders?success=true&session_id={CHECKOUT_SESSION_ID}&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verifyOrders?success=false&orderId=${newOrder._id}`,
        metadata: {
          userId,
          orderId: newOrder._id.toString(), // Store only orderId to avoid metadata limit
        },
      });

      return res.status(200).json({ url: session.url });
    }

    res.status(201).json({ message: "Order placed successfully", newOrder });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ message: "Error processing order", error: error.message });
  }
};

// Function to verify online payment and store order
export const verifyPayment = async (req, res) => {
  try {
    const { success, session_id, orderId } = req.body;

    if (!success || !session_id || !orderId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed or invalid session" });
    }

    // Find order and update status
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    existingOrder.status = "Paid";
    existingOrder.stripeSessionId = session_id;
    await existingOrder.save();

    res.status(200).json({ success: true, message: "Payment verified and order placed", order: existingOrder });
  } catch (error) {
    console.error("Payment verification error:", error.message);
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};

// Function to fetch user orders
export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Error retrieving orders", error: error.message });
  }
};


// Function to track order by orderId
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);
    

    if (!orderId || orderId.length !== 24) {
      return res.status(400).json({ message: "Invalid order ID format" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error tracking order:", error.message);
    res.status(500).json({ message: "Error retrieving order", error: error.message });
  }
};


