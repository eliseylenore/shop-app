var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
  name: String,
  addressline1: String,
  addressline2: String,
  city: String,
  state: String,
  country: String,
  zipcode: String
});

const Address = mongoose.model("address", AddressSchema);
module.exports = { Address };
