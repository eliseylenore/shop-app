import axios from "axios";

const config = {
  baseURL: "http://localhost:3000/api",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

export default {
  registerUser: credentials =>
    axios.post("/users/register/", credentials, config),
  loginUser: credentials => axios.post("/users/login/", credentials, config),
  getUser: email => axios.get("/users/" + email, config),
  editUser: (email, userInfo) => axios.put("/users/" + email, userInfo, config),
  addToCart: (email, item) => axios.post("/users/cart/" + email, item, config),
  addToItemQuantity: (email, payload) =>
    axios.put(
      "/users/cart/" + email + "/addToCartItemQuantity",
      payload,
      config
    ),
  removeItemFromCart: (email, payload) =>
    axios.delete("/users/cart/" + email + "/deleteItem", {
      data: payload,
      ...config
    }),
  cancelOrder: (email, payload) =>
    axios.delete("/users/" + email + "/cancelOrder", {
      data: payload,
      ...config
    }),
  checkoutCart: email =>
    axios.delete("/users/cart/" + email + "/checkoutCart", config),
  getOpenOrders: email => axios.get("/users/" + email + "/openOrders", config),
  getFulfilledOrders: email =>
    axios.get("/users/" + email + "/fulfilledOrders", config),
  markOrderFilled: (email, payload) =>
    axios.put("/users/orders/" + email + "/fulfillOrder", payload, config)
};
