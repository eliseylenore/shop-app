const Product = require("../../models/product");

module.exports = (req, res) => {
  Product.deleteOne(
    {
      _id: req.params.product_id
    },
    err => {
      if (err) res.send(err);

      res.json({ message: "Successfully deleted" });
    }
  );
};
