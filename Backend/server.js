import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./Config/database.js";
import userRouter from "./Routes/userRoute.js";
import contactRouter from "./Routes/contactRoute.js";
import orderRouter from "./Routes/orderRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5500;

connectDatabase().then(() => {
  app.use(cors({ origin: "https://menstore-frontend.onrender.com", methods: ["GET", "POST"], credentials: true }));
  app.use(express.json());

  app.use("/api/users", userRouter);
  app.use("/api/contact", contactRouter);
  app.use("/api/order", orderRouter);

  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}).catch(err => console.error("Database Connection Failed:", err));
