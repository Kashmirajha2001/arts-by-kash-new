import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { createOrder, verifyPayment } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.post("/verify", protect, verifyPayment);

export default router;
