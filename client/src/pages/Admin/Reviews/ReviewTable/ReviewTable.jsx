import RatingStars from "../../../../components/ui/RatingStars/RatingStars";

import styles from "./ReviewTable.module.css";

export default function ReviewTable({ reviews, onView }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Student</th>

            <th>Course</th>

            <th>Rating</th>

            <th>Title</th>

            <th>Status</th>

            <th>Date</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.userName}</td>

              <td>{review.courseTitle}</td>

              <td>
                <RatingStars rating={review.rating} />
              </td>

              <td>{review.title}</td>

              <td>{review.approved ? "Approved" : "Pending"}</td>

              <td>{new Date(review.createdAt).toLocaleDateString()}</td>

              <td>
                <button
                  className={styles.viewButton}
                  onClick={() => onView(review)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
