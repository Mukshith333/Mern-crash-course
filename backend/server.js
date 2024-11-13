import express from "express";
import dotenv, { config } from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";
import productroutes from "./routes/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1400;
const __dirname = path.resolve();

app.use(express.json()); // it allow us to accept req from json body
// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable if you're handling cookies
  })
);

app.use("/api/product", productroutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is now launched at ${PORT} port`);
});

// validation function

//oBAXaprcXhK0ID7i

//mongodb+srv://mukshith333:oBAXaprcXhK0ID7i@cluster0.9cr7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
