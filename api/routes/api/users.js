const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../../keys");
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateEditProfileInput = require("../../validation/editProfile");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/user");

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

module.exports = router;
