import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import FormInput from "../../../components/ui/FormInput/FormInput";
import useAuth from "../../../hooks/useAuth";

import { isValidEmail, isStrongPassword } from "../../../utils/validation";

import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { register, login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Enter a valid email.";
    }

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
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/");
    } catch (error) {
      console.error(error);

      setErrors({
        general: error.response?.data?.message || "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          error={errors.name}
          autoComplete="name"
        />

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
          autoComplete="email"
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          autoComplete="new-password"
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </PrimaryButton>
      </form>

      <div className={styles.switch}>
        <span>Already have an account?</span>

        {errors.general && (
          <p
            style={{
              color: "#c62828",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            {errors.general}
          </p>
        )}
        
        <button
          type="button"
          onClick={() => setSearchParams({ mode: "login" })}
        >
          Sign In
        </button>
      </div>
    </>
  );
}
