import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.circle}>
          <div className={styles.brush}></div>
        </div>

        <h2 className={styles.title}>Arts by Kash</h2>

        <p className={styles.subtitle}>
          Preparing your canvas...
        </p>
      </div>
    </div>
  );
}