import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import FormInput from "../../../components/ui/FormInput/FormInput";
import { isValidEmail } from "../../../utils/validation";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [, setSearchParams] = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(form);
    }

    setLoading(true);

    // Later this will be the API call

    setTimeout(() => {
      console.log(form);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
        />

        <button
          type="button"
          className={styles.forgot}
          onClick={() =>
            setSearchParams({
              mode: "forgot",
            })
          }
        >
          Forgot Password?
        </button>

        {/* <PrimaryButton type="submit">Sign In</PrimaryButton> */}
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </PrimaryButton>
      </form>

      <div className={styles.switch}>
        <span>Don't have an account?</span>

        <button
          onClick={() =>
            setSearchParams({
              mode: "register",
            })
          }
        >
          Create Account
        </button>
      </div>
    </>
  );
}
