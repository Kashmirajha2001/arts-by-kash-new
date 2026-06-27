import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({ children, variant = "filled" }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
