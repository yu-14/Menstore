import express from "express";
import { placeOrder, verifyPayment, getMyOrders,trackOrder } from "../Controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.post("/verify", verifyPayment);
orderRouter.get("/myOrders/:userId", getMyOrders);
orderRouter.get("/track/:orderId", trackOrder);


export default orderRouter;
