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
    )
};
