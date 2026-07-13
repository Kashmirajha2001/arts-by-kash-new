import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
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
router.patch("/profile", protect, updateProfile);
router.get("/addresses", protect, getAddresses);

router.post("/addresses", protect, addAddress);
router.put("/addresses/:id", protect, updateAddress);
router.delete("/addresses/:id", protect, deleteAddress);
router.patch("/addresses/:id/default", protect, setDefaultAddress);

export default router;