import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import generalRoutes from "./general.routes";
import { swaggerOptions } from "./swagger";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI ||
  "mongodb://localhost:27017/generaldb";
const app = express();
app.use(express.json());
app.use(cors());
// Generate swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);
// Serve Swagger docs at /api-docs
app.use("/general/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB (General Service)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/general", generalRoutes);

app.listen(PORT, () => {
  console.log(`🏨 General Service running on port ${PORT}`);
});
