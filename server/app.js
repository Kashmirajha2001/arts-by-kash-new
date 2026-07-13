import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import commissionRoutes from "./routes/commissionRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from './routes/orderRoutes.js';

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://artsbykash.com",
  "https://www.artsbykash.com",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/commission", commissionRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Arts by Kash API is running 🚀",
  });
});

export default app;
