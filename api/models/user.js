var mongoose = require("mongoose");
const { Item } = require("./item");
const { Order } = require("./order");
var Schema = mongoose.Schema;

// set up user schema and authentication with help of this tutorial: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  cart: [Item.schema],
  pendingOrders: [Order.schema],
  fulfilledOrders: [Order.schema]
});

module.exports = mongoose.model("User", UserSchema);
