import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { LuX } from "react-icons/lu";

import ReviewForm from "../ReviewForm/ReviewForm";

import styles from "./AssignmentModal.module.css";

export default function AssignmentModal({
  assignment,
  onClose,
  reloadAssignments,
}) {
  return (
    <Modal open={!!assignment} onClose={onClose} closeAfterTransition>
      <Box className={styles.modal}>
        <IconButton className={styles.close} onClick={onClose}>
          <LuX />
        </IconButton>

        <div className={styles.layout}>
          <div className={styles.left}>
            <h2>{assignment.assignmentTitle}</h2>

            <p>
              <strong>Student:</strong> {assignment.user.name}
            </p>

            <p>
              <strong>Email:</strong> {assignment.user.email}
            </p>

            <p>
              <strong>Status:</strong> {assignment.status}
            </p>

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(assignment.createdAt).toLocaleString()}
            </p>

            <hr />

            <h3>Student Notes</h3>

            <p>{assignment.notes || "No notes provided."}</p>

            <hr />

            <h3>Submitted Files</h3>

            <div className={styles.files}>
              {assignment.files.map((file) => (
                <button
                  key={file.public_id}
                  onClick={() => window.open(file.url, "_blank")}
                >
                  {file.fileName}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <ReviewForm
              assignment={assignment}
              reloadAssignments={reloadAssignments}
              onClose={onClose}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}
