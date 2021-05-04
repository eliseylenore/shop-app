const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../../keys");
const passport = require("passport");
const mongoose = require("mongoose");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateEditProfileInput = require("../../validation/editProfile");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/user");
const Product = require("../../models/product");

// @route POST api/users / register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password

    // After editing my password, the compare function always returns false
    // Using hash function to compare instead
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              email,
              user
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route GET api/users/:email
// @desc Login user and return JWT token
// @access private
router
  .route("/:email")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  })

  // @route PUT api/users/:email
  // @desc Edit user information
  // @access private
  .put(passport.authenticate("jwt", { session: false }), (req, res) => {
    // Form validation
    const { errors, isValid } = validateEditProfileInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, name, password } = req.body;
    User.findOne({ email: req.params.email }, function(err, user) {
      if (!user) {
        return res.status(400).json({ email: "No email found" });
      }
      if (err) res.send(err);
      // if email is different
      user.name = name;
      if (email !== req.params.email) {
        // check to see if new email is taken
        const findUser = async function(email) {
          try {
            User.findOne({ email });
          } catch (err) {
            console.log(err);
          }
        };
        const foundEmailUser = findUser(req.params.email);
        if (foundEmailUser) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          user.email = email;
        }
      }
      // Check password
      if (password) {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            return res
              .status(400)
              .json({ password: "You entered the same password!" });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;

                user.password = hash;
                user
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
              });
            });
            // to-do: record date so user knows when pw was last updated
          }
        });
      } else {
        user
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      }
    });
  });

// @route POST api/users/cart/:email
// @desc Add item to user's cart
// @access private
router
  .route("/cart/:email")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    // get user
    User.findOne({ email: req.params.email }, function(err, user) {
      if (!user) {
        return res.status(400).json({ email: "No email found" });
      }
      if (err) res.send(err);
      // to-do: check if this product/item exists? has all the right qualities?
      let newItem = req.body;
      console.log("req.body", req.body);
      user.cart.push(newItem);
      user
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });

router
  .route("/cart/:email/addToCartItemQuantity")
  .put(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      const { _id, quantity } = req.body;

      const foundItem = user.cart.find(item => {
        if (item !== undefined && item._id !== undefined) {
          return item._id.toString() === _id;
        }
      });
      foundItem.quantity = foundItem.quantity + parseInt(quantity);
      user
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });

router
  .route("/cart/:email/deleteItem")
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      const { _id } = req.body;

      const newCart = user.cart.filter(item => {
        if (item !== undefined && item._id !== undefined) {
          return item._id.toString() !== _id;
        }
      });
      user.cart = newCart;
      user
        .save()
        .then(user => res.json(user.cart))
        .catch(err => console.log(err));
    });
  });

router
  .route("/cart/:email/checkoutCart")
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      const errors = {};
      for (let item of user.cart) {
        // lookup product, then item within product (by itemId)
        Product.findById(mongoose.Types.ObjectId(item.productId), function(
          err,
          product
        ) {
          console.log("err", err);

          let foundItem = product.items.find(productItem => {
            if (productItem && productItem._id) {
              return productItem._id.toString() === item.itemId.toString();
            }
          });
          if (foundItem) {
            let productSize = foundItem
              .toObject()
              .sizes.find(currentSize => currentSize.size === item.size);
            // can this be simplified? There's some code that should be take out around this spot
            if (productSize.quantity >= item.quantity) {
              // couldn't change productSize.quantity directly, or else it wouldn't save to mongodb
              for (let foundItemSize of foundItem.sizes) {
                if (foundItemSize.size === item.size) {
                  foundItemSize.quantity -= item.quantity;
                }
              }
              product
                .save()
                .then(product => console.log(product))
                .catch(err => console.log(err));
            } else {
              errors.quantity = "There are no longer enough of " + item.title;
              res.json(errors);
            }
          } else {
            errors.noItemFound =
              "Was not able to find a matching item in database";
            res.send(errors);
          }
        });
      }
      for (let cartItem of user.cart) {
        console.log("adding item: ", cartItem);

        user.pendingOrders.push(cartItem);
      }
      user.cart = [];
      user
        .save()
        .then(user =>
          Object.keys(errors).length === 0 ? res.json(user.cart) : errors
        )
        .catch(err => console.log(err));
    });
  });

router
  .route("/orders/:email/fulfillOrder")
  .put(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      const { _id } = req.body;

      const foundItem = user.pendingOrders.find(item => {
        if (item !== undefined && item._id !== undefined) {
          return item._id.toString() === _id;
        }
      });
      if (foundItem) {
        user.fulfilledOrders.push(foundItem);
        const newPendingOrders = user.pendingOrders.filter(item => {
          if (item !== undefined && item._id !== undefined) {
            return item._id.toString() !== _id;
          }
        });
        user.pendingOrders = newPendingOrders;
        user
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      } else {
        res.send({ itemNotFound: "No item found to fulfill" });
      }
    });
  });

// get user's open orders (accessed at GET http://localhost:3000/api/users/:email/openOrders/)
router
  .route("/:email/openOrders")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      res.json(user.pendingOrders);
    });
  });

// get user's fulfilled orders (accessed at GET http://localhost:3000/api/users/:email/fulfilledOrders/)
router
  .route("/:email/fulfilledOrders")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      res.json(user.fulfilledOrders);
    });
  });

router
  .route("/:email/cancelOrder")
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.params.email }, function(err, user) {
      if (err) res.send(err);
      const { _id, productId, itemId, quantity, size, title } = req.body;

      // lookup product, then item within product (by itemId)
      const errors = {};
      Product.findById(mongoose.Types.ObjectId(productId), function(
        err,
        product
      ) {
        console.log("err", err);

        let foundItem = product.items.find(productItem => {
          if (productItem && productItem._id) {
            return productItem._id.toString() === itemId;
          }
        });
        if (foundItem) {
          let productSize = foundItem
            .toObject()
            .sizes.find(currentSize => currentSize.size === size);
          // can this be simplified? There's some code that should be take out around this spot
          if (productSize.quantity >= quantity) {
            // couldn't change productSize.quantity directly, or else it wouldn't save to mongodb
            for (let foundItemSize of foundItem.sizes) {
              if (foundItemSize.size === size) {
                foundItemSize.quantity += quantity;
              }
            }
            product
              .save()
              .then(product => console.log(product))
              .catch(err => console.log(err));
          } else {
            errors.quantity = "There are no longer enough of " + title;
            return res.json(errors);
          }
        } else {
          errors.noItemFound =
            "Was not able to find a matching item in database";
          return res.send(errors);
        }
      });

      const newPendingOrders = user.pendingOrders.filter(item => {
        if (item !== undefined && item._id !== undefined) {
          return item._id.toString() !== _id;
        }
      });
      user.pendingOrders = newPendingOrders;
      user
        .save()
        .then(user => res.json(user.cart))
        .catch(err => console.log(err));
    });
  });

module.exports = router;
