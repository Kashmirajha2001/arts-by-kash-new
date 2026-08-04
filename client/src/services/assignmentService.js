import api from "../api/axios";

export const submitAssignment = async (formData) => {
  const { data } = await api.post("/assignments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.assignment;
};

export const getAssignment = async (courseProductId, lessonId) => {
  const { data } = await api.get(
    `/assignments/course/${courseProductId}/lesson/${lessonId}`,
  );

  return data.assignment;
};

export const deleteAssignmentFile = async (assignmentId, fileId) => {
  const { data } = await api.delete(
    `/assignments/${assignmentId}/files/${fileId}`,
  );

  return data.assignment;
};
