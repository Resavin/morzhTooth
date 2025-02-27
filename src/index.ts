import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/morzhdb";

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello from Bun + Express + MongoDB!");
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
