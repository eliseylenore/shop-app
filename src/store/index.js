import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import ProductService from "@/services/ProductService.js";
import UserService from "@/services/UserService.js";
import { getFormattedValue } from "../commons/utils";
Vue.use(Vuex);
const validateAddressInput = require("./validation/address");

export default new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem("cart")) || {
      items: [],
      shippingAddress: {
        addressline1: "",
        addressline2: "",
        city: "",
        state: "",
        country: "",
        zipcode: ""
      },
      billingAddress: {
        addressline1: "",
        addressline2: "",
        city: "",
        state: "",
        country: "",
        zipcode: ""
      },
      email: ""
    },
    products: [],
    product: {},
    user: {
      email: "",
      pendingOrders: [],
      fulfilledOrders: [],
      addressBook: []
    },
    loginError: null,
    registerError: null,
    editError: null,
    addressError: null,
    networkError: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      if (
        userData !== undefined &&
        userData.cart !== undefined &&
        userData.cart !== null &&
        userData.cart.items.length > 0
      ) {
        state.cart = userData.cart;
      }
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("cart", JSON.stringify(userData.cart));
      axios.defaults.headers.common["Authorization"] = `${userData.token}`;
      state.loginError = null;
      state.registerError = null;
    },
    UPDATE_USER_EMAIL(state, email) {
      state.cart.email = email;
    },
    EDIT_USER_DATA(state, userData) {
      const { name, email } = userData;
      state.user.name = name;
      state.user.email = email;
      state.editError = null;
    },
    SET_EXTRA_USER_DATA(state, userData) {
      state.user = userData;
      if (userData.cart !== undefined) {
        state.cart = userData.cart;
      }
    },
    SET_LOGIN_ERR(state, error) {
      state.loginError = error;
    },
    SET_REGISTER_ERR(state, error) {
      state.registerError = error;
    },
    SET_EDIT_ERR(state, error) {
      state.editError = error;
    },
    SET_ADDRESS_ERR(state, error) {
      state.addressError = error;
    },
    SET_NETWORK_ERR(state) {
      state.networkError = true;
    },
    LOGOUT() {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      // clearing out the Vuex State and axios header
      location.reload();
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_OPEN_ORDERS(state, pendingOrders) {
      state.user.pendingOrders = pendingOrders;
    },
    SET_FULFILLED_ORDERS(state, fulfilledOrders) {
      state.user.fulfilledOrders = fulfilledOrders;
    },
    SET_PRODUCT(state, product) {
      const hexArr = [];
      const sizesArr = {};
      product.items.forEach(function(item) {
        hexArr.push(item.hex);
      });

      for (let color of hexArr) {
        var colorItem = product.items.find(obj => obj.hex === color);

        for (let size of colorItem.sizes) {
          sizesArr[size.size] = 1;
        }
      }

      const selectedItem = product.items.find(
        element => element.hex === hexArr[0]
      );

      state.product = {
        ...product,
        colors: hexArr,
        sizes: Object.keys(sizesArr),
        selectedHex: hexArr[0],
        selectedSize: "",
        quantity: 1,
        selectedItem: selectedItem
      };
    },
    CREATE_REVIEW(state, review) {
      this.state.product.reviews.push(review);
    },
    ADD_TO_CART(state, payload) {
      const { product, selectedProduct } = payload;
      state.cart.items.push(selectedProduct);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      state.product = {
        ...product,
        quantity: 1
      };
    },
    ADD_TO_CART_ITEM_QUANTITY(state, payload) {
      const { _id, quantity } = payload;
      let foundItem = state.cart.items.find(item => item._id === _id);
      if (foundItem) {
        foundItem.quantity += quantity;
      } else {
        console.log("No found item.");
      }
    },
    SET_PRODUCT_ITEM(state, item) {
      state.product.selectedItem = item;
    },
    ADD_SHIPPING_ADDRESS(state, address) {
      state.cart.shippingAddress = address;
    },
    ADD_BILLING_ADDRESS(state, address) {
      state.cart.billingAddress = address;
    },
    ADD_TO_ADDRESS_BOOK(state, address) {
      state.user.addressBook.push(address);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    REMOVE_FROM_CART(state, product) {
      state.cart.items = state.cart.items.filter(
        item =>
          item._id !== product._id ||
          item.size !== product.size ||
          item.hex !== product.hex
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    MARK_ORDER_FILLED(state, item) {
      state.user.pendingOrders = state.user.pendingOrders.filter(
        product => product._id !== item._id
      );
      state.user.fulfilledOrders.push(item);
    },
    CANCEL_ORDER(state, item) {
      // find order
      let order = state.user.pendingOrders.find(
        order => item.orderId === order._id
      );

      // if only one item, delete that order
      if (order.items.length === 1) {
        state.user.pendingOrders = state.user.pendingOrders.filter(
          order => order._id !== item.orderId
        );
      }
      // delete item
      order.items = order.items.filter(product => product._id !== item._id);
    },
    EMPTY_CART(state) {
      for (let item of state.cart.items) {
        state.user.pendingOrders.push(item);
      }
      state.cart.items = [];
      localStorage.removeItem("cart");
    }
  },
  actions: {
    registerUser({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        UserService.registerUser(credentials)
          .then(({ data }) => {
            commit("SET_USER_DATA", data);
            resolve(console.log("Done!"));
          })
          .catch(err => {
            commit("SET_REGISTER_ERR", err.response.data);
            reject(err);
          });
      });
    },
    loginUser({ commit }, credentials) {
      return UserService.loginUser(credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", {
            ...data.user,
            success: data.success,
            token: data.token
          });
        })
        .catch(err => {
          commit("SET_LOGIN_ERR", err.response.data);
        });
    },
    editUser({ commit }, userInfo) {
      return UserService.editUser(this.state.user.email, userInfo)
        .then(({ data }) => {
          commit("EDIT_USER_DATA", data);
        })
        .catch(err => {
          commit("SET_EDIT_ERR", err.response.data);
        });
    },
    fetchUserInfo({ commit }) {
      UserService.getUser(this.state.user.email)
        .then(({ data }) => {
          commit("SET_EXTRA_USER_DATA", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    fetchProducts({ commit }) {
      ProductService.getProducts()
        .then(response => {
          const productsWithSelectedColors = response.data.map(product => {
            product.selectedHex = product.items[0].hex;
            return product;
          });
          commit("SET_PRODUCTS", productsWithSelectedColors);
        })
        .catch(error => {
          if (!error.status) {
            commit("SET_NETWORK_ERR");
          } else {
            console.log("There was an error: ", error);
          }
        });
    },
    fetchOpenOrders({ commit, state }) {
      UserService.getOpenOrders(state.user.email)
        .then(response => {
          commit("SET_OPEN_ORDERS", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    fetchFulfilledOrders({ commit, state }) {
      UserService.getFulfilledOrders(state.user.email)
        .then(response => {
          commit("SET_FULFILLED_ORDERS", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },

    fetchFilteredProducts({ commit }, category) {
      ProductService.getFilteredProducts(category)
        .then(response => {
          const productsWithSelectedColors = response.data.map(product => {
            product.selectedHex = product.items[0].hex;
            return product;
          });
          commit("SET_PRODUCTS", productsWithSelectedColors);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    fetchProduct({ commit }, id) {
      const product = this.getters.getProductById(id);

      if (product) {
        commit("SET_PRODUCT", product);
      } else {
        ProductService.getProduct(id)
          .then(response => {
            commit("SET_PRODUCT", response.data);
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      }
    },
    addToCart({ commit, state }, payload) {
      const { selectedProduct } = payload;
      if (state.user.name !== undefined) {
        UserService.addToCart(state.user.email, selectedProduct)
          .then(({ data }) => {
            let newPayload = payload;
            newPayload.selectedProduct._id =
              data.cart.items[data.cart.items.length - 1]._id;
            commit("ADD_TO_CART", newPayload);
          })
          .catch(err => console.log(err));
      } else {
        commit("ADD_TO_CART", payload);
      }
    },
    addToItemQuantity({ commit, state }, payload) {
      if (state.user.name !== undefined) {
        UserService.addToItemQuantity(state.user.email, payload)
          .then(() => {
            commit("ADD_TO_CART_ITEM_QUANTITY", payload);
          })
          .catch(err => console.log(err));
      } else {
        commit("ADD_TO_CART_ITEM_QUANTITY", payload);
      }
    },
    changeProductSelectedItem({ commit }, item) {
      commit("SET_PRODUCT_ITEM", item);
    },
    removeFromCart({ commit, state }, product) {
      if (state.user.name === undefined) {
        commit("REMOVE_FROM_CART", product);
      } else {
        UserService.removeItemFromCart(state.user.email, { _id: product._id })
          .then(() => commit("REMOVE_FROM_CART", product))
          .catch(err => console.log(err));
      }
    },
    submitReview({ commit, state }, review) {
      return new Promise((resolve, reject) => {
        if (state.user.email) {
          review.useremail = state.user.email;
        }
        ProductService.createReview(review)
          .then(() => {
            commit("CREATE_REVIEW", review);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addShippingAddress({ commit, state }, address) {
      if (state.user.name !== undefined) {
        return new Promise((resolve, reject) => {
          UserService.addAddressToCart(state.user.email, "shipping", address)
            .then(() => {
              commit("ADD_SHIPPING_ADDRESS", address);
              resolve();
            })
            .catch(err => {
              commit("SET_ADDRESS_ERR", err.response.data);
              reject(err);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          // Form validation
          const { errors, isValid } = validateAddressInput(address);
          if (!isValid) {
            commit("SET_ADDRESS_ERR", errors);
            reject(errors);
          } else {
            commit("ADD_SHIPPING_ADDRESS", address);
            resolve();
          }
        });
      }
    },
    addBillingAddress({ commit, state }, address) {
      return new Promise((resolve, reject) => {
        if (state.user.name !== undefined) {
          UserService.addAddressToCart(state.user.email, "billing", address)
            .then(() => {
              commit("ADD_BILLING_ADDRESS", address);
              resolve();
            })
            .catch(err => {
              commit("SET_ADDRESS_ERR", err.response.data);
              reject(err);
            });
        } else {
          commit("ADD_BILLING_ADDRESS", address);
          resolve();
        }
      });
    },
    addToAddressBook({ commit, state }, address) {
      return new Promise((resolve, reject) => {
        if (state.user.name !== undefined) {
          UserService.addToAddressBook(state.user.email, address)
            .then(() => {
              commit("ADD_TO_ADDRESS_BOOK", address);
              resolve();
            })
            .catch(err => {
              commit("SET_ADDRESS_ERR", err.response.data);
              reject(err);
            });
        } else {
          commit("ADD_TO_ADDRESS_BOOK", address);
          resolve();
        }
      });
    },
    checkoutCart({ commit, state }) {
      return new Promise((resolve, reject) => {
        let email = state.user.email ? state.user.email : state.cart.email;
        if (email) {
          UserService.checkoutCart(email, state.cart)
            .then(res => {
              console.log("res " + res);
              commit("EMPTY_CART", state);
              resolve();
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        } else {
          console.log("No email!");
        }
      });
    },
    cancelOrder({ commit, state }, item) {
      UserService.cancelOrder(state.user.email, item)
        .then(() => {
          commit("CANCEL_ORDER", item);
        })
        .catch(err => console.log(err));
    },
    markOrderFilled({ commit, state }, item) {
      UserService.markOrderFilled(state.user.email, { _id: item._id })
        .then(() => {
          commit("MARK_ORDER_FILLED", item);
        })
        .catch(err => console.log(err));
    }
  },
  getters: {
    loggedIn: state => {
      // !! syntax helps us determine the truthiness or falsiness of the value
      return state.user.name !== undefined;
    },
    getProductById: state => id => {
      return state.products.find(product => product._id === id);
    },
    getCartTotal: state => {
      let cartTotal = 0;
      for (let item of state.cart.items) {
        cartTotal += parseFloat(item.price) * item.quantity;
      }
      return getFormattedValue(cartTotal);
    },
    getShippingAddress: state => {
      return state.cart.shippingAddress;
    },
    getBillingAddress: state => {
      return state.cart.billingAddress;
    },
    getUserEmail: state => {
      return state.cart.email;
    },
    getAddressBookOptions: state => {
      let addressBookOptions = state.user.addressBook.map(address => {
        return {
          value: address,
          text:
            address.addressline1 +
            " " +
            address.addressline2 +
            ", " +
            address.city +
            ", " +
            address.state +
            " " +
            address.zipcode +
            " " +
            address.country
        };
      });
      return addressBookOptions;
    }
  }
});
