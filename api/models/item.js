var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  productId: Schema.ObjectId,
  itemId: Schema.ObjectId,
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

module.exports = mongoose.model("Item", ItemSchema);
