const Product = require("../../models/product");

module.exports = (req, res) => {
  Product.find(function(err, products) {
    if (err) res.send(err);
    res.json(products);
  });
};
