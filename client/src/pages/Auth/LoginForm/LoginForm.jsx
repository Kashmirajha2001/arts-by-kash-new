import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";
import FormInput from "../../../components/ui/FormInput/FormInput";
import { isValidEmail } from "../../../utils/validation";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import {
  showSuccess,
  showError,
} from "../../../utils/toast";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [, setSearchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if(!form.email.trim() && !form.password.trim()){
      showError("Email & Password is required!");
    }else{
      if (!form.email.trim()) {
        newErrors.email = "Enter a valid email.";
      } else if (!isValidEmail(form.email)) {
        newErrors.email = "Enter a valid email.";
      }
  
      if (!form.password.trim()) {
        newErrors.password = "Password is required.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(form);
    }

    setLoading(true);

    try {
      await login(form);

      const loggedInUser = await login(form);
      showSuccess(`Welcome back, ${loggedInUser.name.split(" ")[0]}! ✨`);
      navigate("/");
      
    } catch (error) {
      console.error(error);

      // showError("Login Failed!")
      setErrors({
        general: error.response?.data?.message || "Login failed.",
      });
    } finally {
      setLoading(false);
    }
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

        {/* {errors.general && (
          <p
            style={{
              color: "#c62828",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            {errors.general}
          </p>
        )} */}

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
