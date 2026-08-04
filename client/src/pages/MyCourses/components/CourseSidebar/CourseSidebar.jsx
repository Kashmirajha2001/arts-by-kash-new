import { NavLink } from "react-router-dom";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";

import { getAllLessons } from "../../../../utils/courseProgress";
import styles from "./CourseSidebar.module.css";

export default function CourseSidebar({ course, completedLessons = [] }) {
  return (
    <aside className={styles.sidebar}>
      <h3>Lessons</h3>

      <div className={styles.list}>
        {getAllLessons(course).map((lesson) => {
          const lessonId = lesson.videoId || lesson.id;
          const completed = completedLessons.includes(lessonId);

          return (
            <NavLink
              key={lessonId}
              to={`/my-courses/${course.slug}/${lessonId}`}
              className={({ isActive }) =>
                `${styles.lesson} ${isActive ? styles.active : ""} ${
                  completed ? styles.completed : ""
                }`
              }
            >
              {completed ? <FaCheckCircle /> : <FaPlayCircle />}
              <span>{lesson.title}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}
