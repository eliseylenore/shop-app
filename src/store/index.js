import Vue from "vue";
import Vuex from "vuex";
import ProductService from "@/services/ProductService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    product: {}
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      const hexArr = [];
      const sizesArr = [];
      for (let item of Object.keys(product.items)) {
        sizesArr.push(item);
      }
      // now need to get colors!
      for (let size of sizesArr) {
        for (let color of Object.keys(product.items[size])) {
          if (!hexArr.includes(color)) {
            hexArr.push(color);
          }
        }
      }

      state.product = {
        ...product,
        colors: hexArr,
        sizes: sizesArr,
        selectedColor: hexArr[0],
        selectedSize: ""
      };
    },
    SET_PRODUCT_COLOR(state, color) {
      state.product.selectedColor = color;
    },
    SET_PRODUCT_SIZE(state, size) {
      state.product.selectedSize = size;
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
      var product = this.getters.getProductById(id);

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
    changeProductSelectedColor({ commit }, color) {
      commit("SET_PRODUCT_COLOR", color);
    },
    changeProductSelectedSize({ commit }, size) {
      commit("SET_PRODUCT_SIZE", size);
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    }
  },
  modules: {}
});
