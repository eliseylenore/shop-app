var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  productId: Schema.Types.ObjectId,
  itemId: Schema.Types.ObjectId,
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

const Item = mongoose.model("item", ItemSchema);
module.exports = { Item };
