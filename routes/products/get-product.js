const Product = require("../../models/product");

module.exports = (req, res) => {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};
