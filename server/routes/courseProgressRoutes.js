import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getCourseProgress,
  markLessonComplete,
  updateLastLesson,
} from "../controllers/courseProgressController.js";

const router = express.Router();

router.get("/:courseId", protect, getCourseProgress);

router.patch("/:courseId/complete", protect, markLessonComplete);

router.patch("/:courseId/last-lesson", protect, updateLastLesson);

export default router;
