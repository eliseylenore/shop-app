import Vue from "vue";
import Vuex from "vuex";
import ProductService from "@/services/ProductService.js";
import { getFormattedValue } from "../commons/utils";
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
    changeProductSelectedItem({ commit }, item) {
      commit("SET_PRODUCT_ITEM", item);
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
      return getFormattedValue(cartTotal);
    }
  },
  modules: {}
});
