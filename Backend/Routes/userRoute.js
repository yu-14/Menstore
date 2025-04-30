import express from "express";
import { getUser, registerUser } from "../Controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/:clerkId", getUser);

export default userRouter;
