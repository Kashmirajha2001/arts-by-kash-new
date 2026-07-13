import api from "../api/axios";

export const getAddresses = () => api.get("/auth/addresses");

export const addAddress = (data) => api.post("/auth/addresses", data);

export const updateAddress = (id, data) =>
  api.put(`/auth/addresses/${id}`, data);

export const deleteAddress = (id) => api.delete(`/auth/addresses/${id}`);

export const setDefaultAddress = (id) =>
  api.patch(`/auth/addresses/${id}/default`);
