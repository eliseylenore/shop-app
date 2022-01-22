const mongoose = require("mongoose");
const { DateTime } = require("luxon");

// Load User model
const User = require("../../models/user");
const Product = require("../../models/product");
const { PendingOrder } = require("../../models/order");
const { addPayment } = require("./add-payment");

module.exports = (req, res) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      res.status(400).json(err);
    }
    let cart;
    if (user) {
      cart = user.cart;
    } else {
      cart = req.body.cart;
    }
    const errors = {};
    if (cart.items.length === 0) {
      errors.emptyCart = "No items in cart";
      return res.status(400).json(errors);
    }
    for (let item of cart.items) {
      // lookup product, then item within product (by itemId)
      Product.findById(mongoose.Types.ObjectId(item.productId), function(
        err,
        product
      ) {
        if (err) console.log("err", err);
        if (!product) {
          res
            .status(400)
            .json({ "No product found": item.title + ", size " + item.size });
        }
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
            product.save().catch(err => console.log(err));
          } else {
            errors.quantity = "There are no longer enough of " + item.title;
            return res.status(400).json(errors);
          }
        } else {
          errors.noItemFound =
            "Was not able to find a matching item in database: " +
            item.title +
            ", size " +
            item.size;
          return res.status(400).json(errors);
        }
      });
    }
    let { shippingAddress, billingAddress, email, items } = cart;
    let username = user ? user.name : "Anonymous Mouse";
    addPayment(cart, username)
      .then(paymentIntent => {
        let newOrder = new PendingOrder({
          shippingAddress,
          billingAddress,
          email,
          items,
          orderDate: DateTime.utc()
        });
        newOrder
          .save()
          .then(() => {
            if (user) {
              newOrder.secret = paymentIntent.client_secret;
              user.cart.items = [];
              user.pendingOrders.push(newOrder);
              user
                .save()
                .then(() => {
                  Object.keys(errors).length === 0
                    ? res.json({
                        secret: newOrder.secret
                      })
                    : res.status(400).json(errors);
                })
                .catch(err => console.log(err));
            } else {
              res.json({ secret: newOrder.secret });
            }
          })
          .catch(err => {
            errors.serverError = err;
            res.status(500).json(errors);
            console.log(err);
          });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
};
