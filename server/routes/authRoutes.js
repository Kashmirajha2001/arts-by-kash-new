import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  googleLogin,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/authValidator.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", protect, getMe);
router.post("/logout", logoutUser);
router.post("/google", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;