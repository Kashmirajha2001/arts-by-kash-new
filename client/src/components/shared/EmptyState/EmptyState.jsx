import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton";

import styles from "./EmptyState.module.css";

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  to,
  onClick,
}) {
  return (
    <section className={styles.emptyState}>
      <div className={styles.icon}>{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      {buttonText && (to || onClick) && (
        <PrimaryButton to={to} onClick={onClick}>
          {buttonText}
        </PrimaryButton>
      )}
    </section>
  );
}
