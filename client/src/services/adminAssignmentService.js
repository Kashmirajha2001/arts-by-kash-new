import api from "../api/axios";

export const getAssignments = async () => {
  const { data } = await api.get("/admin/assignments");

  return data.assignments;
};

export const getAssignment = async (id) => {
  const { data } = await api.get(`/admin/assignments/${id}`);

  return data.assignment;
};

export const reviewAssignment = async (id, payload) => {
  const { data } = await api.patch(`/admin/assignments/${id}/review`, payload);

  return data.assignment;
};
