import { motion } from "framer-motion";
import styles from "./DeleteConfirm.module.css";

export default function DeleteConfirm({ onCancel, onConfirm }) {
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <motion.div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.2 }}
      >
        <h3>Delete this address?</h3>
        <p>This action cannot be undone.</p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
