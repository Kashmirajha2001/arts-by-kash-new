import { useRef, useState, useEffect } from "react";
import {
  LuCloudUpload,
  LuImage,
  LuFileText,
  LuTrash2,
  LuEye,
  LuCircleCheckBig,
} from "react-icons/lu";

import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

import {
  submitAssignment,
  getAssignment,
  deleteAssignmentFile,
} from "../../../../services/assignmentService";

import { showSuccess, showError } from "../../../../utils/toast";

import styles from "./AssignmentUpload.module.css";

export default function AssignmentUpload({ lesson, course }) {
  const [submission, setSubmission] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const assignment = lesson.assignment;

  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);

  const [notes, setNotes] = useState("");

  const remaining =
    assignment.maxFiles - ((submission?.files?.length || 0) + files.length);

  const handleFiles = (selectedFiles) => {
    const incoming = Array.from(selectedFiles);

    const merged = [...files];

    incoming.forEach((file) => {
      const alreadyExists = merged.some(
        (f) => f.name === file.name && f.size === file.size,
      );

      if (!alreadyExists) {
        merged.push(file);
      }
    });

    const existingCount = submission?.files?.length || 0;

    if (existingCount + merged.length > assignment.maxFiles) {
      showError(`Maximum ${assignment.maxFiles} files allowed.`);

      return;
    }

    setFiles(merged);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    loadAssignment();
  }, []);

  const loadAssignment = async () => {
    try {
      const assignment = await getAssignment(
        course.productId,

        lesson.videoId || lesson.id,
      );

      setSubmission(assignment);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append(
        "courseProductId",

        course.productId,
      );

      formData.append(
        "lessonId",

        lesson.videoId || lesson.id,
      );

      formData.append(
        "assignmentTitle",

        lesson.assignment.title,
      );

      formData.append(
        "notes",

        notes,
      );

      files.forEach((file) => {
        formData.append(
          "files",

          file,
        );
      });

      const assignment = await submitAssignment(formData);

      // setSubmission(assignment);
      await loadAssignment();

      setFiles([]);

      showSuccess("Assignment submitted successfully.");

      setFiles([]);
    } catch (error) {
      console.error(error);

      showError(
        error.response?.data?.message || "Unable to submit assignment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const updated = await deleteAssignmentFile(
        submission._id,

        fileId,
      );

      setSubmission(updated);

      showSuccess("File removed.");
    } catch (error) {
      showError("Unable to remove file.");
    }
  };

  // add near the top of the file, above the component
  const truncateFileName = (name, maxLength = 22) => {
    if (!name || name.length <= maxLength) return name;

    const dotIndex = name.lastIndexOf(".");
    const ext = dotIndex !== -1 ? name.slice(dotIndex) : "";
    const base = dotIndex !== -1 ? name.slice(0, dotIndex) : name;

    const keep = maxLength - ext.length - 3; // 3 chars for "..."
    if (keep <= 0) return name.slice(0, maxLength) + "...";

    return `${base.slice(0, keep)}...${ext}`;
  };

  const statusConfig = {
    submitted: {
      label: "Submitted",
      className: "submitted",
    },
    "under-review": {
      label: "Under Review",
      className: "underReview",
    },
    approved: {
      label: "Approved",
      className: "approved",
    },
    "needs-revision": {
      label: "Needs Revision",
      className: "needsRevision",
    },
  };

  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <h2>🎨 Assignment</h2>

        <h3>{assignment.title}</h3>

        <p>{assignment.description}</p>
      </div>

      {/* Guidelines */}

      <div className={styles.guidelines}>
        <h4>Submission Guidelines</h4>

        <ul>
          {assignment.acceptedFormats.map((item) => (
            <li key={item}>✓ {item}</li>
          ))}

          <li>✓ Maximum {assignment.maxSize}</li>

          <li>✓ Maximum {assignment.maxFiles} files</li>
        </ul>
      </div>

      {/* Upload */}

      <div className={styles.dropzone} onClick={() => inputRef.current.click()}>
        <LuCloudUpload size={42} />

        <h4>Drag & Drop Files Here</h4>

        <span>or click to browse</span>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept="image/*,.pdf,.zip"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Selected Files */}

      {!!files.length && (
        <div className={styles.files}>
          <h4>Selected Files</h4>

          {files.map((file, index) => (
            <div className={styles.file} key={index}>
              <div className={styles.fileInfo}>
                {file.type.includes("image") ? <LuImage /> : <LuFileText />}

                <div>
                  {/* <strong>{file.name}</strong> */}
                  <strong title={file.name}>
                    {truncateFileName(file.name)}
                  </strong>

                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>

              <div className={styles.fileActions}>
                {file.type.includes("image") && (
                  <button
                    type="button"
                    onClick={() =>
                      window.open(URL.createObjectURL(file), "_blank")
                    }
                  >
                    <LuEye />
                  </button>
                )}

                <button type="button" onClick={() => removeFile(index)}>
                  <LuTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {submission?.files?.length > 0 && (
        <div className={styles.files}>
          <h4>Submitted Files</h4>

          {submission.files.map((file, index) => (
            <div className={styles.file} key={index}>
              <div className={styles.fileInfo}>
                {file.mimeType?.startsWith("image") ? (
                  <LuImage />
                ) : (
                  <LuFileText />
                )}

                <div>
                  {/* <strong>{file.fileName}</strong> */}
                  <strong title={file.fileName}>
                    {truncateFileName(file.fileName)}
                  </strong>

                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>

              <div className={styles.fileActions}>
                <button
                  type="button"
                  onClick={() => window.open(file.url, "_blank")}
                >
                  <LuEye />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteFile(file._id)}
                >
                  <LuTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}

      <div className={styles.notes}>
        <label>Additional Notes (Optional)</label>

        <textarea
          rows={5}
          placeholder="Share anything you'd like your instructor to know..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Submit */}

      <PrimaryButton onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Assignment"}
      </PrimaryButton>

      {/* Status */}

      <div className={styles.statusCard}>
        <h4>Submission Status</h4>

        {submission ? (
          <>
            <div className={styles.statusRow}>
              <LuCircleCheckBig />

              <span
                className={
                  styles[
                    statusConfig[submission.status]?.className || "submitted"
                  ]
                }
              >
                {statusConfig[submission.status]?.label}
              </span>
            </div>

            <small className={styles.date}>
              Submitted on {new Date(submission.createdAt).toLocaleDateString()}
            </small>

            {submission.reviewedAt && (
              <small className={styles.date}>
                Reviewed on{" "}
                {new Date(submission.reviewedAt).toLocaleDateString()}
              </small>
            )}

            <div className={styles.feedback}>
              <h5>Instructor Feedback</h5>

              {submission.feedback ? (
                <p>{submission.feedback}</p>
              ) : (
                <p className={styles.pending}>
                  Your assignment hasn't been reviewed yet.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.statusPending}>Not Submitted</div>

            <div className={styles.feedback}>
              <h5>Instructor Feedback</h5>

              <p className={styles.pending}>
                Submit your assignment to receive feedback.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
