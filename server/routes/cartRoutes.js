import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);

router.post("/:productId", protect, addToCart);

router.put("/:productId", protect, updateCartQuantity);

router.delete("/:productId", protect, removeFromCart);

router.delete("/", protect, clearCart);

export default router;
