import { LuDownload, LuFileImage, LuFileText } from "react-icons/lu";
import styles from "./LessonResources.module.css"

export default function LessonResources({ lesson }) {
  if (!lesson.resources?.length) return null;

  return (
    <section className={styles.card}>
      <h3>Resources & Downloads</h3>

      <div className={styles.list}>
        {lesson.resources.map((resource) => (
          <div key={resource.id} className={styles.item}>
            <div className={styles.info}>
              {resource.type === "pdf" ? (
                <LuFileText />
              ) : (
                <LuFileImage />
              )}

              <span>{resource.title}</span>
            </div>

            <a
              href={resource.file}
              download
              className={styles.download}
            >
              <LuDownload />
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}