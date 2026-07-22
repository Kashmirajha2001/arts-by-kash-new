import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { createOrder, verifyPayment, getMyOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.post("/verify", protect, verifyPayment);

router.get("/", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

export default router;
