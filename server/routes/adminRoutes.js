import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/admin.js";

import {
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} from "../controllers/adminController.js";

import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/orders", protect, admin, getAllOrders);

router.patch("/orders/:id/status", protect, admin, updateOrderStatus);

router.get("/orders/:id", protect, admin, getOrderById);

router.get("/products", protect, admin, getProducts);

router.post("/products", protect, admin, createProduct);

router.put("/products/:id", protect, admin, updateProduct);

router.delete("/products/:id", protect, admin, deleteProduct);

export default router;
