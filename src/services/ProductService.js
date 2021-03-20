import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getProducts: () => apiClient.get("/products"),
  getFilteredProducts: category =>
    apiClient.get("/products/category/" + category),
  getProduct: id => apiClient.get("/products/" + id),
  registerUser: credentials => apiClient.post("/users/register/", credentials),
  loginUser: credentials => apiClient.post("/users/login/", credentials)
};
