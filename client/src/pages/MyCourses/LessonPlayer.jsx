import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import Loader from "../../components/ui/Loader/Loader";

import useCourse from "../../hooks/useCourse";
import CourseHeader from "./components/CourseHeader/CourseHeader";
import CourseSidebar from "./components/CourseSidebar/CourseSidebar";
import LessonPlayerView from "./components/LessonPlayer/LessonPlayer";
import LessonNavigation from "./components/LessonNavigation/LessonNavigation";
import LessonResources from "./components/LessonResources/LessonResources";
import AssignmentUpload from "./components/AssignmentUpload/AssignmentUpload";
import ProgressCard from "./components/ProgressCard/ProgressCard";
import {
  getAllLessons,
  getLessonById,
  getLessonIndex,
} from "../../utils/courseProgress";

import styles from "./MyCourses.module.css";

export default function LessonPlayer() {
  const { slug, lessonId } = useParams();
  const {
    loading,
    getCourseBySlug,
    isCourseOwned,
    getProgress,
    markLessonComplete,
    setLastAccessedLesson,
  } = useCourse();

  const course = getCourseBySlug(slug);
  const lesson = course ? getLessonById(course, lessonId) : null;

  useEffect(() => {
    if (course && lesson) {
      setLastAccessedLesson(course.productId, lesson.videoId || lesson.id);
    }
  }, [course, lesson, setLastAccessedLesson]);

  if (loading) return <Loader />;
  if (!course) return <Navigate to="/my-courses" replace />;
  if (!isCourseOwned(course.productId))
    return <Navigate to="/courses" replace />;
  if (!lesson) return <Navigate to={`/my-courses/${course.slug}`} replace />;

  const lessons = getAllLessons(course);
  const lessonIndex = getLessonIndex(course, lessonId);
  const previousLesson = lessons[lessonIndex - 1];
  const nextLesson = lessons[lessonIndex + 1];
  const progress = getProgress(course);

  return (
    <main className={styles.page}>
      <CourseHeader course={course} label="Lesson Player" />

      <section className={styles.lessonLayout}>
        <div className={styles.lessonMain}>
          <LessonPlayerView lesson={lesson} />

          <div className={styles.lessonMeta}>
            <span>Lesson {lessonIndex + 1}</span>
            <h1>{lesson.title}</h1>
            <p>{lesson.subtitle}</p>
          </div>

          <LessonNavigation
            course={course}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
          />

          <button
            type="button"
            className={styles.completeButton}
            onClick={() =>
              markLessonComplete(course.productId, lesson.videoId || lesson.id)
            }
          >
            Mark lesson complete
          </button>

          <LessonResources lesson={lesson} />
          {/* <AssignmentUpload lesson={lesson} course={course} /> */}
          {lesson.assignment && (
            <AssignmentUpload lesson={lesson} course={course} />
          )}
          {/* <Notes />--------need to check feasibility first */}

          {/* <div className={styles.lessonMeta}>
            <span>Discussion</span>
            <h1>Comments Placeholder</h1>
            <p>Instructor feedback and student discussion will live here later.</p>
          </div>------need to check feasibility first */}
        </div>

        <aside className={styles.sideStack}>
          <ProgressCard progress={progress} />
          <CourseSidebar
            course={course}
            completedLessons={progress.completedLessons}
          />
        </aside>
      </section>
    </main>
  );
}
