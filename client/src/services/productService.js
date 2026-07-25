import api from "../api/axios";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data.products;
};

export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data.product;
};
