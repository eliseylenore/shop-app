var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  username: String,
  useremail: String,
  text: String,
  date: Date,
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  }
});

const Review = mongoose.model("review", ReviewSchema);
module.exports = { Review };
