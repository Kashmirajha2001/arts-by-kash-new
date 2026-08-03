import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";
import ProgressCard from "../ProgressCard/ProgressCard";

import styles from "./MyCourseCard.module.css";

export default function MyCourseCard({ course, progress }) {
  const lastAccessed = progress.lastAccessedAt
    ? new Date(progress.lastAccessedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not started yet";

  return (
    <article className={styles.card}>
      <img src={course.images?.[0]} alt={course.title} className={styles.image} />

      <div className={styles.content}>
        <h3>{course.title}</h3>

        <ProgressCard progress={progress} compact />

        <div className={styles.meta}>
          <span>
            {progress.completedCount}/{progress.totalLessons} lessons
          </span>
          <span>Last accessed: {lastAccessed}</span>
        </div>

        <PrimaryButton to={`/my-courses/${course.slug}`}>
          Continue Learning
        </PrimaryButton>
      </div>
    </article>
  );
}
