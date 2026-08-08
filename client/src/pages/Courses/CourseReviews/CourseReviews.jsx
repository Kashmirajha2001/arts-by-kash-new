import { useEffect, useState } from "react";

import useCourse from "../../../hooks/useCourse";

import { getCourseReviews } from "../../../services/courseReviewService";

import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewCard from "./ReviewCard/ReviewCard";
import RatingStars from "../../../components/ui/RatingStars/RatingStars";

import styles from "./CourseReviews.module.css";

export default function CourseReviews({ course }) {
  const { isCourseOwned } = useCourse();

  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(0);

  const [totalReviews, setTotalReviews] = useState(0);

  const { getCourseReviewSummary } = useCourse();

  const review = getCourseReviewSummary(course);

  useEffect(() => {
    if (course?.productId) {
      loadReviews();
    }
  }, [course]);

  const loadReviews = async () => {
    try {
      const data = await getCourseReviews(course.productId);

      setReviews(data.reviews);

      setAverageRating(data.averageRating);

      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.section}>
      <h2>Student Reviews</h2>

      {/* <RatingStars rating={averageRating} reviews={totalReviews} /> */}
      <RatingStars
        rating={review.averageRating}
        reviews={review.totalReviews}
      />

      {isCourseOwned(course.productId) && (
        <ReviewForm course={course} onReviewSaved={loadReviews} />
      )}

      <div className={styles.list}>
        {reviews.length ? (
          <div className={styles.scrollWrapper}>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            No reviews yet. Be the first to review this course!
          </div>
        )}
      </div>
    </section>
  );
}
