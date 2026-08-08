import { LuBadgeCheck } from "react-icons/lu";

import RatingStars from "../../../../components/ui/RatingStars/RatingStars";

import styles from "./ReviewCard.module.css";

export default function ReviewCard({ review }) {
  return (
    <article className={styles.card}>
      <span className={styles.quote}>&ldquo;</span>

      <p className={styles.comment}>
        {review.title}-{review.comment}
      </p>

      <div className={styles.footer}>
        {review.user?.avatar ? (
          <img
            src={review.user.avatar}
            alt={review.userName}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarFallback}>
            {review.userName?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className={styles.meta}>
          <div className={styles.nameRow}>
            <span className={styles.name}>{review.userName}</span>

            <span className={styles.badge}>
              <LuBadgeCheck />
              Verified Student
            </span>
          </div>

          <div className={styles.courseName}>{review.courseTitle}</div>

          <RatingStars rating={review.rating} />
        </div>
      </div>
    </article>
  );
}
