import Vue from "vue";
import VueRouter from "vue-router";
import FileNotFound from "../views/FileNotFound.vue";
const About = () => import("../views/About.vue");
const Register = () => import("../views/RegisterUser.vue");
const Login = () => import("../views/LoginUser.vue");
const Dashboard = () => import("../views/Dashboard.vue");
const EditProfile = () => import("../views/EditProfile.vue");
const Products = () => import("../views/Products.vue");
const ProductShow = () => import("../views/ProductShow.vue");
const Cart = () => import("../views/Cart.vue");
const Shipping = () => import("../views/Shipping.vue");
const Billing = () => import("../views/Billing.vue");
const Checkout = () => import("../views/Checkout.vue");
const OrderSubmitted = () => import("../views/OrderSubmitted.vue");
const ProductReview = () => import("../views/ProductReview.vue");

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
    component: About
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard/:page",
    name: "Dashboard",
    meta: { requiresAuth: true },
    component: Dashboard
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    meta: { requiresAuth: true },
    component: EditProfile
  },
  {
    path: "/products",
    name: "Products",
    alias: ["/outerwear", "/swimwear", "/accessories"],
    component: Products
  },
  {
    path: "/products/category/:category",
    name: "Category",
    component: Products
  },
  {
    path: "/product/:id",
    name: "ProductShow",
    component: ProductShow
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/shipping",
    name: "Shipping",
    component: Shipping
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout
  },
  {
    path: "/ordersubmitted",
    name: "OrderSubmitted",
    component: OrderSubmitted
  },
  {
    path: "/product/:id/review",
    name: "ProductReview",
    component: ProductReview
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
