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
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterUser.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginUser.vue")
  },
  {
    path: "/dashboard/:page",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue")
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditProfile.vue")
  },
  {
    path: "/products",
    name: "Products",
    alias: ["/outerwear", "/swimwear", "/accessories"],
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue")
  },
  {
    path: "/products/category/:category",
    name: "Category",
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
  {
    path: "/shipping",
    name: "Shipping",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Shipping.vue")
  },
  {
    path: "/billing",
    name: "Billing",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Billing.vue")
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Checkout.vue")
  },
  {
    path: "/ordersubmitted",
    name: "OrderSubmitted",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrderSubmitted.vue")
  },
  {
    path: "/product/:id/review",
    name: "ProductReview",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductReview.vue")
  },
  { path: "*", component: FileNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: "Login" });
  }
  next();
});
export default router;
