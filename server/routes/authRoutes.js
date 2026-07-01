import express from "express";

import { registerUser, loginUser, getMe, logoutUser, googleLogin} from "../controllers/authController.js";
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

export default router;
