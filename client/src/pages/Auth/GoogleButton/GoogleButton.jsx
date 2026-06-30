import { FcGoogle } from "react-icons/fc";

import styles from "./GoogleButton.module.css";

export default function GoogleButton() {
  return (
    <>
      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <button type="button" className={styles.googleButton}>
        <FcGoogle />
        Continue with Google
      </button>
    </>
  );
}
