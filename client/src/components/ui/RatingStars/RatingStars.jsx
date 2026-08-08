import { FaStar } from "react-icons/fa";

import styles from "./RatingStars.module.css";

export default function RatingStars({
  rating = 0,
  reviews,
  editable = false,
  onChange,
}) {
  const roundedRating = Math.round(rating);

  return (
    <div className={styles.wrapper}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= roundedRating ? styles.active : styles.inactive}
            onClick={() => editable && onChange?.(star)}
          />
        ))}
      </div>

      {reviews !== undefined && (
        <>
          <span className={styles.rating}>{Number(rating).toFixed(1)}</span>

          <span className={styles.reviews}>
            ({reviews} {reviews === 1 ? "Review" : "Reviews"})
          </span>
        </>
      )}
    </div>
  );
}
