import api from "../api/axios";
import { removeAuthToken, setAuthToken } from "../utils/authToken";

const saveAuthToken = (data) => {
  if (data?.token) {
    setAuthToken(data.token);
  }
};

const clearAuthToken = () => {
  removeAuthToken();
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  saveAuthToken(response.data);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  saveAuthToken(response.data);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } finally {
    clearAuthToken();
  }
};

export const googleLoginUser = async (credential) => {
  const response = await api.post("/auth/google", {
    credential,
  });

  saveAuthToken(response.data);

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });

  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch("/auth/profile", data);

  return response.data;
};
