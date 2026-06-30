import { NavLink } from "react-router-dom";
import styles from "./SecondaryButton.module.css";

export default function SecondaryButton({
  children,
  to,
  onClick,
  type = "button",
}) {
  const className = styles.button;

  if (to) {
    return (
      <NavLink to={to} className={className}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}