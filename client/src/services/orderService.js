import api from "../api/axios";

export const createOrder = (orderData) => api.post("/orders", orderData);

export const verifyPayment = (paymentData) =>
  api.post("/orders/verify", paymentData);

export const getMyOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};
