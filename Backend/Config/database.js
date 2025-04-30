import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saiganesh1976:21311a1976_rsg@cluster0.vosja.mongodb.net/Menstore",
    );
    console.log("Database Connected...");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};
