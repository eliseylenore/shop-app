var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const { Item } = require("./item");

let OrderSchema = new Schema({
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

const PendingOrder = mongoose.model("PendingOrder", OrderSchema);
// const FilledOrder = mongoose.model("filledOrder", OrderSchema);

const Order = mongoose.model("order", OrderSchema);
module.exports = { Order, PendingOrder };
