const Product = require("../../models/product");

module.exports = async (req, res) => {
  // to-do: if there's an email, make sure the user is logged in.
  let product;
  try {
    product = await Product.findById(req.params.product_id);
  } catch (err) {
    res.status(400).json({ err });
  }
  if (product === null || product === undefined) {
    res.status(400).json({ "No product found": req.params.product_id });
  }

  const reviews = product.reviews;
  res.json(reviews);
};
