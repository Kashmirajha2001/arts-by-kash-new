import styles from "./BunnyStreamPlayer.module.css";
import { bunnyConfig } from "../../../../config/bunny";
import VideoPlaceholder from "../VideoPlaceholder/VideoPlaceholder";

export default function BunnyStreamPlayer({ lesson }) {
  if (!lesson.bunnyVideoId?.trim()) {
    return <VideoPlaceholder lesson={lesson} />;
  }

  const src = `https://iframe.mediadelivery.net/embed/${bunnyConfig.libraryId}/${lesson.bunnyVideoId}`;

  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.player}
        src={src}
        title={lesson.title}
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
