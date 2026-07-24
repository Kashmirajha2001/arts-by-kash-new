import api from "../api/axios";

export const getAllOrders = async () => {
  const { data } = await api.get("/admin/orders");
  return data.orders;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/admin/orders/${id}`);

  return data.order;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await api.patch(`/admin/orders/${id}/status`, {
    orderStatus,
  });

  return data.order;
};
