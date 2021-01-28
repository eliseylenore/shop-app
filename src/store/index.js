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
      state.product = product;
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
        commit("SET_PRODUCT", product)
      } else {
        ProductService.getProduct(id)
          .then(response => {
            commit("SET_PRODUCT", response.data);
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      }
    }
  },
  getters: {
    getProductById: state => id =>  {
      return state.products.find(product => product.id === id);
    }
  },
  modules: {}
});
