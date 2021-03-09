import Vue from "vue";
import VueRouter from "vue-router";
import FileNotFound from "../views/FileNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Products" }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/products",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue")
  },
  {
    path: "/products/outerwear",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue")
  },
  {
    path: "/product/:id",
    name: "ProductShow",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductShow.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import(/* webpackChunkName: "about" */ "../views/Cart.vue")
  },
  { path: "*", component: FileNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
