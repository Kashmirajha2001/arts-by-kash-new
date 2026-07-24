import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/admin.js";

import {
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/orders", protect, admin, getAllOrders);

router.patch("/orders/:id/status", protect, admin, updateOrderStatus);

router.get("/orders/:id", protect, admin, getOrderById);

export default router;
