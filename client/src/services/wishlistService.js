import api from "../api/axios";

export const getWishlist = async () => {
  const { data } = await api.get("/wishlist");
  return data;
};

export const toggleWishlist = async (id) => {
  const { data } = await api.post(`/wishlist/${id}`);
  return data;
};
