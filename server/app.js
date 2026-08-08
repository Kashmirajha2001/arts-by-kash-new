import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import commissionRoutes from "./routes/commissionRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import courseProgressRoutes from "./routes/courseProgressRoutes.js";
import courseReviewRoutes from "./routes/courseReviewRoutes.js";
import adminCourseReviewRoutes from "./routes/adminCourseReviewRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://artsbykash.com",
  "https://www.artsbykash.com",
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS?.split(",") || []),
].filter(Boolean);

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
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/commission", commissionRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/products", productRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/assignments", assignmentRoutes);

app.use("/api/course-progress", courseProgressRoutes);

app.use("/api/course-reviews", courseReviewRoutes);

app.use("/api/admin/course-reviews", adminCourseReviewRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Arts by Kash API is running 🚀",
  });
});

app.use((error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Each product image must be 5MB or smaller.",
    });
  }

  return res.status(error.status || 500).json({
    success: false,
    message: error.message || "Something went wrong.",
  });
});

export default app;
