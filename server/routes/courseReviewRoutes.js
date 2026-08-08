import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createOrUpdateReview,
  getCourseReviews,
  getMyReview,
  getReviewSummary,
  getAllPublicReviews,
} from "../controllers/courseReviewController.js";

const router = express.Router();

router.get("/course/:courseId", getCourseReviews);

router.get("/my/:courseId", protect, getMyReview);

router.post("/", protect, createOrUpdateReview);

router.get("/summary", getReviewSummary);

router.get("/testimonials", getAllPublicReviews);

export default router;
