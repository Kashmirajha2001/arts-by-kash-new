import { useRef, useState } from "react";
import {
  // LuUploadCloud,
  LuCloudUpload,
  LuImage,
  LuFileText,
  LuTrash2,
  LuEye,
  // LuCheckCircle,
  LuCircleCheckBig,
} from "react-icons/lu";

import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./AssignmentUpload.module.css";

export default function AssignmentUpload({ lesson }) {
  const assignment = lesson.assignment;

  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);

  const [notes, setNotes] = useState("");

  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles);

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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
                  <strong>{file.name}</strong>

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

      <PrimaryButton>Submit Assignment</PrimaryButton>

      {/* Status */}

      <div className={styles.statusCard}>
        <h4>Submission Status</h4>

        <div className={styles.status}>
          <LuCircleCheckBig />

          <span>Not Submitted</span>
        </div>

        <div className={styles.feedback}>
          <h5>Instructor Feedback</h5>

          <p>Coming Soon</p>
        </div>
      </div>
    </section>
  );
}
