import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormInput from "../../../components/ui/FormInput/FormInput";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import { isStrongPassword } from "../../../utils/validation";
import { showSuccess, showError } from "../../../utils/toast";
import { resetPassword } from "../../../services/authService";

import { AnimatePresence, motion } from "framer-motion";
import { authFormVariants } from "../../../animations/authFormVariants";

import botanical from "../../../assets/textures/botanical.png";

import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (!isStrongPassword(form.password)) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      await resetPassword(token, form.password);
      showSuccess("Password updated successfully! 🎉");
      setSuccess(true);
    } catch (error) {
      showError(error.response?.data?.message || "Reset password failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <img src={botanical} alt="" className={styles.botanical} />
      <img src={botanical} alt="" className={styles.botanicalRight} />

      <div className={styles.card}>
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              variants={authFormVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1>Create New Password</h1>
              <p className={styles.subtitle}>
                Choose a strong password for your account.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
                  label="New Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  error={errors.password}
                />

                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                />

                <PrimaryButton type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Reset Password"}
                </PrimaryButton>
              </form>

              <button
                className={styles.back}
                onClick={() => navigate("/auth?mode=login")}
              >
                ← Back to Sign In
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              variants={authFormVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.success}
            >
              <div className={styles.icon}>🎉</div>
              <h1>Password Updated!</h1>
              <p className={styles.subtitle}>
                Your password has been reset successfully.
              </p>
              <PrimaryButton onClick={() => navigate("/auth?mode=login")}>
                Back to Sign In
              </PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
