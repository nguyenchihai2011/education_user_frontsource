import { apiClient } from "./apiClient";

const getCartId = id => {
  return apiClient.get(`/cart/${id}`);
};

const createCart = payload => {
  return apiClient.get(`/cart/`, payload);
};

export { getCartId, createCart };
