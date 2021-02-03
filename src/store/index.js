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
      console.log("items", Object.keys(product.items));
      for (let item in Object.keys(product.items)) {
        console.log("item", product.items[item]);
        for (let part of Object.keys(product.items[item])) {
          sizesArr.push(part);
        }
      }

      // now need to get colors! 
      
      state.product = {
        ...product,
        colors: hexArr,
        sizes: sizesArr,
        selectedColor: hexArr[0]
      };
    },
    SET_PRODUCT_COLOR(state, color) {
      state.product.selectedColor = color;
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
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    }
  },
  modules: {}
});
