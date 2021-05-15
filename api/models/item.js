var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  productId: Schema.ObjectId,
  itemId: Schema.ObjectId,
  orderDate: Date,
  hex: String,
  color: String,
  size: String,
  img: String,
  quantity: Number,
  title: String,
  price: Number,
  description: String,
  category: String
});

const PendingOrder = mongoose.model("pendingOrder", ItemSchema);
const FilledOrder = mongoose.model("filledOrder", ItemSchema);
const Item = mongoose.model("item", ItemSchema);
module.exports = { PendingOrder, FilledOrder, Item };
