import api from "../api/axios";

export const createOrder = (orderData) =>
  api.post("/orders", orderData);

export const verifyPayment = (paymentData) =>
  api.post("/orders/verify", paymentData);