import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/products",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getProducts: () => apiClient.get("/"),
  getFilteredProducts: category => apiClient.get("/category/" + category),
  getProduct: id => apiClient.get("/" + id),
  createReview: review =>
    apiClient.post("/" + review.product_id + "/reviews", review),
  editReview: payload =>
    apiClient.put("/" + payload.review.product_id + "/reviews", payload)
};
