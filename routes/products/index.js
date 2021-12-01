const express = require("express");
const router = express.Router();

// on routes that end in /products
// -----------------------------------
router
  .route("/")
  // create a product (accessed at POST http://localhost:3000/api/products)
  .post(require("./create-product.js"))

  // get all the products (accessed at GET http://localhost:3000/api/products)
  .get(require("./get-products.js"));

// find all products in category(accessed at GET http://localhost:3000/api/products/category/:category)
router.route("/category/:category").get(require("./get-category.js"));

// on routes that end in /products/:product_id
// ----------------------------------------------------
router
  .route("/:product_id")

  // get the product with that id (accessed at GET http://localhost:3000/api/products/:product_id)
  .get(require("./get-product.js"))
  // update the product with this id (accessed at PUT http://localhost:3000/api/products/:product_id)
  .put(require("./update-product.js"))

  // delete the product with this id (accessed at DELETE http://localhost:3000/api/products/:product_id)
  .delete(require("./delete-product.js"));

// on routes that end in /products/:product_id/reviews
// ----------------------------------------------------
router
  .route("/:product_id/reviews")

  // create a review (accessed at POST http://localhost:3000/api/products/:product_id/reviews)
  .post(require("./create-review.js"))

  // get the product reviews (accessed at GET http://localhost:3000/api/products/:product_id/reviews)
  .get(require("./get-reviews.js"))

  // update the review of the product with this id (accessed at PUT http://localhost:3000/api/products/:product_id/reviews)
  .put(require("./update-review.js"))

  // delete the review of the product with this id (accessed at DELETE http://localhost:3000/api/products/:product_id/reviews)
  .delete(require("./delete-review.js"));

module.exports = router;
