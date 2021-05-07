const mongoose = require("mongoose");

// Load User model
const User = require("../../models/user");
const Product = require("../../models/product");

module.exports = (req, res) => {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err) res.status(400).json(err);
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
        errors.noItemFound = "Was not able to find a matching item in database";
        return res.status(400).json(errors);
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
};
