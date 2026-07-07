import { NavLink } from "react-router-dom";
import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({
  children,
  variant = "filled",
  to,
  onClick,
  type = "button",
  disabled="false",
}) {
  const className = `${styles.button} ${styles[variant]}`;

  if (to) {
    return (
      <NavLink to={to} className={className}>
        {children}
      </NavLink>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
