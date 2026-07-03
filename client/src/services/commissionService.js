import api
 from "../api/axios";
export const submitCommission = async (formData) => {
  const response = await api.post("/commission", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
