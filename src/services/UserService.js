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
    axios.post("/users/registration/", credentials, config),
  loginUser: credentials => axios.post("/users/login/", credentials, config),
  getUser: email => axios.get("/users/" + email, config),
  editUser: (email, userInfo) => axios.put("/users/" + email, userInfo, config),
  addToCart: (email, item) =>
    axios.post("/users/" + email + "/cart/", item, config),
  addAddressToCart: (email, shippingOrBilling, address) =>
    axios.post(
      "/users/" + email + "/cart/address/" + shippingOrBilling + "/",
      address,
      config
    ),
  addToItemQuantity: (email, payload) =>
    axios.put("/users/" + email + "/cart/itemQuantity", payload, config),
  removeItemFromCart: (email, payload) =>
    axios.delete("/users/" + email + "/cart/item", {
      data: payload,
      ...config
    }),
  cancelOrder: (email, payload) =>
    axios.delete("/users/" + email + "/orders/", {
      data: payload,
      ...config
    }),
  checkoutCart: (email, cart) =>
    axios.delete("/users/" + email + "/cart/", {
      data: { email, cart },
      ...config
    }),
  getOpenOrders: email => axios.get("/users/" + email + "/openOrders", config),
  getFulfilledOrders: email =>
    axios.get("/users/" + email + "/fulfilledOrders/", config),
  markOrderFilled: (email, payload) =>
    axios.put("/users/" + email + "/orders/", payload, config)
};
