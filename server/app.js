import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Arts by Kash API is running 🚀",
  });
});

export default app;
