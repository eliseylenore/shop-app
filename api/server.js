const { uriCredentials } = require("./keys");

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const Product = require("./models/product");
const users = require("./routes/api/users");
const mongoose = require("mongoose");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 3000; // set our port

mongoose
  .connect(uriCredentials, { useNewUrlParser: true })
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log(err));

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get("/", (req, res) => {
  res.json({ message: "Yippee! welcome to our api!" });
});

// more routes for our API will happen here

// authentication routes
// -----------------------------------
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./passport")(passport);
// Routes
app.use("/api/users", users);

// on routes that end in /products
// -----------------------------------
router
  .route("/products")
  // create a product (accessed at POST http://localhost:3000/api/products)
  .post((req, res) => {
    let product = new Product(); // create a new instance of the product model

    product.title = req.body.title; // set the products title (comes from the request)
    product.img = req.body.img;
    product.price = req.body.price;
    product.description = req.body.description;
    product.category = req.body.category;
    product.items = req.body.items;

    // save the product and check for errors
    product.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "product created!", product });
      }
    });
  })

  // get all the products (accessed at GET http://localhost:3000/api/products)
  .get((req, res) => {
    Product.find(function(err, products) {
      if (err) res.send(err);

      res.json(products);
    });
  });

// find all products in category(accessed at GET http://localhost:3000/api/products/category/:category)
router.route("/products/category/:category").get((req, res) => {
  Product.find({ category: req.params.category }, function(err, products) {
    if (err) res.send(err);

    res.json(products);
  });
});

// on routes that end in /products/:product_id
// ----------------------------------------------------
router
  .route("/products/:product_id")

  // get the product with that id (accessed at GET http://localhost:3000/api/products/:product_id)
  .get((req, res) => {
    Product.findById(req.params.product_id, function(err, product) {
      if (err) res.send(err);
      res.json(product);
    });
  })
  // update the product with this id (accessed at PUT http://localhost:3000/api/products/:product_id)
  .put((req, res) => {
    // use our product model to find the product we want
    Product.findById(req.params.product_id, function(err, product) {
      if (err) res.send(err);

      product.title = req.body.title; // update the products info

      // save the product
      product.save(function(err) {
        if (err) res.send(err);

        res.json({ product });
      });
    });
  })

  // delete the product with this id (accessed at DELETE http://localhost:3000/api/products/:product_id)
  .delete((req, res) => {
    Product.deleteOne(
      {
        _id: req.params.product_id
      },
      err => {
        if (err) res.send(err);

        res.json({ message: "Successfully deleted" });
      }
    );
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens here: http://localhost:" + port + "/api");
