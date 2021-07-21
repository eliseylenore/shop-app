const mongoose = require("mongoose");

// Load User model
const User = require("../../models/user");
const Product = require("../../models/product");
const { PendingOrder } = require("../../models/order");

module.exports = (req, res) => {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err) res.status(400).json(err);
    const { _id, productId, itemId, quantity, size, title, orderId } = req.body;

    // lookup product, then item within product (by itemId)
    const errors = {};
    Product.findById(mongoose.Types.ObjectId(productId), function(
      err,
      product
    ) {
      console.log("err", err);

      if (!product)
        res.status(400).json({ "No product found": title + ", size " + size });

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
        errors.noItemFound = "Was not able to find a matching item in database";
        return res.status(400).json(errors);
      }
    });

    // find order in pendingOrders
    let currentPendingOrder = user.pendingOrders.find(order => {
      if (order !== undefined && order._id !== undefined) {
        return orderId.toString() !== _id;
      }
    });

    let newPendingOrder;
    if (currentPendingOrder.items.length === 1) {
      // if there's only one item, delete the order
      let newPendingOrders = user.pendingOrders.filter(order => {
        if (order != undefined && order._id !== undefined) {
          return order._id.toString() !== orderId;
        }
      });
      user.pendingOrders = newPendingOrders;
    } else {
      // else, delete the item from the order
      newPendingOrder = currentPendingOrder.items.filter(item => {
        if (item !== undefined && item._id !== undefined) {
          return item._id.toString() !== _id;
        }
      });
    }

    currentPendingOrder = newPendingOrder;

    // do the same in pendingOrders collection
    // find order in pendingOrders
    // the id should be the same as the orderId from the user's pendingOrders
    PendingOrder.findById(mongoose.Types.ObjectId(orderId), function(
      err,
      order
    ) {
      if (err) console.log(err);
      if (order.items.length === 1) {
        // if there's only one item, delete the order
        PendingOrder.findByIdAndDelete(
          mongoose.Types.ObjectId(orderId),
          function(err, docs) {
            if (err) {
              console.log(err);
            } else {
              console.log("Deleted: ", docs);
            }
          }
        );
      } else {
        // else, delete the item from the order
        order.items = order.items.filter(item => {
          if (item !== undefined && item._id !== undefined) {
            return item._id.toString() !== _id;
          }
        });
        order
          .save()
          .then()
          .catch(err => console.log(err));
      }
    });

    user
      .save()
      .then(user => res.json(user.pendingOrders))
      .catch(err => console.log(err));
  });
};
