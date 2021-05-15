const mongoose = require("mongoose");

// Load User model
const User = require("../../models/user");
const Product = require("../../models/product");
const { PendingOrder } = require("../../models/item");

module.exports = (req, res) => {
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err) res.status(400).json(err);
    const errors = {};
    for (let item of user.cart) {
      // lookup product, then item within product (by itemId)
      Product.findById(mongoose.Types.ObjectId(item.productId), function(
        err,
        product
      ) {
        if (err) console.log("err", err);
        if (!product) {
          res.status(400).json({ "No product found": "No product Found" });
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
            res.json(errors);
          }
        } else {
          errors.noItemFound =
            "Was not able to find a matching item in database";
          return res.status(400).json(errors);
        }
      });
    }
    for (let cartItem of user.cart) {
      user.pendingOrders.push(cartItem);
      let newItem = new PendingOrder({
        _id: cartItem._id,
        productId: cartItem.productId,
        itemId: cartItem.itemId,
        orderDate: cartItem.orderDate,
        hex: cartItem.hex,
        color: cartItem.color,
        size: cartItem.size,
        img: cartItem.img,
        quantity: cartItem.quantity,
        title: cartItem.title,
        price: cartItem.price,
        description: cartItem.description,
        category: cartItem.category
      });
      newItem.save().catch(err => console.log(err));
    }
    user.cart = [];
    user
      .save()
      .then(user =>
        Object.keys(errors).length === 0 ? res.json(user.cart) : errors
      )
      .catch(err => console.log(err));
  });
};
