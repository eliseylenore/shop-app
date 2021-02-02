<template>
  <div class="product-show">
    <b-container class="mt-5">
      <b-row>
        <b-col xs="12" sm="5" offset="1" class="px-sm-5">
          <img
            :src="'./../../' + product.img"
            alt=""
            class="w-100 product-img"
          />
        </b-col>
        <b-col xs="12" sm="5" class="text-left pt-5 pt-sm-0">
          <h2>
            {{ product.title }}
          </h2>
          <p>${{ product.price }}</p>
          <div class="mt-4">
            <h4>Color</h4>
            <div>
              <div
                v-for="color in product.colors"
                class="color-swatch"
                :key="product.colors.indexOf(color)"
              >
                {{ color }}
              </div>
            </div>
          </div>
          <button class="">
            Add to cart
          </button>
          <div class="my-4" :class="descriptionShowing ? 'closed' : 'open'">
            <button
              @click="toggleDescription"
              class="description d-flex align-items-center justify-content-start"
            >
              <h4 class="mb-0 mr-2">Description</h4>
              <img
                src="./../../public/expand-triangle.svg"
                alt=""
                style="height: 0.7em;"
              />
            </button>
            <p v-if="descriptionShowing">{{ product.description }}</p>
          </div>
          <div class="my-4" :class="materialsShowing ? 'closed' : 'open'">
            <button
            @click="toggleMaterials"
              class="materials d-flex align-items-center justify-content-start"
            >
              <h4 class="mb-0 mr-2">Materials and care</h4>
              <img
                src="./../../public/expand-triangle.svg"
                alt=""
                style="height: 0.7em;"
              />
            </button>
            <p v-if="materialsShowing">Materials and care</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
  },
  data() {
    return {
      descriptionShowing: true,
      materialsShowing: false
    };
  },
  methods: {
    toggleDescription() {
      this.descriptionShowing = !this.descriptionShowing;
    },
    toggleMaterials() {
      this.materialsShowing = !this.materialsShowing;
    }
  },
  computed: {
    ...mapState(["product"]),
    // colors() {
    //   const colorArr = [];
    //   for (let item in this.products.items) {
    //     let miniItem = {
    //       color: item.color,
    //       hex: item.hex
    //     };
    //     if (!colorArr.includes(miniItem)) {
    //       colorArr.push(miniItem);
    //     } else {
    //       continue;
    //     }
    //   }
    //   return colorArr;
    // }
  }
};
</script>

<style lang="scss" scoped>
h2,
h3,
h4 {
  text-align: left;
  font-weight: bold;
}
button.description,
button.materials {
  background-color: transparent;
  padding: 0;
}
.closed img {
  -webkit-transition: 0.3s ease-in-out;
   -webkit-transform: rotate(90deg);
}
.open img {
  -webkit-transition: 0.3s ease-in-out;
   -webkit-transform: rotate(0deg);
}
.product-img {
  box-shadow: 3px 3px 15px rgba(163, 35, 25, 0.4);
}
</style>
