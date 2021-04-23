import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import ProductService from "@/services/ProductService.js";
import UserService from "@/services/UserService.js";
import { getFormattedValue } from "../commons/utils";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    products: [],
    product: {},
    user: null,
    loginError: null,
    registerError: null,
    editError: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      if (userData.user.cart !== undefined && userData.user.cart.length > 0) {
        state.cart = userData.user.cart;
      }
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `${userData.token}`;
      state.loginError = null;
      state.registerError = null;
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
    LOGOUT() {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      // clearing out the Vuex State and axios header
      location.reload();
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
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
    ADD_TO_CART(state, payload) {
      const { product, selectedProduct } = payload;
      state.cart.push(selectedProduct);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      state.product = {
        ...product,
        quantity: 1
      };
    },
    ADD_TO_CART_ITEM_QUANTITY(state, payload) {
      const { _id, quantity } = payload;
      let foundItem = state.cart.find(item => item._id === _id);
      if (foundItem) {
        foundItem.quantity += quantity;
      } else {
        console.log("No found item.");
      }
    },
    SET_PRODUCT_ITEM(state, item) {
      state.product.selectedItem = item;
    },
    REMOVE_FROM_CART(state, product) {
      state.cart = state.cart.filter(
        item =>
          item.id !== product.id ||
          item.size !== product.size ||
          item.hex !== product.hex
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    EMPTY_CART(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    }
  },
  actions: {
    registerUser({ commit }, credentials) {
      UserService.registerUser(credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        })
        .catch(err => {
          commit("SET_REGISTER_ERR", err.response.data);
        });
    },
    loginUser({ commit }, credentials) {
      return UserService.loginUser(credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
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
      if (state.user !== null) {
        UserService.addToCart(state.user.email, selectedProduct)
          .then(({ data }) => {
            let newPayload = payload;
            newPayload.selectedProduct._id =
              data.cart[data.cart.length - 1]._id;
            commit("ADD_TO_CART", newPayload);
          })
          .catch(err => console.log(err));
      } else {
        commit("ADD_TO_CART", payload);
      }
    },
    addToItemQuantity({ commit, state }, payload) {
      if (state.user !== null) {
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
      if (state.user === null) {
        commit("REMOVE_FROM_CART", product);
      } else {
        UserService.removeItemFromCart(state.user.email, { _id: product._id })
          .then(() => commit("REMOVE_FROM_CART", product))
          .catch(err => console.log(err));
      }
    },
    checkoutCart({ commit, state }) {
      commit("EMPTY_CART", state);
    }
  },
  getters: {
    loggedIn: state => {
      // !! syntax helps us determine the truthiness or falsiness of the value
      return !!state.user;
    },
    getProductById: state => id => {
      return state.products.find(product => product._id === id);
    },
    getCartTotal: state => {
      let cartTotal = 0;
      for (let item of state.cart) {
        cartTotal += parseFloat(item.price) * item.quantity;
      }
      return getFormattedValue(cartTotal);
    }
  },
  modules: {}
});
