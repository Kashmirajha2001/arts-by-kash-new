import api from "../api/axios";

export const getReviews = async () => {
  const { data } = await api.get("/admin/reviews");

  return data.reviews;
};

export const getReview = async (id) => {
  const { data } = await api.get(`/admin/reviews/${id}`);

  return data.review;
};

export const updateReview = async (id, approved) => {
  const { data } = await api.patch(`/admin/reviews/${id}`, {
    approved,
  });

  return data.review;
};

export const deleteReview = async (id) => {
  await api.delete(`/admin/reviews/${id}`);
};
