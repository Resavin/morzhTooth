import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./auth.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

// Generate swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger docs at /api-docs
app.use("/auth/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/authdb";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Auth service running on port ${PORT}`));
