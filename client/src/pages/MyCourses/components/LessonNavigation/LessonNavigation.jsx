import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./LessonNavigation.module.css";

export default function LessonNavigation({ course, previousLesson, nextLesson }) {
  return (
    <div className={styles.nav}>
      {previousLesson ? (
        <PrimaryButton
          variant="outline"
          to={`/my-courses/${course.slug}/${previousLesson.videoId || previousLesson.id}`}
        >
          Previous Lesson
        </PrimaryButton>
      ) : (
        <span />
      )}

      {nextLesson ? (
        <PrimaryButton
          to={`/my-courses/${course.slug}/${nextLesson.videoId || nextLesson.id}`}
        >
          Next Lesson
        </PrimaryButton>
      ) : (
        <PrimaryButton to={`/my-courses/${course.slug}`}>Back to Course</PrimaryButton>
      )}
    </div>
  );
}
