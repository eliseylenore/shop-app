var mongoose = require("mongoose");

const { Item } = require("./item");

let orderSchema = new mongoose.Schema({
  items: [Item.schema],
  shippingAddress: {
    addressline1: String,
    addressline2: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
  },
  billingAddress: {
    addressline1: String,
    addressline2: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
  },
  email: String
});

const PendingOrder = mongoose.model("pendingOrder", orderSchema);
// const FilledOrder = mongoose.model("filledOrder", orderSchema);

const Order = mongoose.model("order", orderSchema);
module.exports = { Order, PendingOrder };
