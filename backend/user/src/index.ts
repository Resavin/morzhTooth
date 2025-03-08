import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./user.routes";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/userdb";

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB for User Microservice"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Register user routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 User Microservice running on port ${PORT}`);
});