import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {admin} from "../middleware/admin.js";

import {
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../controllers/adminCourseReviewController.js";

const router = express.Router();

router.use(protect, admin);

router.get("/", getAllReviews);

router.patch("/:id", updateReviewStatus);

router.delete("/:id", deleteReview);

export default router;
