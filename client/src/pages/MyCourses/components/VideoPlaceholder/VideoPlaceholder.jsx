import { LuPlay } from "react-icons/lu";

import styles from "./VideoPlaceholder.module.css";

export default function VideoPlaceholder({ lesson }) {
  return (
    <div className={styles.video}>
      <div className={styles.content}>
        <div className={styles.play}>
          <LuPlay />
        </div>
        <h2>{lesson.title}</h2>
        <p>Video hosting placeholder — ready for Bunny -VideoPlaceholder.jsx</p>
      </div>
    </div>
  );
}
