import { useEffect, useState } from "react";

import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

import RatingStars from "../../../../components/ui/RatingStars/RatingStars";

import {
  getMyReview,
  saveReview,
} from "../../../../services/courseReviewService";

import { showSuccess, showError } from "../../../../utils/toast";

import styles from "./ReviewForm.module.css";

export default function ReviewForm({ course, onReviewSaved }) {
  const [rating, setRating] = useState(0);

  const [title, setTitle] = useState("");

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    loadReview();
  }, []);

  const loadReview = async () => {
    try {
      const review = await getMyReview(course.productId);

      if (!review) return;

      setExistingReview(review);
      setRating(review.rating);
      setTitle(review.title);
      setComment(review.comment);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!rating) {
      return showError("Please select a rating.");
    }

    if (!title.trim()) {
      return showError("Please enter a title.");
    }

    if (!comment.trim()) {
      return showError("Please write a review.");
    }

    try {
      setLoading(true);

      const review = await saveReview({
        courseProductId: course.productId,

        courseTitle: course.title,

        rating,

        title,

        comment,
      });

      setExistingReview(review);
      
      onReviewSaved?.();

      showSuccess(
        existingReview
          ? "Review updated successfully."
          : "Review submitted for approval.",
      );
    } catch (error) {
      console.error(error);

      showError(error.response?.data?.message || "Unable to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.card}>
      <h2>Leave a Review</h2>

      <RatingStars rating={rating} editable onChange={setRating} />

      <input
        className={styles.input}
        placeholder="Review Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        rows={6}
        placeholder="Share your learning experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <PrimaryButton onClick={handleSubmit} disabled={loading}>
        {loading
          ? "Saving..."
          : existingReview
            ? "Update Review"
            : "Submit Review"}
      </PrimaryButton>
    </section>
  );
}
