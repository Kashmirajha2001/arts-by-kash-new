import { useEffect, useState } from "react";

import { getAllCourseReviews } from "../../../services/courseReviewService";

import ReviewCard from "../../Courses/CourseReviews/ReviewCard/ReviewCard";

import RatingStars from "../../../components/ui/RatingStars/RatingStars";

import styles from "./Testimonials.module.css";

export default function CourseReviews({ course }) {
  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(0);

  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getAllCourseReviews();

      setReviews(data.reviews);

      setAverageRating(data.averageRating);

      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.error(error);
    }
  };

  if (!reviews.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Student Reviews</h2>

        <RatingStars rating={averageRating} reviews={totalReviews} />
      </div>

      <div
        className={`${styles.scrollWrapper} ${
          reviews.length <= 2 ? styles.centered : ""
        }`}
      >
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </section>
  );
}
