import { LuPlay } from "react-icons/lu";

import styles from "./VideoPlaceholder.module.css";

export default function VideoPlaceholder({ lesson }) {
  return (
    <div className={styles.video}>
      <div className={styles.content}>
        <div className={styles.play}>
          <LuPlay />
        </div>
        <div className={styles.overlay}>

          <h2>{lesson.title}</h2>

          <p>This lesson will be available soon.</p>

          <small>Video is currently being prepared.ready for Bunny -LessonPlayer.jsx &
          VideoPlaceholder.jsx</small>
        </div>
      </div>
    </div>
  );
}
