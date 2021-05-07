const Product = require("../../models/product");

module.exports = (req, res) => {
  // use our product model to find the product we want
  Product.findById(req.params.product_id, function(err, product) {
    if (err) res.send(err);

    product.title = req.body.title; // update the products info

    // save the product
    product.save(function(err) {
      if (err) res.send(err);

      res.json({ product });
    });
  });
};
