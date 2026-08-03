import styles from "./ProgressCard.module.css";

export default function ProgressCard({ progress, compact = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <div className={styles.top}>
        <span>Course Progress</span>
        <strong>{progress.percentage}%</strong>
      </div>

      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      <p className={styles.meta}>
        {progress.completedCount} completed · {progress.remainingLessons} remaining
      </p>
    </div>
  );
}
