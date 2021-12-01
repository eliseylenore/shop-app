const Product = require("../../models/product");

module.exports = (req, res) => {
  Product.find({ category: req.params.category }, function(err, products) {
    if (err) res.send(err);

    res.json(products);
  });
};
