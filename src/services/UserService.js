import axios from "axios";

const config = {
  baseURL: "/api/users",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

export default {
  registerUser: credentials =>
    axios.post("/registration/", credentials, config),
  loginUser: credentials => axios.post("/login/", credentials, config),
  getUser: email => axios.get("/" + email, config),
  editUser: (email, userInfo) => axios.put("/" + email, userInfo, config),
  addToCart: (email, item) => axios.post("/" + email + "/cart/", item, config),
  addAddressToCart: (email, shippingOrBilling, address) =>
    axios.post(
      "/" + email + "/cart/address/" + shippingOrBilling + "/",
      address,
      config
    ),
  addToAddressBook: (email, address) =>
    axios.post("/" + email + "/addToAddressBook/", address, config),
  deleteAddress: (email, _id) =>
    axios.delete("/" + email + "/address/" + _id, {
      ...config
    }),
  addToItemQuantity: (email, payload) =>
    axios.put("/" + email + "/cart/itemQuantity", payload, config),
  removeItemFromCart: (email, payload) =>
    axios.delete("/" + email + "/cart/item", {
      data: payload,
      ...config
    }),
  cancelOrder: (email, payload) =>
    axios.delete("/" + email + "/orders/item", {
      data: payload,
      ...config
    }),
  checkoutCart: (email, cart) =>
    axios.delete("/" + email + "/cart/", {
      data: { email, cart },
      ...config
    }),
  getOpenOrders: email => axios.get("/" + email + "/openOrders", config),
  getFulfilledOrders: email =>
    axios.get("/" + email + "/fulfilledOrders/", config),
  markOrderFilled: (email, payload) =>
    axios.put("/" + email + "/orders/", payload, config)
};
