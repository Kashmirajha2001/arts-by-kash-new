import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {admin} from "../middleware/admin.js";

import {
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/adminCourseReviewController.js";

const router = express.Router();

router.use(protect, admin);

router.get("/", getAllReviews);

router.get("/:id", getReview);

router.patch("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;
