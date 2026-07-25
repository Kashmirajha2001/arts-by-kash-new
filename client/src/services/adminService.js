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

export const getProducts = async () => {
  const { data } = await api.get("/admin/products");
  return data.products;
};

export const createProduct = async (product) => {
  const { data } = await api.post("/admin/products", product);
  return data.product;
};

export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/admin/products/${id}`, product);
  return data.product;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/admin/products/${id}`);
  return data;
};
