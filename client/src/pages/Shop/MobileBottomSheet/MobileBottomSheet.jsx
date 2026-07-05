import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import styles from "./MobileBottomSheet.module.css";

export default function MobileBottomSheet({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.sheet}>
        <div className={styles.header}>
          <h3>{title}</h3>

          <button onClick={onClose}>
            <CloseRoundedIcon />
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
