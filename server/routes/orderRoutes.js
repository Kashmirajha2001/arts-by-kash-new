import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { validateCreateOrder } from "../validators/orderValidator.js";

import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, validateCreateOrder, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

export default router;
