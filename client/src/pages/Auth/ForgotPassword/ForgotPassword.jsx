import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import FormInput from "../../../components/ui/FormInput/FormInput";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import { forgotPassword } from "../../../services/authService";
import { showError } from "../../../utils/toast";

import { isValidEmail } from "../../../utils/validation";

import styles from "./ForgotPassword.module.css";

export default function ForgotPassword() {
  const [, setSearchParams] = useSearchParams();

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);

      setSuccess(true);
    } catch (error) {
      showError(error.response?.data?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!success ? (
        <>
          <p className={styles.info}>
            Enter your registered email address and we'll send you a password
            reset link.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              error={error}
              autoComplete="email"
              disabled={loading}
            />

            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </PrimaryButton>
          </form>
        </>
      ) : (
        <div className={styles.success}>
          <div className={styles.icon}>✉️</div>

          <h3>Check your inbox</h3>

          <p>
            If an account exists with this email, you'll receive a password
            reset link shortly.
          </p>
        </div>
      )}

      <button
        className={styles.back}
        onClick={() => setSearchParams({ mode: "login" })}
      >
        ← Back to Sign In
      </button>
    </>
  );
}
