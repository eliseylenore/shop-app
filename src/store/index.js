import Vue from "vue";
import Vuex from "vuex";
import ProductService from "@/services/ProductService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: [],
    product: {}
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      const hexArr = [];
      const sizesArr = {};
      for (let item of Object.keys(product.items)) {
        hexArr.push(item);
      }
      for (let color of hexArr) {
        for (let size of Object.keys(product.items[color].sizes)) {
          if (!sizesArr[size]) {
            sizesArr[size] = product.items[color].sizes[size];
          }
        }
      }

      state.product = {
        ...product,
        colors: hexArr,
        sizes: Object.keys(sizesArr),
        selectedHex: hexArr[0],
        selectedSize: "",
        quantity: 1
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
          ...state.product.items[product.selectedHex],
          hex: product.selectedHex,
          size: product.selectedSize,
          title: product.title,
          productId: product.id,
          img: product.items[product.selectedHex].img,
          price: product.price,
          quantity: product.quantity
        };
        state.cart.push(selectedProduct);
      }
      state.product = {
        ...product,
        selectedHex: state.product.colors[0],
        selectedSize: "",
        quantity: 1
      };
    },
    SET_PRODUCT_COLOR(state, color) {
      state.product.selectedHex = color;
    },
    SET_PRODUCT_SIZE(state, size) {
      state.product.selectedSize = size;
    },
    REMOVE_FROM_CART(state, product) {
      state.cart = state.cart.filter(
        item =>
          item.id !== product.id ||
          item.size !== product.size ||
          item.hex !== product.hex
      );
    }
  },
  actions: {
    fetchProducts({ commit }) {
      ProductService.getProducts()
        .then(response => {
          commit("SET_PRODUCTS", response.data);
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
    changeProductSelectedHex({ commit }, color) {
      commit("SET_PRODUCT_COLOR", color);
    },
    changeProductSelectedSize({ commit }, size) {
      commit("SET_PRODUCT_SIZE", size);
    },
    removeFromCart({ commit }, product) {
      commit("REMOVE_FROM_CART", product);
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    getCartTotal: state => {
      let cartTotal = 0;
      for (let item of state.cart) {
        cartTotal += parseFloat(item.price) * item.quantity;
      }
      return cartTotal;
    }
  },
  modules: {}
});
