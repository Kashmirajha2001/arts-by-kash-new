import { useState } from "react";

import { reviewAssignment } from "../../../../services/adminAssignmentService";

import { showSuccess, showError } from "../../../../utils/toast";

import styles from "./ReviewForm.module.css";

export default function ReviewForm({ assignment, reloadAssignments, onClose }) {
  const [feedback, setFeedback] = useState(assignment.feedback || "");

  const [status, setStatus] = useState(assignment.status);

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      await reviewAssignment(assignment._id, {
        feedback,
        status,
      });

      showSuccess("Review saved.");

      reloadAssignments();

      onClose();
    } catch (error) {
      console.error(error);

      showError("Unable to save review.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.form}>
      <h3>Instructor Review</h3>

      <textarea
        rows={8}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="under-review">Under Review</option>

        <option value="approved">Approved</option>

        <option value="needs-revision">Needs Revision</option>
      </select>

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Review"}
      </button>
    </div>
  );
}
