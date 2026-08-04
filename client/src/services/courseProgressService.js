import api from "../api/axios";

export const getProgress = async (courseId) => {
  const { data } = await api.get(`/course-progress/${courseId}`);

  return data.progress;
};

export const markLessonComplete = async (courseId, lessonId) => {
  const { data } = await api.patch(`/course-progress/${courseId}/complete`, {
    lessonId,
  });

  return data.progress;
};

export const updateLastLesson = async (courseId, lessonId) => {
  const { data } = await api.patch(`/course-progress/${courseId}/last-lesson`, {
    lessonId,
  });

  return data.progress;
};
