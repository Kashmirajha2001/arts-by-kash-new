import express from "express";
import { submitCommission } from "../controllers/commissionController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  upload.array("images", 5),
  submitCommission
);

// router.post("/", submitCommission);

export default router;