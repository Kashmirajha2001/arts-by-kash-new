import { useEffect, useState } from "react";

import { getReviews } from "../../../services/adminCourseReviewService";

import ReviewTable from "./ReviewTable/ReviewTable";
import ReviewModal from "./ReviewModal/ReviewModal";

import styles from "./Reviews.module.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviews();

      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1>Course Reviews</h1>

          <p>{reviews.length} reviews</p>
        </div>

        <ReviewTable reviews={reviews} onView={setSelectedReview} />
      </div>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          reloadReviews={loadReviews}
        />
      )}
    </>
  );
}
