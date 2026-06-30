import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

import styles from "./FormInput.module.css";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  autoComplete
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={styles.group}>
      <label htmlFor={name}>{label}</label>

      <div className={styles.inputWrapper}>
        <input
          id={name}
          name={name}
          className={error ? styles.inputError : ""}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
