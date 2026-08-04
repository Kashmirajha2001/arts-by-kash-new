import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  submitAssignment,
  getAssignment,
  deleteAssignmentFile,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/", protect, upload.array("files", 3), submitAssignment);

router.get("/course/:courseId/lesson/:lessonId", protect, getAssignment);

router.delete("/:assignmentId/files/:fileId", protect, deleteAssignmentFile);

export default router;
