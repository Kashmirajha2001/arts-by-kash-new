import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/admin.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  getAllProducts,
} from "../controllers/adminController.js";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/orders", protect, admin, getAllOrders);

router.patch("/orders/:id/status", protect, admin, updateOrderStatus);

router.get("/orders/:id", protect, admin, getOrderById);

router.get("/products", protect, admin, getProducts);
// router.get("/products", protect, admin, getAllProducts);

// router.post("/products", protect, admin, createProduct);

router.post("/products", protect, admin, upload.array("images", 10), createProduct);

// router.put("/products/:id", protect, admin, updateProduct);

router.put(
  "/products/:id",
  protect,
  admin,
  upload.array("images", 10),
  updateProduct,
);

router.delete("/products/:id", protect, admin, deleteProduct);

export default router;
