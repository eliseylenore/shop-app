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
    registerError: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `${userData.token}`;
      state.loginError = null;
      state.registerError = null;
    },
    SET_EXTRA_USER_DATA(state, userData) {
      state.user = userData;
    },
    SET_LOGIN_ERR(state, error) {
      state.loginError = error;
    },
    SET_REGISTER_ERR(state, error) {
      state.registerError = error;
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

        for (let size of Object.keys(colorItem.sizes)) {
          sizesArr[size] = 1;
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
    ADD_TO_CART(state, product) {
      // iterate through items to see if already have one in there
      let matchFound = false;
      for (let item of state.cart) {
        if (
          item.hex === product.selectedHex &&
          item.size === product.selectedSize
        ) {
          item.quantity += product.quantity;
          matchFound = true;
        }
      }
      if (!matchFound) {
        const selectedProduct = {
          ...product.selectedItem,
          size: product.selectedSize,
          title: product.title,
          productId: product._id,
          price: product.price,
          quantity: product.quantity
        };
        state.cart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      state.product = {
        ...product,
        quantity: 1
      };
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
      UserService.loginUser(credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        })
        .catch(err => {
          commit("SET_LOGIN_ERR", err.response.data);
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
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },
    changeProductSelectedItem({ commit }, item) {
      commit("SET_PRODUCT_ITEM", item);
    },
    removeFromCart({ commit }, product) {
      commit("REMOVE_FROM_CART", product);
    }
  },
  getters: {
    loggedIn: state => {
      // !! syntax helps us determine the truthiness or falsiness of the value
      return !!state.user;
    },
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
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
