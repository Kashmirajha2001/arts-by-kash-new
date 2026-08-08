import { useState } from "react";

import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

import {
  updateReview,
  deleteReview,
} from "../../../../services/adminCourseReviewService";

import { showSuccess, showError } from "../../../../utils/toast";

import styles from "./ReviewForm.module.css";

export default function ReviewForm({ review, reloadReviews, onClose }) {
  const [approved, setApproved] = useState(review.approved);

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateReview(review._id, approved);

      showSuccess("Review updated.");

      reloadReviews();

      onClose();
    } catch (error) {
      console.error(error);

      showError("Unable to update review.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(review._id);

      showSuccess("Review deleted.");

      reloadReviews();

      onClose();
    } catch (error) {
      console.error(error);

      showError("Unable to delete review.");
    }
  };

  return (
    <div className={styles.card}>
      <h3>Review Status</h3>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
        />
        Approved
      </label>

      <PrimaryButton onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </PrimaryButton>

      <button className={styles.deleteButton} onClick={handleDelete}>
        Delete Review
      </button>
    </div>
  );
}
