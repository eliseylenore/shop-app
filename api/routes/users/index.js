const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route POST api/users / register
// @desc Register user
// @access Public
router.post("/registration", require("./register-user.js"));

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", require("./login-user.js"));

// @route GET api/users/:email
// @desc Get user and send information back
// @access private
router
  .route("/:email")
  .get(
    passport.authenticate("jwt", { session: false }),
    require("./get-user.js")
  )

  // @route PUT api/users/:email
  // @desc Edit user information
  // @access private
  .put(
    passport.authenticate("jwt", { session: false }),
    require("./edit-user.js")
  );

// @route POST api/users/:email/cart
// @desc Add item to user's cart
// @access private
router
  .route("/:email/cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    require("./add-to-cart.js")
  )

  // @route DELETE api/users/:email/cart/
  // @desc Checkout user's cart (adds to open orders)
  // @access private
  .delete(
    // passport.authenticate("jwt", { session: false }),
    require("./checkout-cart.js")
  );

// @route POST api/users/:email/cart/address/:type
//:type must be shipping or billing
// @desc Add address to user's cart
// @access private
router
  .route("/:email/cart/address/:type")
  .post(require("./add-address-to-cart.js"));

// @route POST api/users/:email/add-to-address-book
//:type must be shipping or billing
// @desc Add address to user's cart
// @access private
router
  .route("/:email/addToAddressBook")
  .post(require("./add-to-address-book.js"));

// @route PUT api/users/:email/cart/itemQuantity
// @desc Adds to cart item quantity
// @access private
router
  .route("/:email/cart/itemQuantity")
  .put(
    passport.authenticate("jwt", { session: false }),
    require("./increase-cart-quantity.js")
  );

// @route DELETE api/users/:email/cart/item
// @desc Deletes item from cart
// @access private
router
  .route("/:email/cart/item")
  .delete(
    passport.authenticate("jwt", { session: false }),
    require("./delete-cart-item")
  );

// @route PUT api/users/:email/orders
// @desc mark order filled (take from pending, move to fulfilled)
// @access private
router
  .route("/:email/orders")
  .put(
    passport.authenticate("jwt", { session: false }),
    require("./fill-order.js")
  );

// @route DELETE api/users/:email/orders/item
// @desc cancel a pending order
// @access private
// cancel order
router
  .route("/:email/orders/item")
  .delete(
    passport.authenticate("jwt", { session: false }),
    require("./cancel-order-item.js")
  );

// get user's open orders (accessed at GET http://localhost:3000/api/users/:email/openOrders/)
router
  .route("/:email/openOrders")
  .get(
    passport.authenticate("jwt", { session: false }),
    require("./get-open-orders.js")
  );

// get user's fulfilled orders (accessed at GET http://localhost:3000/api/users/:email/fulfilledOrders/)
router
  .route("/:email/fulfilledOrders")
  .get(
    passport.authenticate("jwt", { session: false }),
    require("./get-fulfilled-orders.js")
  );

module.exports = router;
