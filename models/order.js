var mongoose = require("mongoose");

const { Item } = require("./item");
const { Address } = require("./address");

let orderSchema = new mongoose.Schema({
  items: [Item.schema],
  shippingAddress: Address.schema,
  billingAddress: Address.schema,
  email: String,
  orderDate: Date,
  name: String,
  secret: String
});

const PendingOrder = mongoose.model("pendingOrder", orderSchema);
const FilledOrder = mongoose.model("filledOrder", orderSchema);

const Order = mongoose.model("order", orderSchema);
module.exports = { Order, PendingOrder, FilledOrder };
