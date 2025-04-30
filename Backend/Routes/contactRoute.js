import express from "express";
import { submitContactForm, getAllContacts } from "../Controllers/contactControllers.js";

const contactRouter = express.Router();

contactRouter.post("/", submitContactForm);
contactRouter.get("/", getAllContacts);

export default contactRouter;
