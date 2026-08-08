import api from "../api/axios";

export const getCourseReviews = async (courseProductId) => {
  const { data } = await api.get(`/course-reviews/course/${courseProductId}`);

  return data;
};

export const getMyReview = async (courseProductId) => {
  const { data } = await api.get(`/course-reviews/my/${courseProductId}`);

  return data.review;
};

export const saveReview = async (review) => {
  const { data } = await api.post("/course-reviews", review);

  return data.review;
};

export const getReviewSummary = async () => {
  const { data } = await api.get("/course-reviews/summary");

  return data.summaries;
};

export const getAllCourseReviews = async () => {
  const { data } = await api.get("/course-reviews/testimonials");

  return data;
};
