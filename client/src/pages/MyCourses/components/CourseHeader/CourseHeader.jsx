import styles from "./CourseHeader.module.css";

export default function CourseHeader({ course, label = "My Course" }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{label}</p>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.shortDescription}</p>
      </div>
    </header>
  );
}
