import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import Loader from "../../components/ui/Loader/Loader";
import PrimaryButton from "../../components/ui/PrimaryButton/PrimaryButton";
// import Preview from "../Courses/Preview/Preview";
import ArtworksYoullCreate from "../Courses/ArtworksYou'llCreate/ArtworksYou'llCreate";

import useCourse from "../../hooks/useCourse";
import CourseHeader from "./components/CourseHeader/CourseHeader";
import ProgressCard from "./components/ProgressCard/ProgressCard";
import Curriculum from "./components/Curriculum/Curriculum";

import styles from "./MyCourses.module.css";
import { getAllLessons } from "../../utils/courseProgress";

export default function MyCourseDetails() {
  const { slug } = useParams();
  const {
    loading,
    getCourseBySlug,
    isCourseOwned,
    getProgress,
    setCurrentCourse,
    getLastAccessedLesson,
  } = useCourse();

  const course = getCourseBySlug(slug);

  useEffect(() => {
    setCurrentCourse(course || null);

    return () => setCurrentCourse(null);
  }, [course, setCurrentCourse]);

  if (loading) return <Loader />;
  if (!course) return <Navigate to="/my-courses" replace />;
  if (!isCourseOwned(course.productId))
    return <Navigate to="/courses" replace />;

  const progress = getProgress(course);
  // const firstLesson = getAllLessons(course)[0];
  const lessons = getAllLessons(course);

  const lastAccessedLessonId = getLastAccessedLesson(course.productId);

  let continueLesson =
    lessons.find(
      (lesson) => (lesson.videoId || lesson.id) === lastAccessedLessonId,
    ) || null;

  if (!continueLesson) {
    continueLesson =
      lessons.find(
        (lesson) =>
          !progress.completedLessons.includes(lesson.videoId || lesson.id),
      ) || lessons[lessons.length - 1];
  }

  return (
    <main className={styles.page}>
      <CourseHeader course={course} label="Unlocked Course" />

      <section className={styles.section}>
        <div className={styles.detailsGrid}>
          {/* <div className={styles.detailsMain}>
            <Preview course={course} />
          </div> */}

          <aside className={styles.sideStack}>
            <ProgressCard progress={progress} />
            {continueLesson && (
              <PrimaryButton
                to={`/my-courses/${course.slug}/${
                  continueLesson.videoId || continueLesson.id
                }`}
              >
                Continue Learning
              </PrimaryButton>
            )}
          </aside>
        </div>

        <Curriculum
          course={course}
          completedLessons={progress.completedLessons}
        />

        <ArtworksYoullCreate course={course} />
      </section>
    </main>
  );
}
