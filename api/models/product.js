var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  id: Schema.ObjectId,
  title: String,
  img: String,
  price: Number,
  description: String,
  category: String,
  items: [
    // to do: change this to Item schema
    {
      sizes: [
        {
          size: String,
          quantity: Number
        }
      ],
      hex: String,
      color: String,
      img: String
    }
  ]
});

module.exports = mongoose.model("Product", ProductSchema);
