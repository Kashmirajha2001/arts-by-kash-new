import ReviewForm from "../ReviewForm/ReviewForm";

import styles from "./ReviewModal.module.css";

export default function ReviewModal({ review, onClose, reloadReviews }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        <div className={styles.layout}>
          <div className={styles.left}>
            <h2>{review.title}</h2>

            <p>
              <strong>Student:</strong> {review.userName}
            </p>

            <p>
              <strong>Course:</strong> {review.courseTitle}
            </p>

            <p>
              <strong>Rating:</strong> {review.rating}/5
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(review.createdAt).toLocaleString()}
            </p>

            <hr />

            <h3>Review</h3>

            <p>{review.comment}</p>
          </div>

          <div className={styles.right}>
            <ReviewForm
              review={review}
              reloadReviews={reloadReviews}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
