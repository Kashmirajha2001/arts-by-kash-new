export const getAllLessons = (course) =>
  course?.curriculum?.flatMap((module) => module.lessons) || [];

export const getLessonById = (course, lessonId) =>
  getAllLessons(course).find(
    (lesson) => String(lesson.videoId || lesson.id) === String(lessonId),
  );

export const getLessonIndex = (course, lessonId) =>
  getAllLessons(course).findIndex(
    (lesson) => String(lesson.videoId || lesson.id) === String(lessonId),
  );

export const getCourseProgress = (course, progress = {}) => {
  const lessons = getAllLessons(course);
  const courseKey = String(course.productId);
  const completedLessons = progress[courseKey]?.completedLessons || [];
  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;

  return {
    completedLessons,
    completedCount,
    totalLessons,
    remainingLessons: Math.max(totalLessons - completedCount, 0),
    percentage: totalLessons
      ? Math.round((completedCount / totalLessons) * 100)
      : 0,
  };
};
